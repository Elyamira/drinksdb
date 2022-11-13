import Navbar from '../components/navbar/Navbar';
import Drinks from '../components/Drinks';
import { selectAllDrinks } from '../components/slices/drinksSlice';
import { useSelector } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';

const Favs = () => {
    const allDrinks = useSelector(selectAllDrinks);
    const {
        user,
        isAuthenticated,
    } = useAuth0();
    const drinksForThisUser = allDrinks.filter(drink => drink.creatorId === user.creatorId)

    return <div>
        <Navbar />
        <p>My favs</p>
        <Drinks drinksFromDb={drinksForThisUser} />

    </div>
}
export default Favs;