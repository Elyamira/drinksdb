import { useState } from 'react';
import Navbar from '../components/navbar/Navbar';
import Search from '../components/Search';
import Drinks from '../components/Drinks';
import ResetFilterButton from '../components/ReseteFilterButton';
import AddNewDrinkButton from '../features/AddNewDrinkButton';
import { showPopup } from '../components/slices/popupInputsReducerSlice';
import { useDispatch, useSelector } from 'react-redux';
import AddNewDrinkInputPopup from '../features/AddNewDrinkInputPopup';

const Home = () => {
    const [wordForFilter, setWordForFilter] = useState('');

    const getSearchedValue = (value) => {
        setWordForFilter(value);
    };
    const popupState = useSelector((state) => state.popupInputs.status);

    const dispatch = useDispatch();
    const handleOnAddNewDrink = () => {
        dispatch(showPopup());
    };
    const errorStatus = useSelector((state) => state.errorPopup.status);

    return (
        <div className='flex flex-col space-between h-screen'>
            <Navbar />
            {errorStatus && <p>ERROR</p>}
            <main className='h-full flex flex-col justify-center items-center'>
                <div className='flex gap-5 capitalize'>
                    <h1>All drinks</h1>
                    <h1>hot</h1>
                    <h1>cold</h1>
                    <h1>party</h1>
                </div>
                <AddNewDrinkButton handleOnAddNewDrink={handleOnAddNewDrink} />
                <Search onGetValue={(value) => getSearchedValue(value)} />
                {wordForFilter.length > 0 && (
                    <ResetFilterButton onReset={() => setWordForFilter('')} />
                )}
                {popupState && <AddNewDrinkInputPopup />}
                <Drinks />
            </main>
        </div>
    );
};
export default Home;
