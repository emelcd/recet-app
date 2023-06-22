import { type Request, type Response, type NextFunction } from 'express'
import { config } from 'dotenv'
import jwt from 'jsonwebtoken'

config()

const JWT_SECRET = process.env.JWT_SECRET as string

// eslint-disable-next-line @typescript-eslint/no-invalid-void-type
const validateJWT = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  const token = req.headers.authorization?.split(' ')[1]
  if (token == null) {
    return res.status(401).json({ error: 'Unauthorized.' })
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    req.body.owner = decoded
    next()
  } catch (err) {
    return res.status(401).json({ error: 'Unauthorized.' })
  }
}

export { validateJWT }
