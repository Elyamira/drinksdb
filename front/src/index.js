import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { Auth0Provider } from '@auth0/auth0-react';
import history from './utils/history';
import { getConfig } from './config';
import { BrowserRouter } from 'react-router-dom';
import { PageWrapper } from './components/PageWrapper';
import storage from 'redux-persist/lib/storage';
import { persistCombineReducers, persistStore } from 'redux-persist';
import { applyMiddleware, createStore } from '@reduxjs/toolkit';
import { PersistGate } from 'redux-persist/integration/react';
import drinksReducer from './components/slices/drinksSlice';
import popupInputsReducerSlice from './components/slices/popupInputsReducerSlice';
import popupRandomDrinkSlice from './components/slices/popupRandomDrinkSlice';
import popupErrorMessageSlice from './components/slices/popupErrorMessageSlice';
import thunk from 'redux-thunk';
import popupDeleteSlice from './components/slices/popupDeleteDialogue';
import Loader from './components/Loader';
const onRedirectCallback = (appState) => {
    history.push(
        appState && appState.returnTo
            ? appState.returnTo
            : window.location.pathname
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
const persistConfig = {
    key: 'root',
    storage,
};
const persistedReducer = persistCombineReducers(persistConfig, {
    drinksData: drinksReducer,
    popupInputs: popupInputsReducerSlice,
    popupRandomDrink: popupRandomDrinkSlice,
    errorPopup: popupErrorMessageSlice,
    popupDeleteSlice: popupDeleteSlice,
});
const store = createStore(persistedReducer, applyMiddleware(thunk));

const persistor = persistStore(store);
ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <Auth0Provider {...providerConfig}>
                <PersistGate loading={<Loader />} persistor={persistor}>
                    <BrowserRouter>
                        <PageWrapper>
                            <App />
                        </PageWrapper>
                    </BrowserRouter>
                </PersistGate>
            </Auth0Provider>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
