import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { filter } from './slices/drinksSlice';
const Search = (props) => {
    const [searchedItem, setSearchedItem] = useState('');
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setSearchedItem(e.target.value);
    };
    const submitSearchForm = (e) => {
        e.preventDefault();
        props.onGetValue(searchedItem);
        setSearchedItem('');
        dispatch(filter(searchedItem));
    };
    return (
        <form onSubmit={submitSearchForm}>
            <label htmlFor='searchBar'></label>
            <input
                id='searchBar'
                className='border border-sky-500'
                onChange={handleChange}
                value={searchedItem}
                data-testid='home-search-input'></input>
            <button type='submit' data-testid='home-search-button'>
                Search!
            </button>
        </form>
    );
};
export default Search;
