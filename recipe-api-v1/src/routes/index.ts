import {Express, Request, Response} from "express";
import { initRecipeRoutes } from "./recipe";

export function initRoutes(app: Express) {
    /* TOP LEVEL */
    app.get('/api', (req: Request, res: Response) => res.send("Recipe App Api"));

    initRecipeRoutes(app);

    /* ALL INVALID REQUESTS */
    app.get('/', (req: Request, res: Response) => res.redirect(301, "/api"));
    app.all('*', (req: Request, res: Response) => res.send("Invalid Route"));
}
