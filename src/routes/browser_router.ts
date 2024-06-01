import { Router } from "express";
import { BrowserController } from "../controllers/browser_controller";

export const router = Router()

router.get("/get/by/atribute", BrowserController.GetAtribute)


