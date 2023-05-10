import React, { useEffect } from 'react';
import { fetchDrinks } from '../components/slices/drinksSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';
import { showError } from '../components/slices/popupErrorMessageSlice';
import DrinkCard from '../components/DrinkCard';
import Ticker from '../components/Ticker';
import Loader from '../components/Loader';

const Favs = () => {
    const { user } = useAuth0();
    const dispatch = useDispatch();
    const allDrinks = useSelector((state) => state.drinksData);
    const drinksStatus = useSelector((state) => state.drinksData.status);
    let creatorId;
    if (user) {
        creatorId = user.sub;
    }
    useEffect(() => {
        if (drinksStatus === 'idle') {
            dispatch(fetchDrinks());
        }
    }, [drinksStatus, dispatch]);
    const favouriteDrinks = allDrinks.drinks?.filter((drink) => {
        return drink.isInFavourites?.includes(creatorId);
    });

    if (drinksStatus === 'loading') {
        return <Loader />;
    } else if (drinksStatus === 'error') {
        dispatch(showError());
    }
    if (favouriteDrinks?.length === 0) {
        return (
            <Ticker
                firstLine="You haven't added"
                secondLine='any drinks to favourites'
                classes='pt-[10vh]'
            />
        );
    }
    if (favouriteDrinks?.length > 0) {
        return (
            <div className='w-full flex justify-center mt-10'>
                <div
                    className='flex flex-col items-center md:grid pb-12 lg:px-7 px-24'
                    style={{
                        width: '100%',
                        gridAutoRows: '1fr',
                        gridTemplateColumns:
                            'repeat(auto-fill, minmax(300px, 1fr))',
                        gridGap: '20px 20px',
                        justifyItems: 'center',
                    }}>
                    {favouriteDrinks?.map((drink, index) => (
                        <DrinkCard
                            drink={drink}
                            isInFavourites={true}
                            index={index}
                        />
                    ))}
                </div>
            </div>
        );
    }
};
export default Favs;
