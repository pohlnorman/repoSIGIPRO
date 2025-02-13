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
},{
    createdAt: false,
    updatedAt: false
});