import { Request, Response } from 'express';
import puppeteer from 'puppeteer';

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
}

