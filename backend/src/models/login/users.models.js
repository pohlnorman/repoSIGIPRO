import {DataTypes} from 'sequelize';
import { sequelize } from '../../../database/connection.js';
import { Rol } from './roles.models.js';
import bcrypt from 'bcryptjs';

export const User = sequelize.define('usuarios',{
    idUser:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    username:{
        type:DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password:{
        type:DataTypes.STRING,
        allowNull: false
    },
    rolId: {
        type: DataTypes.INTEGER
    },
    estado: {
        type: DataTypes.TINYINT
    }
    
}, {
    timestamps: false, // Desactivar createdAt y updatedAt
});
// Un Rol tiene muchos Usuarios
Rol.hasMany(User, { foreignKey: 'rolId' });
// Un Usuario pertenece a un Rol
User.belongsTo(Rol, { foreignKey: 'rolId' });

// Antes de crear el usuario, se encripta la contraseña
User.beforeCreate(async (user) => {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
});