import React, { useState } from 'react';
// import drinks from './drinks.json'
// import { showDetails } from './drinksSlice';
import { useDispatch, useSelector } from 'react-redux';
import DrinkDetailedInfo from './SingleDrink';
import Modal from './Modal';
import { useAuth0 } from '@auth0/auth0-react';
const Drinks = () => {
    const {
        isAuthenticated,
    } = useAuth0();

    const dispatch = useDispatch();
    const [showMode, setShowMode] = useState(false);
    const [chosenDrinkId, setChosenDrinkId] = useState("");
    const drinks = useSelector(state => state.drinksData.drinks);
    const filteredDrinks = useSelector(state => state.drinksData.filteredDrinks)

    // const DrinkDetailedInfo = (props) => {
    //     const chosenDrink = drinks.find(drink => drink.id === props.id)
    //     return <Modal>
    //         <div className='drink-detailed-info'>
    //             <button className='absolute top-0 right-1' onClick={() =>setShowMode(false)}>
    //                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    //                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    //                 </svg>
    //             </button>
    //             <p>Drink name: {chosenDrink.name}</p>
    //             <p>Drink taste: {chosenDrink.taste}</p>
    //             {isAuthenticated && <button>Add to favourites</button>}

    //         </div>
    //     </Modal>
    // }
    const showDrinkInfo = (id) => {
        setShowMode(true)
        setChosenDrinkId(id)
        // dispatch(showDetails(id));
    }
    // console.log(filteredDrinks.length)

    return <div className="flex justify-between w-full">
        {
            (filteredDrinks.length > 0 ? filteredDrinks : drinks).map((drink, index) =>
                <div key={`${index}-${drink.name}`}><p data-testid={`detailedDrinkInfoBtn${index}`} onClick={() => showDrinkInfo(drink.id)}>{drink.name}</p></div>)
        }
        {
            showMode ? <DrinkDetailedInfo id={chosenDrinkId} setShowMode={() => setShowMode(false)} />
                : null
        }
    </div>
}
export default Drinks;