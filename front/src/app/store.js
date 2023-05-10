import { configureStore } from '@reduxjs/toolkit';
import drinksReducer from '../components/slices/drinksSlice';
import popupInputsReducerSlice from '../components/slices/popupInputsReducerSlice';
import popupRandomDrinkSlice from '../components/slices/popupRandomDrinkSlice';
import popupErrorMessageSlice from '../components/slices/popupErrorMessageSlice';
import popupDeleteSlice from '../components/slices/popupDeleteDialogue';

export const store = configureStore({
    reducer: {
        drinksData: drinksReducer,
        popupInputs: popupInputsReducerSlice,
        popupRandomDrink: popupRandomDrinkSlice,
        errorPopup: popupErrorMessageSlice,
        popupDeleteSlice: popupDeleteSlice,
    },
});
