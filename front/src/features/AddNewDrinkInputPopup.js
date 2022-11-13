import React from 'react';
import { useDispatch } from 'react-redux';
import { hidePopup } from '../components/slices/popupInputsReducerSlice';
import Modal from '../components/modal/Modal';
import ContentForAddNewDrinkPopup from './ContentForAddDrinkPopup';
const AddNewDrinkInputPopup = () => {
    const dispatch = useDispatch();

    return (
        <Modal hideFunc={() => dispatch(hidePopup())}>
            <ContentForAddNewDrinkPopup />
        </Modal>)
}
export default AddNewDrinkInputPopup;