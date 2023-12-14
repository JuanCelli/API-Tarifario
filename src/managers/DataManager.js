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
            if(!acc[paquete.localidad]){
                acc[paquete.localidad] = [paquete]
            }else{
                acc[paquete.localidad].push(paquete)
            }
            return acc
        }, {})
    }

    indexadoPaquetes(){
        const localidades = this.getLocalidades()
        let main = {}

        localidades.map((localidad)=>{
            main[localidad] = this.getDataByLocalidad(localidad).reduce((acc,paquete)=>{
                acc[paquete.cod_cla] = paquete
                return acc
            },{})
        })
        return main
    }

    getDataByLocalidad(localidad){
        if(!this.localidadesIndex[localidad]){
            return []
        }
        return this.localidadesIndex[localidad]
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
            if(!localidades.includes(paquete.localidad)){
                localidades.push(paquete.localidad)
            }
        })
        return localidades.sort()
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