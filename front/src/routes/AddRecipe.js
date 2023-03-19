import { useAuth0 } from '@auth0/auth0-react';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addNewDrink } from '../components/slices/drinksSlice';
import SuccessMessage from '../components/modal/SuccessMessage';
import ErrorMessage from '../components/modal/ErrorMessage';

const AddRecipe = () => {
    const dispatch = useDispatch();
    let creatorId;
    const drinkCategories = ['Hot', 'Cold', 'Party', 'Mocktails'];
    const { user, isAuthenticated } = useAuth0();
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

    const onAddDrink = async (event) => {
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

    return (
        <div className='w-full pb-20'>
            <div className='flex flex-col w-[600px] mx-auto'>
                <div className='flex gap-5'>
                    <div className='flex flex-col w-6/12'>
                        <label htmlFor='drinkName'>Enter Drink Name</label>
                        <input
                            id='drinkName'
                            className='border-b border-black outline-none'
                            name='name'
                            value={name}
                            onChange={(event) =>
                                setName(event.target.value)
                            }></input>
                        <label htmlFor='drinkTaste'>Enter Drink Taste</label>
                        <input
                            id='drinkTaste'
                            className='border-b border-black outline-none'
                            name='taste'
                            value={taste}
                            onChange={(event) =>
                                setTaste(event.target.value)
                            }></input>
                        <label htmlFor='drinkCategory'>
                            Choose drink's category{' '}
                        </label>
                    </div>
                    <div className='flex flex-col'>
                        <input
                            type='file'
                            accept='.png, .jpg, .jpeg'
                            multiple={false}
                            onChange={(e) => handleImageUpload(e)}
                        />
                        {mainImagePreview && (
                            <img src={mainImagePreview} alt='uploaded' />
                        )}
                    </div>
                </div>
                <div id='drinkCategory' className='flex flex-wrap gap-4'>
                    {drinkCategories.map((cat, idx) => (
                        <div className='flex gap-2' key={idx}>
                            <input
                                type='checkbox'
                                value={cat}
                                checked={categories.includes(cat)}
                                onChange={(e) => {
                                    const currentCategory = e.target.value;
                                    if (categories.includes(cat)) {
                                        const newCategories = categories.filter(
                                            (cat) => cat !== currentCategory
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
                            Enter one ingredient per line. Include the quantity
                            (i.e. cups, tablespoons) and any special preparation
                            (i.e. sifted, softened, chopped).
                        </p>
                        <div className='flex flex-col'>
                            {ingredients.map((ingredient, idx) => (
                                <div className='relative' key={idx}>
                                    <input
                                        placeholder={ingredient.placeholder}
                                        className='border-b border-black outline-none w-full'
                                        value={ingredient.name}
                                        onChange={(e) => {
                                            handleOnChangeIngredient(e, idx);
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
                        {steps.map((step, idx) => (
                            <div className='relative' key={idx}>
                                <h4>Step {idx + 1}</h4>
                                <textarea
                                    className='border-b border-black outline-none w-full'
                                    placeholder={step.placeholder}
                                    value={step.name}
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
                            {' '}
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
                    <button onClick={onAddDrink}>Submit</button>
                </div>
            </div>
            {isErrorState && <ErrorMessage />}
        </div>
    );
};
export default AddRecipe;
