const AddNewDrinkButton = (props) => {
    return <>
        <button onClick={() => { props.handleOnAddNewDrink() }}>
            Add new drink
        </button>
    </>

}
export default AddNewDrinkButton;