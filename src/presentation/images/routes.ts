import { Router } from "express";
import { ImageControler } from "./controller";




export class ImageRoutes {



    static get routes(): Router {

        const router = Router();
        const controller = new ImageControler();


        router.get('/:type/:img', controller.getImage);


        return router;

    }
}