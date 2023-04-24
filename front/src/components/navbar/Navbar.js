import React, { useState } from 'react';
import LoginButton from './LoginButton';
import { useAuth0 } from '@auth0/auth0-react';
import LogoutButton from './LogoutButton';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const Navbar = () => {
    const { user, isAuthenticated } = useAuth0();
    const [isDropdownShown, setIsDropdownShown] = useState(true);
    const location = useLocation();
    return (
        <nav className='flex justify-between items-center fixed px-5 py-3 w-full  bg-primary/70 0 border-b-2 border-secondary z-50'>
            <ul className='flex gap-5 items-center flex-1'>
                <li className='font-satisfy text-5xl text-tertiary'>
                    Sober Party
                </li>
                <li
                    className={`relative after:absolute font-lato text-2xl after:w-full after:h-1 after:bg-quaternary after:bottom-0 after:left-0
                    ${
                        location.pathname === '/'
                            ? 'after:scale-x-100 font-bold'
                            : 'after:scale-x-0 after:origin-bottom-right after:transition-transform after:duration-200 after:ease-out hover:after:scale-x-100 hover:after:origin-bottom-left'
                    }
                    `}>
                    <Link to='/'> Home</Link>
                </li>
                {isAuthenticated && (
                    <li
                        className={`min-w-max relative after:absolute  font-lato text-2xl after:w-full after:h-1 after:bg-quaternary after:bottom-0 after:left-0 ${
                            location.pathname === '/favs'
                                ? 'after:scale-x-100 font-bold'
                                : 'after:scale-x-0 after:origin-bottom-right after:transition-transform after:duration-200 after:ease-out hover:after:scale-x-100 hover:after:origin-bottom-left'
                        }`}>
                        <Link to='/favs'>My favourites</Link>
                    </li>
                )}

                {isAuthenticated && (
                    <li
                        className={`${
                            location.pathname === '/my-account' &&
                            !location.search.length
                                ? 'after:scale-x-100 font-bold'
                                : 'after:scale-x-0 after:origin-bottom-right after:transition-transform after:duration-200 after:ease-out hover:after:scale-x-100 hover:after:origin-bottom-left'
                        } relative after:absolute font-lato  text-2xl after:w-full after:h-1 after:bg-quaternary after:bottom-0 after:left-0
                        `}>
                        <Link to='/my-account'>My account</Link>
                    </li>
                )}
                {/* {isAuthenticated && (
                    <li
                        className={`${
                            location.pathname === '/my-account' &&
                            !location.search.length
                                ? 'underline'
                                : ''
                        } relative after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bg-yellow-500 after:bottom-0 after:left-0 after:origin-bottom-right after:transition-transform after:duration-200 after:ease-out hover:after:scale-x-100
                        hover:after:origin-bottom-left 
                        `}>
                        <Link to='/my-account'>
                            <div className='w-12 h-12'>
                                <img
                                    className='rounded-full min-w-full'
                                    src={user?.picture}
                                    alt='your avatar'
                                />
                            </div>
                        </Link>
                    </li>
                )} */}
            </ul>
            <div className='h-12 relative group'>
                {!isAuthenticated && (
                    <ul>
                        <li className=' min-w-max relative after:absolute after:w-full after:h-1 after:bg-quaternary after:bottom-0 after:left-0 after:scale-x-0 after:origin-bottom-right after:transition-transform after:duration-200 after:ease-out hover:after:scale-x-100 hover:after:origin-bottom-left'>
                            <LoginButton />
                        </li>
                    </ul>
                )}
            </div>
            <div className='h-12 relative group'>
                {isAuthenticated && (
                    <div className=''>
                        <div className='w-12 h-12'>
                            <img
                                className='rounded-full min-w-full'
                                src={user?.picture}
                                alt='your avatar'
                            />
                        </div>
                    </div>
                )}
                <div
                    className={`absolute top-12 w-48 group-hover:block hidden right-0 z-[60] overflow-visible bg-tertiary rounded-lg p-3 flex-col justify-center 
                    `}>
                    <ul>
                        <li className=' min-w-max relative after:absolute after:w-full after:h-1 after:bg-quaternary after:bottom-0 after:left-0 after:scale-x-0 after:origin-bottom-right after:transition-transform after:duration-200 after:ease-out hover:after:scale-x-100 hover:after:origin-bottom-left'>
                            <Link to='/my-account'>My Account</Link>
                        </li>
                        <li className=' min-w-max relative after:absolute after:w-full after:h-1 after:bg-quaternary after:bottom-0 after:left-0 after:scale-x-0 after:origin-bottom-right after:transition-transform after:duration-200 after:ease-out hover:after:scale-x-100 hover:after:origin-bottom-left'>
                            <LogoutButton />
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};
export default Navbar;
