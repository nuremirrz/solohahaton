import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import AdminContextProvider from './contexts/AdminContext';
import ClientContextProvider from './contexts/ClientContext';
import AdminPage from './pages/AdminPage';
import CartPage from './pages/CartPage';
import FavoritePage from './pages/FavoritePage';
import MainPage from './pages/MainPage';
import SignUpPage from './pages/SignUpPage';
import SignInPage from './pages/SignInPage';
import PayPage from './pages/PayPage';
import AuthContextProvider from './contexts/AuthContext';
import CommentPage from './pages/CommentPage';


const Routes = () => {
    return (
        <AuthContextProvider>
            <ClientContextProvider>
                <AdminContextProvider>
                    <BrowserRouter>
                        <Switch>
                        <Route exact path="/" component={MainPage}/>
                                <Route exact path="/admin" component={AdminPage}/>
                                <Route exact path="/cart" component={CartPage}/>
                                <Route exact path="/favorite" component={FavoritePage}/>
                                <Route exact path="/sign-up" component={SignUpPage}/>
                                <Route exact path="/sign-in" component={SignInPage}/>
                                <Route exact path="/pay" component={PayPage}/>
                                <Route exact path="/comment" component={CommentPage}/>
                        </Switch>
                    </BrowserRouter>
                </AdminContextProvider>
            </ClientContextProvider>
        </AuthContextProvider>
    );
};

export default Routes;