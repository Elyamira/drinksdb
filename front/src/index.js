import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { store } from './app/store';
import { Provider } from 'react-redux';
import { Auth0Provider } from "@auth0/auth0-react";
import history from "./utils/history";
import { getConfig } from "./config";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Favs from './routes/Favs';

const onRedirectCallback = (appState) => {
  history.push(
    appState && appState.returnTo ? appState.returnTo : window.location.pathname
  );
};
const config = getConfig();

const providerConfig = {
  domain: config.domain,
  clientId: config.clientId,
  ...(config.audience ? { audience: config.audience } : null),
  redirectUri: window.location.origin,
  onRedirectCallback,
};

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Auth0Provider {...providerConfig}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />}></Route>
            <Route path="/favs" element={<Favs />}></Route>
          </Routes>
        </BrowserRouter>
      </Auth0Provider>
    </Provider>

  </React.StrictMode>,
  document.getElementById('root')
);

