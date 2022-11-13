import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    status: false
};
const popupErrorMessageSlice = createSlice(
    {
        name: "errorState",
        initialState,
        reducers: {
            showError: (state) => {
                state.status = true;
            },
            hideError: (state) => {
                state.status = false
            }
        }
    }
)
export const { showError, hideError } = popupErrorMessageSlice.actions;
export default popupErrorMessageSlice.reducer