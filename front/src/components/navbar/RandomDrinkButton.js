import { useSelector } from 'react-redux';
import Modal from '../modal/Modal';
import { showRDPopup, hideRDPopup } from '../slices/popupRandomDrinkSlice';
import { useDispatch } from 'react-redux';
import closeBtn from '../../icons/close-btn.svg'
const RandomDrinkButton = () => {
    const dispatch = useDispatch();
    const popupState = useSelector(state => state.popupRandomDrink.status)
    const showRandomDrink = () => {
        dispatch(showRDPopup())

    }
    const RandomDrinkComponent = () => {
        const drinks = useSelector(state => state.drinksData.drinks);
        const randomNumber = Math.floor(Math.random() * drinks.length);
        return <Modal hideFunc={() => dispatch(hideRDPopup())}>
            <button data-testid="randomDrinkButton" className='absolute top-0 right-1' onClick={() => dispatch(hideRDPopup())}>
                <img src={closeBtn} alt="close random drink popup" />
            </button>
            <div><p>{drinks[randomNumber].name}</p></div>
        </Modal>
    }
    return (<>
        <button onClick={showRandomDrink}>Get a random drink</button>
        {popupState && <RandomDrinkComponent />}
    </>
    )
}
export default RandomDrinkButton;