import {DataTypes} from 'sequelize';
import { sequelize } from '../../../database/connection.js';
import { Contrato } from '../contratos/contrato.model.js';

export const Persona = sequelize.define('personas',{
    idPersona:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre:{
        type: DataTypes.STRING,
        allowNull: false
    },
    apellido:{
        type: DataTypes.STRING,
        allowNull: false
    },
    rut:{
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    createdAt: false,
    updatedAt: false
});

Persona.hasMany(Contrato,{
    foreignKey:'personas_idPersona',
    sourceKey: 'idPersona'
});

Contrato.belongsTo(Persona,{
    foreignKey:'personas_idPersona',
    targetId: 'idContrato'
})