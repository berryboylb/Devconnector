import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./reducers";


//create an initial state
const initialState = {};


//create a middleware
const middleware = [thunk];


/*create a store include reducer, initialstate and middleware*/
const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)


export default store;