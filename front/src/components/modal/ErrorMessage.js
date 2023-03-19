const ErrorMessage = () => {
    return (
        <div
            className={` min-w-max fixed z-50 top-20 left-1/2 -translate-x-1/2 flex bg-red-600 rounded-xl py-1 px-6 items-center gap-2 justify-center`}>
            <img src='/images/error-1.svg' className='w-6 h-6' alt='error' />
            <p> Something went wrong</p>
        </div>
    );
};
export default ErrorMessage;
