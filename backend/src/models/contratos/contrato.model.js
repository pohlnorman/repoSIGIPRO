import {DataTypes} from 'sequelize';
import { sequelize } from '../../../database/connection.js';
import { Finiquito } from './finiquito.model.js';
import { Anexo } from './anexo.model.js';
import { Bodega } from '../inventarios/bodega.model.js'

export const Contrato = sequelize.define('contratos', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fechaInicio:{
        type: DataTypes.STRING,
    },
    estado:{
        type: DataTypes.TINYINT,
        allowNull: false
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

//relacion bodega
Contrato.hasOne(Bodega);
Bodega.belongsTo(Contrato);

