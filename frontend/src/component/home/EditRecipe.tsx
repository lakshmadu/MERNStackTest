import { Button, Input, Modal } from 'antd';
import React from 'react';
import { useDispatch } from 'react-redux';
import { idText } from 'typescript';
import { IRecipe } from '../../redux/recipeSlice';



const EditRecipe:React.FC<IRecipe> = ({ id,recipeName,ingredient,description },handleModal:boolean) => {

    const [isModalVisible, setIsModalVisible] = React.useState(false);
    const dispatch = useDispatch();

    const [formvalue, setFormValue] = React.useState({
        id:"",
        recipeName:"",
        ingredient:"",
        description:""
    });

    const handleChange = (event:React.FormEvent<HTMLInputElement>) => {
        setFormValue({
          ...formvalue,
          [event.currentTarget.name]: event.currentTarget.value
        });
      }

      const handleSubmit = () => {
        //event.preventDefault();

    const loginFormData = new FormData();
        //loginFormData.append('id',0);
        loginFormData.append('recipeName',formvalue.recipeName);
        loginFormData.append('ingredient',formvalue.ingredient);
        loginFormData.append('description',formvalue.description);
        //console.log(loginFormData);

        let myObj:IRecipe = {
            id:"",
            recipeName:formvalue.recipeName,
            ingredient:formvalue.ingredient,
            description:formvalue.description
        }

        dispatch(
            EditRecipe(myObj)
        );       
    }
    const clearAllTxt = () => {
        formvalue.recipeName='';
        formvalue.ingredient='';
        formvalue.description='';
    }

    const loadedItem = () =>{
        formvalue.recipeName=recipeName;
        formvalue.ingredient=ingredient;
        formvalue.description=description;
    }

    return (
        <>
            
            <Modal 
            className='recipeadd-modal'
            title="Basic Modal" 
            visible={handleModal} 
            onOk={()=>{
                setIsModalVisible(false);
                handleSubmit();
                clearAllTxt();
            }} 
            onCancel={()=>{setIsModalVisible(handleModal);}}>
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

export default EditRecipe