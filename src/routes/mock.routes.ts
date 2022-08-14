import {Router} from 'express'
import { getStateRepositories } from '../controllers/mock.controller';

const mockRouter = Router();       

    mockRouter.get('/repositories', getStateRepositories)    
    
export default mockRouter;