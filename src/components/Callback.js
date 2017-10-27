import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../actions';

class Callback extends Component {
    componentDidMount () {
        const { location, handleAuthCallback } = this.props;

        if (/access_token|id_token|error/.test(location.hash)) {
            handleAuthCallback();
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
