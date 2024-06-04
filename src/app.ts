import express from "express"
import { router } from "./routes/browser_router"
import { setupSwagger } from "./routes/swagger"

const app = express()
const PORT = 8000

app.use(router)

app.listen(PORT, () => setupSwagger(app))