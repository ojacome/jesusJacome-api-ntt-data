import { Router, Request, Response } from "express";
import mockRouter from "./mock.routes";
import organizationRouter from "./organization.routes";

let router = Router();
router.get('/', (req: Request,res: Response) => {
   
    res.status(200).json({
        ok:true,
        mensaje: 'API V1 funcionando correctamente' 
    });

});

router.use('/mock', mockRouter)
router.use('/organization', organizationRouter)

export default router