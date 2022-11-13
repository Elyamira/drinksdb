import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DrinkDetailedInfo from './SingleDrink';
import { selectAllDrinks, fetchDrinks } from './slices/drinksSlice';
import { showError } from './slices/popupErrorMessageSlice';

const Drinks = () => {
    const dispatch = useDispatch();
    const [showMode, setShowMode] = useState(false);
    const [chosenDrinkId, setChosenDrinkId] = useState('');
    const [allDrinks, setAllDrinks] = useState();

    const drinks = useSelector(selectAllDrinks);
    const filteredDrinks = useSelector(
        (state) => state.drinksData.filteredDrinks
    );
    console.log(filteredDrinks.length + 'filteredDrinks');
    const drinksStatus = useSelector((state) => state.drinksData.status);
    useEffect(() => {
        let x = filteredDrinks.length > 0 ? filteredDrinks : drinks;
        setAllDrinks(x);
        console.log(filteredDrinks);
    }, [drinks, filteredDrinks]);

    useEffect(() => {
        if (drinksStatus === 'idle') {
            dispatch(fetchDrinks());
        }
    }, [drinksStatus, dispatch]);

    const showDrinkInfo = (id) => {
        setShowMode(true);
        setChosenDrinkId(id);
    };
    if (drinksStatus === 'loading') {
        return <p> LOADING</p>;
    } else if (drinksStatus === 'error') {
        dispatch(showError());
    }

    return (
        <div className='flex justify-between w-full p-5'>
            {allDrinks &&
                allDrinks.map((drink, index) => (
                    <div key={`${index}-${drink?.name}`}>
                        <p
                            data-testid={`detailedDrinkInfoBtn${index}`}
                            onClick={() => {
                                showDrinkInfo(drink._id);
                            }}>
                            {drink?.name}
                        </p>
                    </div>
                ))}
            {showMode && (
                <DrinkDetailedInfo
                    id={chosenDrinkId}
                    setShowMode={() => setShowMode(false)}
                />
            )}
        </div>
    );
};
export default Drinks;
