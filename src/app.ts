import express from "express"
import { router } from "./routes/browser_router"

const app = express()
const PORT = 8000

app.use(router)

app.listen(PORT, () => console.log("Servidor abierto"))