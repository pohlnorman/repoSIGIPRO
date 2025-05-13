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

import { initializeDatabase } from './database/seed.js';

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
        await initializeDatabase();

        app.listen(PORT, () => {
            console.log(`---Servidor corriendo en http://localhost:${PORT}---`);
        });
    } catch (error) {
        console.error('error en la conexion a la base de datos:', error);
    }
}


main();