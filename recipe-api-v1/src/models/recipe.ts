import { IRecipe } from '../types/recipe';
import { model,Schema } from 'mongoose';

const recipeSchema: Schema = new Schema(
    {
        id:{
            type:Number,
            required:true,
        },

        recipeName:{
            type:String,
            required:true,
        },

        ingredient:{
            type:String,
            required:true,
        },

        description:{
            type:String,
            required:true,
        },
    }
)

export default model<IRecipe>("Recipe",recipeSchema);