import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { verifyToken, authorizeRoles } from '../../middleware/auth.middleware.js';

import { Persona } from '../../models/personas/persona.model.js';
import { Empresa } from '../../models/empresa/empresa.model.js';
import { User } from '../../models/login/users.models.js'; 

const router = express.Router();

// --- Rutas Públicas ---
// POST /auth/register registro de usuario
router.post('/register', async (req, res) =>{
    const { username, password, rolId, estado, empresaId, personaId } = req.body;

    // Validación básica (MEJORA: Usar express-validator)
    if (!username || !password) {
        return res.status(400).json({ message: 'El nombre de usuario y la contraseña son requeridos' });
    }

    // Asignar rolId a 'USER' (ID 3) si no se proporciona o es inválido
    const userRolId = rolId || 3; // Cambia 'USER' por el valor que necesites

        try {
        // Verificar si el usuario ya existe
        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) {
        return res.status(400).json({ message: 'El nombre de usuario ya está en uso' });
        }

        // Validar que al menos uno de los IDs esté presente
        if (!personaId && !empresaId) {
            return res.status(400).json({ message: 'Debe proporcionar un personaId o empresaId' });
        }


        // verifica si se esta registrando una perosna o una empresa
        if(personaId){
            // Buscar la persona por personaId
            const persona = await Persona.findByPk(personaId);
            if (!persona) {
                return res.status(404).json({ message: 'La persona no existe' });
            }

            // Crear el nuevo usuario para la persona (la contraseña se hashea automáticamente por el hook en users.model.js)
            const newUser = await User.create({ username, password, rolId: userRolId, estado: 1,empresaId, personaId});
            await Persona.update({ tieneUsuario: 1 },{where: {id: persona.id}});

            // Excluir contraseña de la respuesta
            const userResponse = newUser.toJSON();
            delete userResponse.password;

            res.status(201).json({ message: 'Usuario para persona registrado exitosamente', user: userResponse });
        }else if(empresaId != null){
            // Crear el nuevo usuario para la empresa (la contraseña se hashea automáticamente por el hook en users.model.js)
            const newUser = await User.create({ username, password, rolId: userRolId, estado: 1,empresaId, personaId});

            // Excluir contraseña de la respuesta
            const userResponse = newUser.toJSON();
            delete userResponse.password;

            res.status(201).json({ message: 'Usuario para empresa registrado exitosamente', user: userResponse });
        }

    } catch (error) {
        console.error('Error en registerUser:',error);
        res.status(500).json({ message: 'Error interno del servidor al registrar el usuario' });
    }
});

// POST /login
router.post('/login' ,async (req, res) => {
    const { username, password } = req.body;

    // Validación básica
    if (!username || !password) {
        return res.status(400).json({ message: 'El nombre de usuario y la contraseña son requeridos' });
    };

    try {
        const user = await User.findOne({ where: { username }, include:{model:Empresa} });
        console.log('Usuario:', user.toJSON());

        // Verificar usuario y contraseña
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Credenciales incorrectas' });
        }

        // Generar Token JWT
        const payload = {
            id: user.idUser,
            username: user.username,
            rol: user.rolId,
            empresaId: user.empresaId || null // Incluye empresaId si existe
        };
        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET || 'tu_clave_secreta', // ¡ASEGÚRATE DE TENER ESTA VARIABLE EN .env!
            { expiresIn: process.env.JWT_EXPIRES_IN || '1h' } // Usa variable de entorno
        );

        // Establecer cookie HttpOnly
        const esProduccion = false; // Cambia a true cuando estés en producción

        res.cookie('auth-token', token, {
            httpOnly: true, // El frontend no puede acceder a la cookie vía JS
            secure: esProduccion, // Enviar solo sobre HTTPS en producción
            sameSite: esProduccion ? 'none' : 'lax', // usa 'Lax' o 'Strict' si frontend y backend están en el mismo dominio
            maxAge: (parseInt(process.env.JWT_COOKIE_EXPIRES_IN_MS) || 3600000), // Tiempo de vida de la cookie en ms (ej: 1 hora)
            path: '/' // Cookie disponible en todo el sitio
        });

        // Excluir contraseña de la respuesta
        const userResponse = user.toJSON();
        delete userResponse.password;

        res.status(200).json({ message: 'Inicio de sesión exitoso', user: userResponse });

    } catch (error) {
        console.error('Error en loginUser:', error);
        res.status(500).json({ message: 'Error interno del servidor durante el inicio de sesión' });
    }
} );

// POST o GET logout (Usar POST es semánticamente mejor para cambiar estado)
//router.get('/logout', logoutUser);
router.post('/logout', (req, res) => {
    try {
        // Limpiar la cookie
        res.clearCookie('auth-token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/'
        });
        res.status(200).json({ message: 'Cierre de sesión exitoso' });
    } catch (error) {
        console.error('Error en logoutUser:', error);
        res.status(500).json({ message: 'Error interno del servidor durante el cierre de sesión' });
    }
});

// --- Ruta Protegida (Ejemplo) ---
// GET check-session
// Verifica si el usuario tiene una sesión válida (basado en la cookie 'auth-token')
router.get('/check-session', verifyToken, async (req,res) => {
    // Si el middleware verifyToken pasó, req.user contiene los datos del token
    try {
        // Podrías querer buscar al usuario en la BD para obtener datos actualizados
        const user = await User.findByPk(req.user.id, {
            attributes: { exclude: ['password'] } // Excluir contraseña
        });

        if (!user) {
            // Si el usuario del token ya no existe en la BD
            res.clearCookie('auth-token', { path: '/' }); // Limpia la cookie inválida
            return res.status(401).json({ message: 'Usuario no encontrado, sesión inválida' });
        }

        res.status(200).json({ isAuthenticated: true, user: user });

    } catch (error) {
        console.error('Error en checkSession:', error);
        res.status(500).json({ message: 'Error interno del servidor al verificar la sesión' });
    }
});

router.get('/protected', (req, res) => {
    const token = req.cookies['auth-token'];

    if (!token) return res.status(401).json({ message: 'No autorizado' });

    try {
        const decoded = jwt.verify(token, 'tu_clave_secreta');
        res.json({ message: 'Acceso permitido', user: decoded });
    } catch (err) {
        res.status(401).json({ message: 'Token inválido' });
    }
});

//
router.post('/verifyUser',verifyToken,authorizeRoles(1,2), async (req, res) => {
    const {rut} = req.body;

    try {
        const persona = await Persona.findOne({where:{rut},include:[{model:User}]});
        if (persona.tieneUsuario == 1) {
            console.log('La persona con rut:'+persona.rut +' si tiene usuario creado')
            return res.status(200).json( persona.usuario.username );
        } else {
            console.log('La persona con rut:'+persona.rut +' no tiene usuario creado')
            return res.status(401).json({ message: 'La persona con rut:'+persona.rut +' no tiene usuario creado' });
        }
    } catch (error) {
        console.error('Error verificando el usuario:', error);
        res.status(500).json({ message: 'Error interno del servidor mientras se verifica el usuario' });
    }

})

export default router;