import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { filter } from './slices/drinksSlice';
import { resetFilter } from './slices/drinksSlice';

const Search = (props) => {
    const [searchedItem, setSearchedItem] = useState(null);
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
                <div class='relative w-60'>
                    <input
                        data-testid='home-search-input'
                        onChange={handleChange}
                        type='search'
                        id='searchBar'
                        class='block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-l-lg focus:outline-tertiary  focus-visible:outline-tertiary border-l-gray-50 border-l-2 border border-gray-300 focus:ring-tertiary'
                        placeholder='Search drink'
                        required
                    />
                </div>
                <button
                    data-testid='home-search-button'
                    type='submit'
                    class='top-0 right-0 p-2.5 text-sm font-medium text-white bg-tertiary rounded-r-lg border border-tertiary hover:bg-quaternary focus:ring-4 focus:outline-none focus:ring-tertiary '>
                    <svg
                        aria-hidden='true'
                        class='w-5 h-5'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                        xmlns='http://www.w3.org/2000/svg'>
                        <path
                            stroke-linecap='round'
                            stroke-linejoin='round'
                            stroke-width='2'
                            d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'></path>
                    </svg>
                </button>
            </div>
        </form>
    );
};
export default Search;
