Starter project for react, redux and react-router based apps that require a
user management solution. This repository provides a sample Auth0 integration
code that allows you to not worry about implementing backend code for user
authentication and frontend views for login/signup/reset, etc.

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).


## Table of Contents

- [Requirements](#requirements)
- [How to Run](#how-to-run)
- [How it Works](#how-it-works)
- [Available Scripts](#available-scripts)
  - [npm start](#npm-start)
  - [npm test](#npm-test)
  - [npm run build](#npm-run-build)
  - [npm run eject](#npm-run-eject)
- [License](#license)

## Requirements

Dependencies:

```
node: ^8
auth0-js: ^8
react: ^16
react-redux: ^5
react-router: ^4
```

You only need an Auth0 user account in order to run this app. Get a new account at
https://auth0.com/ and once you're in the dashboard have your `domain` and `clientId`
at hand. Those are the only values you'll need for running `npm start`.

Also, make sure you configure a callback URL for you client app. For this project
to work with default values you should set your callback URL to be `http://localhost:3000/callback`.

## How to Run

```
git clone https://github.com/cachafla/react-redux-auth0
cd react-redux-auth0
npm install

# Export AUTH0_DOMAIN, AUTH0_CLIENT_ID so your JS code is transpiled
# with the correct environment variables replaced on lib/auth.js
export AUTH0_CLIENT_ID=<my-client-id>
export AUTH0_DOMAIN=<my-domain>.auth0.com

npm start
```

## How it Works

This is roughly how this app works:

* Go to http://localhost:3000/. The first time you visit this page you'll be required to login
* When clicking on the `Log In` button you'll be redirected to your Auth0 domain where users can either sign up or log in with an existing account
* Upon successful registration, you will be redirected to the app's callback URL
* Once logged in, you will be able to see your profile information when you're back on the app's root page
* Your session data will be stored in the browser's localStorage
* After clicking on `Log Out` the localStorage keys will be cleared and the UI will reflect your logged out state

Let's look at what the most important files and directories in this app do.

### src/index.js

Main entry point to the app. The following tasks are performed in this file:

* Require and initialize the browser history to be passed to react-router
* Initialize and configure the redux store
* Setup the ReactDOM render structure in the form of react-router routes that conform to the react-redux and react-router-redux protocol for passing store and router state down the component chain
* Declare two application routes:
  * '/': application entry point
  * '/callback': custom callback URL required by Auth0
* Register the default service worker provided by create-react-app

### src/actions/index.js

All redux actions are defined in ths file. You'll find that async (redux-thunk)
action creators and their variable names are suffixed with Async. This helps us
organize the code better.

### src/components/App.js

Main app container serving the app layout. It has the corresponding login/logout
actions and content depending on your current logged in state. You should ideally
declare new application components as child routes of the App component.

### src/components/Callback.js

This a special component that allows us to receive authentication data sent by Auth0
when users have finished logging in or signing up on your hosted login page. This
component will verify that the callback URL has the following parameters:

* access_token
* id_token
* error

### src/components/Profile.js

Sample component that displays your profile information.

### src/lib/auth.js

Auth0 backend code. Exposes all functions required to initiate authentication against your
Auth0 domain and save and read session data from localStorage.

### src/lib/configureStore.js

Intializes the redux store. The redux store is configured with the following middleware:

* router: injects router state into components
* thunk: allows you to have async action creators

configureStore also initializes your app state. This is useful since most applications store
user data on localStore or require to make an API call before loading the user interface.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](#running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](#deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
## License

MIT