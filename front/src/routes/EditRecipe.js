import { useAuth0 } from '@auth0/auth0-react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import AnimatedUnderlineWrapper from '../components/AnimatedUnderlineWrapper';
import ArrowStepSwitchers from '../components/ArrowStepSwitchers';
import CTAButton from '../components/CTAButton';
import ErrorMessage from '../components/modal/ErrorMessage';
import SuccessMessage from '../components/modal/SuccessMessage';
import { updateDrink } from '../components/slices/drinksSlice';
import Ticker from '../components/Ticker';
import Loader from '../components/Loader';

const EditRecipe = () => {
    const dispatch = useDispatch();
    const { recipe } = useParams();
    const allDrinks = useSelector((state) => state.drinksData.drinks);
    const drinksStatus = useSelector((state) => state.drinksData.status);
    const [drinkIndex, setDrinkIndex] = useState();
    const [currentDrink, setCurrentDrink] = useState();

    React.useEffect(() => {
        if (allDrinks.length > 0) {
            setDrinkIndex(
                allDrinks?.findIndex(
                    (drink) => drink.name.toLowerCase() === recipe.toLowerCase()
                )
            );
            setCurrentDrink(allDrinks[drinkIndex]);
        }
    }, [allDrinks, dispatch, drinkIndex, drinksStatus, recipe]);

    const drinkCategories = ['Hot', 'Cold', 'Party', 'Mocktails'];
    const { user, isAuthenticated } = useAuth0();

    const [taste, setTaste] = useState(currentDrink?.taste);
    const [name, setName] = useState();
    const [categories, setCategories] = useState(
        currentDrink && [...currentDrink?.category]
    );
    const [mainImageFile, setMainImageFile] = useState();
    const [mainImagePreview, setMainImagePreview] = useState(
        currentDrink?.image
    );
    const [editRequestStatus, setEditRequestStatus] = useState('idle');
    const [ingredients, setIngredients] = useState();

    const [steps, setSteps] = useState();
    const [servings, setServings] = useState();
    const [fileReaderResult, setFileReaderResult] = useState();
    const [imageLink, setImageLink] = useState();
    const [isErrorState, setIsErrorState] = useState(false);
    const [isSuccessState, setIsSuccessState] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);

    const handleOnChangeIngredient = (e, index) => {
        const ingredientsCopy = [...ingredients];
        ingredientsCopy[index] = e.target.value;
        setIngredients(ingredientsCopy);
    };
    const handleOnChangeSteps = (e, index) => {
        const stepsCopy = [...steps];
        stepsCopy[index] = e.target.value;
        setSteps(stepsCopy);
    };
    React.useEffect(() => {
        if (currentDrink) {
            setTaste(currentDrink.taste);
            setName(currentDrink.name);
            setCategories([...currentDrink.category]);
            setMainImagePreview(currentDrink.image);
            setIngredients(currentDrink.recipe.ingredients);
            setSteps(currentDrink.recipe.steps);
            setServings(currentDrink.recipe.servings);
            setImageLink(currentDrink.image);
        }
    }, [allDrinks.length, currentDrink]);
    const canSave =
        [taste, name, categories, steps, imageLink].every(Boolean) &&
        editRequestStatus === 'idle' &&
        isAuthenticated;

    const handleImageUpload = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setMainImageFile(e.target.files[0]);
            const reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            reader.onload = () => setFileReaderResult(reader.result);
        }
    };

    useEffect(() => {
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
        setIngredients([...ingredients, '']);
    };
    const deleteIngredientLine = (idx) => {
        const filteredIngredients = ingredients.filter(
            (step, index) => index !== idx
        );
        setIngredients(filteredIngredients);
    };
    const addNewLineForStep = () => {
        setSteps([...steps, '']);
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

    const onUpdateDrink = async (event) => {
        event.preventDefault();
        let creatorId;
        if (user) {
            creatorId = user.sub;
        }
        if (canSave) {
            try {
                onUploadImage();
                setEditRequestStatus('pending');
                await dispatch(
                    updateDrink({
                        oldName: currentDrink.name,
                        taste,
                        name,
                        creatorId,
                        categories,
                        recipe: {
                            ingredients: ingredients,
                            steps: steps,
                            servings: servings,
                        },
                        image: imageLink.url
                            ? imageLink.url
                            : currentDrink.image,
                    })
                ).unwrap();
            } catch (err) {
                setEditRequestStatus('failed');
                setIsErrorState(true);
                console.error("Couldn't update the drink");
            } finally {
                setEditRequestStatus('idle');
                setTaste('');
                setName('');
                setIsSuccessState(true);
            }
        } else {
            setIsErrorState(true);
        }
    };
    if (!currentDrink && !user) {
        return <Loader />;
    }

    if (currentDrink && user && currentDrink.creatorId !== user.sub) {
        <Ticker
            firstLine='You can only edit'
            secondLine='drinks added by you'
            classes='min-h-[60vh]'
        />;
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
    if (drinkIndex !== -1) {
        return (
            <div className='w-full pb-20 relative md:static mt-10 h-full'>
                <div className='flex w-11/12 mx-auto pr-20 flex-col md:flex-row md:pr-0 overflow-hidden'>
                    <div className='pb-5 md:pb-0 flex flex-col items-center md:items-start'>
                        <p className='text-xl font-yellowTail'>
                            Selected image:
                        </p>

                        {mainImagePreview && (
                            <div className='max-w-[320px] max-h-72 overflow-hidden rounded-lg'>
                                <img src={mainImagePreview} alt='uploaded' />
                            </div>
                        )}
                        <label
                            htmlFor='imageInput'
                            className='cursor-pointer text-xl'>
                            Upload new image
                        </label>

                        <input
                            id='imageInput'
                            type='file'
                            accept='.png, .jpg, .jpeg'
                            multiple={false}
                            onChange={(e) => handleImageUpload(e)}
                            placeholder='Upload new image'
                            className='hidden'
                        />
                    </div>

                    <div className='flex flex-col w-[300px] md:w-[350px] mx-auto'>
                        <form onSubmit={onUpdateDrink}>
                            {currentStep === 1 && (
                                <>
                                    <div className='flex gap-5 w-full'>
                                        <div className='flex flex-col  w-full'>
                                            <p className='font-yellowTail text-xl'>
                                                Current drink name:{' '}
                                                <span className='font-lato text-base'>
                                                    {currentDrink?.name}
                                                </span>
                                            </p>
                                            <AnimatedUnderlineWrapper classes='pt-7'>
                                                <input
                                                    className='outline-none disabled:border-grey peer w-full bg-transparent py-2 text-black placeholder-transparent transition-all duration-200 focus:outline-none'
                                                    name='name'
                                                    value={name}
                                                    onChange={(event) =>
                                                        setName(
                                                            event.target.value
                                                        )
                                                    }></input>
                                                <label
                                                    className={`${
                                                        name?.length > 0 &&
                                                        'text-tertiary text-xs -top-5'
                                                    }
                                            text-quaternary text-l pointer-events-none absolute top-2 left-0 origin-top-left transition-all peer-focus:text-tertiary peer-focus:text-xs peer-focus:md:text-xs peer-placeholder-shown:text-xl peer-placeholder-shown:md:text-xl  duration-200 peer-placeholder-shown:top-2 peer-placeholder-shown:text-white peer-focus:-top-4`}>
                                                    New Drink Name
                                                </label>
                                            </AnimatedUnderlineWrapper>

                                            <p className='font-yellowTail text-xl'>
                                                Current drink taste:{' '}
                                                <span className='font-lato text-base'>
                                                    {currentDrink?.taste}
                                                </span>
                                            </p>
                                            <AnimatedUnderlineWrapper classes='pt-7'>
                                                <input
                                                    className='outline-none disabled:border-grey peer w-full bg-transparent py-2 text-black placeholder-transparent transition-all duration-200 focus:outline-none'
                                                    name='taste'
                                                    value={taste}
                                                    onChange={(event) =>
                                                        setTaste(
                                                            event.target.value
                                                        )
                                                    }></input>
                                                <label
                                                    className={`${
                                                        taste?.length > 0 &&
                                                        'text-tertiary text-xs -top-5'
                                                    }
                                            text-quaternary text-l pointer-events-none absolute top-2 left-0 origin-top-left transition-all peer-focus:text-tertiary peer-focus:text-xs peer-focus:md:text-xs peer-placeholder-shown:text-xl peer-placeholder-shown:md:text-xl  duration-200 peer-placeholder-shown:top-2 peer-placeholder-shown:text-white peer-focus:-top-4`}>
                                                    New Drink Taste
                                                </label>
                                            </AnimatedUnderlineWrapper>
                                        </div>
                                    </div>
                                    <p className='text-quaternary pt-5 pb-4'>
                                        Choose drink's category
                                    </p>
                                    <div
                                        id='drinkCategory'
                                        className='flex flex-wrap gap-4'>
                                        {drinkCategories.map((cat, idx) => (
                                            <div
                                                className='flex gap-2'
                                                key={idx}>
                                                <label>
                                                    <input
                                                        type='checkbox'
                                                        value={cat}
                                                        className='peer hidden'
                                                        checked={categories?.includes(
                                                            cat
                                                        )}
                                                        onChange={(e) => {
                                                            const currentCategory =
                                                                e.target.value;
                                                            if (
                                                                categories?.includes(
                                                                    cat
                                                                )
                                                            ) {
                                                                const newCategories =
                                                                    categories?.filter(
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
                                                    <div className='peer-checked:bg-quaternary hover:bg-tertiary bg-secondary rounded-lg h-7 flex w-max cursor-pointer items-center justify-center px-3 text-primary outline-none transition-colors'>
                                                        {cat}
                                                    </div>
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}
                            <div className='max-h-80 overflow-y-auto overflow-x-hidden'>
                                {currentStep === 2 && (
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
                                            {ingredients?.map(
                                                (ingredient, idx) => (
                                                    <div
                                                        className='relative'
                                                        key={idx}>
                                                        <AnimatedUnderlineWrapper classes='pt-12 first:pt-0 md:pt-14 md:first:pt-6'>
                                                            <input
                                                                className=' outline-none w-full'
                                                                value={
                                                                    ingredient
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
                                                        </AnimatedUnderlineWrapper>
                                                        <button
                                                            className='absolute right-0 top-1/2 -translate-y-1/2'
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
                                                                className='w-6 h-6'>
                                                                <path
                                                                    strokeLinecap='round'
                                                                    strokeLinejoin='round'
                                                                    d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
                                                                />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                )
                                            )}
                                            <button
                                                className='self-start'
                                                onClick={
                                                    addNewLineForIngredient
                                                }>
                                                <div className='flex gap-3 text-quaternary pt-3 '>
                                                    Add ingredient
                                                    <svg
                                                        xmlns='http://www.w3.org/2000/svg'
                                                        fill='none'
                                                        viewBox='0 0 24 24'
                                                        strokeWidth={1.5}
                                                        stroke='currentColor'
                                                        className='w-6 h-6 transition duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-110'>
                                                        <path
                                                            strokeLinecap='round'
                                                            strokeLinejoin='round'
                                                            d='M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z'
                                                        />
                                                    </svg>
                                                </div>
                                            </button>
                                        </div>
                                        <div className='flex gap-5 pt-3'>
                                            <h3 className='text-2xl font-yellowTail'>
                                                Servings:
                                            </h3>
                                            <input
                                                type='number'
                                                className='outline-none'
                                                value={servings}
                                                onChange={(e) =>
                                                    setServings(e.target.value)
                                                }
                                            />
                                        </div>
                                    </div>
                                )}
                                {currentStep === 3 && (
                                    <div className='flex flex-col gap-3'>
                                        <h2 className='text-2xl font-yellowTail'>
                                            Step by step directions
                                        </h2>
                                        {steps?.map((step, idx) => (
                                            <div className='relative' key={idx}>
                                                <h4>Step {idx + 1}</h4>
                                                <AnimatedUnderlineWrapper>
                                                    <textarea
                                                        className=' outline-none w-full'
                                                        value={step}
                                                        onChange={(e) => {
                                                            handleOnChangeSteps(
                                                                e,
                                                                idx
                                                            );
                                                        }}
                                                    />
                                                    <button
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
                                                            className='w-6 h-6 text-quaternary'>
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
                                            onClick={addNewLineForStep}>
                                            <div className='flex gap-3 text-quaternary'>
                                                Add step
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
                                                        d='M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z'
                                                    />
                                                </svg>
                                            </div>
                                        </button>
                                    </div>
                                )}
                            </div>
                            {currentStep === 3 && (
                                <div className='flex gap-10 pt-10 justify-end items-center'>
                                    <Link to='/'>
                                        <div className='rounded-xl border-2 border-quaternary h-8 flex items-center px-2.5 hover:bg-quaternary hover:text-primary transition-colors'>
                                            Cancel
                                        </div>
                                    </Link>
                                    <button type='submit'>
                                        <CTAButton label={'Update'} />
                                    </button>
                                </div>
                            )}
                        </form>
                    </div>
                </div>
                {isErrorState && <ErrorMessage />}
                <ArrowStepSwitchers
                    currentStep={currentStep}
                    setCurrentStep={setCurrentStep}
                />
            </div>
        );
    }

    return (
        <Ticker
            firstLine='The drink'
            secondLine='is not found'
            classes='min-h-[60vh]'
        />
    );
};
export default EditRecipe;
