import {DataTypes} from 'sequelize';
import { sequelize } from '../../../database/connection.js';


export const Anexo = sequelize.define('anexos', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fechaEmisionAnexo:{
        type: DataTypes.DATEONLY
    },
    fechaVigenciaAnexo:{
        type: DataTypes.DATEONLY
    },
    estado:{
        type: DataTypes.TINYINT,
        allowNull: false
    },
    motivo:{
        type: DataTypes.STRING,
        allowNull:true
    },
},{
    createdAt: false,
    updatedAt: false
});

