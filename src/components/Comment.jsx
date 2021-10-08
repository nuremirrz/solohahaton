import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { clientContext } from '../contexts/ClientContext';

const Comment = ({setComment}) => {
    const {createComment} = useContext(clientContext)
    const [newComment, setNewComment] = useState({
        name: "",
        comment: "",
    })
    function handleChange(e){
        let obj ={
            ...newComment, 
            [e.target.name]: e.target.value
        }
        setNewComment(obj)
    }
    
    return (
        <div className="conteiner">
            <div className="conteiner-btn">
                <button onClick={() => setComment(false)}>&times;</button>
            </div>
            <div className="row">
                <div className="comment-name">
                    <h2 className="text-center">Comment</h2>
                </div>

                <div className="col-lg-2">
                    <div id="comment-field"></div>    
                </div>
                <div className="col-lg-2">
                    <form>
                        <div className="form-group">
                            <label className="comment-name">Name:  </label>
                            <input  onChange={handleChange} name="name" type="text" className="form-control" id="commentName" placeholder="Your name"/>
                        </div>
                        <div className="form-group">
                            <label className="comment-name">Comment:  </label>
                            <input onChange={handleChange} name="comment" type="text" className="form-control" id="commentBody" placeholder="Your comment"/>
                        </div>
                        <div className="form-group_text-right">
                            <Link to="comment">
                                <button id="comment-add" onClick={()=>{
                                    createComment(newComment)
                                }} className="comment-btn">add Comment</button>
                            </Link>
                        </div>
                    </form>    
                </div>   


            </div>
        </div>
    );
};

export default Comment;