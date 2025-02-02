import {DataTypes} from 'sequelize';
import { sequelize } from '../../../database/connection.js';
import { Persona } from '../personas/persona.model.js';

export const Contrato = sequelize.define('Contratos', {
    idContrato:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fechaInicio:{
        type: DataTypes.DATEONLY,
    }
},{
    createdAt: false,
    updatedAt: false
});

