import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    status: false
};
const popupRandomDrinkSlice = createSlice(
    {
        name: "popupState",
        initialState,
        reducers: {
            showRDPopup: (state) => {
                state.status = true;
            },
            hideRDPopup: (state) => {
                state.status = false
            }
        }
    }
)
export const { showRDPopup, hideRDPopup } = popupRandomDrinkSlice.actions;
export default popupRandomDrinkSlice.reducer