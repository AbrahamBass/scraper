"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const browser_router_1 = require("./routes/browser_router");
const swagger_1 = require("./routes/swagger");
const app = (0, express_1.default)();
const PORT = 8000;
app.use(browser_router_1.router);
app.listen(PORT, () => (0, swagger_1.setupSwagger)(app));
