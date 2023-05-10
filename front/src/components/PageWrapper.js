import Navbar from './navbar/Navbar';
import React from 'react';
export const PageWrapper = ({ children }) => {
    return (
        <div className='selection:bg-secondary'>
            <Navbar />
            <div className='justify-self-start pb-10 max-h-[40vh] overflow-hidden'>
                <img src='/images/full_header.png' alt='' className='' />
            </div>
            <div className='min-h-[60vh] overflow-x-hidden'>{children}</div>
        </div>
    );
};
