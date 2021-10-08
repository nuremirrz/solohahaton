import axios from 'axios';
import React, { useReducer } from 'react';
import { API } from '../helpers/const';
import { calcSubPrice, calcTotalPrice } from '../helpers/calculator'
export const clientContext = React.createContext()

const INIT_STATE = {
    products: null,
    productsCountInCart: JSON.parse(localStorage.getItem('cart')) ? JSON.parse(localStorage.getItem('cart')).products.length : 0 ,
    productsCountInFavorite: JSON.parse(localStorage.getItem('favorite')) ? JSON.parse(localStorage.getItem('favorite')).products.length : 0 ,
    cart: null,
    favorite: null,
    productDetails: null,
    comments: null,
    types: []
}

const reducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case "GET_PRODUCTS":
            return { ...state, products: action.payload }
        case "ADD_AND_DELETE_PRODUCT_IN_CART":
            return {...state, productsCountInCart: action.payload} 
        case "ADD_AND_DELETE_PRODUCT_IN_FAVORITE":
            return {...state, productsCountInFavorite: action.payload}                 
        case "GET_CART":
            return {...state, cart: action.payload}
        case "GET_FAVORITE":
            return {...state, favorite: action.payload}
        case "GET_TYPES":
            return {...state, types: action.payload}  
        case "GET_COMMENTS":
            return {...state, comments: action.payload}    
        case "GET_DETAILS_OF_PRODUCT":
            return { ...state, productDetails: action.payload }      
        default:
            return { ...state }
    }
}

const ClientContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, INIT_STATE)

    const getProduct = async () => {
        console.log(window.location)
        const { data } = await axios(`${API}${window.location.search}`)
        dispatch({
            type: "GET_PRODUCTS",
            payload: data
        })
    }

    const addAndDeleteProductInCart = (product) => {
        let cart = JSON.parse(localStorage.getItem("cart"))
        if (!cart) {
            cart = {
                products: [],
                totalPrice: 0,
            }
        }
        let newProduct = {
            product: product,
            count: 1,
            subPrice: 0,
        }
        newProduct.subPrice = calcSubPrice(newProduct)
        let newCart = cart.products.filter(item => item.product.id === product.id)
        if(newCart.length) {
            cart.products = cart.products.filter(item => item.product.id !== product.id)
        } 
        else {
            cart.products.push(newProduct)
        }
        cart.totalPrice = calcTotalPrice(cart.products)
        localStorage.setItem("cart", JSON.stringify(cart))
        dispatch({
            type: "ADD_AND_DELETE_PRODUCT_IN_CART",
            payload: cart.products.length
        })


        console.log(cart)
        // console.log(product)
    }
    //like started
    const addAndDeleteProductInFavorite = (product) => {
        let favorite = JSON.parse(localStorage.getItem("favorite"))
        if (!favorite) {
            favorite = {
                products: [],                
            }
        }
        let newProduct = {
            product: product,
            count: 1,
            
        }  
        console.log(newProduct)      
        let newFavorite = favorite.products.filter(item => item.product.id === product.id)
        if(newFavorite.length) {
            favorite.products = favorite.products.filter(item => item.product.id !== product.id)
        } 
        else {
            favorite.products.push(newProduct)
        }        
        localStorage.setItem("favorite", JSON.stringify(favorite))
        dispatch({
            type: "ADD_AND_DELETE_PRODUCT_IN_FAVORITE",
            payload: favorite.products.length
        })


        console.log(favorite)
        // console.log(product)
    }
    const checkProductInFavorite = (id) =>{
        let favorite = JSON.parse(localStorage.getItem('favorite'))
        if(!favorite) {
            return false
        }
        let newFavorite = favorite.products.filter(item => item.product.id === id)
        return !newFavorite.length ? true : false
    }    
    const getFavorite = () =>{
        
        let favorite = JSON.parse(localStorage.getItem('favorite'))
        dispatch({
            type: 'GET_FAVORITE',
            payload: favorite
        })
    }
    //like end
    const checkProductInCart = (id) =>{
        let cart = JSON.parse(localStorage.getItem('cart'))
        if(!cart) {
            return false
        }
        let newCart = cart.products.filter(item => item.product.id === id)
        return !newCart.length ? true : false
    }    
    const getCart = () =>{
        
        let cart = JSON.parse(localStorage.getItem('cart'))
        dispatch({
            type: 'GET_CART',
            payload: cart
        })
    }
    const changeCountProducts = (count, id) => {
        let cart = JSON.parse(localStorage.getItem('cart'))
        if(!cart){
            return
        }
        cart.products = cart.products.map(item => {
            if(item.product.id === id){
                item.count = count
                item.subPrice = calcSubPrice(item)
            }
            return item
        }) 
        cart.totalPrice = calcTotalPrice(cart.products)
        localStorage.setItem('cart', JSON.stringify(cart))
        getCart()
    }
    const getRegions = async () => {
        const {data} =  await axios(API)
        const arr = []
        data.forEach(item =>{
            arr.push(item.region)
        })
        let newArr = []
        arr.forEach(elem =>{
            console.log(arr, newArr)
            let check = newArr.filter(item => item.trim() === elem.trim() )
            if(check.length === 0){
                newArr.push(elem)
            }
        })
        dispatch ({
            type: 'GET_REGIONS',
            payload: newArr
        })
    }
    //pagination  start
    const [posts, setPosts] = React.useState([])
    const [currentPage, setCurrentPage] = React.useState(1)
    const [postsPerPage] = React.useState(4)

    React.useEffect(() => {
        const fetchProducts = () => {
            const data = state.products || []
            setPosts(data)
        }
        fetchProducts()
    }, [state.products])

    const indexOfLastPost = currentPage * postsPerPage
    const indexOfFirstPost = indexOfLastPost - postsPerPage
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)
    const totalPosts = posts.length
    console.log(currentPosts)

    const changePage = (newPage) => {
        setCurrentPage(newPage)
    }

    //paginations end
    //login, user started
    const createNewUser = async (newUser, history) => {
        try{
            const data = await axios.post('https://intense-retreat-64750.herokuapp.com/auth/registration', newUser)
            console.log(data)
            history.push('/')
        }
        catch(e) {
            console.log(e.response)
            alert(e.response.data.message)
        }
        
    }
    const login = async (user, history) => {
        console.log(user)
        try {
            const { data } =  await axios.post('https://intense-retreat-64750.herokuapp.com/auth/login', user)
            console.log(data)
            history.push("/")
        }catch(e) {
            console.log(e.response)
            alert(e.response)
        }
    }
    //login, user end  
    // details of product start

    const getDetailsOfProduct = async (id) => {
        const { data } = await axios(`${API}/products/${id}`)
        dispatch({
            type: "GET_DETAILS_OF_PRODUCT",
            payload: data
        })
    }

    // details of product end

    //comments start

    async function sendComment(product, value) {
        product.comments.push(value)
        await axios.patch(`${API}/products/${product.id}`, product)
        getDetailsOfProduct(product.id)
    }

    
    const createComment = async (newComment) => {
        await axios.post("http://localhost:8000/users",newComment)
        getComment()
    }
    const getComment = async () => {
        const { data } = await axios("http://localhost:8000/users")
        dispatch({
            type: 'GET_COMMENTS',
            payload: data
        })
    }
    // comments end
    return (
        <clientContext.Provider value={{
            products: state.products,
            productsCountInCart: state.productsCountInCart,
            cart: state.cart,
            types: state.types,
            favorite: state.favorite,
            comments: state.comments,
            productsCountInFavorite: state.productsCountInFavorite,
            getDetailsOfProduct,
            sendComment,            
            getProduct,
            getComment,
            createComment, 
            currentPosts,
            postsPerPage,
            totalPosts,
            createNewUser,
            changePage,
            login,
            addAndDeleteProductInCart,
            addAndDeleteProductInFavorite,
            checkProductInCart,
            checkProductInFavorite,
            getFavorite,
            getCart,
            changeCountProducts,
            getRegions   
        }}>
            {children}
        </clientContext.Provider>
    );
};

export default ClientContextProvider;