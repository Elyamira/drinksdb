import { motion } from 'framer-motion';
const CTAButton = ({ label, disabled = false }) => {
    const motionRight = {
        rest: {
            scale: 1,
            originX: '100%',
        },
        hover: {
            scale: 0,
        },
    };
    const motionLeft = {
        rest: {
            scale: 0,
            originX: 0,
        },
        hover: {
            scale: 1,
        },
    };
    const textMotion = {
        rest: {
            x: 0,
        },
        hover: {
            x: 24,
        },
    };
    return (
        <motion.div
            className='-ml-6 self-center flex-1 flex items-end z-40 text-primary'
            initial='rest'
            whileHover='hover'>
            <motion.div
                className=''
                variants={motionLeft}
                transition={{
                    ease: [0.63, 0, 0.33, 0.99],
                    duration: 0.38,
                }}>
                <div
                    className={`h-8 w-8 bg-quaternary rounded-full flex items-center justify-center transition-colors ${
                        disabled && 'bg-gray-400 cursor-default'
                    }`}>
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={1.5}
                        stroke='currentColor'
                        className='w-4 h-4'>
                        <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3'
                        />
                    </svg>
                </div>
            </motion.div>
            <motion.div
                variants={textMotion}
                transition={{
                    ease: [0.63, 0, 0.33, 0.99],
                    duration: 0.38,
                }}>
                <p
                    className={`bg-quaternary w-max cursor-pointer rounded-2xl px-2.5 h-8 flex items-center -ml-6 transition-colors ${
                        disabled && 'bg-gray-400 cursor-default'
                    }`}>
                    {label}
                </p>
            </motion.div>

            <motion.div
                className={`h-8 w-8 bg-quaternary rounded-full flex items-center justify-center transition-colors ${
                    disabled && 'bg-gray-400 cursor-default'
                }`}
                variants={motionRight}
                transition={{
                    ease: [0.63, 0, 0.33, 0.99],
                    duration: 0.38,
                }}>
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='w-4 h-4'>
                    <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3'
                    />
                </svg>
            </motion.div>
        </motion.div>
    );
};
export default CTAButton;
