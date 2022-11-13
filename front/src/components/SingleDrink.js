import Modal from './modal/Modal';
import { useSelector } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';
import { useState } from 'react';
const DrinkDetailedInfo = (props) => {
    const { isAuthenticated, user } = useAuth0();
    const drinks = useSelector((state) => state.drinksData.drinks);
    const chosenDrink = drinks.find((drink) => drink._id === props.id);
    const [isEditionMode, setIseditionMode] = useState(false);
    return (
        <Modal>
            <div className='drink-detailed-info'>
                <button
                    className='absolute top-0 right-1'
                    onClick={() => props.setShowMode()}>
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-6 w-6'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'>
                        <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M6 18L18 6M6 6l12 12'
                        />
                    </svg>
                </button>
                <p>Drink name: {chosenDrink.name}</p>
                <p>Drink taste: {chosenDrink.taste}</p>
                <div className='flex flex-col'>
                    {isAuthenticated && <button>Add to favourites</button>}
                    {user?.sub && user.sub === chosenDrink.creatorId && (
                        <button onClick={setIseditionMode}>Edit</button>
                    )}
                    {isEditionMode && (
                        <div>
                            <input placeholder='new name' />
                            <input placeholder='new taste' />
                            <button>save</button>
                        </div>
                    )}
                </div>
            </div>
        </Modal>
    );
};
export default DrinkDetailedInfo;
