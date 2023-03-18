import { useAuth0 } from '@auth0/auth0-react';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteDrink } from '../components/slices/drinksSlice';
import { useDispatch } from 'react-redux';
import { fetchDrinks } from '../components/slices/drinksSlice';

export const MyAccount = () => {
    const { user } = useAuth0();
    const allDrinks = useSelector((state) => state.drinksData);
    let currentUserId;
    if (user) {
        currentUserId = user.sub;
    }
    const drinksAddedByUser = allDrinks.drinks?.filter((drink) => {
        return drink.creatorId === currentUserId;
    });
    const dispatch = useDispatch();
    const drinksStatus = useSelector((state) => state.drinksData.status);

    useEffect(() => {
        if (drinksStatus === 'idle') {
            dispatch(fetchDrinks());
        }
    }, [drinksStatus, dispatch]);

    const onHandleDeleteDrink = async (name) => {
        await dispatch(deleteDrink({ name })).unwrap();
    };
    if (!user) {
        return (
            <div>
                <h2>
                    Please log in to see your account details and manage drinks
                </h2>
            </div>
        );
    }
    return (
        <div>
            <h2>My Account</h2>
            <div>
                {/* <button
                    onClick={() => {
                        console.log('change image');
                    }}>
                    Change account's image
                </button> */}

                <h3>Drinks added by you</h3>
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
