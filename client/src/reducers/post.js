import {
    POST_ERROR,
    GET_POST
}
 from "../types;"
const initialState = {
    posts: [],
    post: null,
    loading: true,
    error: {}
}

export default function post(state = initialState, action){
    const {type, payload} = action;
    switch(type){

        default:
            return state;
    }
}