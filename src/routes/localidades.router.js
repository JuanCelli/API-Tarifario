import { Router } from "express";
import dataManager from "../managers/DataManager.js";

const router = Router()
router.get("/",(req,res)=>{
    const localidades = JSON.stringify(dataManager.getLocalidades(), null, 2);

    res.setHeader('Content-Type', 'application/json');
    res.send(localidades);
})

router.get("/:id",(req,res)=>{
    const {id} = req.params
    console.log(dataManager.getLocalidadById(id))
    const localidades = JSON.stringify(dataManager.getLocalidadById(id), null, 2);

    res.setHeader('Content-Type', 'application/json');
    res.send(localidades);
})

export default router