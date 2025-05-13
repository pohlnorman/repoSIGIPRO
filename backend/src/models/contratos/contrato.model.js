import {DataTypes} from 'sequelize';
import { sequelize } from '../../../database/connection.js';
import { Finiquito } from './finiquito.model.js';
import { Anexo } from './anexo.model.js';
import { Bodega } from '../inventarios/bodega.model.js';
import { Empresa } from '../empresa/empresa.model.js';

export const Contrato = sequelize.define('contratos', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fechaInicio:{
        type: DataTypes.DATEONLY,
    },
    estado:{
        type: DataTypes.TINYINT,
        allowNull: false
    },
    cargo:{
        type: DataTypes.STRING,
        allowNull: true
    },
    labor:{
        type: DataTypes.STRING,
        allowNull: true
    },
    lugarDeTrabajo:{
        type: DataTypes.STRING,
        allowNull: true
    },
    duracion:{
        type: DataTypes.STRING,
        allowNull: true
    },
    horario:{
        type: DataTypes.STRING,
        allowNull: true
    },
    sueldoBase:{
        type: DataTypes.STRING,
        allowNull: true
    }
},{
    createdAt: false,
    updatedAt: false
});

//relacion Finiquito
Contrato.hasOne(Finiquito);
Finiquito.belongsTo(Contrato);

//relacion anexo
Contrato.hasMany(Anexo);
Anexo.belongsTo(Contrato);

Empresa.hasMany(Contrato);
Contrato.belongsTo(Empresa);

