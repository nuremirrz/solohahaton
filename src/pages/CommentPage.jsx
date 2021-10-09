import { Container } from '@material-ui/core';
import React, { useContext, useEffect } from 'react';
import CommentTable from '../components/CommentTable';
import Loader from '../components/Loader';
import Navbar from '../components/Navbar';
import { clientContext } from '../contexts/ClientContext';

const CommentPage = () => {
   const {getComment, comments } = useContext(clientContext)
    useEffect(() => {
      getComment()
    },[])
    
    return (
        <>
            <Navbar/>
            <Container>
                <div>
                    <CommentTable/>   
                    <Loader />
                </div>
            </Container>
        </>
    );
};

export default CommentPage;