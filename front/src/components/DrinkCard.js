import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth0 } from '@auth0/auth0-react';
import { useDispatch } from 'react-redux';
import { addToFavourites, removeFromFavs } from './slices/drinksSlice';
const motionRight = {
    rest: {
        scale: 1,
        originX: '100%',
    },
    hover: {
        scale: 0,
    },
};
const motionLeft = {
    rest: {
        scale: 0,
        originX: 0,
    },
    hover: {
        scale: 1,
    },
};
const textMotion = {
    rest: {
        x: 0,
    },
    hover: {
        x: 24,
    },
};
const DrinkCard = ({ drink, index, isInFavourites }) => {
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
            <div className='Card bg-primary h-full transition-colors group-hover:bg-[#fef0c1] group-hover:transition-colors'>
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
                            stroke-width='3'
                            fill='transparent'
                        />
                    </svg>
                </Link>
                <div className='text-neutral-800 bg-primary/70 flex justify-between p-5 w-full left-0 top-0 absolute '>
                    <h4 className='text-xl Card-title max-w-[90%]'>
                        {drink.name}
                    </h4>
                    {isAuthenticated && (
                        <button
                            className='absolute top-1/2 right-0 -translate-y-1/2 '
                            aria-label={`add-to-favs-${index}`}
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
                                class={`Heart ${
                                    isInFavourites ||
                                    (showLikeanimation.isAnimated &&
                                        showLikeanimation.index === index)
                                        ? 'is-active'
                                        : ''
                                }`}></div>
                        </button>
                    )}
                </div>
                <Link
                    to={`/recipes/${drink.name.toLowerCase()}`}
                    className='Card-content text-black flex flex-col flex-1'>
                    {/* <div className='Card-content text-black flex flex-col flex-1'> */}
                    <p className='px-5 pb-5'>Taste: {drink.taste}</p>
                    <motion.div
                        className='-ml-6 self-center flex-1 flex items-end z-40 text-primary'
                        initial='rest'
                        whileHover='hover'>
                        <motion.div
                            className=''
                            variants={motionLeft}
                            transition={{
                                ease: [0.63, 0, 0.33, 0.99],
                                duration: 0.38,
                            }}>
                            <div className='h-8 w-8 bg-quaternary rounded-full flex items-center justify-center'>
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                    strokeWidth={1.5}
                                    stroke='currentColor'
                                    className='w-4 h-4'>
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        d='M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3'
                                    />
                                </svg>
                            </div>
                        </motion.div>
                        <motion.div
                            variants={textMotion}
                            transition={{
                                ease: [0.63, 0, 0.33, 0.99],
                                duration: 0.38,
                            }}>
                            <p className='bg-quaternary w-max cursor-pointer rounded-2xl px-2.5 h-8 flex items-center -ml-6'>
                                Read the full recipe
                            </p>
                        </motion.div>

                        <motion.div
                            className='h-8 w-8 bg-quaternary rounded-full flex items-center justify-center'
                            variants={motionRight}
                            transition={{
                                ease: [0.63, 0, 0.33, 0.99],
                                duration: 0.38,
                            }}>
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 24 24'
                                strokeWidth={1.5}
                                stroke='currentColor'
                                className='w-4 h-4'>
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    d='M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3'
                                />
                            </svg>
                        </motion.div>
                    </motion.div>
                    {/* </div> */}
                </Link>
            </div>
        </div>
    );
};
export default DrinkCard;
