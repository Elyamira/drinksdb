import { useDispatch } from 'react-redux';
import { filter } from './drinksSlice';

const ResetFilterButton = (props) => {
    const dispatch = useDispatch();
    const showAllDrinks = () => {
        dispatch((filter("")))
        props.onReset()

    }
    return <button onClick={showAllDrinks}>ResetFilter</button>
}
export default ResetFilterButton;