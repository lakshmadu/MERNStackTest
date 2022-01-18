import { Response,Request } from "express";
import { IRecipe } from "../../types/recipe";
import Recipe from '../../models/recipe'

const getRecipe = async (req: Request, res: Response): Promise<void> => {
    try {
      const recipes: IRecipe[] = await Recipe.find()
      res.status(200).json({ recipes })
    } catch (error) {
      throw error
    }
  }

const addRecipe = async (req: Request, res: Response): Promise<void> => {
  try {
    const body = req.body as Pick<IRecipe, "id" | "recipeName" | "ingredient" | "description">

    const recipe: IRecipe = new Recipe({
      id:body.id,
      recipeName: body.recipeName,
      ingredient: body.ingredient,
      status: body.description,
    })

    const newRecipe: IRecipe = await recipe.save()
    const allRecipes: IRecipe[] = await Recipe.find()

    res
      .status(201)
      .json({ message: "Recipe added", recipe: newRecipe, recipes:allRecipes })
  } catch (error) {
    throw error
  }
}

const updateRecipe = async (req: Request, res: Response): Promise<void> => {
    try {
      const {
        params: { id },
        body,
      } = req
      const updateRecipe: IRecipe | null = await Recipe.findByIdAndUpdate(
        { _id: id },
        body
      )
      const allRecipes: IRecipe[] = await Recipe.find()
      res.status(200).json({
        message: "Recipe updated",
        todo: updateRecipe,
        todos: allRecipes,
      })
    } catch (error) {
      throw error
    }
  }

  const deleteRecipe = async (req: Request, res: Response): Promise<void> => {
    try {
      const deletedRecipe: IRecipe | null = await Recipe.findByIdAndRemove(
        req.params.id
      )
      const allRecipe: IRecipe[] = await Recipe.find()
      res.status(200).json({
        message: "Todo deleted",
        recipe: allRecipe,
        recipes: allRecipe,
      })
    } catch (error) {
      throw error
    }
  }

  export {getRecipe,addRecipe,updateRecipe,deleteRecipe}
  