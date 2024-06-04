import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import { Express } from 'express';


const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'API de Web Scraping con Puppeteer',
        version: '1.0.0',
        description: 'API para realizar web scraping utilizando Puppeteer y Express',
      },
    },
    apis: ['src/routes/browser_router.ts'], 
};

const specs = swaggerJSDoc(options);

export const setupSwagger = (app: Express) => {
    app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(specs));
};