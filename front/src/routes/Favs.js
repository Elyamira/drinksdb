import React from 'react';
import { useSelector } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';

const Favs = () => {
    const { user } = useAuth0();
    const allDrinks = useSelector((state) => state.drinksData);

    let creatorId;
    if (user) {
        creatorId = user.sub;
    }
    const favouriteDrinks = allDrinks.drinks?.filter((drink) => {
        return drink.isInFavourites.includes(creatorId);
    });

    return (
        <div>
            <p>My favs</p>
            {favouriteDrinks?.map((drink, index) => (
                <div key={index} className='flex gap-5'>
                    <p key={index}>{drink.name}</p>
                    <button
                        onClick={() => {
                            console.log('remove');
                        }}>
                        Remove From favourites
                    </button>
                </div>
            ))}
            {/* <Drinks drinksFromDb={favouriteDrinks} /> */}
        </div>
    );
};
export default Favs;
