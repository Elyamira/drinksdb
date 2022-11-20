import Modal from './modal/Modal';
import { useSelector } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateDrink } from './slices/drinksSlice';
import { hidePopup } from '../components/slices/popupInputsReducerSlice';
import { showError } from '../components/slices/popupErrorMessageSlice';

import EditDrinkContent from './EditDrinkContent';
const DrinkDetailedInfo = (props) => {
    const { isAuthenticated, user } = useAuth0();
    const dispatch = useDispatch();
    const drinks = useSelector((state) => state.drinksData.drinks);
    const [chosenDrink, setChosenDrink] = useState(
        drinks?.find((drink) => drink._id === props.id)
    );
    // const chosenDrink = drinks?.find((drink) => drink._id === props.id);
    const [isEditionMode, setIsEditionMode] = useState(false);
    const [editRequestStatus, setEditRequestStatus] = useState('idle');

    const handleOnSave = async (drink) => {
        const canSave =
            drink.taste &&
            drink.name &&
            editRequestStatus === 'idle' &&
            isAuthenticated;
        let creatorId;
        if (user) {
            creatorId = user.sub;
        }
        if (canSave) {
            try {
                setEditRequestStatus('pending');
                await dispatch(
                    updateDrink({
                        oldName: chosenDrink.name,
                        taste: drink.taste,
                        name: drink.name,
                        creatorId,
                    })
                ).unwrap();
            } catch (err) {
                setEditRequestStatus('failed');
                dispatch(hidePopup());
                dispatch(showError());
            } finally {
                setEditRequestStatus('idle');
                setIsEditionMode(false);
                dispatch(hidePopup());
            }
        }
    };
    const handleOnCancel = () => {
        setIsEditionMode(false);
    };

    return (
        <Modal>
            <div className='drink-detailed-info'>
                <button
                    className='absolute top-0 right-1'
                    onClick={() => props.setShowMode()}>
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
                {!isEditionMode && (
                    <>
                        <p>Drink name: {chosenDrink.name}</p>
                        <p>Drink taste: {chosenDrink.taste}</p>
                    </>
                )}
                <div className='flex flex-col'>
                    {isAuthenticated && <button>Add to favourites</button>}
                    {user?.sub && user.sub === chosenDrink.creatorId && (
                        <button onClick={setIsEditionMode}>Edit</button>
                    )}
                    {isEditionMode && (
                        <EditDrinkContent
                            onSave={handleOnSave}
                            onCancel={handleOnCancel}
                        />
                    )}
                </div>
            </div>
        </Modal>
    );
};
export default DrinkDetailedInfo;
