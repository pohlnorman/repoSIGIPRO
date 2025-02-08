import express from 'express';
import { Persona } from '../../models/personas/persona.model.js';

const router = express.Router();

// ✅ Obtener todas las personas
router.get('/personas',async(req,res)=>{
    const listaPersonas = await Persona.findAll()
    res.json(listaPersonas)
});

// ✅ Obtener todas las personas contratadas
router.get('/personas/contrato',async(req,res)=>{
    const listaPersonas = await Persona.findAll({
        where:{
            estado: 1
        }
    })
    res.json(listaPersonas)
});

// ✅ Agregar persona
router.post('/persona/agregar',async(req,res)=>{
    const {nombre, apellido,rut} = req.body;

    const nuevaPersona = await Persona.create({
        nombre,
        apellido,
        rut,
        estado: 0
    });
    res.status(200).json({ message: 'Persona ingresada exitosamente' });
});

// ✅ Obtener datos de una persona por ID
router.get('/persona/:id',async(req,res)=>{
    try {
        const {id} = req.params;

        // Validar que el ID es un número
        if (isNaN(id)) {
            return res.status(400).json({ mensaje: "ID inválido" });
        }

        // Buscar persona por ID
        const persona = await Persona.findByPk(id);

        if (!persona) {
            return res.status(404).json({ mensaje: "Persona no encontrada" });
        }

        res.json(persona);
    } catch (error) {
        res.status(500).json({ mensaje: "Error en el servidor", error: error.message });
    }
});

// ✅ Actualizar datos de una persona por ID
router.put('/persona/:id',async(req,res)=>{
    try {
        const {id} = req.params;
        const {nombre, apellido,rut} = req.body;

        // Validar que el ID es un número
        if (isNaN(id)) {
            return res.status(400).json({ mensaje: "ID inválido" });
        }

        // Verificar si la persona existe antes de actualizar
        const persona = await Persona.findByPk(id);
        if (!persona) {
            return res.status(404).json({ mensaje: "Persona no encontrada" });
        }

        // Realizar la actualización
        await persona.update({ nombre, apellido, rut });

    res.json({mensaje: "Persona actualizada correctamente", persona});
    } catch (error) {
        res.status(500).json({ mensaje: "Error en el servidor", error: error.message });
    }
});

export default router;