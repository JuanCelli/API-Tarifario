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
    const arrayLocalidades = dataManager.getLocalidadById(id)

    if(Object.keys(arrayLocalidades).length==0){
        res.status(404)
        res.send("Localidad no encontrada")
        return
    }
    const localidades = JSON.stringify(arrayLocalidades, null, 2);

    res.setHeader('Content-Type', 'application/json');
    res.send(localidades);
})

export default router