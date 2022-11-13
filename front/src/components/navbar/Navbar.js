import LoginButton from './LoginButton';
import { useAuth0 } from '@auth0/auth0-react';
import LogoutButton from './LogoutButton';
import RandomDrinkButton from './RandomDrinkButton';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const { user, isAuthenticated } = useAuth0();

    return (
        <>
            <nav className='flex justify-between items-center p-5'>
                <div>
                    <Link to='/'>
                        <img
                            className='w-2/12'
                            src='/images/logo.svg'
                            alt='logo'
                        />
                    </Link>
                </div>
                <ul className='flex gap-5'>
                    {/* <li>My account({user?.nickname})</li> */}
                    <li>
                        <Link to='/'> Home</Link>
                    </li>

                    {!isAuthenticated && <LoginButton />}
                    {isAuthenticated && (
                        <li>
                            <img
                                className='rounded-full w-8/12'
                                src={user?.picture}
                                alt='your avatar'
                            />
                        </li>
                    )}
                    {isAuthenticated && (
                        <>
                            <li>
                                <LogoutButton />{' '}
                            </li>
                            <li>
                                <Link to='/favs'>My favourites</Link>
                            </li>
                        </>
                    )}
                    <li>
                        <RandomDrinkButton />
                    </li>
                </ul>
            </nav>
        </>
    );
};
export default Navbar;
