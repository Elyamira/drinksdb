import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Drinks from '../components/Drinks';
import ResetFilterButton from '../components/ReseteFilterButton';
import Search from '../components/Search';
import { filter, resetFilter } from '../components/slices/drinksSlice';
import AddNewDrinkButton from '../features/AddNewDrinkButton';
import { useAuth0 } from '@auth0/auth0-react';
import { motion } from 'framer-motion';
import RandomDrinkButton from '../components/navbar/RandomDrinkButton';

const Home = () => {
    const [wordForFilter, setWordForFilter] = useState('');
    const drinksCategories = [
        'All Drinks',
        'Hot',
        'Cold',
        'Party',
        'Mocktails',
        'Tea',
    ];
    const getSearchedValue = (value) => {
        setWordForFilter(value);
    };
    const { isAuthenticated } = useAuth0();
    const [activeCategoryIdx, setActiveCategoryIdx] = useState(0);
    const dispatch = useDispatch();
    const navigationRef = useRef();

    const children = navigationRef?.current
        ? Array.from(navigationRef.current.children)
        : [];
    const [x, setX] = useState(null);
    // useEffect(() => {
    //     if (x === null && children.length > 0) {
    //         setX(
    //             children[0].getBoundingClientRect().left +
    //                 children[0]?.getBoundingClientRect().width / 2 -
    //                 10
    //         );
    //     }
    // }, [x, children.length]);

    // const errorStatus = useSelector((state) => state.errorPopup.status);
    return (
        <div className='flex flex-col space-between h-full'>
            {/* {errorStatus && <p>ERROR</p>} */}
            <main className='h-full flex flex-col justify-center items-center'>
                <div className='fixed top-[72px] bg-primary/70 w-full flex flex-col items-center py-5 z-40'>
                    <div
                        onMouseLeave={() => setX(null)}
                        className='drinks-navigation flex gap-5 capitalize justify-center relative w-full pb-5'
                        ref={navigationRef}>
                        {drinksCategories.map((category, idx) => (
                            <div className='relative'>
                                <h2
                                    className={`${
                                        idx === activeCategoryIdx
                                            ? 'font-bold'
                                            : ''
                                    } cursor-pointer transition-all duration-300 hover:font-bold font-lato text-xl`}
                                    onMouseEnter={(e) => {
                                        setX(
                                            children[
                                                idx
                                            ]?.getBoundingClientRect().left +
                                                children[
                                                    idx
                                                ]?.getBoundingClientRect()
                                                    .width /
                                                    2 -
                                                10
                                        );
                                    }}
                                    key={idx}
                                    onClick={() => {
                                        if (category === 'All Drinks') {
                                            dispatch(resetFilter(''));
                                            setWordForFilter('');
                                            setActiveCategoryIdx(0);
                                        } else {
                                            dispatch(resetFilter(''));
                                            dispatch(filter(category));
                                            setWordForFilter(category);
                                            setActiveCategoryIdx(idx);
                                        }
                                    }}>
                                    {category}
                                </h2>
                                {idx === activeCategoryIdx && (
                                    <div>
                                        <svg
                                            viewBox='0 0 100 100'
                                            className={`absolute top-[100%] h-5 left-1/2 -translate-x-1/2 `}>
                                            <circle
                                                className='blob fill-tertiary'
                                                cx='50'
                                                cy='50'
                                                r='50'></circle>
                                        </svg>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                    {x !== null && (
                        <motion.svg
                            animate={{ x }}
                            viewBox='0 0 100 100'
                            className={`absolute top-12 h-5 left-0 `}>
                            <circle
                                className='blob fill-tertiary/50'
                                cx='50'
                                cy='50'
                                r='50'></circle>
                        </motion.svg>
                    )}
                    <div className='flex items-center gap-3'>
                        <div className='py-3'>
                            <Search
                                onGetValue={(value) => getSearchedValue(value)}
                                onReset={() => setWordForFilter('')}
                            />
                        </div>
                        <div className='flex items-center'>
                            <RandomDrinkButton />
                            {/* {
                                isAuthenticated &&  */}
                            <AddNewDrinkButton />
                            {/* : (
                                    <p>Log in to add a new drink</p>
                                )
                            } */}
                        </div>
                    </div>
                </div>
                <Drinks wordForFilter={wordForFilter} />
            </main>
        </div>
    );
};
export default Home;
