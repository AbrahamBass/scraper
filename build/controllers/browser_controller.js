"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrowserController = void 0;
const puppeteer_1 = __importDefault(require("puppeteer"));
const uuid_1 = require("uuid");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const screenshotsDir = path_1.default.join(__dirname, '../screenshots');
class BrowserController {
    static GetAtribute(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { url, selector } = req.query;
                if (!url || !selector)
                    throw new Error('The "url" and "selector" parameters are required');
                const browser = yield puppeteer_1.default.launch({
                    headless: false
                });
                const page = yield browser.newPage();
                yield page.goto(url.toString());
                const elements = yield page.$$eval(selector.toString(), elements => {
                    return elements.map(element => element.textContent);
                });
                yield browser.close();
                if (!elements.length)
                    throw new Error('No elements found with that selector');
                res.send(elements);
            }
            catch (error) {
                res.status(404).send(error.message);
            }
        });
    }
    static FindByTitle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { url, title } = req.query;
                if (!url || !title)
                    throw new Error('The "url" and "title" parameters are required');
                const browser = yield puppeteer_1.default.launch({
                    headless: false
                });
                const page = yield browser.newPage();
                yield page.goto(url.toString());
                const elementos = yield page.$$eval('*', (elements, texto) => {
                    return elements
                        .filter(element => { var _a; return ((_a = element.textContent) === null || _a === void 0 ? void 0 : _a.trim()) === texto.toString(); })
                        .map(element => { var _a; return (_a = element.textContent) === null || _a === void 0 ? void 0 : _a.trim(); });
                }, title);
                yield browser.close();
                res.send(elementos);
            }
            catch (error) {
                res.status(404).send(error.message);
            }
        });
    }
    static CaptureScreenshots(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { url } = req.query;
                if (!url)
                    throw new Error('The "url" parameters are required');
                fs_1.default.readdir(screenshotsDir, (err, files) => {
                    if (err) {
                        return;
                    }
                    files.forEach(file => {
                        const filePath = path_1.default.join(screenshotsDir, file);
                        fs_1.default.unlink(filePath, err => {
                            if (err) {
                                return;
                            }
                        });
                    });
                });
                const browser = yield puppeteer_1.default.launch({
                    headless: false
                });
                const page = yield browser.newPage();
                yield page.goto(url.toString());
                const imagePath = path_1.default.join(__dirname, `../screenshots/${(0, uuid_1.v4)()}.png`);
                yield page.screenshot({ path: imagePath });
                yield browser.close();
                res.sendFile(imagePath);
            }
            catch (error) {
                res.status(404).send(error.message);
            }
        });
    }
}
exports.BrowserController = BrowserController;
