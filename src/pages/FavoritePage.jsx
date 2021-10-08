import { Container } from '@material-ui/core';
import React from 'react';
import FavoriteTable from '../components/FavoriteTable';
import Navbar from '../components/Navbar';

const FavoritePage = () => {
    return (
        <div>
            <Navbar/>
                       
            <Container>
                <div className="favorite-text"> 
                    <h2>Favorite</h2>                   
                    <FavoriteTable/>                 
                </div>
            </Container>
        </div>
    );
};

export default FavoritePage;