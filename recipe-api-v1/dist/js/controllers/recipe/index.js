"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRecipe = exports.updateRecipe = exports.addRecipe = exports.getRecipe = void 0;
const recipe_1 = __importDefault(require("../../models/recipe"));
const getRecipe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const recipes = yield recipe_1.default.find();
        res.status(200).json({ recipes });
    }
    catch (error) {
        throw error;
    }
});
exports.getRecipe = getRecipe;
const addRecipe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const recipe = new recipe_1.default({
            id: body.id,
            recipeName: body.recipeName,
            ingredient: body.ingredient,
            status: body.description,
        });
        const newRecipe = yield recipe.save();
        const allRecipes = yield recipe_1.default.find();
        res
            .status(201)
            .json({ message: "Recipe added", recipe: newRecipe, recipes: allRecipes });
    }
    catch (error) {
        throw error;
    }
});
exports.addRecipe = addRecipe;
const updateRecipe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { params: { id }, body, } = req;
        const updateRecipe = yield recipe_1.default.findByIdAndUpdate({ _id: id }, body);
        const allRecipes = yield recipe_1.default.find();
        res.status(200).json({
            message: "Recipe updated",
            todo: updateRecipe,
            todos: allRecipes,
        });
    }
    catch (error) {
        throw error;
    }
});
exports.updateRecipe = updateRecipe;
const deleteRecipe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedRecipe = yield recipe_1.default.findByIdAndRemove(req.params.id);
        const allRecipe = yield recipe_1.default.find();
        res.status(200).json({
            message: "Todo deleted",
            recipe: allRecipe,
            recipes: allRecipe,
        });
    }
    catch (error) {
        throw error;
    }
});
exports.deleteRecipe = deleteRecipe;
