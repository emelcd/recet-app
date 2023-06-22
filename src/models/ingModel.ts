import { Schema, model } from 'mongoose'

enum Kind { Protein = 'PROTEIN', Fat = 'FAT', Carb = 'CARB', Veggie = 'VEGGIE', Spice = 'SPICE', Other = 'OTHER' }

interface IIngredient {
  name: string
  kind: Kind
  calories: number
  ownedBy: Schema.Types.ObjectId
}

const ingredientSchema = new Schema<IIngredient>({
  name: { type: String, required: true },
  kind: { type: String, enum: Object.values(Kind) },
  calories: { type: Number },
  ownedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true }
}, {
  toJSON: {
    transform: (doc, ret) => {
      delete ret.__v
    }
  }
})

const Ingredient = model('Ingredient', ingredientSchema)

export default Ingredient
