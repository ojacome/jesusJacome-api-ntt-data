import {Router} from 'express'
import { createOrganization } from '../controllers/organization.controller';

const organizationRouter = Router();       

organizationRouter.post('/', createOrganization)    
    
export default organizationRouter;