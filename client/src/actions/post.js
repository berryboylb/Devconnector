import { ADD_POST, DELETE_POST, GET_POST, GET_POSTS, POST_ERROR, SET_ALERT, UPDATE_LIKES, ADD_COMMENT, REMOVE_COMMENT } from "../types";
import axios from "axios";
import { setAlert } from './alert';

export const getPosts = () => async dispatch => {
    try {
        const res = await axios.get('http://localhost:5000/api/posts');
        dispatch({
            type: GET_POSTS,
            payload: res.data,
        })
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

//add likes
export const addLike = (id) => async dispatch => {
    try {
        const res = await axios.put(`http://localhost:5000/api/posts/like/${id}`);
        console.log(res);
        dispatch({
            type: UPDATE_LIKES,
            payload: { id, likes: res.data },
        })
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

//remove likes
export const removeLike = (id) => async dispatch => {
    try {
        const res = await axios.put(`http://localhost:5000/api/posts/unlike/${id}`);
        dispatch({
            type: UPDATE_LIKES,
            payload: { id, likes: res.data },
        })
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

//delete post
export const deletePost = (id) => async dispatch => {
    try {
        await axios.delete(`http://localhost:5000/api/posts/${id}`);
        dispatch({
            type: DELETE_POST,
            payload: id
        })
        dispatch(setAlert("PostRemoved", "Succes"))
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

//add post
export const addPost = formdata => async dispatch => {
    const config = {
        headers : {
            'Content-Type': 'application/json'
        }
    }
    try {
        const res = await axios.post('http://localhost:5000/api/posts', formdata, config);
        dispatch({
            type: ADD_POST,
            payload: res.data
        })
        dispatch(setAlert("Post Created", "Succes"))
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

//get post
export const getPost = (id) => async dispatch => {
    try {
        const res = await axios.get(`http://localhost:5000/api/posts/${id}`);
        dispatch({
            type: GET_POST,
            payload: res.data,
        })
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

//add comment
export const addComment = (id,formdata) => async dispatch => {
    const config = {
        headers : {
            'Content-Type': 'application/json'
        }
    }
    try {
        const res = await axios.post(`http://localhost:5000/api/posts/comment/${id}`, formdata, config);
        dispatch({
            type: ADD_COMMENT,
            payload: res.data
        })
        dispatch(setAlert("Comment Created", "Succes"))
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

//add post
export const deleteComment = (postid, commentid) => async dispatch => {
    try {
        await axios.delete(`http://localhost:5000/api/posts/comment/${postid}/${commentid}`);
        dispatch({
            type: REMOVE_COMMENT,
            payload: commentid
        })
        dispatch(setAlert("Comment Removed", "Succes"))
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}