import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteRecipe } from '../../redux/recipeSlice';

import 'antd/dist/antd.css';
//import { Button } from 'antd';
import { DeleteFilled, EditFilled} from '@ant-design/icons';
import '../../CSS/rootcss/recipeitem.css';

export interface IRecipe{
    id:Date,
    recipeName:string,
    ingredient:string,
    description:string
}

const RecipeItem: React.FC<IRecipe> = ({id,recipeName,ingredient,description }) => {

    const dispatch = useDispatch();

    const handleDeleteClick = () =>{
		dispatch(deleteRecipe({id}));
	};

    return (
        <>
      
        <li className='recipeitem-none'>
            
            <div className='recipeitem-div-main'>
                
                <label>{recipeName}</label>
                {/* <label>{ingredient}</label>
                <label>{description}</label> */}
                
                
                <DeleteFilled className='recipeitem-div-main-icon-delete' onClick={handleDeleteClick} />
                <EditFilled className='recipeitem-div-main-icon-edit'/>
            </div>
        </li>
        
            
        </>
    );
};

export default RecipeItem;
