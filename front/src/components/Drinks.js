import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllDrinks, fetchDrinks } from './slices/drinksSlice';
import { showError } from './slices/popupErrorMessageSlice';
import { useAuth0 } from '@auth0/auth0-react';
import './Drinks.css';
import DrinkCard from './DrinkCard';
import Loader from './Loader';

const Drinks = ({ wordForFilter }) => {
    const dispatch = useDispatch();
    const [allDrinks, setAllDrinks] = useState();

    const drinks = useSelector(selectAllDrinks);
    const filteredDrinks = useSelector(
        (state) => state.drinksData.filteredDrinks
    );

    const drinksStatus = useSelector((state) => state.drinksData.status);
    const { user } = useAuth0();

    useEffect(() => {
        const drinksToShow = wordForFilter ? filteredDrinks : drinks;
        setAllDrinks(drinksToShow);
    }, [drinks, filteredDrinks, wordForFilter]);

    useEffect(() => {
        if (drinksStatus === 'idle') {
            dispatch(fetchDrinks());
        }
    }, [drinksStatus, dispatch]);

    if (drinksStatus === 'loading') {
        return <Loader />;
    } else if (drinksStatus === 'error') {
        dispatch(showError());
    }

    return (
        <div className='w-full flex justify-center pt-20 sm:pt-10'>
            {allDrinks && (
                <div
                    className='flex justify-center flex-col items-center md:grid pb-12 lg:px-7 px-24'
                    style={{
                        width: '100%',
                        gridAutoRows: '1fr',
                        gridTemplateColumns:
                            'repeat(auto-fill, minmax(300px, 1fr))',
                        gridGap: '20px 20px',
                        justifyItems: 'center',
                    }}>
                    {allDrinks.map((drink, index) => {
                        const isInFavourites = drink?.isInFavourites?.includes(
                            user?.sub
                        );
                        return (
                            <DrinkCard
                                key={index}
                                drink={drink}
                                index={index}
                                isInFavourites={isInFavourites}
                            />
                        );
                    })}
                </div>
            )}
        </div>
    );
};
export default Drinks;
