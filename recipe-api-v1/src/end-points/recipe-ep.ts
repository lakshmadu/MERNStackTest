import { NextFunction, Request, Response } from "express";
import { Types } from "mongoose";
import { RecipeDao } from "../dao/recipe-dao";
import { DRecipe, IRecipe } from "../models/recipe-model";

export namespace RecipeEp {
    export async function addRecipe(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            let requestBody = req.body;
            const data: DRecipe = {
                recipeName: requestBody.recipeName,
                ingredient: requestBody.ingredient,
                description: requestBody.description
            };

            let response: IRecipe = await RecipeDao.addRecipe(data);

            if (response) {
                res.send({ success: true, data: response, message: "Successfully added!" });
            } else {
                res.send({ success: false, data: null, message: "Unsuccessful" });
            }

        } catch (error) {
            res.send({ success: false, data: null, message: "Unsuccessful" });
        };
    }

    export async function deleteRecipe(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            let id = new Types.ObjectId(req.params.id);

            let response: any = await RecipeDao.deleteRecipeById(id);

            if (response) {
                res.send({ success: true, data: null, message: "Successfully deleted!" });
            } else {
                res.send({ success: false, data: null, message: "Unsuccessful" });
            }

        } catch (error) {
            res.send({ success: false, data: null, message: `${error}` });
        };
    }

    export async function getRecipe(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            let id = new Types.ObjectId(req.params.id);

            let response: IRecipe = await RecipeDao.getRecipeById(id);

            if (response) {
                res.send({ success: true, data: response, message: "Success" });
            } else {
                res.send({ success: false, data: null, message: "Recipe not found!" });
            }

        } catch (error) {
            res.send({ success: false, data: null, message: `${error}` });
        };
    }

    export async function getAllRecipe(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {

            let response: IRecipe[] = await RecipeDao.getAllRecipe();

            if (response) {
                res.send({ success: true, data: response, message: "Success" });
            } else {
                res.send({ success: false, data: null, message: "Unsuccessful" });
            }

        } catch (error) {
            res.send({ success: false, data: null, message: `${error}` });
        };
    }

    export async function updateRecipe(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {

            let id = new Types.ObjectId(req.body.id);

            let previousRecipe: IRecipe = await RecipeDao.getRecipeById(id);

            if (previousRecipe) {
                const data: DRecipe = {
                    recipeName: req.body.recipeName != null ? req.body.recipeName : previousRecipe.recipeName,
                    ingredient: req.body.ingredient != null ? req.body.ingredient : previousRecipe.ingredient,
                    description: req.body.description != null ? req.body.description : previousRecipe.description,
                };

                let response: IRecipe[] = await RecipeDao.updateRecipe(data, id);

                if (response) {
                    res.send({ success: true, data: response, message: "Successfully updated!" });
                } else {
                    res.send({ success: false, data: null, message: "Unsuccessful" });
                }
            } else {
                res.send({ success: false, data: null, message: "Recipe not found!" });
            }

        } catch (error) {
            res.send({ success: false, data: null, message: `${error}` });
        };
    }
}