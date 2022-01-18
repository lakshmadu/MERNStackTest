import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
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
		const resp = await fetch('http://localhost:4000/recipes');
		if (resp.ok) {
			const todos = await resp.json();
			return { todos };
		}
	}
);

// export const addRecipeAsync = createAsyncThunk(
// 	'recipes/addTodoAsync',
// 	async (payload) => {
// 		const resp = await fetch('http://localhost:4000/add-recipe', {//wrong url
// 			method: 'POST',
// 			headers: {
// 				'Content-Type': 'application/json',
// 			},
// 			body: JSON.stringify({ recipe: payload.recipes }),
// 		});

// 		if (resp.ok) {
// 			const todo = await resp.json();
// 			return { todo };
// 		}
// 	}
// );

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

// export const deleteRecipeAsync = createAsyncThunk(
// 	'recipes/deleteTodoAsync',
// 	async (payload) => {
// 		const resp = await fetch(`http://localhost:7000/todos/${payload.id}`, {
// 			method: 'DELETE',
// 		});

// 		if (resp.ok) {
// 			return { id: payload.id };
// 		}
// 	}
// );

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
        deleteRecipe:(state,action)=>{
            return state.filter((recipe)=> recipe.id !== action.payload.id);
        },
    },
    extraReducers:{
        
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