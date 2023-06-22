import { Router, RequestHandler } from 'express'
import * as dishController from '../controller/dishController'
import { validateJWT } from '../middleware'

const dishRouter = Router()

dishRouter.post('/', validateJWT as RequestHandler, dishController.createDish as RequestHandler)
dishRouter.get('/:id', dishController.getDish as RequestHandler)
dishRouter.put('/:id', validateJWT as RequestHandler, dishController.modifyDish as RequestHandler)
dishRouter.delete('/:id', validateJWT as RequestHandler, dishController.deleteDish as RequestHandler)

export default dishRouter
