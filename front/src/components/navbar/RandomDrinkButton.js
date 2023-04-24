import { useSelector } from 'react-redux';
import Modal from '../modal/Modal';
import { showRDPopup, hideRDPopup } from '../slices/popupRandomDrinkSlice';
import { useDispatch } from 'react-redux';
import closeBtn from '../../icons/close-btn.svg';
import { useState } from 'react';
import React from 'react';
import DrinkCard from '../DrinkCard';
import { useAuth0 } from '@auth0/auth0-react';

const RandomDrinkComponent = () => {
    const [randomDrink, setRandomDrink] = useState('');
    const [status, setStatus] = useState('idle');
    const dispatch = useDispatch();
    const getRandomDrink = async () => {
        try {
            setStatus('loading');
            const response = await fetch('http://localhost:3001/random');
            const jsonResponse = await response.json();
            setRandomDrink(jsonResponse[0]);
            setStatus('success');
        } catch (error) {
            setStatus('error');
        }
    };
    React.useEffect(() => {
        if (!randomDrink) {
            getRandomDrink();
        }
    }, [randomDrink]);
    const isLoading = status === 'loading';
    const isError = status === 'error';
    const { user } = useAuth0();
    if (isLoading) return <p>Loading the random drink</p>;
    if (isError) return <p>Something went wrong</p>;
    const isInFavourites = randomDrink?.isInFavourites?.includes(user?.sub);
    const index = 0;
    return (
        <Modal hideFunc={() => dispatch(hideRDPopup())}>
            <button
                data-testid='randomDrinkButton'
                className='absolute top-0 right-1 z-10'
                onClick={() => dispatch(hideRDPopup())}>
                <img src={closeBtn} alt='close random drink popup' />
            </button>
            {randomDrink && (
                <DrinkCard
                    drink={randomDrink}
                    index={index}
                    isInFavourites={isInFavourites}
                />
            )}
        </Modal>
    );
};
const RandomDrinkButton = () => {
    const dispatch = useDispatch();
    const popupState = useSelector((state) => state.popupRandomDrink.status);
    const showRandomDrink = () => {
        dispatch(showRDPopup());
    };

    return (
        <>
            <button
                onClick={showRandomDrink}
                className='w-12 h-12'
                name='Get a random drink'>
                <img
                    alt='Get a random drink'
                    src='/images/random_btn.png'></img>
            </button>
            {popupState && <RandomDrinkComponent />}
        </>
    );
};
export default RandomDrinkButton;
