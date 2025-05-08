import express from 'express';
import { Empresa } from '../../models/empresa/empresa.model.js';
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

        res.status(201).json({ message: 'Lista de empresas registradas', empresas });
    } catch (error) {
        console.error('Error en FindAll:',error);
        res.status(500).json({ message: 'Error interno del servidor al buscar las empresas' });
    }
})