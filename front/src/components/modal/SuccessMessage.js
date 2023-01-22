const SuccessMessage = () => {
    return (
        <div
            className={`absolute min-w-max z-50 top-20 left-1/2 -translate-x-1/2 flex bg-green-200 rounded-xl py-1 px-6 items-center gap-2 justify-center`}>
            <img
                src='/images/black_heart_icon.svg'
                className='w-6 h-6'
                alt='error'
            />
            <p> Success</p>
        </div>
    );
};
export default SuccessMessage;
