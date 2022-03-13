import classes from "./drinkInputPopup.module.css"
import { useDispatch, useSelector } from 'react-redux';
import { hidePopup } from '../components/popupInputsReducerSlice';
import { add } from '../components/drinksSlice';
import { useState } from 'react';
import Modal from '../components/Modal';
const AddNewDrinkInputPopup = () => {
    const drinks = useSelector(state => state.drinksData.drinks);
    const dispatch = useDispatch();
    const [drink, setDrink] = useState({
        name: "",
        taste: "",
        id: drinks.length + 1,
        // categories: [],
        // origin: ""

    })
    const handleChange = (event) => {
        // console.log(catName);
        setDrink((prevValues) => {
            return {
                ...prevValues,
                [event.target.name]: event.target.value
            }
        })
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(add(drink))
        setDrink(() => {
            return {
                name: "",
                taste: "",
                id: null,
                // categories: ["tea", "hot drinks"],
                // origin: "China"
            }

        })
        dispatch(hidePopup())
    }
    return (
        <Modal hideFunc={() => dispatch(hidePopup())}>
            <form onSubmit={handleSubmit} className="flex flex-col" >
                <button className='absolute top-0 right-1' onClick={() => dispatch(hidePopup())}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <label htmlFor='drinkName'>Enter Drink Name</label>
                <input id="drinkName" className='border border-sky-500' name="name" value={drink.name} onChange={(event) => handleChange(event)}></input>
                <label htmlFor='drinkTaste'>Enter Drink Name</label>
                <input id="drinkTaste" className='border border-sky-500' name="taste" value={drink.taste} onChange={(event) => handleChange(event)}></input>
                <button type='submit'>Add</button>
            </form>
        </Modal>)
}
export default AddNewDrinkInputPopup;