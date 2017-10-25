const authReducer = (state = {}, action) => {
    switch (action.type) {
        case 'LOGIN_REQUEST':
            return {
                isAuthenticated: false
            };
        case 'LOGIN_SUCCESS':
            return {
                isAuthenticated: true
            };
        case 'LOGIN_FAILURE':
            return {
                isAuthenticated: false,
                authError: action.message
            };
        case 'LOGOUT_SUCCESS':
            return {
                isAuthenticated: false
            };
        case 'PROFILE_RECEIVE':
            return Object.assign({}, state, { profile: action.profile });
        default:
            return { ...state };
    }
};

export default {
    auth: authReducer
};
