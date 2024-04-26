import { useAuth0 } from '@auth0/auth0-react';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addNewDrink } from '../components/slices/drinksSlice';
import SuccessMessage from '../components/modal/SuccessMessage';
import ErrorMessage from '../components/modal/ErrorMessage';
import CTAButton from '../components/CTAButton';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedUnderlineWrapper from '../components/AnimatedUnderlineWrapper';
import Ticker from '../components/Ticker';

const AddRecipe = () => {
    const dispatch = useDispatch();
    let creatorId;
    const drinkCategories = ['Hot', 'Cold', 'Party', 'Mocktails'];
    const { user, isAuthenticated, isLoading } = useAuth0();
    const [taste, setTaste] = useState('');
    const [name, setName] = useState('');
    const [addRequestStatus, setAddRequestStatus] = useState('idle');
    const [categories, setCategories] = useState([]);
    const [mainImageFile, setMainImageFile] = useState();
    const [mainImagePreview, setMainImagePreview] = useState();
    const [ingredients, setIngredients] = useState([
        { name: '', placeholder: 'e.g. 1 orange' },
        { name: '', placeholder: 'e.g. 1l sparkling water' },
    ]);
    const [steps, setSteps] = useState([
        { name: '', placeholder: 'squeeze 1 lemon' },
        { name: '', placeholder: 'mix the rest of the ingredients' },
    ]);
    const [servings, setServings] = useState(1);
    const [fileReaderResult, setFileReaderResult] = useState();
    const [imageLink, setImageLink] = useState();
    const [isErrorState, setIsErrorState] = useState(false);
    const [isSuccessState, setIsSuccessState] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    const [lineWidth, setLineWidth] = useState('0%');
    useEffect(() => {
        if (currentStep === 1) {
            setLineWidth('33.333%');
        } else if (currentStep === 2) {
            setLineWidth('66.666%');
        } else if (currentStep === 3) {
            setLineWidth('100%');
        }
    }, [currentStep]);
    const transition = { ease: [0.77, 0.01, 0.23, 1], duration: 0.4 };

    const handleOnChangeIngredient = (e, index) => {
        const ingredientsCopy = [...ingredients];
        ingredientsCopy[index].name = e.target.value;
        setIngredients(ingredientsCopy);
    };
    const handleOnChangeSteps = (e, index) => {
        const stepsCopy = [...steps];
        stepsCopy[index].name = e.target.value;
        setSteps(stepsCopy);
    };
    const canSave =
        [taste, name, categories, steps, imageLink].every(Boolean) &&
        addRequestStatus === 'idle' &&
        isAuthenticated;

    if (user) {
        creatorId = user.sub;
    }
    useEffect(() => {
        setTimeout(() => {
            if (isErrorState) setIsErrorState(false);
        }, 5000);
    });

    const handleImageUpload = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setMainImageFile(e.target.files[0]);
            const reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            reader.onload = () => setFileReaderResult(reader.result);
        }
    };

    useEffect(() => {
        // create the preview
        const onUploadImage = async () => {
            const data = new FormData();
            data.append('file', fileReaderResult);
            data.append('upload_preset', 'yiifeopx');
            const imageUpload = await fetch(
                `https://api.cloudinary.com/v1_1/djj8t8knp/image/upload`,
                {
                    method: 'POST',
                    api_key: '584778315165341',
                    body: data,
                }
            );
            const jsonResponse = await imageUpload.json();
            setImageLink(jsonResponse);
        };
        if (mainImageFile) {
            const objectUrl = URL.createObjectURL(mainImageFile);
            setMainImagePreview(objectUrl);
            onUploadImage();
            // free memory when ever this component is unmounted
            return () => URL.revokeObjectURL(objectUrl);
        }
    }, [mainImageFile, fileReaderResult]);

    const addNewLineForIngredient = () => {
        const newIngredientInput = {
            name: '',
            placeholder: 'another ingredient',
        };
        setIngredients([...ingredients, newIngredientInput]);
    };
    const deleteIngredientLine = (idx) => {
        const filteredIngredients = ingredients.filter(
            (step, index) => index !== idx
        );
        setIngredients(filteredIngredients);
    };
    const addNewLineForStep = () => {
        const newStep = {
            name: '',
            placeholder: 'another step',
        };
        setSteps([...steps, newStep]);
    };
    const deleteStepLine = (idx) => {
        const filteredSteps = steps.filter((step, index) => index !== idx);
        setSteps(filteredSteps);
    };
    const onUploadImage = async () => {
        const data = new FormData();
        data.append('file', fileReaderResult);
        data.append('upload_preset', 'yiifeopx');
        const imageUpload = await fetch(
            `https://api.cloudinary.com/v1_1/djj8t8knp/image/upload`,
            {
                method: 'POST',
                api_key: '584778315165341',
                body: data,
            }
        );
        const jsonResponse = await imageUpload.json();
        setImageLink(jsonResponse);
    };
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
    const onAddDrink = async (event) => {
        event.preventDefault();
        if (canSave) {
            try {
                onUploadImage();

                setAddRequestStatus('pending');
                const stepsWithoutPlaceholders = steps.map((step) => step.name);
                const ingredientsWithoutPlaceholders = ingredients.map(
                    (ingr) => ingr.name
                );
                await dispatch(
                    addNewDrink({
                        taste,
                        name,
                        creatorId,
                        categories,
                        ingredients: ingredientsWithoutPlaceholders,
                        steps: stepsWithoutPlaceholders,
                        servings,
                        image: imageLink.url,
                    })
                ).unwrap();
                setTaste('');
                setName('');
                setIsSuccessState(true);
            } catch (err) {
                setAddRequestStatus('failed');
                setIsErrorState(true);
            } finally {
                setAddRequestStatus('idle');
            }
        } else {
            setIsErrorState(true);
        }
    };
    if (!isAuthenticated && !isLoading) {
        return (
            <Ticker
                firstLine='Please log in'
                secondLine='to add new drink'
                classes='min-h-[60vh]'
            />
        );
    }
    if (isSuccessState) {
        return (
            <div>
                <SuccessMessage />
                <div className='absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2'>
                    <Link to='/'>
                        <CTAButton label={'Take me to home page'} />
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className='w-full pb-20 relative mt-10 flex-1'>
            <div className='flex w-11/12 mx-auto flex-col md:flex-row md:pr-0 overflow-hidden gap-5'>
                <div className='flex flex-col items-center md:items-start'>
                    <label
                        htmlFor='addImageInput'
                        className='cursor-pointer text-xl pb-2'>
                        Upload image
                    </label>
                    <input
                        className='hidden'
                        id='addImageInput'
                        type='file'
                        accept='.png, .jpg, .jpeg'
                        multiple={false}
                        onChange={(e) => handleImageUpload(e)}
                    />
                    {mainImagePreview && (
                        <div className='max-w-[220px] max-h-80 overflow-hidden rounded-lg pb-10 md:pb-0'>
                            <img
                                src={mainImagePreview}
                                alt='uploaded'
                                className='rounded-lg'
                            />
                        </div>
                    )}
                </div>
                <div className='flex flex-col w-[280px] md:w-[350px] mx-auto relative'>
                    <form onSubmit={onAddDrink}>
                        {/* STEP 1 */}
                        {currentStep === 1 && (
                            <>
                                <div className='flex flex-col w-full'>
                                    <AnimatedUnderlineWrapper classes='pt-12 first:pt-0 md:pt-14 md:first:pt-6'>
                                        <input
                                            name='name'
                                            value={name}
                                            onChange={(event) =>
                                                setName(event.target.value)
                                            }
                                            className='outline-none disabled:border-gray-100 peer w-full bg-transparent py-2 text-black placeholder-transparent transition-all duration-200 focus:outline-none'
                                        />
                                        <label
                                            htmlFor={'name'}
                                            className={`${
                                                name.length > 0 &&
                                                'text-tertiary text-xs -top-4'
                                            } text-quaternary text-l pointer-events-none absolute top-2 left-0 origin-top-left transition-all peer-focus:text-tertiary peer-focus:text-xs peer-placeholder-shown:text-xl peer-placeholder-shown:md:text-xl  duration-200 peer-placeholder-shown:top-2 peer-placeholder-shown:text-white peer-focus:-top-4`}>
                                            Enter Drink Name *
                                        </label>
                                    </AnimatedUnderlineWrapper>
                                    <AnimatedUnderlineWrapper classes='pt-12 first:pt-0 md:pt-14 md:first:pt-6'>
                                        <input
                                            name='taste'
                                            value={taste}
                                            onChange={(event) =>
                                                setTaste(event.target.value)
                                            }
                                            className='outline-none disabled:border-grey peer w-full bg-transparent py-2 text-black placeholder-transparent transition-all duration-200 focus:outline-none'
                                        />
                                        <label
                                            htmlFor={'drinkTaste'}
                                            className={`${
                                                taste.length > 0 &&
                                                'text-tertiary text-xs -top-4'
                                            }
                                            text-quaternary text-l pointer-events-none absolute top-2 left-0 origin-top-left transition-all peer-focus:text-tertiary peer-focus:text-xs peer-focus:md:text-xs peer-placeholder-shown:text-xl peer-placeholder-shown:md:text-xl  duration-200 peer-placeholder-shown:top-2 peer-placeholder-shown:text-white peer-focus:-top-4`}>
                                            {'Enter Drink Taste *'}
                                        </label>
                                    </AnimatedUnderlineWrapper>
                                </div>
                                <p className='text-quaternary pt-8 pb-4'>
                                    Choose drink's category
                                </p>
                                <div
                                    id='drinkCategory'
                                    className='flex flex-wrap gap-4 '>
                                    {drinkCategories.map((cat, idx) => (
                                        <div className='flex gap-2' key={idx}>
                                            <label>
                                                <input
                                                    type='checkbox'
                                                    value={cat}
                                                    className='peer hidden'
                                                    checked={categories.includes(
                                                        cat
                                                    )}
                                                    onChange={(e) => {
                                                        const currentCategory =
                                                            e.target.value;
                                                        if (
                                                            categories.includes(
                                                                cat
                                                            )
                                                        ) {
                                                            const newCategories =
                                                                categories.filter(
                                                                    (cat) =>
                                                                        cat !==
                                                                        currentCategory
                                                                );
                                                            setCategories(
                                                                newCategories
                                                            );
                                                        } else {
                                                            setCategories([
                                                                ...categories,
                                                                currentCategory,
                                                            ]);
                                                        }
                                                    }}
                                                />
                                                <div className='peer-checked:bg-quaternary hover:bg-tertiary bg-secondary rounded-lg h-7 flex w-max cursor-pointer items-center justify-center px-3 text-black outline-none'>
                                                    {cat}
                                                </div>
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                        <div className='max-h-[18rem] overflow-y-auto overflow-x-hidden'>
                            {/* STEP 2 */}

                            {currentStep === 2 && (
                                <>
                                    <div className='flex flex-col'>
                                        <h3 className='text-2xl font-yellowTail'>
                                            Ingredients
                                        </h3>
                                        <p className='text-base'>
                                            Enter one ingredient per line.
                                            Include the quantity (i.e. cups,
                                            tablespoons) and any special
                                            preparation (i.e. sifted, softened,
                                            chopped).
                                        </p>
                                        <div className='flex flex-col pt-3'>
                                            {ingredients.map(
                                                (ingredient, idx) => (
                                                    <div
                                                        className='relative mb-3'
                                                        key={idx}>
                                                        <div className='relative'>
                                                            <AnimatedUnderlineWrapper classes='pt-12 first:pt-0 md:pt-14 md:first:pt-6'>
                                                                <input
                                                                    placeholder={
                                                                        ingredient.placeholder
                                                                    }
                                                                    className='outline-none w-full'
                                                                    value={
                                                                        ingredient.name
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) => {
                                                                        handleOnChangeIngredient(
                                                                            e,
                                                                            idx
                                                                        );
                                                                    }}
                                                                />
                                                                <button
                                                                    className='absolute right-0 top-1/2 -translate-y-1/2'
                                                                    type='button'
                                                                    onClick={() => {
                                                                        deleteIngredientLine(
                                                                            idx
                                                                        );
                                                                    }}>
                                                                    <svg
                                                                        xmlns='http://www.w3.org/2000/svg'
                                                                        fill='none'
                                                                        viewBox='0 0 24 24'
                                                                        strokeWidth={
                                                                            1.5
                                                                        }
                                                                        stroke='currentColor'
                                                                        className='w-6 h-6 text-quaternary transition duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-110'>
                                                                        <path
                                                                            strokeLinecap='round'
                                                                            strokeLinejoin='round'
                                                                            d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
                                                                        />
                                                                    </svg>
                                                                </button>
                                                            </AnimatedUnderlineWrapper>
                                                        </div>
                                                    </div>
                                                )
                                            )}

                                            <button
                                                className='self-start'
                                                type='button'
                                                onClick={
                                                    addNewLineForIngredient
                                                }>
                                                <div className='flex gap-3 text-quaternary'>
                                                    Add ingredient
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
                                                            d='M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z'
                                                        />
                                                    </svg>
                                                </div>
                                            </button>
                                            <div className='flex gap-5 pt-3'>
                                                <h3 className='text-2xl font-yellowTail'>
                                                    Servings:
                                                </h3>
                                                <input
                                                    type='number'
                                                    className='outline-none'
                                                    value={servings}
                                                    onChange={(e) =>
                                                        setServings(
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                            {/* STEP 3 */}
                            {currentStep === 3 && (
                                <>
                                    <div className='flex flex-col gap-3 max-h-56 overflow-y-auto overflow-x-hidden'>
                                        <h2 className='text-2xl font-yellowTail'>
                                            Step by step directions
                                        </h2>
                                        {steps.map((step, idx) => (
                                            <div className='relative' key={idx}>
                                                <h4>Step {idx + 1}</h4>
                                                <AnimatedUnderlineWrapper>
                                                    <textarea
                                                        className='outline-none w-full max-h-6 '
                                                        placeholder={
                                                            step.placeholder
                                                        }
                                                        value={step.name}
                                                        onChange={(e) => {
                                                            handleOnChangeSteps(
                                                                e,
                                                                idx
                                                            );
                                                        }}
                                                    />
                                                    <button
                                                        type='button'
                                                        className='absolute right-0'
                                                        onClick={() => {
                                                            deleteStepLine(idx);
                                                        }}>
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
                                                    </button>
                                                </AnimatedUnderlineWrapper>
                                            </div>
                                        ))}

                                        <button
                                            className='self-start'
                                            onClick={addNewLineForStep}
                                            type='button'>
                                            <div className='flex gap-3 '>
                                                Add step
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
                                                        d='M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z'
                                                    />
                                                </svg>
                                            </div>
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                        {currentStep === 3 && (
                            <div className='flex gap-5 pt-10 justify-end'>
                                <button type='submit'>
                                    <CTAButton label={'Submit'} />
                                </button>
                            </div>
                        )}
                    </form>
                </div>
            </div>
            {isErrorState && <ErrorMessage />}
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
            <AnimatePresence>
                <motion.div
                    animate={{
                        width: lineWidth,
                        transition: transition,
                    }}
                    className='bg-tertiary absolute bottom-0 h-2.5'></motion.div>
            </AnimatePresence>
        </div>
    );
};
export default AddRecipe;
