import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';

const MobileNavigation = ({ open, setNewLocation }) => {
    const location = useLocation();
    const { isAuthenticated } = useAuth0();
    const mobileNavigationVariants = {
        hidden: {
            opacity: 0,
            transition: {
                duration: 0.2,
            },
            transitionEnd: {
                display: 'none',
            },
        },
        show: {
            opacity: 1,
            display: 'flex',
            transition: {
                duration: 0.2,
                delayChildren: 0.2,
                staggerChildren: 0.02,
            },
        },
    };

    return (
        <motion.div
            variants={mobileNavigationVariants}
            initial='hidden'
            animate={open ? 'show' : 'hidden'}
            className={`${
                open ? '' : 'hidden'
            } bg-primary fixed top-0 left-0 z-40 h-screen w-screen flex-col justify-between px-5`}>
            <ul className='mt-[20vh] flex flex-col items-center gap-5'>
                <li
                    className={`relative after:absolute font-lato text-4xl after:w-full after:h-1 after:bg-quaternary after:bottom-0 after:left-0
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
                        className={`min-w-max relative after:absolute font-lato text-4xl after:w-full after:h-1 after:bg-quaternary after:bottom-0 after:left-0 ${
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
                        } min-w-max relative after:absolute font-lato text-4xl after:w-full after:h-1 after:bg-quaternary after:bottom-0 after:left-0
                        `}>
                        <Link
                            to='my-account'
                            onClick={() => setNewLocation('/my-account')}>
                            My account
                        </Link>
                    </li>
                )}
                {!isAuthenticated && (
                    <li className='relative after:absolute font-lato text-4xl after:w-full after:h-1 after:bg-quaternary after:bottom-0 after:left-0 after:scale-x-0 after:origin-bottom-right after:transition-transform after:duration-200 after:ease-out hover:after:scale-x-100 hover:after:origin-bottom-left'>
                        <LoginButton />
                    </li>
                )}
                {isAuthenticated && (
                    <li className='relative after:absolute font-lato text-4xl after:w-full after:h-1 after:bg-quaternary after:bottom-0 after:left-0 after:scale-x-0 after:origin-bottom-right after:transition-transform after:duration-200 after:ease-out hover:after:scale-x-100 hover:after:origin-bottom-left'>
                        <LogoutButton />
                    </li>
                )}
            </ul>
        </motion.div>
    );
};
export default MobileNavigation;
