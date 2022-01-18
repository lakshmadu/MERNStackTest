import { Types } from "mongoose";
import { DRecipe, IRecipe } from "../models/recipe-model";
import Recipe from "../schemas/recipe-schema";

export namespace RecipeDao {
    export async function addRecipe(
        recipe: DRecipe,
    ): Promise<IRecipe> {
        const newRecipe = new Recipe(recipe);
        let recipeData = await newRecipe.save();
        return recipeData;
    }

    export async function deleteRecipeById(
        id: Types.ObjectId,
    ): Promise<any> {
        let data = await Recipe.findByIdAndRemove(id);
        return data;
    }

    export async function getRecipeById(
        id: Types.ObjectId,
    ): Promise<any> {
        const data: any = await Recipe.findOne({ _id: id });
        return data;
    }

    export async function getAllRecipe(
    ): Promise<any> {
        const data: any = await Recipe.find();
        return data;
    }

    export async function updateRecipe(
        dataforUpdate: DRecipe,
        id: Types.ObjectId,
    ): Promise<any> {
        const data: any = await Recipe.findOneAndUpdate(
            { _id: id },
            dataforUpdate,
            {
                new: true,
            }
        );
        return data;
    }
}