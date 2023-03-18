import React, { useEffect } from 'react';
import { fetchDrinks } from '../components/slices/drinksSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';
import { showError } from '../components/slices/popupErrorMessageSlice';
import { removeFromFavs } from '../components/slices/drinksSlice';

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
        return <p data-testid='loader'> LOADING</p>;
    } else if (drinksStatus === 'error') {
        dispatch(showError());
    }
    const handleRemoveFromFavourites = async (name, personId) => {
        await dispatch(
            removeFromFavs({
                name,
                personId,
            })
        ).unwrap();
    };
    return (
        <div>
            <h2>My favs</h2>
            {favouriteDrinks?.map((drink, index) => (
                <div key={index} className='flex gap-5'>
                    <p key={index}>{drink.name}</p>
                    <button
                        onClick={() => {
                            handleRemoveFromFavourites(drink.name, creatorId);
                        }}>
                        Remove From favourites
                    </button>
                </div>
            ))}
        </div>
    );
};
export default Favs;
