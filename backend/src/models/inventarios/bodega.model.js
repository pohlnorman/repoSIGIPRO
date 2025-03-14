import {DataTypes} from 'sequelize';
import { sequelize } from '../../../database/connection.js';
import { Insumo } from './insumo.model.js';
import { Bodega_insumo } from './bodega_insumo.model.js';

export const Bodega = sequelize.define('bodegas',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre:{
        type: DataTypes.STRING,
        allowNull: false
    },
    responsableId:{
        type: DataTypes.STRING,
        allowNull: false
    },

},{
    createdAt: false,
    updatedAt: false
});

Bodega.belongsToMany(Insumo,{through: Bodega_insumo});
Insumo.belongsToMany(Bodega,{through: Bodega_insumo});
