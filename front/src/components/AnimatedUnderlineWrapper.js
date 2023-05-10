import { motion, useAnimationControls } from 'framer-motion';
const AnimatedUnderlineWrapper = ({ children, classes }) => {
    const controls = useAnimationControls();
    const lineVariants = {
        initial: {
            x: '-100%',
        },
        hoverStart: {
            x: ['-100%', '0%'],
        },
        hoverEnd: {
            x: ['0%', '100%'],
        },
    };
    return (
        <motion.div
            whileHover='initial'
            onHoverStart={() => {
                controls.start('hoverStart');
            }}
            className={classes}
            onHoverEnd={() => {
                controls.start('hoverEnd');
            }}>
            <div className='relative'>
                {children}
                <div className={`bg-tertiary h-px w-full overflow-hidden`}>
                    <div>
                        <motion.div
                            animate={controls}
                            variants={lineVariants}
                            transition={{
                                duration: 0.7,
                            }}
                            className={`h-px -translate-x-full  bg-secondary`}
                        />
                    </div>
                </div>
            </div>
        </motion.div>
    );
};
export default AnimatedUnderlineWrapper;
