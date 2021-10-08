import { Container } from '@material-ui/core';
import React, { useContext, useEffect } from 'react';
import Loader from '../components/Loader';
import Navbar from '../components/Navbar';
import { clientContext } from '../contexts/ClientContext';

const CommentPage = () => {
   const {getComment, comments } = useContext(clientContext)
    useEffect(() => {
      getComment()
    },[])
    console.log(comments)
    return (
        <>
            <Navbar/>
            <Container>
            <div >
                   {
                       comments ? (
                        comments.map((item)=>(
                            <div className="comment">
                                <h2>Comment</h2>
                                <div className="comment-block">
                                    <h3>{item.comment}</h3>

                                </div>

                            </div>
                        ))
                    ):(
                        <Loader />
                    )
                   }
            </div>
            </Container>
        </>
    );
};

export default CommentPage;