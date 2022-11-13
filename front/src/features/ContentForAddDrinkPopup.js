import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { hidePopup } from '../components/slices/popupInputsReducerSlice';
import { addNewDrink } from '../components/slices/drinksSlice';
import { showError } from '../components/slices/popupErrorMessageSlice';
import { useAuth0 } from '@auth0/auth0-react';
const ContentForAddNewDrinkPopup = () => {
    const dispatch = useDispatch();
    const [taste, setTaste] = useState(' ');
    const [name, setName] = useState(' ');
    const [addRequestStatus, setAddRequestStatus] = useState('idle');
    const { user, isAuthenticated } = useAuth0();
    const canSave =
        [taste, name].every(Boolean) &&
        addRequestStatus === 'idle' &&
        isAuthenticated;
    let creatorId;
    if (user) {
        creatorId = user.sub;
    }
    const onSaveDrinkClicked = async (event) => {
        if (canSave) {
            try {
                setAddRequestStatus('pending');
                console.log(user.sub);
                await dispatch(
                    addNewDrink({ taste, name, creatorId })
                ).unwrap();
                setTaste('');
                setName('');
            } catch (err) {
                setAddRequestStatus('failed');
                console.error('Failed to save the drink: ', err);
                dispatch(hidePopup());
                dispatch(showError());
            } finally {
                setAddRequestStatus('idle');
                dispatch(hidePopup());
            }
        } else {
            dispatch(hidePopup());
            dispatch(showError());
        }
    };
    return (
        <div className='flex flex-col'>
            <button
                className='absolute top-0 right-1'
                onClick={() => dispatch(hidePopup())}>
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-6 w-6'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'>
                    <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M6 18L18 6M6 6l12 12'
                    />
                </svg>
            </button>
            <label htmlFor='drinkName'>Enter Drink Name</label>
            <input
                id='drinkName'
                className='border border-sky-500'
                name='name'
                value={name}
                onChange={(event) =>
                    setName(event.target.value.trim())
                }></input>
            <label htmlFor='drinkTaste'>Enter Drink Taste</label>
            <input
                id='drinkTaste'
                className='border border-sky-500'
                name='taste'
                value={taste}
                onChange={(event) =>
                    setTaste(event.target.value.trim())
                }></input>
            <button onClick={onSaveDrinkClicked}>Add</button>
        </div>
    );
};
export default ContentForAddNewDrinkPopup;
