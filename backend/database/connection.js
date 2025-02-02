import { Sequelize } from "sequelize";
import dotenv from 'dotenv';

// Cargar variables de entorno antes de usarlas
dotenv.config();

//Aqui realizamos la conexion a la base de datos mediante el modulo de sequelize
export const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER,process.env.DB_PASS,{
    host:process.env.DB_HOST,
    dialect:'mysql',
    //logging:false
});