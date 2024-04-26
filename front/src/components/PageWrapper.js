import Navbar from './navbar/Navbar';
import React from 'react';
export const PageWrapper = ({ children }) => {
    return (
        <div className='selection:bg-secondary flex flex-col justify-between min-h-screen'>
            <Navbar />
            <div className='justify-self-start pb-10 max-h-[40vh] overflow-hidden'>
                <img src='/images/full_header.png' alt='' className='' />
            </div>
            <div className='overflow-x-hidden flex-1 flex flex-col'>
                {children}
            </div>
        </div>
    );
};
