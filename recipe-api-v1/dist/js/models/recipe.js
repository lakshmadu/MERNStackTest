"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const recipeSchema = new mongoose_1.Schema({
    id: {
        type: Number,
        required: true,
    },
    recipeName: {
        type: String,
        required: true,
    },
    ingredient: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
});
exports.default = (0, mongoose_1.model)("Recipe", recipeSchema);
