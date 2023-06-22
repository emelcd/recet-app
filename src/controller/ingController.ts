import Ingredient from '../models/ingModel'
import { type Request, type Response } from 'express'

const createIngredient = async (req: Request, res: Response): Promise<Response> => {
  const { owner, name } = req.body
  const ingredientExists = await Ingredient.findOne({ name })

  if (ingredientExists != null) {
    return res.status(400).json({ error: 'Ingredient already exists.' })
  }
  const ingredient = new Ingredient({ ...req.body, ownedBy: owner.id })
  const isValid = ingredient.validateSync()
  if (isValid != null) {
    return res.status(400).json({ error: 'Invalid ingredient.', msg: isValid })
  }

  await ingredient.save()
  if (ingredient == null) {
    return res.status(500).json({ error: 'Error creating ingredient.' })
  }

  return res.status(201).json({ ingredient })
}

const getIngredient = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params
  const ingredient = await Ingredient.findById(id)
  if (ingredient == null) {
    return res.status(404).json({ error: 'Ingredient not found.' })
  }
  return res.status(200).json({ ingredient })
}

const modifyIngredient = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params
  const owner = req.body.owner.id
  const data = {
    ...req.body,
    ownedBy: owner
  }
  const ingredient = await Ingredient.findById(id)
  if (ingredient == null) {
    return res.status(404).json({ error: 'Ingredient not found.' })
  }
  const isValid = new Ingredient(data).validateSync()
  if (isValid != null) {
    return res.status(400).json({ error: 'Invalid ingredient.', msg: isValid })
  }
  const updateIngredient = await Ingredient.findByIdAndUpdate(id, data, { new: true })
  if (updateIngredient == null) {
    return res.status(500).json({ error: 'Error updating ingredient.' })
  }
  return res.status(200).json(await Ingredient.findById(id))
}

const deleteIngredient = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params
  const owner = req.body.owner.id
  const ingredient = await Ingredient.findById(id)
  if (ingredient == null) {
    return res.status(404).json({ error: 'Ingredient not found.' })
  }
  if (String(ingredient.ownedBy) !== String(owner)) {
    return res.status(401).json({ error: 'Unauthorized.' })
  }
  await Ingredient.findByIdAndDelete(id)
  return res.status(200).json({ ingredient })
}

const getAllIngredients = async (req: Request, res: Response): Promise<Response> => {
  const ingredients = await Ingredient.find()
  return res.status(200).json({ ingredients })
}

export { createIngredient, getIngredient, modifyIngredient, deleteIngredient, getAllIngredients}
