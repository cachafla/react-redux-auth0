import auth0 from 'auth0-js';

const createAuth0Instance = () => {
    return new auth0.WebAuth({
        domain: process.env.REACT_APP_AUTH0_DOMAIN,
        clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
        redirectUri: 'http://localhost:3000/callback',
        audience: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/userinfo`,
        responseType: 'token id_token',
        scope: 'openid profile'
    });
};

const login = () => {
    createAuth0Instance().authorize();
};

const handleAuthentication = cb => {
    createAuth0Instance().parseHash((err, authResult) => {
        if (err) {
            console.log(`${err.error}: ${err.errorDescription}`);
            console.log('Could not authenticate');
            cb(err);
        } else if (authResult && authResult.accessToken && authResult.idToken) {
            console.log('Authenticated');
            setSession(authResult);
            cb(null, authResult);
        } else {
            console.log(`Unexpected format of authResult: ${authResult}`);
            cb(new Error('Unexpected format of authResult'));
        }
    });
};

const setSession = authResult => {
    let expiresAt = JSON.stringify(
        authResult.expiresIn * 1000 + new Date().getTime()
    );

    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
};

const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');

    console.log('Could not authenticate');
};

const isAuthenticated = () => {
    if (
        !localStorage.getItem('access_token') ||
        !localStorage.getItem('id_token') ||
        !localStorage.getItem('expires_at')
    ) {
        return false;
    }

    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
};

const getAccessToken = () => {
    const accessToken = localStorage.getItem('access_token');

    if (!accessToken) {
        throw new Error('No access token found');
    }
    return accessToken;
};

const getProfile = cb => {
    let accessToken = getAccessToken();

    createAuth0Instance().client.userInfo(accessToken, (err, profile) => {
        if (err) {
            cb(err);
            return;
        }

        cb(null, profile);
    });
};

export default {
    getProfile,
    handleAuthentication,
    isAuthenticated,
    login,
    logout,
    setSession
};
