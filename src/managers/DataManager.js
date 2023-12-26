import fs from "fs"
import dirname from '../utils/dirname.js'


class DataManager {
    #pathFile = `${dirname}/src/data/data.json`

    constructor(){
        this.data = this.readFile(this.#pathFile)

        this.localidadesIndex = this.indexadoLocalidades()

        this.paquetesIndex = this.indexadoPaquetes()
    }

    getLocalIndex(){
        return this.localidadesIndex
    }
    getPaquetesIndex(){
        return this.paquetesIndex
    }

    getData(){
        return this.data
    }

    indexadoLocalidades(){
        return this.data.reduce((acc,paquete)=>{
            if(!acc[paquete.codloc]){
                acc[paquete.codloc] = [paquete]
            }else{
                acc[paquete.codloc].push(paquete)
            }
            return acc
        }, {})
    }

    indexadoPaquetes(){
        const localidades = this.getLocalidades()
        let main = {}

        localidades.map((localidad)=>{
            main[localidad.id] = this.getDataByLocalidad(localidad.id).reduce((acc,paquete)=>{
                acc[paquete.cod_cla] = paquete
                return acc
            },{})
        })
        return main
    }

    getDataByLocalidad(codloc){
        if(!this.localidadesIndex[codloc]){
            return []
        }
        return this.localidadesIndex[codloc]
    }

    getPaqueteById(localidad,id){
        if(!this.paquetesIndex[localidad]){
            return []
        }
        if(!this.paquetesIndex[localidad][id]){
            return []
        }
        return this.paquetesIndex[localidad][id]
    }

    getLocalidades(){
        let localidades = []
        this.data.map((paquete)=>{
            if(!localidades.map((localidad)=>localidad.name).includes(paquete.localidad)){
                localidades.push({
                    name: paquete.localidad,
                    id: paquete.codloc
                })
            }
        })
        return localidades.sort()
    }

    getLocalidadById(id){
        const localidades = this.getLocalidades()
        let localidad = localidades.find(localidad=>localidad.id===id)

        if(!localidad){
            localidad = {}
        }
        return localidad
    }

    readFile(){
        if(fs.existsSync(this.#pathFile)){
            try{
                return  JSON.parse(fs.readFileSync(this.#pathFile, "utf-8"))[0]
            }catch{
                return []
            }
        }else{
            return []
        }
    }
}
console.time()
const dataManager = new DataManager()
console.timeEnd()
export default dataManager