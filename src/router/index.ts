import { type RequestHandler, Router } from 'express'
import userRouter from './userRouter'
import { createIngredient, deleteIngredient, getIngredient, modifyIngredient } from '../controller/ingController'
import { validateJWT } from '../middleware'
import ingRouter from './ingRouter'
import dishRouter from './dishRouter'

const mainRouter = Router()

mainRouter.use('/user', userRouter)
mainRouter.use('/ing', ingRouter)
mainRouter.use('/dish', dishRouter)

export default mainRouter
