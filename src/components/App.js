import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import actions from '../actions';
import Profile from './Profile';

class App extends Component {
    componentDidMount () {
        this.fetchData();
    }

    componentDidUpdate (prevProps) {
        if (
            this.props.auth.isAuthenticated !== prevProps.auth.isAuthenticated
        ) {
            this.fetchData();
        }
    }

    fetchData () {
        const { isAuthenticated } = this.props.auth;
        const { getProfile } = this.props;

        if (isAuthenticated) {
            getProfile();
        }
    }

    renderPublic () {
        const { login } = this.props;

        return (
            <div style={{ padding: '10px' }}>
                <button onClick={login}>Log In</button>
            </div>
        );
    }

    renderProfile () {
        const { logout } = this.props;
        const { profile } = this.props.auth;

        if (!profile) {
            return <p>Loading profile...</p>;
        }

        return (
            <div style={{ padding: '10px' }}>
                <Profile {...profile} />
                <button onClick={logout}>Log Out</button>
            </div>
        );
    }

    render () {
        const { isAuthenticated } = this.props.auth;

        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Redux Auth0 Demo</h1>
                </header>
                <main>
                    {!isAuthenticated && this.renderPublic()}
                    {isAuthenticated && this.renderProfile()}
                </main>
                <footer />
            </div>
        );
    }
}

export default connect(state => state, actions)(App);
