import { Router } from "express";
import { detailsTribe, getReportTribe } from "../controllers/tribe.controller";

const tribeRouter = Router();       

tribeRouter.get('/:id', detailsTribe)     
tribeRouter.get('/report/:id', getReportTribe)     
    
export default tribeRouter;