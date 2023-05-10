import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    status: false,
};
const popupDeleteSlice = createSlice({
    name: 'popupState',
    initialState,
    reducers: {
        showDeleteDialog: (state) => {
            state.status = true;
        },
        hideDeleteDialog: (state) => {
            state.status = false;
        },
    },
});
export const { showDeleteDialog, hideDeleteDialog } = popupDeleteSlice.actions;
export default popupDeleteSlice.reducer;
