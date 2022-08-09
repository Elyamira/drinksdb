import LoginButton from './LoginButton';
import { useAuth0 } from '@auth0/auth0-react';
import LogoutButton from './LogoutButton';
import RandomDrinkButton from './RandomDrinkButton';


const Navbar = () => {
    const {
        user,
        isAuthenticated,
    } = useAuth0();

    return <>
        <nav className='flex justify-between'>
            <div>
                <p>logo</p>
            </div>
            <ul className='flex gap-5'>
                {!isAuthenticated && <LoginButton />}
                {isAuthenticated && <button>My account({user.nickname})</button>}
                {isAuthenticated && console.log(user)}
                {isAuthenticated && <LogoutButton />}
                <li><RandomDrinkButton /></li>
                <li>See drinks by category</li>
            </ul>
        </nav>
    </>
}
export default Navbar;