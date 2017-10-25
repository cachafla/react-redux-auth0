import { createStore, combineReducers, applyMiddleware } from 'redux';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';
import Auth from '../lib/auth';

const getInitialState = () => {
    const initialState = {
        auth: {
            isAuthenticated: Auth.isAuthenticated(),
            profile: {}
        }
    };

    return initialState;
};

const configureStore = opts => {
    const middleware = routerMiddleware(opts.history);

    const store = createStore(
        combineReducers({
            ...reducers,
            router: routerReducer
        }),
        getInitialState(),
        applyMiddleware(thunk, middleware)
    );

    return store;
};

export default configureStore;
