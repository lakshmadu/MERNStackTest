import { Express } from "express";
import { RecipeEp } from "../end-points/recipe-ep";

export function initRecipeRoutes(app: Express) {

    app.post(
        "/api/public/add/recipe",
        RecipeEp.addRecipe
    );

    app.delete(
        "/api/public/delete/recipe/:id",
        RecipeEp.deleteRecipe
    );

    app.get(
        "/api/public/get/recipe/by/:id",
        RecipeEp.getRecipe
    );

    app.get(
        "/api/public/get/all/recipe",
        RecipeEp.getAllRecipe
    );

    app.put(
        "/api/public/update/recipe",
        RecipeEp.updateRecipe
    );
}
