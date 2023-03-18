import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Drinks from '../components/Drinks';
import ResetFilterButton from '../components/ReseteFilterButton';
import Search from '../components/Search';
import { filter, resetFilter } from '../components/slices/drinksSlice';
import AddNewDrinkButton from '../features/AddNewDrinkButton';
import { useAuth0 } from '@auth0/auth0-react';

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
    const dispatch = useDispatch();
    // const errorStatus = useSelector((state) => state.errorPopup.status);

    return (
        <div className='flex flex-col space-between h-full'>
            {/* {errorStatus && <p>ERROR</p>} */}
            <main className='h-full flex flex-col justify-center items-center'>
                <div className='flex gap-5 capitalize'>
                    {drinksCategories.map((category, idx) => (
                        <h2
                            className='cursor-pointer'
                            key={idx}
                            onClick={() => {
                                if (category === 'All Drinks') {
                                    dispatch(resetFilter(''));
                                    setWordForFilter('');
                                } else {
                                    dispatch(resetFilter(''));
                                    dispatch(filter(category));
                                    setWordForFilter(category);
                                }
                            }}>
                            {category}
                        </h2>
                    ))}
                </div>
                {isAuthenticated ? (
                    <AddNewDrinkButton />
                ) : (
                    <p>Log in to add a new drink</p>
                )}
                <Search onGetValue={(value) => getSearchedValue(value)} />
                {wordForFilter.length > 0 && (
                    <ResetFilterButton onReset={() => setWordForFilter('')} />
                )}
                <Drinks wordForFilter={wordForFilter} />
            </main>
        </div>
    );
};
export default Home;
