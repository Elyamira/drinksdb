import { useEffect, useState } from 'react';
import Navbar from '../components/navbar/Navbar';
import Search from '../components/Search';
import Drinks from '../components/Drinks';
import ResetFilterButton from '../components/ReseteFilterButton';
import AddNewDrinkButton from '../features/AddNewDrinkButton';
import { showPopup } from '../components/popupInputsReducerSlice';
import { useDispatch, useSelector } from 'react-redux';
import AddNewDrinkInputPopup from '../features/AddNewDrinkInputPopup';

const Home = () => {
    const [wordForFilter, setWordForFilter] = useState("");
    const [drinksFromDb, setDrinksFromDb] = useState([]);

    const getSearchedValue = (value) => {
        setWordForFilter(value)
    }
    const popupState = useSelector(state => state.popupInputs.status);
    const dispatch = useDispatch();
    const handleOnAddNewDrink = () => {
        dispatch(showPopup())
    }
    useEffect(() => {
        if (drinksFromDb.length === 0) {
            getResponse()
        }
    })
    const getResponse = async () => {
        try {
            const response = await fetch("http://localhost:3001/")
            const responseData = await response.json()
            setDrinksFromDb(responseData)
        } catch (error) {
            console.log(error);
        }
    }


    return <div className='flex flex-col space-between h-screen'>
        <Navbar />
        <main className='h-full flex flex-col justify-center items-center'>
            <h1>All drinks</h1>
            <button onClick={() => getResponse()}>get response</button>
            <AddNewDrinkButton handleOnAddNewDrink={handleOnAddNewDrink} />
            <Search onGetValue={(value) => getSearchedValue(value)} />
            {wordForFilter.length > 0 && <ResetFilterButton onReset={() => setWordForFilter("")} />}
            {popupState && <AddNewDrinkInputPopup />}
            <Drinks drinksFromDb={drinksFromDb} />
        </main>
    </div>
}
export default Home;