import {DataTypes} from 'sequelize';
import { sequelize } from '../../../database/connection.js';


export const Anexo = sequelize.define('anexos', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fechaAnexo:{
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