import { sequelize } from './connection.js';

import { Persona } from '../src/models/personas/persona.model.js';
import { Empresa } from '../src/models/empresa/empresa.model.js';
import { User } from '../src/models/login/users.models.js';
import { Rol } from '../src/models/login/roles.models.js';

export async function initializeDatabase() {
    try {
        // Sincroniza todos los modelos con la base de datos
        await sequelize.sync({ alter: true });
        console.log("---Tablas sincronizadas---");

         // Verificar si existen empresas antes de insertar
        const empresasCount = await Empresa.count();

        // Insertar empresas
        if (empresasCount === 0) {
            await Empresa.bulkCreate([
                { nombre: 'Air Laja S.p.A.', rut: '77782898-3' }
            ]);
            console.log('Empresa insertada correctamente');
        }else {
            console.log('Empresas ya existen, omitiendo inserción.');
        }

        // Verificar si existen personas antes de insertar
        const personasCount = await Persona.count();

        // Insertar personas
        if (personasCount === 0) {
            await Persona.bulkCreate([
                { nombre: 'Juan', apellido: 'Pérez', rut: '4927669-9', estado: 0, tieneUsuario: 0 },
                { nombre: 'María', apellido: 'González', rut: '14265525-k', estado: 0, tieneUsuario: 0 },
                { nombre: 'Pedro', apellido: 'López', rut: '21295958-8', estado: 0, tieneUsuario: 0 }
            ]);
            console.log('Personas insertadas correctamente.');
            }else {
                console.log('Personas ya existen, omitiendo inserción.');
            }

        // Crear roles y usuario por defecto si no existen
        const adminRoleExists = await Rol.findOne({ where: { name: 'superAdmin' } });
        if (!adminRoleExists) {
            console.log('Creando roles y usuarios por defecto...');
            
            const roles = await Rol.bulkCreate([
                { name: 'SuperAdmin' },
                { name: 'EmpresaAdmin' },
                { name: 'Usuario' }
            ]);

            const empresa = await Empresa.findOne({ where: { rut: '77782898-3' } });

            await User.findOrCreate({
                where: { username: 'super@sigipro.cl' },
                defaults: {
                    password: 'Sigipro1!',
                    rolId: roles[0].idRol,
                    estado: 1,
                    empresaId: null
                }
            });

            console.log("Rol por defecto asegurado.");
        } else {
            console.log('Rol ya existe, omitiendo creación por defecto.');
        }

    } catch (error) {
        console.error('Error al inicializar la base de datos:', error);
    }
}