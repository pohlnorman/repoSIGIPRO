import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import { sequelize } from './database/connection.js';

import personaRoute from './src/routes/personas/persona.route.js';
import contratoRoute from './src/routes/contratos/contrato.route.js';
import authRoute from './src/routes/auth/auth.route.js';
import empresaRoute from './src/routes/empresas/empresa.route.js';

import { Persona } from './src/models/personas/persona.model.js';
import { Empresa } from './src/models/empresa/empresa.model.js';
import { User } from './src/models/login/users.models.js';
import { Rol } from './src/models/login/roles.models.js';

// Cargar variables de entorno antes de usarlas
dotenv.config();

//creamos el puerto de conexion
const PORT = process.env.PORT || 4000;

//creamos una variable para usar el modulo express
const app = express();


//------MIDDLEWARES-------
app.use(cors({
    origin: 'http://localhost:4200', // URL de tu frontend Angular
    credentials: true //Permitir el envío de cookies o credenciales
}));
//analizar y manejar las cookies que se envían desde el cliente hasta el servidor
app.use(cookieParser());
//middleware para registrar en consola solicitudes http y errores
app.use(morgan('dev'));
//Esta línea permite manejar datos enviados a través de formularios HTML
app.use(express.urlencoded({ extended: false }));
//Esta línea permite manejar datos en formato JSON
app.use(express.json());

//---USAR MODULOS Y ORGANIZAR LAS RUTAS DE LA APP---
app.use(personaRoute);
app.use(contratoRoute);
app.use('/auth',authRoute);
app.use('/empresa',empresaRoute);

// Middleware de manejo de errores global (EJEMPLO BÁSICO - Deberías mejorarlo)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo salió mal!');
});

//Aqui iniciamos el servidor
async function main() {
    try {
        // Sincroniza todos los modelos con la base de datos
        await sequelize.sync({ force: true });
        console.log("---Tablas sincronizadas---");

        // Insertar datos
        await Empresa.bulkCreate([
            { nombre: 'Air Laja S.p.A.', rut: '77782898-3' }
        ]);
        console.log('Empresa insertada correctamente');

        // Insertar datos
        await Persona.bulkCreate([
            { nombre: 'Juan', apellido: 'Pérez', rut: '4927669-9', estado: 0 },
            { nombre: 'María', apellido: 'González', rut: '14265525-k', estado: 0 },
            { nombre: 'Pedro', apellido: 'López', rut: '21295958-8', estado: 0 }
        ]);
        console.log('Personas insertadas correctamente.');

        //CREACION USUARIOS PREDETERMINADOS (Solo si las tablas están vacías)
        const adminRoleExists = await Rol.findOne({ where: { name: 'superAdmin' } });
        if (!adminRoleExists) {
            console.log('Creando roles y usuarios por defecto...');
            try {
                const roles = await Rol.bulkCreate([
                    { name: 'SuperAdmin' }, // ID 1 usualmente
                    { name: 'EmpresaAdmin' }, // ID 2 usualmente
                    { name: 'Usuario' }       // ID 3 usualmente
                ]);

                const empresa = await Empresa.findOne({ where: { rut: '77782898-3' } });

                await User.findOrCreate({
                    where: { username: 'super@sigipro.cl' },
                    defaults: { password: 'Sigipro1!', rolId: roles[0].idRol, empresaId: empresa.id } // Asumiendo ID 1 para SuperAdmin
                });
                console.log("Rol por defecto asegurado.");
            } catch (error) {
                console.error('Error al crear rol por defecto:', error);
            }
        } else {
            console.log('Rol ya existe, omitiendo creación por defecto.');
        }

        

        app.listen(PORT, () => console.log(`---Servidor corriendo en http://localhost:${PORT}---`));
        
    } catch (error) {
        console.error('error en la conexion a la base de datos:', error)
    }
}

main();