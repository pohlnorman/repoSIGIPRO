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
    }
},{
    createdAt: false,
    updatedAt: false
});

Empresa.hasMany(Bodega);
Bodega.belongsTo(Empresa);

Empresa.hasMany(User, { foreignKey: 'empresaId' });
User.belongsTo(Empresa, { foreignKey: 'empresaId', allowNull: true })

