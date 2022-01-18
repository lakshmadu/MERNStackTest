import { Document } from "mongoose";

export interface IRecipe extends Document{
    id:number
    recipeName:string
    ingredient:string
    description:string
    
}