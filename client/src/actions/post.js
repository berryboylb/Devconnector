import { DELETE_POST, GET_POSTS, POST_ERROR, SET_ALERT, UPDATE_LIKES } from "../types";
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
        const res = await axios.delete(`http://localhost:5000/api/posts/${id}`);
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