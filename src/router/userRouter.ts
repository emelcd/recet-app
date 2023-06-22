import { createUser, logIn } from '../controller'
import { Router, type RequestHandler, type Request, type Response } from 'express'
import { validateJWT } from '../middleware'

const userRouter = Router()

userRouter.post('/register', createUser as RequestHandler)
userRouter.post('/login', logIn as RequestHandler)
userRouter.get('/panel', validateJWT as RequestHandler, (req: Request, res: Response) => {
  console.log(req.body)
  res.status(200).json(req.body)
})

export default userRouter
