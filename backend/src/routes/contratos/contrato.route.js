import express from 'express';
import { Persona } from '../../models/personas/persona.model.js';
import { Contrato } from '../../models/contratos/contrato.model.js';

const router = express.Router();

// ✅ Obtener todos los contratos
router.get('/contratos',async(req,res)=>{
    const listaContratos = await Contrato.findAll({include: Persona})
    res.json(listaContratos)
});

// ✅ Obtener datos de una persona por rut
router.get('/persona/contratar/:rut',async(req,res)=>{
    try {
        const {rut} = req.params;
        
        // Validar que el ID es un número
        /* if (isNaN(id)) {
            return res.status(400).json({ mensaje: "ID inválido" });
        } */

        // Buscar persona por ID
        const persona = await Persona.findOne({where:{rut}});

        if (!persona) {
            return res.status(404).json({ mensaje: "Persona no encontrada" });
        }

        res.json(persona);
    } catch (error) {
        res.status(500).json({ mensaje: "Error en el servidor", error: error.message });
    }
});

// ✅ Agregar contrato
router.post('/persona/contratar/:rut',async(req,res)=>{
    const {fechaInicio} = req.body;

    // Buscar el usuario por rut
    const persona = await Persona.findOne({ where: { rut: req.params.rut} });

    const nuevoContrato = await Contrato.create({
        fechaInicio,
        idPersona: persona.id
    });
    await Persona.update({ estado: 1 },{where: {id: persona.id}});
    res.status(200).json({ message: 'Contrato creado',nuevoContrato });
});

export default router;