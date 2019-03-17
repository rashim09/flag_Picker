import { createStore, applyMiddleware, compose ,combineReducers} from 'redux';
import thunk from 'redux-thunk';
import Reducer from '../reducer';


const initialState = {};
const middleware = [thunk];

const rootReducer =combineReducers({
    flagPicker:Reducer
});

const devTools = process.env.NODE_ENV === 'development'
	? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()
	: null;

const store = (devTools)
	? createStore(rootReducer, initialState, compose(applyMiddleware(...middleware), devTools))
	: createStore(rootReducer, initialState, compose(applyMiddleware(...middleware)));

export default store;