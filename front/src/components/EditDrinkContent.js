import { useState } from 'react';

const EditDrinkContent = ({ onSave, onCancel }) => {
    const [updatedDrink, setUpdatedDrink] = useState({
        name: '',
        taste: '',
    });
    return (
        <div>
            <input
                placeholder='new name'
                value={updatedDrink.name}
                className='border border-sky-500'
                onChange={(event) => {
                    setUpdatedDrink({
                        ...updatedDrink,
                        name: event.target.value,
                    });
                }}
            />
            <input
                placeholder='new taste'
                value={updatedDrink.taste}
                className='border border-sky-500'
                onChange={(event) => {
                    setUpdatedDrink({
                        ...updatedDrink,
                        taste: event.target.value,
                    });
                }}
            />
            <div className='flex gap-2'>
                <button
                    onClick={() => {
                        setUpdatedDrink({
                            taste: '',
                            name: '',
                        });
                        onCancel();
                    }}>
                    cancel
                </button>

                <button onClick={() => onSave(updatedDrink)}>save</button>
            </div>
        </div>
    );
};
export default EditDrinkContent;
