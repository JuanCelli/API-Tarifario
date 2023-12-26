import { Router } from "express";
import dataManager from "../managers/DataManager.js";

const router = Router()

// Devuelve todos los paquetes de todas las localidades
router.get("/",(req,res)=>{
    const paquetes = JSON.stringify(dataManager.getData(), null, 2);

    res.setHeader('Content-Type', 'application/json');
    res.send(paquetes);
})

// Devuelve todos los paquetes de una localidad
router.get("/:localidad",(req,res)=>{
    const {localidad} = req.params
    const paquetes = dataManager.getDataByLocalidad(localidad)

    if(paquetes.length==0){
        res.status(404)
        res.send("Localidad no encontrada")
        return
    }

    const paquetesJson = JSON.stringify(paquetes, null, 2);

    res.setHeader('Content-Type', 'application/json');
    res.send(paquetesJson);
})

// Devuelve todos solo un paquete de una localidad
router.get("/:localidad/:id",(req,res)=>{
    const {localidad,id} = req.params
    const paquete = dataManager.getPaqueteById(localidad,id)

    if(paquete.length==0){
        res.status(404)
        res.send("Paquete o localidad no encontrados")
        return
    }

    const paqueteJson = JSON.stringify(paquete, null, 2);

    res.setHeader('Content-Type', 'application/json');
    res.send(paqueteJson);
})

export default router