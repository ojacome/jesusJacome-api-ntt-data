import {Router} from 'express'
import { createOrganization, getOrganization } from '../controllers/organization.controller';

const organizationRouter = Router();       

organizationRouter.get('/', getOrganization)    
organizationRouter.post('/', createOrganization)    
    
export default organizationRouter;