import React, { useContext, useEffect, useState } from 'react';
import { fire } from "../Firebase";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithPopup,
    signOut,
} from '@firebase/auth';





const authContext = React.createContext()
export const useAuth = () => useContext(authContext)



const AuthContextProvider = ({ children}) => {
    const [user, setUser] = useState()
    console.log(user)

    const googleProvider = new GoogleAuthProvider()
    const loginWithGoogle = () =>{
        signInWithPopup( fire, googleProvider)
    }

    const signUp = (email, password) => {
        createUserWithEmailAndPassword(fire,email,password)
    }
    const login = (email, password) => {
        signInWithEmailAndPassword(fire,email,password)
    }
    const logout = () => {
        signOut(fire)
    }
    useEffect(() => {
        const loginCheck = onAuthStateChanged(fire, user => {
            setUser(user)
        })
        return loginCheck
    },[])
    return (
        <authContext.Provider value={{
            user,
            signUp,
            login,
            logout,
            loginWithGoogle
        }}>
            {children}
        </authContext.Provider>
    );
};

export default AuthContextProvider;