import express from 'express';
import { Persona } from '../../models/personas/persona.model.js';
import { Contrato } from '../../models/contratos/contrato.model.js';

const router = express.Router();

// ✅ Obtener todas las personas
/* router.get('/personas',async(req,res)=>{
    const listaPersonas = await Persona.findAll()
    res.json(listaPersonas)
}); */

router.get('/personas',async(req,res)=>{
    const listaPersonas = await Persona.findAll({
        include:[
            {
                model:Contrato,
                where: {estado: 1},
                required: false, // ← esto permite incluir personas sin contrato también
                attributes: ['empresaId']
            }
        ]
    })
    res.json(listaPersonas)
});

// ✅ Obtener todas las personas contratadas
router.get('/personas/hired',async(req,res)=>{
    const listaPersonas = await Persona.findAll({
        where:{
            estado: 1
        }
    })
    res.json(listaPersonas)
});

// ✅ Agregar persona
router.post('/persona',async(req,res)=>{
    try {
        const {rut} = req.body;

        // Buscar persona por rut
        const persona = await Persona.findOne({where:{rut}});
        if(persona){
            return res.status(400).json({ mensaje: "Rut ya existe" });
        }

        // Crear nueva persona con estado en 0 (aunque no venga en req.body)
        const nuevaPersona = await Persona.create({
            ...req.body,
            estado: 0, // Sobrescribe o asegura que siempre se guarde como 0
            tieneUsuario: 0 // Sobrescribe o asegura que siempre se guarde como 0
        });
        res.status(201).json(nuevaPersona);
    } catch (error) {
        console.error("Error al crear persona:", error);
        res.status(500).json({ mensaje: "Error del servidor", error: error.message });
    }
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
        //const {nombre, apellido,rut,examenVista} = req.body;

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
        await persona.update({ ...req.body  });

    res.json(persona);
    } catch (error) {
        console.error("Error al actualizar persona:", error);
        res.status(500).json({ mensaje: "Error en el servidor", error: error.message });
    }
});

export default router;