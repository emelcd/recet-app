import {RequestHandler, Router} from 'express'
import { validateJWT } from '../middleware'
import * as ingController from '../controller/ingController'

const ingRouter = Router()

ingRouter.post('/', validateJWT as RequestHandler, ingController.createIngredient as RequestHandler)
ingRouter.get('/:id', ingController.getIngredient as RequestHandler)
ingRouter.put('/:id', validateJWT as RequestHandler, ingController.modifyIngredient as RequestHandler)
ingRouter.delete('/:id', validateJWT as RequestHandler, ingController.deleteIngredient as RequestHandler)
ingRouter.get('/', ingController.getAllIngredients as RequestHandler)

export default ingRouter