import {DataTypes} from 'sequelize';
import { sequelize } from '../../../database/connection.js';


export const Insumo = sequelize.define('insumos',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre:{
        type: DataTypes.STRING,
        allowNull: false
    },
    tipo:{
        type: DataTypes.STRING,
        allowNull: false
    },
    descripcion:{
        type: DataTypes.STRING,
        allowNull: false
    },
    Stock:{
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },

},{
    createdAt: false,
    updatedAt: false
});