import Navbar from './navbar/Navbar';

export const PageWrapper = ({ children }) => {
    return (
        <div>
            <Navbar />
            <div className='justify-self-start pb-10'>
                <img src='/images/full_header.png' alt='' className='' />
            </div>
            <div className='min-h-[calc(100vh-3rem-48px)] '>{children}</div>

            <div className='h-12 flex justify-center items-center border-t border-black'>
                <p>From Elya with love</p>
            </div>
        </div>
    );
};
