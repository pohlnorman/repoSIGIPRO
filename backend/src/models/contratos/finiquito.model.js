import {DataTypes} from 'sequelize';
import { sequelize } from '../../../database/connection.js';


export const Finiquito = sequelize.define('finiquitos', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fechaFiniquito:{
        type: DataTypes.DATEONLY
    },
    estado:{
        type: DataTypes.TINYINT,
        allowNull: false
    },
    causalTermino:{
        type: DataTypes.STRING,
        allowNull:true
    },
    indemnizacion:{
        type: DataTypes.STRING,
        allowNull:true
    },
    vacacionesProporcionales:{
        type: DataTypes.STRING,
        allowNull:true
    },
    sueldoPendiente:{
        type: DataTypes.STRING,
        allowNull:true
    },
    ratificacion:{
        type: DataTypes.STRING,
        allowNull:true
    },
    
},{
    createdAt: false,
    updatedAt: false
});