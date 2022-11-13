const AddNewDrinkButton = ({ handleOnAddNewDrink }) => {
    return (
        <>
            <button
                onClick={() => {
                    handleOnAddNewDrink();
                }}>
                Add new drink
            </button>
        </>
    );
};
export default AddNewDrinkButton;
