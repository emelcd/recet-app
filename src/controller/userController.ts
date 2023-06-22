import { User } from '../models'
import { type Request, type Response } from 'express'
import jwt from 'jsonwebtoken'
import { config } from 'dotenv'
import bcrypt from 'bcrypt'

config()
const JWT_SECRET = process.env.JWT_SECRET as string

const createUser = async (req: Request, res: Response): Promise<Response> => {
  const { email, password } = req.body
  const userExists = await User.findOne({ email })

  if (userExists != null) {
    return res.status(400).json({ error: 'User already exists.' })
  }
  const user = new User({ email, password: bcrypt.hashSync(password, 10) })
  const isValid = user.validateSync()
  if (isValid != null) {
    return res.status(400).json({ error: 'Invalid user.', msg: isValid })
  }

  await user.save()
  if (user == null) {
    return res.status(500).json({ error: 'Error creating user.' })
  }

  const token = jwt.sign({ email: user.email, id: user._id }, JWT_SECRET, { expiresIn: '1d' })

  return res.status(201).json({ token })
}

const logIn = async (req: Request, res: Response): Promise<Response> => {
  const { email, password } = req.body

  const userExists = await User.findOne({ email })
  if (userExists == null) {
    return res.status(400).json({ error: 'User does not exist.' })
  }

  const isValid = bcrypt.compareSync(password, userExists.password)

  if (!isValid) {
    return res.status(400).json({ error: 'Invalid password.' })
  }

  const token = jwt.sign({ email: userExists.email, id: userExists._id }, JWT_SECRET, { expiresIn: '1d' })
  return res.status(200).json({ token })
}

export { createUser, logIn }
