"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const browser_controller_1 = require("../controllers/browser_controller");
exports.router = (0, express_1.Router)();
/**
 * @swagger
 * /get/by/atribute:
 *   get:
 *     summary: Obtiene todos los textos de los elementos que coinciden con el selector CSS proporcionado.
 *     parameters:
 *       - in: query
 *         name: url
 *         schema:
 *           type: string
 *         required: true
 *         description: URL de la página web.
 *       - in: query
 *         name: selector
 *         schema:
 *           type: string
 *         required: true
 *         description: Selector CSS para los elementos deseados.
 *     responses:
 *       200:
 *         description: Lista de textos encontrados.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 */
exports.router.get("/get/by/atribute", browser_controller_1.BrowserController.GetAtribute);
/**
 * @swagger
 * /get/by/title:
 *   get:
 *     summary: Busca elementos cuyo texto coincida exactamente con el título proporcionado.
 *     parameters:
 *       - in: query
 *         name: url
 *         schema:
 *           type: string
 *         required: true
 *         description: URL de la página web.
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         required: true
 *         description: Texto exacto a buscar.
 *     responses:
 *       200:
 *         description: Elementos encontrados con su texto, ID y clase.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   text:
 *                     type: string
 *                   id:
 *                     type: string
 *                   class:
 *                     type: string
 */
exports.router.get("/get/by/title/", browser_controller_1.BrowserController.FindByTitle);
/**
 * @swagger
 * /screenshot:
 *   get:
 *     summary: Toma una captura de pantalla de la página web especificada.
 *     parameters:
 *       - in: query
 *         name: url
 *         schema:
 *           type: string
 *         required: true
 *         description: URL de la página web.
 *     responses:
 *       200:
 *         description: Captura de pantalla en formato de imagen.
 *         content:
 *           image/png:
 *             schema:
 *               type: string
 *               format: binary
 */
exports.router.get("/screenshot/", browser_controller_1.BrowserController.CaptureScreenshots);
