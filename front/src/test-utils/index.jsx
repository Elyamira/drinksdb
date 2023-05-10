import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage';
import { persistCombineReducers, persistStore } from 'redux-persist';
import { applyMiddleware, createStore } from '@reduxjs/toolkit';
import drinksReducer from '../components/slices/drinksSlice';
import popupInputsReducerSlice from '../components/slices/popupInputsReducerSlice';
import popupRandomDrinkSlice from '../components/slices/popupRandomDrinkSlice';
import popupErrorMessageSlice from '../components/slices/popupErrorMessageSlice';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter } from 'react-router-dom';
import { PageWrapper } from '../components/PageWrapper';
import popupDeleteSlice from '../components/slices/popupDeleteDialogue';
import Loader from '../components/Loader';

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

const ContextProvider = ({ children }) => {
    return (
        <Provider store={store}>
            <PersistGate loading={<Loader />} persistor={persistor}>
                {children}
            </PersistGate>
        </Provider>
    );
};
const AllTheProviders = ({ children }) => {
    return (
        <ContextProvider>
            <BrowserRouter>
                <PageWrapper>{children}</PageWrapper>
            </BrowserRouter>
        </ContextProvider>
    );
};

const renderWithRedux = (ui, options) =>
    render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { renderWithRedux as render, ContextProvider };
