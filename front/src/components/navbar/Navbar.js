import React from 'react';
import LoginButton from './LoginButton';
import { useAuth0 } from '@auth0/auth0-react';
import LogoutButton from './LogoutButton';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import MobileNavigation from './MobileNav';

const Navbar = ({ setNewLocation }) => {
    const [openMobileNav, setOpenMobileNav] = React.useState(false);
    const { user, isAuthenticated } = useAuth0();
    const location = useLocation();
    const menuItems = [
        { label: 'Home', link: 'home' },
        { label: 'My favorites', link: 'favs' },
    ];

    return (
        <div>
            <nav className='hidden sm:flex justify-between items-center fixed px-5 py-3 w-full  bg-primary/70 0 border-b-2 border-secondary z-50'>
                <ul className='flex gap-5 items-center flex-1'>
                    <li className='font-satisfy text-5xl text-tertiary cursor-default'>
                        Sober Party
                    </li>
                    <li
                        className={`relative after:absolute font-lato text-xl md:text-2xl after:w-full after:h-1 after:bg-quaternary after:bottom-0 after:left-0
                    ${
                        location.pathname === '/'
                            ? 'after:scale-x-100 font-bold'
                            : 'after:scale-x-0 after:origin-bottom-right after:transition-transform after:duration-200 after:ease-out hover:after:scale-x-100 hover:after:origin-bottom-left'
                    }
                    `}>
                        <Link to='/' onClick={() => setNewLocation('/')}>
                            Home
                        </Link>
                    </li>
                    {isAuthenticated && (
                        <li
                            className={`min-w-max relative after:absolute font-lato text-xl md:text-2xl after:w-full after:h-1 after:bg-quaternary after:bottom-0 after:left-0 ${
                                location.pathname === '/favs'
                                    ? 'after:scale-x-100 font-bold'
                                    : 'after:scale-x-0 after:origin-bottom-right after:transition-transform after:duration-200 after:ease-out hover:after:scale-x-100 hover:after:origin-bottom-left'
                            }`}>
                            <Link
                                to='/favs'
                                onClick={() => setNewLocation('/favs')}>
                                My favourites
                            </Link>
                        </li>
                    )}

                    {isAuthenticated && (
                        <li
                            className={`${
                                location.pathname === '/my-account' &&
                                !location.search.length
                                    ? 'after:scale-x-100 font-bold'
                                    : 'after:scale-x-0 after:origin-bottom-right after:transition-transform after:duration-200 after:ease-out hover:after:scale-x-100 hover:after:origin-bottom-left'
                            } min-w-max relative after:absolute font-lato text-xl md:text-2xl after:w-full after:h-1 after:bg-quaternary after:bottom-0 after:left-0
                        `}>
                            <Link
                                to='my-account'
                                onClick={() => setNewLocation('/my-account')}>
                                My account
                            </Link>
                        </li>
                    )}
                </ul>
                <div className='h-12 relative group flex items-center'>
                    {!isAuthenticated && (
                        <ul>
                            <li className=' min-w-max relative text-xl md:text-2xl after:absolute after:w-full after:h-1 after:bg-quaternary after:bottom-0 after:left-0 after:scale-x-0 after:origin-bottom-right after:transition-transform after:duration-200 after:ease-out hover:after:scale-x-100 hover:after:origin-bottom-left'>
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
                    <ul
                        className={`absolute top-12 w-48 group-hover:block hidden right-0 z-[60] overflow-visible flex-col justify-center pb-3
                    `}>
                        <li className='pt-3 px-3 origin-center rounded-t-lg animate-[slideDown_300ms_60ms_ease-in-out_forwards] bg-tertiary  min-w-max relative after:absolute after:w-full after:h-1 after:bg-quaternary after:bottom-0 after:left-0 after:scale-x-0 after:origin-bottom-right after:transition-transform after:duration-200 after:ease-out hover:after:scale-x-100 hover:after:origin-bottom-left'>
                            <Link
                                to='my-account'
                                onClick={() => setNewLocation('/my-account')}>
                                My Account
                            </Link>
                        </li>
                        <li className='origin-center pt-3 px-3 pb-3 border-b-3 rounded-b-lg animate-[slideDown_300ms_120ms_ease-in-out_forwards] bg-tertiary  min-w-max relative after:absolute after:w-full after:h-1 after:bg-quaternary after:bottom-3 after:left-0 after:scale-x-0 after:origin-bottom-right after:transition-transform after:duration-200 after:ease-out hover:after:scale-x-100 hover:after:origin-bottom-left'>
                            <LogoutButton />
                        </li>
                    </ul>
                </div>
            </nav>
            <nav className='flex sm:hidden justify-between items-center fixed px-5 py-3 w-full  bg-primary/70 0 border-b-2 border-secondary z-50'>
                <p className='font-satisfy text-2xl text-tertiary cursor-default'>
                    Sober Party
                </p>
                <div className='z-[50] cursor-pointer transition duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-110'>
                    <svg
                        onClick={() => {
                            setOpenMobileNav((prev) => !prev);
                        }}
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={1.5}
                        stroke='currentColor'
                        className='w-6 h-6'>
                        <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
                        />
                    </svg>
                </div>
                <MobileNavigation
                    open={openMobileNav}
                    menuItems={menuItems}
                    setNewLocation={setNewLocation}
                />
            </nav>
        </div>
    );
};
export default Navbar;
