import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    status: false
};
const popupSuccessMessageSlice = createSlice(
    {
        name: "errorState",
        initialState,
        reducers: {
            showSuccessMessage: (state) => {
                state.status = true;
            },
            hideSuccessMessage: (state) => {
                state.status = false
            }
        }
    }
)
export const { showSuccessMessage, hideSuccessMessage } = popupSuccessMessageSlice.actions;
export default popupSuccessMessageSlice.reducer