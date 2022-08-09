import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    status: false
};
const popupInputsReducerSlice = createSlice(
    {
        name: "popupState",
        initialState,
        reducers: {
            showPopup: (state) => {
                state.status = true;
            },
            hidePopup: (state) => {
                state.status = false
            }
        }
    }
)
export const { showPopup, hidePopup } = popupInputsReducerSlice.actions;
export default popupInputsReducerSlice.reducer