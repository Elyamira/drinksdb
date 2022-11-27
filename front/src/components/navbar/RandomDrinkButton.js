import { useSelector } from 'react-redux';
import Modal from '../modal/Modal';
import { showRDPopup, hideRDPopup } from '../slices/popupRandomDrinkSlice';
import { useDispatch } from 'react-redux';
import closeBtn from '../../icons/close-btn.svg';
import { useState } from 'react';
import React from 'react';
const RandomDrinkButton = () => {
    const dispatch = useDispatch();
    const popupState = useSelector((state) => state.popupRandomDrink.status);
    const showRandomDrink = () => {
        dispatch(showRDPopup());
    };
    const RandomDrinkComponent = () => {
        const [randomDrink, setRandomDrink] = useState('');

        const getRandomDrink = async () => {
            const response = await fetch('http://localhost:3001/random');
            const jsonResponse = await response.json();
            setRandomDrink(jsonResponse[0]);
        };
        React.useEffect(() => {
            if (!randomDrink) {
                getRandomDrink();
            }
        }, [randomDrink]);

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
    return (
        <>
            <button onClick={showRandomDrink}>Get a random drink</button>
            {popupState && <RandomDrinkComponent />}
        </>
    );
};
export default RandomDrinkButton;
