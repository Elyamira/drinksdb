import { motion } from 'framer-motion';
const LeftArrowMotionOne = {
    rest: {
        scale: 0,
        x: '100%',
    },
    hover: {
        scale: 1,
        x: '0%',
    },
};

const LeftArrowMotionTwo = {
    rest: {
        scale: 1,
        x: '0%',
    },
    hover: {
        scale: 0,
        x: '-100%',
    },
};
const RightArrowMotionOne = {
    rest: {
        scale: 0,
        x: '-100%',
    },
    hover: {
        scale: 1,
        x: '0%',
    },
};

const RightArrowMotionTwo = {
    rest: {
        scale: 1,
        x: '0%',
    },
    hover: {
        scale: 0,
        x: '100%',
    },
};
const ArrowStepSwitchers = ({ setCurrentStep, currentStep }) => {
    return (
        <div className='absolute bottom-10 right-10 flex gap-5'>
            <motion.div
                initial='rest'
                whileHover='hover'
                transition={{
                    ease: [0.68, 0.02, 0.11, 1.02],
                    duration: 0.4,
                }}>
                <div
                    className={[
                        `${currentStep === 1 ? 'opacity-30' : ''}`,
                        'group relative flex flex-col items-center justify-center ',
                    ].join(' ')}>
                    <button
                        onClick={() => {
                            setCurrentStep(currentStep - 1);
                        }}
                        type='button'
                        disabled={currentStep === 1}
                        className={` w-7 h-7 border-quaternary text-quaternary relative flex items-center justify-center rounded-full border-2 overflow-hidden`}>
                        {currentStep === 1 ? (
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 24 24'
                                strokeWidth={1.5}
                                stroke='currentColor'
                                className='w-6 h-6'>
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    d='M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18'
                                />
                            </svg>
                        ) : (
                            <>
                                <motion.div
                                    variants={LeftArrowMotionOne}
                                    transition={{
                                        ease: [0.68, 0.02, 0.11, 1.02],
                                        duration: 0.4,
                                    }}
                                    className='absolute'>
                                    {
                                        <svg
                                            xmlns='http://www.w3.org/2000/svg'
                                            fill='none'
                                            viewBox='0 0 24 24'
                                            strokeWidth={1.5}
                                            stroke='currentColor'
                                            className='w-6 h-6'>
                                            <path
                                                strokeLinecap='round'
                                                strokeLinejoin='round'
                                                d='M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18'
                                            />
                                        </svg>
                                    }
                                </motion.div>
                                <motion.div
                                    variants={LeftArrowMotionTwo}
                                    transition={{
                                        ease: [0.68, 0.02, 0.11, 1.02],
                                        duration: 0.4,
                                    }}
                                    className='absolute'>
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        fill='none'
                                        viewBox='0 0 24 24'
                                        strokeWidth={1.5}
                                        stroke='currentColor'
                                        className='w-6 h-6'>
                                        <path
                                            strokeLinecap='round'
                                            strokeLinejoin='round'
                                            d='M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18'
                                        />
                                    </svg>
                                </motion.div>
                            </>
                        )}
                    </button>
                </div>
            </motion.div>
            <motion.div
                initial='rest'
                whileHover='hover'
                transition={{
                    ease: [0.68, 0.02, 0.11, 1.02],
                    duration: 0.4,
                }}>
                <div
                    className={[
                        `${currentStep === 3 ? 'opacity-30' : ''}`,
                        'group relative flex flex-col items-center justify-center ',
                    ].join(' ')}>
                    <button
                        onClick={() => {
                            setCurrentStep(currentStep + 1);
                        }}
                        type='button'
                        disabled={currentStep === 3}
                        className={` w-7 h-7 border-quaternary text-quaternary relative flex items-center justify-center rounded-full border-2 overflow-hidden`}>
                        {currentStep === 3 ? (
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 24 24'
                                strokeWidth={1.5}
                                stroke='currentColor'
                                className='w-6 h-6'>
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    d='M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3'
                                />
                            </svg>
                        ) : (
                            <>
                                <motion.div
                                    variants={RightArrowMotionOne}
                                    transition={{
                                        ease: [0.68, 0.02, 0.11, 1.02],
                                        duration: 0.4,
                                    }}
                                    className='absolute'>
                                    {
                                        <svg
                                            xmlns='http://www.w3.org/2000/svg'
                                            fill='none'
                                            viewBox='0 0 24 24'
                                            strokeWidth={1.5}
                                            stroke='currentColor'
                                            className='w-6 h-6'>
                                            <path
                                                strokeLinecap='round'
                                                strokeLinejoin='round'
                                                d='M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3'
                                            />
                                        </svg>
                                    }
                                </motion.div>
                                <motion.div
                                    variants={RightArrowMotionTwo}
                                    transition={{
                                        ease: [0.68, 0.02, 0.11, 1.02],
                                        duration: 0.4,
                                    }}
                                    className='absolute'>
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        fill='none'
                                        viewBox='0 0 24 24'
                                        strokeWidth={1.5}
                                        stroke='currentColor'
                                        className='w-6 h-6'>
                                        <path
                                            strokeLinecap='round'
                                            strokeLinejoin='round'
                                            d='M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3'
                                        />
                                    </svg>
                                </motion.div>
                            </>
                        )}
                    </button>
                </div>
            </motion.div>
        </div>
    );
};
export default ArrowStepSwitchers;
