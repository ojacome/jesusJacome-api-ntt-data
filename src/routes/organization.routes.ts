import {Router} from 'express'
import { createOrganization, getOrganization, updateOrganization } from '../controllers/organization.controller';

const organizationRouter = Router();       

organizationRouter.get('/', getOrganization)    
organizationRouter.post('/', createOrganization)    
organizationRouter.put('/:id', updateOrganization)    
    
export default organizationRouter;