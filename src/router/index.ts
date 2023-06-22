import { type RequestHandler, Router } from 'express'
import userRouter from './userRouter'
import { createIngredient, deleteIngredient, getIngredient, modifyIngredient } from '../controller/ingController'
import { validateJWT } from '../middleware'

const mainRouter = Router()

mainRouter.use('/user', userRouter)
mainRouter.post('/ingredient', validateJWT as RequestHandler, createIngredient as RequestHandler)
mainRouter.get('/ingredient/:id', getIngredient as RequestHandler)
mainRouter.put('/ingredient/:id', validateJWT as RequestHandler, modifyIngredient as RequestHandler)
mainRouter.delete('/ingredient/:id', validateJWT as RequestHandler, deleteIngredient as RequestHandler)

export default mainRouter
