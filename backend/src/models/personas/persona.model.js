import {DataTypes} from 'sequelize';
import { sequelize } from '../../../database/connection.js';
import { Contrato } from '../contratos/contrato.model.js';

export const Persona = sequelize.define('personas',{
    id:{
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
    },
    estado:{
        type: DataTypes.TINYINT,
        allowNull: false
    }
},{
    createdAt: false,
    updatedAt: false
});

Persona.hasMany(Contrato,{
    foreignKey:'idPersona', //nombre fk
    sourceKey: 'id'//id de persona
});

Contrato.belongsTo(Persona,{
    foreignKey:'idPersona', //nombre fk
    targetId: 'id'// id de contrato
})