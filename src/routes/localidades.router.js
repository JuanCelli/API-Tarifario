import { Router } from "express";
import dataManager from "../managers/DataManager.js";

const router = Router()
router.get("/",(req,res)=>{
    const localidades = JSON.stringify(dataManager.getLocalidades(), null, 2);

    res.setHeader('Content-Type', 'application/json');
    res.send(localidades);
})

export default router