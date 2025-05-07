import {DataTypes} from 'sequelize';
import { sequelize } from '../../../database/connection.js';

export const Rol = sequelize.define('roles',{
    idRol:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull: false,
        unique: true
    },
}, {
    timestamps: false, // Desactivar createdAt y updatedAt
});