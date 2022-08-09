import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import drinksReducer from "../components/drinksSlice";
import popupInputsReducerSlice from "../components/popupInputsReducerSlice";
import popupRandomDrinkSlice from '../components/popupRandomDrinkSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    drinksData: drinksReducer,
    popupInputs: popupInputsReducerSlice,
    popupRandomDrink: popupRandomDrinkSlice,
  },
});
