import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import RecipeItem from './RecipeItem';
import '../../CSS/rootcss/recipelist.css'
import { IRecipe } from '../../redux/recipeSlice';


const RecipeList = () => {

    const recipes = useSelector((state:RootState) => state.recipes);

    return (
        <div className='recipelist-div'>
            <ul>
                {recipes.map((recipe:IRecipe)=>(
                    <RecipeItem id={recipe.id} recipeName={recipe.recipeName} ingredient={recipe.ingredient} description={recipe.description} />
                ))}
            </ul>
        </div>
        
    );
};

export default RecipeList;
