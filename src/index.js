import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';
import configureStore from './lib/configureStore';
import createHistory from 'history/createBrowserHistory';

// Service worker
import registerServiceWorker from './registerServiceWorker';

// Import routes/components
import App from './components/App';
import Callback from './components/Callback';

// Import styles
import './index.css';

const history = createHistory();
const store = configureStore({ history: history });

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <div>
                <Route exact path="/" component={App} />
                <Route path="/callback" component={Callback} />
            </div>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
);

registerServiceWorker();
