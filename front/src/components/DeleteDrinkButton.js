import React from 'react';
import Modal from './modal/Modal';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { deleteDrink } from './slices/drinksSlice';
import {
    showDeleteDialog,
    hideDeleteDialog,
} from './slices/popupDeleteDialogue';
import closeBtn from '../icons/close-btn.svg';
import CTAButton from '../components/CTAButton';

const DeleteDrinkComponent = ({ drinkName }) => {
    const dispatch = useDispatch();
    const onHandleDeleteDrink = async (name) => {
        await dispatch(deleteDrink({ name })).unwrap();
        dispatch(hideDeleteDialog());
    };

    return (
        <Modal hideFunc={() => dispatch(hideDeleteDialog())}>
            <button
                className='absolute top-0 right-1 z-10'
                onClick={() => dispatch(hideDeleteDialog())}>
                <img src={closeBtn} alt='close random drink popup' />
            </button>
            <div>
                <p className='pb-10'>{`Are you sure that you want to delete ${drinkName}?`}</p>
                <div className='flex flex-1  gap-7 absolute right-5 bottom-0 justify-start pl-5 py-5'>
                    <button
                        className='rounded-xl border-2 border-quaternary h-8 flex items-center px-2.5 hover:bg-quaternary hover:text-primary transition-colors'
                        onClick={() => dispatch(hideDeleteDialog())}>
                        Cancel
                    </button>
                    <button onClick={() => onHandleDeleteDrink(drinkName)}>
                        <CTAButton label='Yes, delete' />
                    </button>
                </div>
            </div>
        </Modal>
    );
};
const DeleteDrinkButton = ({ drinkName }) => {
    const dispatch = useDispatch();
    const popupState = useSelector((state) => state?.popupDeleteSlice?.status);
    const showConfirmationDialog = () => {
        dispatch(showDeleteDialog());
    };

    return (
        <>
            <button onClick={showConfirmationDialog} className='group'>
                <div className='flex'>
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={1.5}
                        stroke='currentColor'
                        className='w-6 h-6 text-quaternary transition duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-110'>
                        <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
                        />
                    </svg>
                    Delete from website
                </div>
            </button>
            {popupState && <DeleteDrinkComponent drinkName={drinkName} />}
        </>
    );
};
export default DeleteDrinkButton;
