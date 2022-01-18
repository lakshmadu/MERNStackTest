import * as mongoose from "mongoose";
import { Schema } from "mongoose";
import { IRecipe } from "../models/recipe-model";

export const recipeSchemaOptions: mongoose.SchemaOptions = {
  _id: true,
  id: false,
  timestamps: true,
  skipVersioning: true,
  strict: false,
  discriminatorKey: "id",
  toJSON: {
    getters: true,
    virtuals: true,
    transform: (doc, ret) => {
      delete ret.password;
    },
  },
};

export const recipeSchema = new mongoose.Schema<IRecipe>(
  {
    recipeName: {
      type: Schema.Types.String,
      required: true,
    },
    ingredient: {
      type: Schema.Types.String,
      required: true,
    },
    description: {
      type: Schema.Types.String,
      required: false,
    },
  },
  recipeSchemaOptions
);

const Recipe = mongoose.model<IRecipe>("Recipe", recipeSchema);
export default Recipe;
