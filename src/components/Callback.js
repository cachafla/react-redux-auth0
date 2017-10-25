import React, { Component } from 'react';
import { connect } from 'react-redux';
import Auth from '../lib/auth';
import actions from '../actions';

class Callback extends Component {
    componentDidMount () {
        const { history, location, loginError, loginSuccess } = this.props;

        if (/access_token|id_token|error/.test(location.hash)) {
            Auth.handleAuthentication((err, data) => {
                if (err) {
                    loginError(`${err.error}: ${err.errorDescription}`);
                    return;
                }

                loginSuccess(data);
                history.push('/');
            });
        }
    }

    render () {
        const { authError } = this.props.auth;
        const message = authError || 'Loading...';

        return (
            <h1 style={{ textAlign: 'center', marginTop: '40px' }}>
                {message}
            </h1>
        );
    }
}

export default connect(state => state, actions)(Callback);
