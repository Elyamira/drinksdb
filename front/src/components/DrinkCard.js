import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { useDispatch } from 'react-redux';
import { addToFavourites, removeFromFavs } from './slices/drinksSlice';
import CTAButton from './CTAButton';
import DeleteDrinkButton from './DeleteDrinkButton';

const DrinkCard = ({
    drink,
    index,
    isInFavourites,
    isWithUserButtons = true,
}) => {
    const { isAuthenticated, user } = useAuth0();
    const [showLikeanimation, setShowLikeAnimation] = useState({
        isAnimated: false,
        index: null,
    });
    const dispatch = useDispatch();
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

    return (
        <div className='group rounded-xl bg-primary flex flex-col h-full min-w-[320px] max-w-[380px] w-full'>
            <div className='Card bg-primary h-full transition-colors group-hover:bg-[#fef0c1] group-hover:transition-colors relative'>
                <Link to={`/recipes/${drink.name.toLowerCase()}`}>
                    <div className='Card-image-container'>
                        <img
                            className='Card-image w-full object-cover object-left-top h-64'
                            src={`${drink.image}`}
                            alt=''
                        />
                    </div>
                    <svg className='Card-svg' viewBox='0 0 800 500'>
                        <path
                            className='fill-primary transition-colors group-hover:fill-[#fef0c1] group-hover:transition-colors'
                            d='M 0 100 Q 50 200 100 250 Q 250 400 350 300 C 400 250 550 150 650 300 Q 750 450 800 400 L 800 500 L 0 500'
                            stroke='transparent'
                        />
                        <path
                            className='Card-line'
                            d='M 0 100 Q 50 200 100 250 Q 250 400 350 300 C 400 250 550 150 650 300 Q 750 450 800 400'
                            stroke='pink'
                            strokeWidth='3'
                            fill='transparent'
                        />
                    </svg>
                </Link>
                <div className='text-neutral-800 bg-primary/70 flex justify-between p-5 w-full left-0 top-0 absolute '>
                    <h4 className='text-xl Card-title max-w-[90%]'>
                        {drink.name}
                    </h4>
                    {isWithUserButtons && isAuthenticated && (
                        <button
                            className='absolute top-1/2 right-0 -translate-y-1/2 '
                            aria-label={
                                showLikeanimation.isAnimated &&
                                showLikeanimation.index === index
                                    ? `add-to-favs-${index}`
                                    : `remove-from-favs-${index}`
                            }
                            onClick={() =>
                                isInFavourites ||
                                (showLikeanimation.isAnimated &&
                                    showLikeanimation.index === index)
                                    ? handleRemoveFromFavourites(
                                          drink.name,
                                          user?.sub
                                      )
                                    : handleAddToFavourites(
                                          drink.name,
                                          user?.sub
                                      )
                            }>
                            <div
                                onClick={() => {
                                    isInFavourites ||
                                    (showLikeanimation.isAnimated &&
                                        showLikeanimation.index === index)
                                        ? setShowLikeAnimation({
                                              isAnimated: false,
                                              index: index,
                                          })
                                        : setShowLikeAnimation({
                                              isAnimated: true,
                                              index: index,
                                          });
                                }}
                                className={`Heart ${
                                    isInFavourites ||
                                    (showLikeanimation.isAnimated &&
                                        showLikeanimation.index === index)
                                        ? 'is-active'
                                        : ''
                                }`}></div>
                        </button>
                    )}
                </div>
                {isWithUserButtons ? (
                    <Link
                        to={`/recipes/${drink.name.toLowerCase()}`}
                        className='Card-content text-black flex flex-col flex-1'>
                        <p className='px-5 pb-5'>Taste: {drink.taste}</p>
                        <CTAButton label='Read the full recipe' />
                    </Link>
                ) : (
                    <div className='Card-content text-black flex flex-col flex-1'>
                        <p className='px-5 pb-5'>Taste: {drink.taste}</p>
                        <div className='self-center flex-1 flex items-center flex-col justify-end'>
                            <Link
                                to={`/account/edit-recipe/${drink.name.toLowerCase()}`}>
                                <div className='flex'>
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        fill='none'
                                        viewBox='0 0 24 24'
                                        strokeWidth={1.5}
                                        stroke='currentColor'
                                        className='w-6 h-6 text-quaternary transition duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-110'>
                                        <path
                                            strokeLinecap='round'
                                            strokeLinejoin='round'
                                            d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10'
                                        />
                                    </svg>
                                    Edit recipe
                                </div>
                            </Link>
                            <DeleteDrinkButton drinkName={drink.name} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
export default DrinkCard;
