import { model, Schema } from 'mongoose'

interface IUser {
  email: string
  password: string
  isAdmin: boolean
}

const userSchema = new Schema<IUser>({
  email: { type: String, required: true },
  password: { type: String, required: true, minlength: 8 },
  isAdmin: { type: Boolean, default: false, required: true }
}, {
  toJSON: {
    transform: (doc, ret) => {
    }
  }
})

const User = model('User', userSchema)

export default User
