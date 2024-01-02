import express, { urlencoded } from "express"
import cors from "cors"
const app=express()

app.use(cors())
app.use(express.json())
app.use(urlencoded({extended:true}))


import noteRouter from "./src/routes/notes.routes.js"

app.use('/api/v1/notes',noteRouter)

export default app