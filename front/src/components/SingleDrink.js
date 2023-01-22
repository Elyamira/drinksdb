import React from 'react';
import Modal from './modal/Modal';
import { useSelector } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToFavourites, removeFromFavs } from './slices/drinksSlice';

const DrinkDetailedInfo = (props) => {
    const { isAuthenticated, user } = useAuth0();
    const dispatch = useDispatch();
    const drinks = useSelector((state) => state.drinksData?.drinks);
    const chosenDrink = drinks?.find((drink) => drink._id === props.id);
    const [isEditionMode, setIsEditionMode] = useState(false);

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

    const isInFavourites = chosenDrink.isInFavourites.includes(user?.sub);
    return (
        <Modal>
            <div className='drink-detailed-info'>
                <button
                    className='absolute top-0 right-1'
                    onClick={() => props.setShowMode()}>
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-6 w-6'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'>
                        <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M6 18L18 6M6 6l12 12'
                        />
                    </svg>
                </button>
                {!isEditionMode && (
                    <>
                        <p data-testid={chosenDrink.name}>
                            Drink name: {chosenDrink.name}
                        </p>
                        <p data-testid={chosenDrink.taste}>
                            Drink taste: {chosenDrink.taste}
                        </p>
                    </>
                )}
                <div className='flex flex-col'>
                    {isAuthenticated &&
                        (!isInFavourites ? (
                            <button
                                onClick={() =>
                                    handleAddToFavourites(
                                        chosenDrink.name,
                                        user?.sub
                                    )
                                }>
                                Add to favourites
                            </button>
                        ) : (
                            <button
                                onClick={() =>
                                    handleRemoveFromFavourites(
                                        chosenDrink.name,
                                        user?.sub
                                    )
                                }>
                                Remove from favourites
                            </button>
                        ))}
                    {user?.sub && user.sub === chosenDrink.creatorId && (
                        <button onClick={setIsEditionMode}>Edit</button>
                    )}
                    <div>
                        <Link to={`/recipes/${chosenDrink.name.toLowerCase()}`}>
                            Read the full recipe
                        </Link>
                    </div>
                </div>
            </div>
        </Modal>
    );
};
export default DrinkDetailedInfo;
