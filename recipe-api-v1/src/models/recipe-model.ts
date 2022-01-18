import * as mongoose from "mongoose";
interface CommonAttributes {
    recipeName: string;
    ingredient: string;
    description: string;
}

export interface DRecipe extends CommonAttributes {
}

export interface IRecipe extends CommonAttributes, mongoose.Document { }
