import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { stat } from "fs";
import { RootState } from "./store";

export interface IRecipe{
    id:Date,
    recipeName:string,
    ingredient:string,
    description:string
}

const initialState = [] as IRecipe[];

export const getRecipeAsync = createAsyncThunk(
	'recipes/getTodosAsync',
	async () => {
		const resp= await fetch('http://localhost:4000/recipes');
		if (resp.ok) {
			const recipes = await resp.json();
			return { recipes };
		}
	}
);

export const addRecipeAsync = createAsyncThunk(
	'recipes/addTodoAsync',
	async (payload:IRecipe) => {
		const resp = await fetch('http://localhost:4000/add-recipe', {//wrong url
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ recipe: payload }),
		});

		if (resp.ok) {
			const recipe = await resp.json();
			return { recipe };
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
	async (payload:IRecipe) => {
		const resp = await fetch(`http://localhost:4000/recipe/${payload.id}`, {
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
			console.log(objIndex);
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
    extraReducers:{
        [getRecipeAsync.fulfilled.toString()]:(state:RootState,action:PayloadAction<IRecipe>)=>{
            return action.payload.id;
        },
        [addRecipeAsync.fulfilled.toString()]: (state:RootState, action:PayloadAction<IRecipe>) => {
            state.push(action.payload);
        },
        [deleteRecipeAsync.fulfilled.toString()]: (state:RootState, action:PayloadAction<IRecipe>) => {
			return state.filter((recipe:IRecipe) => recipe.id !== action.payload.id);
		},
    }
    // extraReducers: {
	// 	[getRecipeAsync.fulfilled]: (state:RootState, action:PayloadAction<IRecipe>) => {
	// 		return action.payload.id;
	// 	},
	// 	[addRecipeAsync.fulfilled]: (state:RootState, action:PayloadAction<IRecipe>) => {
	// 		state.push(action.payload.recipes);
	// 	},
		// [toggleCompleteAsync.fulfilled]: (state, action) => {
		// 	const index = state.findIndex(
		// 		(todo) => todo.id === action.payload.todo.id
		// 	);
		// 	state[index].completed = action.payload.todo.completed;
		// },
		// [deleteRecipeAsync.fulfilled]: (state:RootState, action:PayloadAction<IRecipe>) => {
		// 	return state.filter((recipe:IRecipe) => recipe.id !== action.payload.id);
		// },
	//},
})

export const { addRecipe, deleteRecipe} = recipeSlice.actions;

export default recipeSlice.reducer;