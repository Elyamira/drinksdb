import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { filter } from './slices/drinksSlice';
import { resetFilter } from './slices/drinksSlice';

const Search = (props) => {
    const [searchedItem, setSearchedItem] = useState('');
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setSearchedItem(e.target.value);
    };
    const submitSearchForm = (e) => {
        e.preventDefault();
        props.onGetValue(searchedItem);
        dispatch(filter(searchedItem));
    };
    const showAllDrinks = () => {
        dispatch(resetFilter(''));
        setSearchedItem('');
        props.onReset();
    };
    useEffect(() => {
        if (searchedItem?.length === 0) {
            showAllDrinks();
        }
    }, [searchedItem?.length]);

    return (
        <form onSubmit={submitSearchForm}>
            <div className='relative flex'>
                <div className='relative w-44 sm:w-60'>
                    <input
                        data-testid='home-search-input'
                        onChange={handleChange}
                        id='searchBar'
                        value={searchedItem}
                        className='block p-2 sm:p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-l-lg focus:outline-tertiary  focus-visible:outline-tertiary  border-l-px border border-gray-300 focus:ring-tertiary'
                        placeholder='Search drink'
                    />
                    {searchedItem?.length > 1 && (
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth={1.5}
                            stroke='currentColor'
                            data-testid='home-reset-input'
                            onClick={() => {
                                setSearchedItem('');
                            }}
                            className='w-5 h-5 cursor-pointer absolute top-1/2 -translate-y-1/2 right-2 transition duration-200 ease-in-out transform hover:-translate-y-1/2 hover:scale-110'>
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                d='M6 18L18 6M6 6l12 12'
                            />
                        </svg>
                    )}
                </div>
                <button
                    data-testid='home-search-button'
                    type='submit'
                    className='top-0 right-0 p-2.5 text-sm font-medium text-white bg-tertiary rounded-r-lg border border-tertiary hover:bg-quaternary focus:ring-4 focus:outline-none focus:ring-tertiary '>
                    <svg
                        aria-hidden='true'
                        className='w-4 h-4 sm:w-5 sm:h-5'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                        xmlns='http://www.w3.org/2000/svg'>
                        <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='2'
                            d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'></path>
                    </svg>
                </button>
            </div>
        </form>
    );
};
export default Search;
