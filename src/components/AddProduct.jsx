import { TextField, Button } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import { adminContext } from '../contexts/AdminContext';


const AddProduct = () => {
    const [sight, setSight] = useState({
        title: "",
        description: "",       
        photo: "",
        region: "",
        type:"", 
        price: "",       
    })
    const {createProduct} = useContext(adminContext)
    function handleInputs(e) {
        let newProduct = {
            ...sight,
            [e.target.name]: e.target.value
        }
        setSight(newProduct)
    }
    return (
        <div>
            <div className="add-inputs">
                <form className="add-form">
                    <TextField className="add-admin_inputs" value={sight.title} id="standard-basic" label="Название достприм." name="title" onChange={handleInputs} />
                    <TextField className="add-admin_inputs" value={sight.description} id="standard-basic" label="Краткое описание" name="description" onChange={handleInputs} />                                                            
                    <TextField className="add-admin_inputs" value={sight.photo} id="standard-basic" label="Фотография" name="photo" onChange={handleInputs} />
                    <TextField className="add-admin_inputs" value={sight.region} id="standard-basic" label="Регион" name="region" onChange={handleInputs} />
                    <TextField className="add-admin_inputs" value={sight.type} id="standard-basic" label="Тип достприм." name="type" onChange={handleInputs} />
                    <TextField className="add-admin_inputs" value={sight.price} id="standard-basic" label="Стоимость" name="price" onChange={handleInputs} />
                    <Button
                        onClick={(e) => {
                            e.preventDefault()
                            if(
                                !sight.title.trim() ||
                                !sight.description.trim() ||    
                                !sight.photo.trim() ||
                                !sight.region.trim() ||
                                !sight.type.trim() || 
                                !sight.price.trim()                                
                                ) {
                                    alert("Заполните поля!!!")
                                    return
                                }
                            createProduct({
                                title: sight.title.trim(),
                                description: sight.description.trim(),
                                photo: sight.photo.trim(),
                                region: sight.region.trim(),
                                type: sight.type.trim(),
                                price: sight.price.trim(),                                                              
                            })
                            setSight({
                                title: "",
                                description: "",       
                                photo: "",
                                region: "",
                                type:"", 
                                price: "",      
                            })
                        }}
                        variant="contained"
                        color="primary"
                    >
                        Создать
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;