import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteDrink } from '../components/slices/drinksSlice';
import { useDispatch } from 'react-redux';

export const MyAccount = () => {
    const { user } = useAuth0();
    const allDrinks = useSelector((state) => state.drinksData);
    let creatorId;
    const dispatch = useDispatch();
    if (user) {
        creatorId = user.sub;
    }
    const drinksAddedByUser = allDrinks.drinks?.filter((drink) => {
        return drink.isInFavourites.includes(creatorId);
    });

    const onHandleDeleteDrink = async (name) => {
        await dispatch(deleteDrink({ name })).unwrap();
    };
    return (
        <div>
            <h1>My Account</h1>
            <div>
                <button
                    onClick={() => {
                        console.log('change image');
                    }}>
                    Change account's image
                </button>
                <h2>Drinks added by you</h2>
                {drinksAddedByUser.map((drink, idx) => {
                    return (
                        <div key={idx} className='flex gap-5'>
                            <p>{drink.name}</p>
                            <Link
                                to={`/account/edit-recipe/${drink.name.toLowerCase()}`}>
                                Edit recipe
                            </Link>
                            <button
                                onClick={() => onHandleDeleteDrink(drink.name)}>
                                Delete drink from website
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
