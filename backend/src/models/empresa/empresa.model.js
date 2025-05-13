import {DataTypes} from 'sequelize';
import { sequelize } from '../../../database/connection.js';
import { Contrato } from '../contratos/contrato.model.js';
import { Bodega } from '../inventarios/bodega.model.js';
import { User } from '../login/users.models.js';

export const Empresa = sequelize.define('empresas',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre:{
        type: DataTypes.STRING,
        allowNull: false
    },
    rut:{
        type: DataTypes.STRING,
        allowNull: false
    },
    nombreFantasia:{
        type: DataTypes.STRING
    },
    telefono:{
        type: DataTypes.STRING
    },
    representanteLegal:{
        type: DataTypes.STRING
    },
    giro:{
        type: DataTypes.STRING
    },
    direccion:{
        type: DataTypes.STRING
    },
    region:{
        type: DataTypes.STRING
    },
    comuna:{
        type: DataTypes.STRING
    },
    email:{
        type: DataTypes.STRING
    }
},{
    createdAt: false,
    updatedAt: false
});

Empresa.hasMany(Bodega);
Bodega.belongsTo(Empresa);

Empresa.hasMany(User, { foreignKey: 'empresaId' });
User.belongsTo(Empresa, { foreignKey: 'empresaId', allowNull: true })

