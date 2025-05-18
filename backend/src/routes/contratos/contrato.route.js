import express from 'express';
import { Persona } from '../../models/personas/persona.model.js';
import { Contrato } from '../../models/contratos/contrato.model.js';
import { Finiquito } from '../../models/contratos/finiquito.model.js';
import { Anexo } from '../../models/contratos/anexo.model.js';
import { Empresa } from '../../models/empresa/empresa.model.js';

import { verifyToken } from '../../middleware/auth.middleware.js';

const router = express.Router();

// ✅ Obtener todos los contratos
router.get('/contratos/findAllActive',async(req,res)=>{
    try {
        const listaContratos = await Contrato.findAll({
            where: { estado: 1 },
            include: Persona
        });

        if (!listaContratos) {
            return res.status(404).json({ mensaje: 'No hay contratos activos' });
        }
        res.status(200).json(listaContratos)
    } catch (error) {
        console.error('Error al obtener contratos activos:', error);
        res.status(500).json({ mensaje: 'Error al obtener los contratos', error: error.message });
    }
    
});

// ✅ Obtener datos de una persona por rut
router.get('/persona/findByRut/:rut',async(req,res)=>{
    try {
        const {rut} = req.params;
        
        // Buscar persona por rut
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
router.post('/persona/:rut/contrato', verifyToken,async(req,res)=>{
    try {
        const { rut } = req.params;
        //const {fechaInicio} = req.body;

        // Buscar el usuario por rut
        const persona = await Persona.findOne({ where: { rut } });
        //const persona = await Persona.findOne({ where: { rut: req.params.rut} });

        if (!persona) {
            return res.status(404).json({ mensaje: "Persona no encontrada" });
        }

        // Obtener empresaId desde el usuario logeado
        const body ={...req.body}

        if (!body.empresaId) {
            return res.status(400).json({ mensaje: "El contrato no tiene una empresa asociada" });
        }

        // Crear nuevo contrato, agregando personaId y estado: 1
        const nuevoContrato = await Contrato.create({
            ...req.body,
            estado:1,
            personaId: persona.id,
        });
        // Actualizar estado de la persona a 1
        await persona.update({ estado: 1 });
        //await Persona.update({ estado: 1 },{where: {id: persona.id}});

        console.log('persona contratada correctamente: ',nuevoContrato)
        res.status(201).json(nuevoContrato);
    } catch (error) {
        console.error("Error al crear contrato:", error);
        res.status(500).json({ mensaje: "Error del servidor", error: error.message });
    }
});

// ✅ Obtener contrato por id
router.get('/contrato/:id',async(req,res)=>{
    try {
        const {id} = req.params;

        // Validar que el ID es un número
        if (isNaN(id)) {
            return res.status(400).json({ mensaje: "ID inválido" });
        }

        // Buscar persona por ID
        const contrato = await Contrato.findByPk(id,{
            include:[{model:Persona},{model:Empresa}]
        });

        if (!contrato) {
            return res.status(404).json({ mensaje: "Contrato no encontrado" });
        }

        res.json(contrato);
    } catch (error) {
        res.status(500).json({ mensaje: "Error en el servidor", error: error.message });
    }
});

// ✅ Obtener todos los contrato de una persona
router.get('/allContract/:personaId',async(req,res)=>{
    try {
        const {personaId} = req.params;

        const listaContratos = await Contrato.findAll({
            where: { personaId },include:[{model:Empresa}]
        });
        res.json(listaContratos)
    } catch (error) {
        res.status(500).json({ mensaje: "Error en el servidor", error: error.message });
    }
});

// ✅ crear finiquito por id de contrato
router.post('/contrato/:id/finiquito',async(req,res)=>{
    try {
        const {id} = req.params;

        //const {fechaFiniquito} = req.body;

        // Buscar contrato por ID
        const contrato = await Contrato.findByPk(id);

        if (!contrato) {
            return res.status(404).json({ mensaje: "Contrato no encontrado" });
        }

        // Crear el finiquito
        const nuevofiniquito = await Finiquito.create({
            ...req.body,
            estado:1,
            contratoId: contrato.id
        });

        // Marcar contrato y persona como inactivos
        await contrato.update({ estado: 0 });
        await Persona.update({ estado: 0 }, { where: { id: contrato.personaId } });
        //await Contrato.update({ estado: 0 },{where: {id: contrato.id}});
        
        res.status(201).json(nuevofiniquito);
    } catch (error) {
        console.error("Error al crear finiquito:", error);
        res.status(500).json({ mensaje: "Error en el servidor", error: error.message });
    }
});

// ✅ Obtener finiquito de una persona por id de contrato
router.get('/liquidation/:contratoId',async(req,res)=>{
    try {
        const {contratoId} = req.params;

        const finiquito = await Finiquito.findOne({where:{contratoId},include:[{model:Contrato}]})
        if (!finiquito) {
            return res.status(404).json({ mensaje: "No encontrado" });
        }
        res.json(finiquito)
    } catch (error) {
        res.status(500).json({ mensaje: "Error en el servidor", error: error.message });
    }
});

// ✅ crear anexo por id de contrato
router.post('/contrato/:id/anexo',async(req,res)=>{
    try {
        const {id} = req.params;
        //const {fechaAnexo} = req.body;

        // Buscar contrato por ID
        const contrato = await Contrato.findByPk(id);

        if (!contrato) {
            return res.status(404).json({ mensaje: "Contrato no encontrado" });
        }

        // Crear el anexo, agregando estado y contratoId
        const nuevoAnexo = await Anexo.create({
            ...req.body,
            estado:1,
            contratoId: contrato.id
        });

        res.status(201).json(nuevoAnexo);
    } catch (error) {
        console.error("Error al crear anexo:", error);
        res.status(500).json({ mensaje: "Error en el servidor", error: error.message });
    }

});

// ✅ Obtener todos los anexos de una persona por id de contrato
router.get('/allAnnex/:contratoId',async(req,res)=>{
    try {
        const {contratoId} = req.params;

        const listaAnexos = await Anexo.findAll({
            where: { contratoId },
            include:[{model:Contrato}]
        });
        res.json(listaAnexos)
    } catch (error) {
        res.status(500).json({ mensaje: "Error en el servidor", error: error.message });
    }
});

// ✅ Obtener contrato activo dado un id de persona
router.get('/persona/:personaId/contrato-activo',async(req,res)=>{
    try {
        const {personaId} = req.params;

        const cont = await Contrato.findOne({
            where: { personaId,estado:1 },include:[{model:Persona}]
        });
        if (!cont) {
            return res.status(404).json({ mensaje: "No encontrado" });
        }
        res.json(cont)
    } catch (error) {
        res.status(500).json({ mensaje: "Error en el servidor", error: error.message });
    }
});

// ✅ Obtener contrato activo de una empresa por id de empresa
router.get('/contratos/findAllActive/:empresaId',async(req,res)=>{
    try {
        const {empresaId} = req.params;

        // Validar que empresaId sea un número válido
        if (isNaN(empresaId)) {
            return res.status(400).json({ mensaje: 'ID de empresa inválido' });
        }

        // Buscar contratos activos de la empresa
        const listaContratos = await Contrato.findAll({
        where: { estado: 1,empresaId:empresaId },
        include: Persona
        });

        if (!listaContratos) {
            return res.status(404).json({ mensaje: 'No hay contratos activos para esta empresa' });
        }

        res.status(200).json(listaContratos);

    } catch (error) {
        console.error('Error al obtener contratos activos por empresa:', error);
        res.status(500).json({ mensaje: 'Error al obtener contratos', error: error.message });
    }

    
});

// ✅ Obtener todos los contratos entre una empresa y una persona
router.get('/contratos/empresa/:empresaId/persona/:personaId/allContract',async(req,res)=>{
    try {
        const {empresaId,personaId} = req.params;

        // Validaciones básicas
        if (isNaN(empresaId) || isNaN(personaId)) {
            return res.status(400).json({ mensaje: 'IDs inválidos' });
        }

        const listaContratos = await Contrato.findAll({
            where: { personaId:personaId ,empresaId:empresaId },
            include: Persona
        });

        if (!listaContratos) {
            return res.status(404).json({ mensaje: 'No existen contratos entre esta empresa y persona' });
        }

        res.status(200).json(listaContratos)
    } catch (error) {
        console.error('Error al obtener contratos:', error);
        res.status(500).json({ mensaje: 'Error al obtener contratos', error: error.message });
    }
    
    
});
export default router;