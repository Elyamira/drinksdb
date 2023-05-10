const Ticker = ({ firstLine, secondLine, classes }) => {
    return (
        <div
            className={`flex will-change-transform w-screen gap-5 -ml-20 animate-slideLeft overflow-visible h-full items-center ${classes}`}>
            {Array(200)
                .fill()
                .map((i, index) => (
                    <div
                        key={index}
                        className='flex w-44 h-44 flex-shrink-0 flex-col justify-center items-center text-center p-3 border-4 rounded-xl border-quaternary text-2xl'>
                        <p>{firstLine}</p>
                        <p>{secondLine}</p>
                    </div>
                ))}
        </div>
    );
};
export default Ticker;
