import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import RecipeItem from './RecipeItem';
import '../../CSS/rootcss/recipelist.css'
import { getRecipeAsync, IRecipe } from '../../redux/recipeSlice';


const RecipeList = () => {
    const dispatch = useDispatch();
    const recipes = useSelector((state:RootState) => state.recipes);

    React.useEffect(() => {
		dispatch(getRecipeAsync());
	}, [dispatch]);

    return (
        <div className='recipelist-div'>
            <ul>
                {recipes.map((recipe:IRecipe)=>(
                    
                    <RecipeItem key={recipe.id} id={recipe.id} recipeName={recipe.recipeName} ingredient={recipe.ingredient} description={recipe.description} />
                ))}
            </ul>
        </div>
        
    );
};

export default RecipeList;
