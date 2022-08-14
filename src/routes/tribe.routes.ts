import { Router } from "express";
import { detailsTribe } from "../controllers/tribe.controller";

const tribeRouter = Router();       

tribeRouter.get('/:id', detailsTribe)     
    
export default tribeRouter;