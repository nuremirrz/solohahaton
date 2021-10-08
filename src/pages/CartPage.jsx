import { Container } from '@material-ui/core';
import React from 'react';
import CartTable from '../components/CartTable';
import Navbar from '../components/Navbar';


const CartPage = () => {
    return (
        <>
            List of Tours
            <Navbar />
            <Container>
                <div className="cart">
                    <h2>List of Tours</h2>
                    <CartTable/>                                    
                </div>
            </Container>
        </>
    );
};

export default CartPage;