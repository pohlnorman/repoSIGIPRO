import express from 'express';
import { Persona } from '../../models/personas/persona.model.js';
import { Contrato } from '../../models/contratos/contrato.model.js';
import { Finiquito } from '../../models/contratos/finiquito.model.js';
import { Anexo } from '../../models/contratos/anexo.model.js';

const router = express.Router();

// ✅ Obtener todos los contratos
router.get('/contratos/findAllActive',async(req,res)=>{
    const listaContratos = await Contrato.findAll({
        where: { estado: 1 },
        include: Persona
    });
    res.json(listaContratos)
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
router.post('/persona/:rut/contrato',async(req,res)=>{
    const {fechaInicio} = req.body;

    // Buscar el usuario por rut
    const persona = await Persona.findOne({ where: { rut: req.params.rut} });

    const nuevoContrato = await Contrato.create({
        fechaInicio,
        estado:1,
        personaId: persona.id
    });
    await Persona.update({ estado: 1 },{where: {id: persona.id}});
    res.status(200).json(nuevoContrato);
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
            include:[{model:Persona}]
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
            where: { personaId },include:[{model:Persona}]
        });
        res.json(listaContratos)
    } catch (error) {
        res.status(500).json({ mensaje: "Error en el servidor", error: error.message });
    }
});

// ✅ crear finiquito por id de contrato
router.post('/contrato/:id/finiquito',async(req,res)=>{
    const {id} = req.params;

    const {fechaFiniquito} = req.body;

    // Buscar contrato por ID
    const contrato = await Contrato.findByPk(id);

    const nuevofiniquito = await Finiquito.create({
        fechaFiniquito,
        estado:1,
        contratoId: contrato.id
    });

    await Contrato.update({ estado: 0 },{where: {id: contrato.id}});
    await Persona.update({ estado: 0 }, { where: { id: contrato.personaId } });
    res.status(200).json(nuevofiniquito);
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
    const {id} = req.params;
    const {fechaAnexo} = req.body;

    // Buscar contrato por ID
    const contrato = await Contrato.findByPk(id);

    const nuevoAnexo = await Anexo.create({
        fechaAnexo,
        estado:1,
        contratoId: contrato.id
    });

    res.status(200).json(nuevoAnexo);

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
export default router;