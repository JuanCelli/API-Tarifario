import express from "express"
import paquetesRouter from './src/routes/paquetes.router.js'
import localiadesRouter from './src/routes/localidades.router.js'

const PORT = 8080
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.use("/paquetes",paquetesRouter)
app.use("/localidades",localiadesRouter)

app.listen(PORT,()=>{
    console.log(`Servidor escuchando en puerto ${PORT}`)
})