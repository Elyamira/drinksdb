import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { add } from '../components/drinksSlice';
import AddNewDrinkInputPopup from './AddNewDrinkInputPopup';
import { showPopup } from '../components/popupInputsReducerSlice';

const AddNewDrinkButton = () => {
    const popupState = useSelector(state => state.popupInputs.status);


    const dispatch = useDispatch();
    const addNewDrink = () => {
        dispatch(showPopup())
    }
    return <>
        <button onClick={addNewDrink}>
            Add new drink

        </button>
        {popupState && <AddNewDrinkInputPopup />}
    </>

}
export default AddNewDrinkButton;