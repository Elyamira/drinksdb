import React from 'react';
import { useEffect } from 'react';
import reactDOM from 'react-dom';
import classes from './modal.module.css';
const modalRoot = document.createElement('div');
modalRoot.setAttribute('id', 'modal-root');
document.body.appendChild(modalRoot);
const BackOverlay = (props) => {
    const handleClick = () => {
        props.hideFunc();
    };
    return (
        <div
            data-testid='backdrop'
            className={classes.backdrop}
            onClick={handleClick}></div>
    );
};
const ModalBox = (props) => {
    return (
        <div className={`z-[9999] ${classes.modal}`} data-testid='modal'>
            <div>{props.children}</div>
        </div>
    );
};

const Modal = (props) => {
    const el = document.createElement('div');
    useEffect(() => {
        modalRoot.appendChild(el);
        return () => modalRoot.removeChild(el);
    });
    return reactDOM.createPortal(
        <div className='flex flex-col modal'>
            <BackOverlay hideFunc={props.hideFunc} />
            <ModalBox>{props.children}</ModalBox>
        </div>,
        el
    );
};
export default Modal;
