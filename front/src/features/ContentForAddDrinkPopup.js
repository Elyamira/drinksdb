import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { add } from '../components/drinksSlice';
import { hidePopup } from '../components/popupInputsReducerSlice';
const ContentForAddNewDrinkPopup = () => {
    const [value, setValue] = React.useState("");
    const drinks = useSelector(state => state.drinksData.drinks);
    const dispatch = useDispatch();
    const [drink, setDrink] = React.useState({
        name: "",
        taste: "",
        id: drinks.length + 1,
        // categories: [],
        // origin: ""

    })
    const handleChange = (event) => {
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

    return <form onSubmit={handleSubmit} className="flex flex-col" >
        <button className='absolute top-0 right-1' onClick={() => dispatch(hidePopup())}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>
        <label htmlFor='drinkName'>Enter Drink Name</label>
        <input id="drinkName" className='border border-sky-500' name="name" value={drink.name} onChange={(event) => setDrink({
            name: event.target.value,
            taste: drink.taste,
            id: drink.id,
        })}></input>
        <label htmlFor='drinkTaste'>Enter Drink Taste</label>
        <input id="drinkTaste" className='border border-sky-500' name="taste" value={drink.taste} onChange={(event) => handleChange(event)}></input>
        <input className='border border-sky-500' value={value} autoFocus onChange={(event) => {
            console.log(event.target.value)
            setValue(event.target.value)
        }} />
        <button type='submit'>Add</button>
    </form>
}
export default ContentForAddNewDrinkPopup;