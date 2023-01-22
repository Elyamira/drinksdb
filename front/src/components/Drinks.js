import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DrinkDetailedInfo from './SingleDrink';
import { selectAllDrinks, fetchDrinks } from './slices/drinksSlice';
import { showError } from './slices/popupErrorMessageSlice';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { addToFavourites, removeFromFavs } from './slices/drinksSlice';

const Drinks = ({ wordForFilter }) => {
    const dispatch = useDispatch();
    const [allDrinks, setAllDrinks] = useState();

    const drinks = useSelector(selectAllDrinks);
    const filteredDrinks = useSelector(
        (state) => state.drinksData.filteredDrinks
    );

    const drinksStatus = useSelector((state) => state.drinksData.status);
    const { isAuthenticated, user } = useAuth0();

    useEffect(() => {
        const drinksToShow = wordForFilter ? filteredDrinks : drinks;
        setAllDrinks(drinksToShow);
    }, [drinks, filteredDrinks]);

    useEffect(() => {
        if (drinksStatus === 'idle') {
            dispatch(fetchDrinks());
        }
    }, [drinksStatus, dispatch]);

    const handleAddToFavourites = async (name, personId) => {
        await dispatch(
            addToFavourites({
                name,
                personId,
            })
        ).unwrap();
    };
    const handleRemoveFromFavourites = async (name, personId) => {
        await dispatch(
            removeFromFavs({
                name,
                personId,
            })
        ).unwrap();
    };

    if (drinksStatus === 'loading') {
        return <p data-testid='loader'> LOADING</p>;
    } else if (drinksStatus === 'error') {
        dispatch(showError());
    }
    return (
        <div className='w-full'>
            <div className='flex gap-5 p-5 flex-wrap'>
                {allDrinks &&
                    allDrinks.map((drink, index) => {
                        const isInFavourites = drink.isInFavourites.includes(
                            user?.sub
                        );
                        return (
                            <div key={index} className='cursor-pointer'>
                                <div className='w-96  rounded-xl overflow-hidden bg-neutral-300 flex flex-col'>
                                    <div className='flex justify-between p-5 '>
                                        <p>{drink.name}</p>
                                        {isAuthenticated &&
                                            (!isInFavourites ? (
                                                <button
                                                    onClick={() =>
                                                        handleAddToFavourites(
                                                            drink.name,
                                                            user?.sub
                                                        )
                                                    }>
                                                    <img
                                                        className='h-5 w-5'
                                                        src='/images/black_heart_icon.svg'
                                                        alt='add to favourites'></img>
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() =>
                                                        handleRemoveFromFavourites(
                                                            drink.name,
                                                            user?.sub
                                                        )
                                                    }>
                                                    <img
                                                        className='h-5 w-5'
                                                        src='/images/red_heart.svg'
                                                        alt='Remove from favourites'></img>
                                                </button>
                                            ))}
                                    </div>
                                    <img
                                        className='w-full h-56'
                                        src={`${drink.image}`}
                                        alt={drink.name}
                                    />
                                    <p className='p-5'>Taste: {drink.taste}</p>
                                    <div className='self-center pb-5'>
                                        <Link
                                            to={`/recipes/${drink.name.toLowerCase()}`}>
                                            Read the full recipe
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
};
export default Drinks;
