import express from 'express';
import { RegisterRoutes } from '../build/routes';
import swaggerUi from 'swagger-ui-express';

export const app = express();

RegisterRoutes(app);

app.use('/docs', swaggerUi.serve, async (_req: express.Request, res: express.Response) => {
  return res.send(
    // @ts-ignore
    swaggerUi.generateHTML(await import('../build/swagger.json')),
  );
});

app.set('port', 3000);
