import {DataTypes} from 'sequelize';
import { sequelize } from '../../../database/connection.js';
import { Contrato } from '../contratos/contrato.model.js';
import { User } from '../login/users.models.js';

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
    },
    tieneUsuario:{
        type: DataTypes.TINYINT,
        allowNull: true
    },
    examenVista:{
        type: DataTypes.DATEONLY
    }
},{
    createdAt: false,
    updatedAt: false
});

Persona.hasMany(Contrato);
Contrato.belongsTo(Persona)

Persona.hasOne(User, { foreignKey: 'personaId' });
User.belongsTo(Persona, { foreignKey: 'personaId', allowNull: true })