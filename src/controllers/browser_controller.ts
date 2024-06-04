import { Request, Response } from 'express';
import puppeteer from 'puppeteer';
import { v4 as uuidv4 } from 'uuid';
import path from 'path'
import fs from 'fs'

const screenshotsDir = path.join(__dirname, '../screenshots');

export class BrowserController {
    static async GetAtribute(req: Request, res: Response){
        try {

            const { url, selector } = req.query;

            if (!url || !selector) throw new Error('The "url" and "selector" parameters are required');

            const browser = await puppeteer.launch({
                headless: false
            })
            const page = await browser.newPage()
    
            await page.goto(url.toString())
    
            const elements = await page.$$eval(selector.toString(),elements => {
                return  elements.map(element => element.textContent)
            })
    
            await browser.close()

            if(!elements.length) throw new Error('No elements found with that selector');
    
            res.send(elements)
        } catch (error) {
            res.status(404).send(error.message);
        }
    }

    static async FindByTitle(req: Request, res: Response) {
        try {

            const { url, title } = req.query;

            if (!url || !title) throw new Error('The "url" and "title" parameters are required');

            const browser = await puppeteer.launch({
                headless: false
            })
            const page = await browser.newPage()
    
            await page.goto(url.toString())
    
            const elementos = await page.$$eval('*', (elements, texto) => {
                return elements
                    .filter(element => element.textContent?.trim() === texto.toString())
                    .map(element => element.textContent?.trim());
            }, title);

            await browser.close()

            res.send(elementos)

        } catch (error) {
            res.status(404).send(error.message);
        }
    }

    static async CaptureScreenshots(req: Request, res: Response) {
        try {

            const { url } = req.query;

            if (!url) throw new Error('The "url" parameters are required');

            fs.readdir(screenshotsDir, (err, files) => {
                if (err) {
                    return;
                }
                files.forEach(file => {
                  const filePath = path.join(screenshotsDir, file);
                  fs.unlink(filePath, err => {
                    if (err) {
                        return;
                    }
                  });
                });
            });

            const browser = await puppeteer.launch({
                headless: false
            })
            const page = await browser.newPage()
    
            await page.goto(url.toString())

            const imagePath = path.join(__dirname, `../screenshots/${uuidv4()}.png`);

            await page.screenshot({path: imagePath})

            await browser.close()

            res.sendFile(imagePath)

        } catch (error) {
            res.status(404).send(error.message);
        } 
    }

}

