import { POST_ERROR, GET_POST, GET_POSTS } from "../types";
const initialState = {
  posts: [],
  post: null,
  loading: true,
  error: {},
};

export default function post(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
      case GET_POSTS:
          return {
              ...state,
              posts: payload,
              loading: false
          }
      case POST_ERROR:
          return {
              ...state,
              error: payload,
              loading: false
          }
    default:
      return state;
  }
}
