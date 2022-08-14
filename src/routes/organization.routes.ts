import {Router} from 'express'
import { createOrganization, deleteOrganization, getOrganization, updateOrganization } from '../controllers/organization.controller';

const organizationRouter = Router();       

organizationRouter.get('/', getOrganization)    
organizationRouter.post('/', createOrganization)    
organizationRouter.put('/:id', updateOrganization)    
organizationRouter.delete('/:id', deleteOrganization)    
    
export default organizationRouter;