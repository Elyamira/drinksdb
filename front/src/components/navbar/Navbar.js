import React from 'react';
import LoginButton from './LoginButton';
import { useAuth0 } from '@auth0/auth0-react';
import LogoutButton from './LogoutButton';
import RandomDrinkButton from './RandomDrinkButton';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const { user, isAuthenticated } = useAuth0();
    return (
        <nav className='flex justify-between items-center fixed p-5 w-full  bg-white/70'>
            <div>
                <Link to='/' data-testid='my-profile-link'>
                    <img
                        className='w-24 h-24'
                        src='/images/logo.svg'
                        alt='logo'
                    />
                </Link>
            </div>
            <ul className='flex gap-5 items-center'>
                {!isAuthenticated && <LoginButton />}

                {isAuthenticated && (
                    <>
                        <li>
                            <LogoutButton />
                        </li>
                        <li className='min-w-max'>
                            <Link to='/favs'>My favourites</Link>
                        </li>
                    </>
                )}
                <li>
                    <Link to='/'> Home</Link>
                </li>
                <li>
                    <RandomDrinkButton />
                </li>
                {isAuthenticated && (
                    <li>
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
                )}
            </ul>
        </nav>
    );
};
export default Navbar;
