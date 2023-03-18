import { useSelector } from 'react-redux';
import Modal from '../modal/Modal';
import { showRDPopup, hideRDPopup } from '../slices/popupRandomDrinkSlice';
import { useDispatch } from 'react-redux';
import closeBtn from '../../icons/close-btn.svg';
import { useState } from 'react';
import React from 'react';
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
    const isSuccess = status === 'success';
    const isError = status === 'error';
    // console.log(randomDrink.name, 'RANDOMDRINK');
    if (isLoading) return <p>Loading the random drink</p>;
    if (isError) return <p>Something went wrong</p>;
    return (
        <Modal hideFunc={() => dispatch(hideRDPopup())}>
            <button
                data-testid='randomDrinkButton'
                className='absolute top-0 right-1'
                onClick={() => dispatch(hideRDPopup())}>
                <img src={closeBtn} alt='close random drink popup' />
            </button>
            <div>
                <p>{randomDrink.name}</p>
            </div>
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
            <button onClick={showRandomDrink} className='min-w-max'>
                Get a random drink
            </button>
            {popupState && <RandomDrinkComponent />}
        </>
    );
};
export default RandomDrinkButton;
