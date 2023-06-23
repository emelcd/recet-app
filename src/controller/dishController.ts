import Dish from '../models/dishModel'
import { type Request, type Response } from 'express'

const createDish = async (req: Request, res: Response): Promise<Response> => {
  const { name, ingredients } = req.body
  const ownedBy = req.body.owner.id
  const dish = new Dish({ name, ingredients, ownedBy })
  // validate
  const isValid = dish.validateSync()
  if (isValid != null) {
    return res.status(400).json({ error: 'Invalid ingredient.', msg: isValid })
  }
  // save
  const savedDish = await dish.save()
  if (dish == null) {
    return res.status(500).json({ error: 'Error creating ingredient.' })
  }
  const computedDish = await savedDish.populate('ingredients.ingredient')
  let totalKcal = 0
  computedDish.ingredients.forEach((i) => {
    // @ts-ignore
    totalKcal += i.ingredient.calories * i.qty
  })
  computedDish.totalKcal = totalKcal

  return res.status(201).json({ dish: computedDish })
}

const getDish = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params
  const dish = await Dish.findById(id).populate('ingredients.ingredient')
  if (dish == null) {
    return res.status(404).json({ error: 'Dish not found.' })
  }

  return res.status(200).json({ dish })
}

const modifyDish = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params
  const { name, ingredients } = req.body
  const dish = await Dish.findByIdAndUpdate(id, { name, ingredients }, { new: true })
  if (dish == null) {
    return res.status(404).json({ error: 'Dish not Updated.' })
  }
  const updatedDish = await Dish.findById(id).populate('ingredients.ingredient')
  return res.status(200).json({ dish: updatedDish })
}

const deleteDish = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params
  const dish = await Dish.findByIdAndDelete(id)
  if (dish == null) {
    return res.status(404).json({ error: 'Dish not deleted.' })
  }
  return res.status(200).json({
    msg: 'Dish deleted.',
    dish
  })
}

export { createDish, getDish, modifyDish , deleteDish }
