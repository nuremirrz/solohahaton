import axios from 'axios';
import React, { useReducer } from 'react';
import { API } from '../helpers/const';
export const adminContext = React.createContext()

const INIT_STATE = {
    products: null,
    productToEdit: null, 
}
const reducer = (state=INIT_STATE, action) => {
    switch(action.type) {
        case "GET_PRODUCTS":
            return {...state, products: action.payload }
        case "GET_PRODUCT_TO_EDIT":
            return {...state, productToEdit: action.payload }    
        default:
            return {...state }
    }
}

const AdminContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, INIT_STATE)

    const createProduct = async (newProduct) => {
        await axios.post(API, {...newProduct, price: +newProduct.price})
        getProducts()
    }
    const getProducts = async () => {
        const { data } = await axios(API)
        dispatch({
            type: 'GET_PRODUCTS',
            payload: data
        })
    }
    const deleteProduct = async (id) => {
        await axios.delete(`${API}/${id}`)
        getProducts()
    }
    const getProductToEdit = async (id) => {
        const { data } =  await axios.delete(`${API}/${id}`)
        dispatch ({
            type: "GET_PRODUCT_TO_EDIT",
            payload: data
        })
    }
    const saveEditedProduct = async (editedProduct) => {
        await axios.patch(`${API}/${editedProduct.id}`, {...editedProduct, price: +editedProduct.price})
        getProducts()
    }
    return (
        <adminContext.Provider value = {{
            products: state.products,
            productToEdit: state.productToEdit,
            createProduct,
            getProducts,
            deleteProduct,
            getProductToEdit,
            saveEditedProduct
        }}>
            {children}            
        </adminContext.Provider>
    );
};

export default AdminContextProvider;