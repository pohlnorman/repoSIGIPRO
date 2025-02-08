import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';

import { sequelize } from './database/connection.js';
import personaRoute from './src/routes/personas/persona.route.js';
import contratoRoute from './src/routes/contratos/contrato.route.js';
import { Persona } from './src/models/personas/persona.model.js';

// Cargar variables de entorno antes de usarlas
dotenv.config();

//creamos el puerto de conexion
const PORT = process.env.PORT || 4000;

//creamos una variable para usar el modulo express
const app = express();


//------MIDDLEWARES-------
app.use(cors({
    credentials: true //Permitir el envío de cookies o credenciales
}));
//middleware para registrar en consola solicitudes http y errores
app.use(morgan('dev'));
//Esta línea permite manejar datos enviados a través de formularios HTML
app.use(express.urlencoded({ extended: false }));
//Esta línea permite manejar datos en formato JSON
app.use(express.json());

//---USAR MODULOS Y ORGANIZAR LAS RUTAS DE LA APP---
app.use(personaRoute)
app.use(contratoRoute)

//Aqui iniciamos el servidor
async function main() {
    try {
        await sequelize.sync({ force: true });
        console.log("---Tablas sincronizadas---");
        app.listen(PORT, () => console.log(`---Servidor corriendo en http://localhost:${PORT}---`));
        
    } catch (error) {
        console.error('error en la conexion a la base de datos:', error)
    }
}

main();