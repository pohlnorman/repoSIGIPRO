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
    nacionalidad:{
        type: DataTypes.STRING,
        allowNull: true
    },
    fechaNacimiento:{
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    estadoCivil:{
        type: DataTypes.STRING,
        allowNull: true
    },
    prefesion:{
        type: DataTypes.STRING,
        allowNull: true
    },
    telefono:{
        type: DataTypes.STRING,
        allowNull: true
    },
    email:{
        type: DataTypes.STRING
    },
    direccion:{
        type: DataTypes.STRING,
        allowNull: true
    },
    region:{
        type: DataTypes.STRING,
        allowNull: true
    },
    comuna:{
        type: DataTypes.STRING,
        allowNull: true
    },
    afp:{
        type: DataTypes.STRING,
        allowNull: true
    },
    salud:{
        type: DataTypes.STRING,
        allowNull: true
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
    },
    examenAltura:{
        type: DataTypes.DATEONLY
    },
    examenGeneral:{
        type: DataTypes.DATEONLY
    },
    tallaCamisa:{
        type: DataTypes.STRING
    },
    tallaPantalon:{
        type: DataTypes.STRING
    },
    tallaZapato:{
        type: DataTypes.STRING
    },
    tallaPoleron:{
        type: DataTypes.STRING
    },
    tallaParka:{
        type: DataTypes.STRING
    },
    tallaOberol:{
        type: DataTypes.STRING
    }
},{
    createdAt: false,
    updatedAt: false
});

Persona.hasMany(Contrato);
Contrato.belongsTo(Persona)

Persona.hasOne(User, { foreignKey: 'personaId' });
User.belongsTo(Persona, { foreignKey: 'personaId', allowNull: true })