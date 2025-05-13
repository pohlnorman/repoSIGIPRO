import express from 'express';
import { Empresa } from '../../models/empresa/empresa.model.js';
import { User} from '../../models/login/users.models.js';
import { verifyToken, authorizeRoles } from '../../middleware/auth.middleware.js';


const router = express.Router();

export default router;

// --- Rutas Públicas ---
// POST /empresa/register
router.post('/register',verifyToken, async (req, res) =>{
    const {nombre, rut} = req.body

    // Buscar empresa por rut
    const empresa = await Empresa.findOne({where:{rut}});
    if (empresa) {
        return res.status(400).json({ message: 'Empresa ya registrada' });
    };
    // Crear nueva empresa
    const nuevaEmpresa = await Empresa.create({nombre, rut});
    return res.status(201).json({ message: 'Empresa creada con éxito' });
})

router.get('/findAll', verifyToken, authorizeRoles(1),async (req, res) => {
    try {
        const empresas = await Empresa.findAll();

        res.status(201).json( empresas );
    } catch (error) {
        console.error('Error en FindAll:',error);
        res.status(500).json({ message: 'Error interno del servidor al buscar las empresas' });
    }
})

//buscar empresa por id
router.get('/:id',verifyToken, authorizeRoles(1,2),async(req,res)=>{
    try {
        const {id} = req.params;

        // Validar que el ID es un número
        if (isNaN(id)) {
            return res.status(400).json({ mensaje: "ID inválido" });
        }

        // Buscar empresa por ID
        const empresa = await Empresa.findByPk(id);

        if (!empresa) {
            return res.status(404).json({ mensaje: "Empresa no encontrada" });
        }

        res.json(empresa);
    } catch (error) {
        res.status(500).json({ mensaje: "Error en el servidor", error: error.message });
    }
});

//buscar cuentas usuario de empresa por rut de la empresa
router.get('/accountByCompany/:rut',verifyToken, authorizeRoles(1),async(req,res) => {
    try {
        const {rut} = req.params;

        // Buscar empresa por rut
        const empresa = await Empresa.findAll({
            where:{rut},
            attributes:['id','nombre','rut'],
            include:[{
                model:User,
                attributes: {exclude:['password','personaId']}
            }]
        });

        if (!empresa) {
            return res.status(404).json({ mensaje: "Empresa no encontrada" });
        }
        console.log('Empresa encontrada')

        res.json(empresa);

    } catch (error) {
        res.status(500).json({ mensaje: "Error en el servidor", error: error.message });
    }
});