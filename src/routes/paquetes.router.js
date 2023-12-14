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
    const paquetes = JSON.stringify(dataManager.getDataByLocalidad(localidad), null, 2);

    res.setHeader('Content-Type', 'application/json');
    res.send(paquetes);
})

// Devuelve todos solo un paquete de una localidad
router.get("/:localidad/:id",(req,res)=>{
    const {localidad,id} = req.params
    const paquete = JSON.stringify(dataManager.getPaqueteById(localidad,id), null, 2);

    res.setHeader('Content-Type', 'application/json');
    res.send(paquete);
})

export default router