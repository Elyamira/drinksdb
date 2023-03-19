import { useAuth0 } from '@auth0/auth0-react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import ErrorMessage from '../components/modal/ErrorMessage';
import SuccessMessage from '../components/modal/SuccessMessage';
import { updateDrink } from '../components/slices/drinksSlice';

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
        currentDrink && [...currentDrink.category]
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
    if (isSuccessState) {
        return (
            <div>
                <SuccessMessage />
                <Link to='/'>
                    <button>Take me to home page</button>
                </Link>
            </div>
        );
    }
    if (drinkIndex !== -1) {
        return (
            <div className='w-full pb-20'>
                <div className='flex flex-col w-[600px] mx-auto'>
                    <div className='flex gap-5'>
                        <div className='flex flex-col w-6/12'>
                            <p>Current drink name: {currentDrink?.name}</p>
                            <label htmlFor='drinkName'>New Drink Name</label>
                            <input
                                id='drinkName'
                                className='border-b border-black outline-none'
                                name='name'
                                value={name}
                                onChange={(event) =>
                                    setName(event.target.value)
                                }></input>
                            <p>Current drink taste: {currentDrink?.taste}</p>
                            <label htmlFor='drinkTaste'>New Drink Taste</label>

                            <input
                                id='drinkTaste'
                                className='border-b border-black outline-none'
                                name='taste'
                                value={taste}
                                onChange={(event) =>
                                    setTaste(event.target.value)
                                }></input>
                            <label htmlFor='drinkCategory'>
                                Choose drink's category
                            </label>
                        </div>
                        <div className='flex flex-col'>
                            <p>Selected image:</p>

                            {mainImagePreview && (
                                <img src={mainImagePreview} alt='uploaded' />
                            )}
                            <label
                                htmlFor='imageInput'
                                className='cursor-pointer'>
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
                    </div>
                    <div id='drinkCategory' className='flex flex-wrap gap-4'>
                        {drinkCategories.map((cat, idx) => (
                            <div className='flex gap-2' key={idx}>
                                <input
                                    type='checkbox'
                                    value={cat}
                                    checked={categories?.includes(cat)}
                                    onChange={(e) => {
                                        const currentCategory = e.target.value;
                                        if (categories?.includes(cat)) {
                                            const newCategories =
                                                categories.filter(
                                                    (cat) =>
                                                        cat !== currentCategory
                                                );
                                            setCategories(newCategories);
                                        } else {
                                            setCategories([
                                                ...categories,
                                                currentCategory,
                                            ]);
                                        }
                                    }}
                                />
                                <p>{cat}</p>
                            </div>
                        ))}
                    </div>
                    <div>
                        <h2 className='text-4xl'>Recipe</h2>
                        <div className='flex flex-col'>
                            <h3 className='text-3xl'>Ingredients</h3>
                            <p>
                                Enter one ingredient per line. Include the
                                quantity (i.e. cups, tablespoons) and any
                                special preparation (i.e. sifted, softened,
                                chopped).
                            </p>
                            <div className='flex flex-col'>
                                {ingredients?.map((ingredient, idx) => (
                                    <div className='relative' key={idx}>
                                        <input
                                            className='border-b border-black outline-none w-full'
                                            value={ingredient}
                                            onChange={(e) => {
                                                handleOnChangeIngredient(
                                                    e,
                                                    idx
                                                );
                                            }}
                                        />
                                        <button
                                            className='absolute right-0 top-0'
                                            onClick={() => {
                                                deleteIngredientLine(idx);
                                            }}>
                                            remove ingredient
                                        </button>
                                    </div>
                                ))}
                                <button
                                    className='self-start'
                                    onClick={addNewLineForIngredient}>
                                    Add ingredient
                                </button>
                            </div>
                        </div>
                        <div className='flex flex-col gap-3'>
                            <div>
                                <h3 className='text-3xl'>Directions</h3>
                                <p>Explain how to make your recipe</p>
                            </div>
                            {steps?.map((step, idx) => (
                                <div className='relative' key={idx}>
                                    <h4>Step {idx + 1}</h4>
                                    <textarea
                                        className='border-b border-black outline-none w-full'
                                        value={step}
                                        onChange={(e) => {
                                            handleOnChangeSteps(e, idx);
                                        }}
                                    />
                                    <button
                                        className='absolute right-0 top-0'
                                        onClick={() => {
                                            deleteStepLine(idx);
                                        }}>
                                        remove step
                                    </button>
                                </div>
                            ))}

                            <button
                                className='self-start'
                                onClick={addNewLineForStep}>
                                Add step
                            </button>
                        </div>

                        <h3 className='text-3xl'>Servings</h3>
                        <input
                            type='number'
                            placeholder='e.g. 4'
                            className='outline-none'
                            value={servings}
                            onChange={(e) => setServings(e.target.value)}
                        />
                    </div>
                    <div className='flex gap-5 pt-10 justify-end'>
                        <Link to='/'>Cancel</Link>
                        <button onClick={onUpdateDrink}>Update</button>
                    </div>
                </div>
                {isErrorState && <ErrorMessage />}
            </div>
        );
    }

    return (
        <div>
            <p>The drink is not found</p>
        </div>
    );
};
export default EditRecipe;
