import {DataTypes} from 'sequelize';
import { sequelize } from '../../../database/connection.js';
import { Bodega } from './bodega.model.js';
import { Insumo } from './insumo.model.js';

export const Bodega_insumo = sequelize.define('bodega_insumos',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
},{
    createdAt: false,
    updatedAt: false
});

