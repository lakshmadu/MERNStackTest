import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { stat } from "fs";
import React from "react";
import { json } from "stream/consumers";
import { RootState } from "./store";

export interface IRecipe{
    id:string,
    recipeName:string,
    ingredient:string,
    description:string
}

const initialState = [] as IRecipe[];let res = [] as IRecipe[];


export const getRecipeAsync = createAsyncThunk(
	'recipes/getTodosAsync',
	async () => {
		const resp= await fetch('http://localhost:3018/api/public/get/all/recipe');
		let res;
		if (resp.ok) {
			const recipes = await resp.json();
			//res = recipes.data;
			res=recipes.data
			//console.log(res)
			return { res };
			
		}
	}
);

export const addRecipeAsync = createAsyncThunk(
	'recipes/addTodoAsync',
	async (payload:IRecipe) => {
		const resp = await fetch('http://localhost:3018/api/public/add/recipe', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ recipeName:payload.recipeName,ingredient:payload.ingredient,description:payload.description }),
			
		});
		//console.log(payload.recipeName)
		if (resp.ok) {
			const recipe = await resp.json();
			res=recipe.data
			//console.log(res)
			return { res };
		}
	}
);

// export const editRecipeAsync = createAsyncThunk(
// 	'recipes/completeTodoAsync',
// 	async (payload) => {
// 		const resp = await fetch(`http://localhost:7000/todos/${payload.id}`, {
// 			method: 'PATCH',
// 			headers: {
// 				'Content-Type': 'application/json',
// 			},
// 			body: JSON.stringify({ completed: payload.completed }),
// 		});

// 		if (resp.ok) {
// 			const todo = await resp.json();
// 			return { todo };
// 		}
// 	}
// );

export const deleteRecipeAsync = createAsyncThunk(
	'recipes/deleteTodoAsync',
	async (payload:any) => {
		const resp = await fetch(`http://localhost:3018/api/public/delete/recipe/${payload.id}`, {
			method: 'DELETE',
		});

		if (resp.ok) {
			return { id: payload.id };
		}
	}
);

export const recipeSlice = createSlice({
    name:'recipes',
    initialState,
    reducers:{
        addRecipe:(state,action:PayloadAction<IRecipe>)=>{
            const recipe = {
                id: action.payload.id,
                recipeName:action.payload.recipeName,
                ingredient:action.payload.ingredient,
                description:action.payload.description
            };
            state.push(recipe);
        },
		editRecipe:(state,action:PayloadAction<IRecipe>)=>{
			// const selectedRecipe = state.filter((recipe)=> recipe.id === action.payload.id); 
			// const restRecipes = state.filter((recipe)=> recipe.id !== action.payload.id);
			const objIndex = state.findIndex((recipe)=> recipe.id === action.payload.id);
			//console.log(objIndex);
			// selectedRecipe[0].description=action.payload.description;
			// selectedRecipe[0].ingredient=action.payload.ingredient; 
			// selectedRecipe[0].recipeName=action.payload.recipeName;
            // const recipe = {
            //     id: action.payload.id,
            //     recipeName:action.payload.recipeName,
            //     ingredient:action.payload.ingredient,
            //     description:action.payload.description
            // };
            // state.push();
        },
		
        deleteRecipe:(state,action)=>{
            return state.filter((recipe)=> recipe.id !== action.payload.id);
        },
    },
	extraReducers:(builder)=>{
		builder.addCase(getRecipeAsync.fulfilled,(state,action)=>{
			for(var key in action.payload?.res){
				const k = action.payload?.res[key];
				const st = {
					id: k._id,
					recipeName:k.recipeName,
					ingredient:k.ingredient,
					description:k.description
				}
				//console.log(k);
				state.push(st);
			}
			
		})
		.addCase(addRecipeAsync.fulfilled,(state,action)=>{
			var key:any = action.payload?.res;
			var st = {
				id: key._id,
				recipeName:key.recipeName,
				ingredient:key.ingredient,
				description:key.description
			}
			//console.log(key);
			state.push(st)
			

		})
		.addCase(deleteRecipeAsync.fulfilled,(state,action)=>{
			return state.filter((recipe)=> recipe.id !== action.payload?.id);
		});
	}
    
})

export const { addRecipe, deleteRecipe} = recipeSlice.actions;

export default recipeSlice.reducer;