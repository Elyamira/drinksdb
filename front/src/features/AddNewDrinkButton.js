import React from 'react';
import { Link } from 'react-router-dom';
const AddNewDrinkButton = () => (
    <Link to='/recipes/add-recipe'>
        <svg
            data-testid='add-recipe'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-10 h-10 sm:w-12 sm:h-12 text-quaternary transition duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-110'>
            <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z'
            />
        </svg>
    </Link>
);
export default AddNewDrinkButton;
