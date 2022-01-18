import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteRecipe, IRecipe } from '../../redux/recipeSlice';

import 'antd/dist/antd.css';
//import { Button } from 'antd';
import { DeleteFilled, EditFilled} from '@ant-design/icons';
import '../../CSS/rootcss/recipeitem.css';
import { AppDispatch } from '../../redux/store';
import EditRecipe from './EditRecipe';



const RecipeItem: React.FC<IRecipe> = ({id,recipeName,ingredient,description }) => {

    const dispatch:AppDispatch = useDispatch();

    const [visibleEdit,setVisibleEdit] = React.useState(false);

    

    const handleDeleteClick = () =>{
		dispatch(deleteRecipe({id}));
	};

    const editPage = ()=>{
        setVisibleEdit(true);
    }

    return (
        <>
      
        <li className='recipeitem-none'>
            
            <div className='recipeitem-div-main'>
                
                <label>{recipeName}</label>
                {/* <label>{ingredient}</label>
                <label>{description}</label> */}
                
                
                <DeleteFilled className='recipeitem-div-main-icon-delete' onClick={handleDeleteClick} />
                <EditFilled className='recipeitem-div-main-icon-edit' onClick={editPage} />
            </div>
        </li>
        
        {}
            {/* <EditRecipe id={id} recipeName={recipeName} ingredient={ingredient} description={description} handleModal={visibleEdit}/> */}
        
            
        </>
    );
};

export default RecipeItem;
