import { config } from 'dotenv'
import connectDB from './config/db'
import express, { } from 'express'
import mainRouter from './router'
config()

const MONGO_URI = process.env.MONGO_URI as string

connectDB(MONGO_URI)

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', mainRouter)

app.all('*', (req, res) => {
  return res.json({
    msg: 'Invalid route'
  })
})

app.listen(5000, () => { console.log('Server running on port http://localhost:5000') })
