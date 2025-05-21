import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { sequelize } from '../../../database/connection.js';
import { verifyToken, authorizeRoles } from '../../middleware/auth.middleware.js';

import { Persona } from '../../models/personas/persona.model.js';
import { Empresa } from '../../models/empresa/empresa.model.js';
import { User } from '../../models/login/users.models.js';

const router = express.Router();

// --- Rutas Públicas ---
// POST /auth/register registro de usuario desde un usuario ADMIN logeado
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
            await Persona.update({ 
                tieneUsuario: 1,
                email: newUser.username
            },{where: {id: persona.id}});

            // Excluir contraseña de la respuesta
            const userResponse = newUser.toJSON();
            delete userResponse.password;

            res.status(201).json({ message: 'Usuario para persona registrado exitosamente', user: userResponse });

        }else if(empresaId != null){
            const empresa = await Empresa.findByPk(empresaId);

            if (!empresa) {
                return res.status(404).json({ message: 'La empresa no existe' });
            }

            // Crear el nuevo usuario para la empresa (la contraseña se hashea automáticamente por el hook en users.model.js)
            const newUser = await User.create({ username, password, rolId: userRolId, estado: 1,empresaId, personaId});

            await Empresa.update({ 
                email: newUser.username
            },{where: {id: empresa.id}});

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

// POST /auth/register registro de usuario desde un usuario ADMIN logeado
/* router.post('/registerWithRoleUser', async (req, res) =>{
    const { rut, nombre, apellido, username, password } = req.body;

    // Validación básica (MEJORA: Usar express-validator)
    if (!username || !password) {
        return res.status(400).json({ message: 'El nombre de usuario y la contraseña son requeridos' });
    }

    // Asignar rolId a 'USER' (ID 3)
    const userRolId = 3; // id usuario persona

        try {
        // Verificar si la persona ya existe
            const existePersona = await Persona.findOne({ where: { rut } });
            if (existePersona) {
                return res.status(400).json({ message: 'la persona ya esta registrada' });
            }


            // Crear el nuevo usuario para la persona (la contraseña se hashea automáticamente por el hook en users.model.js)
            const newUser = await User.create({ username, password, rolId: userRolId, estado: 1, existePersona});
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
}); */

router.post('/registerWithRoleUser', async (req, res) =>{
    const { rut, nombre, apellido, username, password } = req.body;

    // Validación básica (MEJORA: Usar express-validator)
    if (!username || !password) {
        return res.status(400).json({ message: 'El nombre de usuario y la contraseña son requeridos' });
    }

    const transaction = await sequelize.transaction(); // Inicia la transacción
    console.log('🟡 Transacción iniciada');

        try {
        // Verificar si la persona ya existe
            let persona = await Persona.findOne({ where: { rut } });
            if (!persona) {
                // Crear nueva persona con estado en 0 (aunque no venga en req.body)
                persona = await Persona.create({
                    rut,
                    nombre,
                    apellido,
                    estado: 0, // Sobrescribe o asegura que siempre se guarde como 0
                    tieneUsuario: 0 // Sobrescribe o asegura que siempre se guarde como 0
                },{transaction});
                console.log('🟢 Persona creada:', persona.toJSON());
            }   else {
                console.log('ℹ️ Persona ya existe:', persona.toJSON());
            }
        
            // Asignar rolId a 'USER' (ID 3)
            const userRolId = 3; // id usuario persona

            // Crear el nuevo usuario para la persona (la contraseña se hashea automáticamente por el hook en users.model.js)
            const newUser = await User.create({ 
                username,
                password,
                rolId: userRolId,
                estado: 1,
                personaId: persona.id
            },{transaction});
            console.log('🟢 Usuario creado:', newUser.toJSON());

            //actualiza el usuario de persona
            await persona.update({ 
                tieneUsuario: 1,
                email: newUser.username
            },{transaction});
            console.log('🔄 Campo tieneUsuario actualizado en Persona');

            // Si todo salió bien, confirmar la transacción
            await transaction.commit();
            console.log('✅ Transacción completada exitosamente');

            res.status(201).json({
                message:'usuario creado',
                persona,
                usuario:newUser});
    } catch (error) {
        // Si hay algún error, revertir los cambios
        await transaction.rollback();
        console.error('Error en registerUser:',error);
        console.error('❌ Transacción revertida por error:', error);

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
        

        // Verificar usuario y contraseña
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Email o password incorrectos' });
        }

        console.log('Usuario:', user.toJSON());

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