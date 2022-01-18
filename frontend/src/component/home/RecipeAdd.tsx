import React from 'react';
import { useDispatch } from 'react-redux';
import { addRecipe, IRecipe } from '../../redux/recipeSlice';
import { Button, Input,Modal} from 'antd';
import 'antd/dist/antd.css';
import '../../CSS/rootcss/recipeadd.css'



const RecipeAdd = () => {
    const [isModalVisible, setIsModalVisible] = React.useState(false);
    const dispatch = useDispatch();

    const [formvalue, setFormValue] = React.useState({
        id:Number,
        recipeName:"",
        ingredient:"",
        description:""
    });

    const num = 0;


    const handleChange = (event:React.FormEvent<HTMLInputElement>) => {
        setFormValue({
          ...formvalue,
          [event.currentTarget.name]: event.currentTarget.value
        });
      }

    const handleSubmit = () => {
        //event.preventDefault();

        const loginFormData = new FormData();
        loginFormData.append('id',new Date().toISOString());
        loginFormData.append('recipeName',formvalue.recipeName);
        loginFormData.append('ingredient',formvalue.ingredient);
        loginFormData.append('description',formvalue.description);
        console.log(loginFormData);

        let myObj:IRecipe = {
            id:num+1,
            recipeName:formvalue.recipeName,
            ingredient:formvalue.ingredient,
            description:formvalue.description
        }

        dispatch(
            addRecipe(myObj)
        );       
    }
    const clearAllTxt = () => {
        formvalue.recipeName='';
        formvalue.ingredient='';
        formvalue.description='';
    }

    return (
        <>

            <Button className='recipeadd-main-button' onClick={()=>setIsModalVisible(true)}>
                Add Recipe
            </Button>
            <Modal 
            className='recipeadd-modal'
            title="Basic Modal" 
            visible={isModalVisible} 
            onOk={()=>{
                setIsModalVisible(false);
                handleSubmit();
                clearAllTxt();
            }} 
            onCancel={()=>setIsModalVisible(false)}>
                {/* <form onSubmit={} > */}
                    <label >Recipe Name</label>
                    <Input      
                        id='in01'          
                        name='recipeName'
                        placeholder='Add recipe name...'
                        value={formvalue.recipeName}
                        onChange={handleChange}
                        />
                    
                    <label>Ingrdient</label>
                    <Input
                        id='in02'
                        type='text'
                        name='ingredient'
                        placeholder='Add todo...'
                        value={formvalue.ingredient}
                        onChange={handleChange}
                    />
                    
                    <label>Description</label>
                    <Input
                        id='in03'
                        type='text'
                        name='description'
                        placeholder='Add todo...'
                        value={formvalue.description}
                        onChange={handleChange}
                    />
                    

                    {/* <button type='submit' onClick={()=>setIsModalVisible(false)}>
                        Submit
                    </button> */}
                    
                {/* </form> */}
        </Modal>
      </>
        
            
            
        
        
    );
};

export default RecipeAdd;




