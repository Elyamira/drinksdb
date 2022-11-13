import { useDispatch } from 'react-redux';
import { resetFilter } from './slices/drinksSlice';

const ResetFilterButton = (props) => {
    const dispatch = useDispatch();
    const showAllDrinks = () => {
        dispatch(resetFilter(''));
        props.onReset();
    };
    return <button onClick={showAllDrinks}>Reset filter</button>;
};
export default ResetFilterButton;
