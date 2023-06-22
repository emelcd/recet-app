import { Schema, model } from 'mongoose'

interface IQty {
  ingredient: Schema.Types.ObjectId
  qty: number
}

interface IDish {
  name: string
  ingredients: IQty[]
  ownedBy: Schema.Types.ObjectId
  totalKcal: number
}

const dishSchema = new Schema<IDish>({
  name: { type: String, required: true },
  ingredients: [{
    ingredient: { type: Schema.Types.ObjectId, ref: 'Ingredient', required: true },
    qty: { type: Number }
  }],
  ownedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  totalKcal: { type: Number , default: 0 }
}, {
  toJSON: {
    transform: (doc, ret) => {
      delete ret.__v
    }
  }
})

const Dish = model('Dish', dishSchema)

export default Dish
