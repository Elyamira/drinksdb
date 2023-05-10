import React from 'react';
import { useParams } from 'react-router-dom';
import { selectAllDrinks } from '../components/slices/drinksSlice';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';
import { addComment } from '../components/slices/drinksSlice';
import CTAButton from '../components/CTAButton';
import AnimatedUnderlineWrapper from '../components/AnimatedUnderlineWrapper';
import Ticker from '../components/Ticker';

export const Recipe = () => {
    const dispatch = useDispatch();
    const drinks = useSelector(selectAllDrinks);
    const { recipe } = useParams();
    const drinksIndex = drinks.findIndex(
        (drink) => drink.name.toLowerCase() === recipe.toLowerCase()
    );
    const currentDrink = drinks[drinksIndex];
    const [comment, setComment] = React.useState('');
    const { user, isAuthenticated } = useAuth0();
    let creatorId;
    if (user) {
        creatorId = user.sub;
    }
    const handleOnAddComment = async () => {
        const drinkName = currentDrink.name;
        const userComment = {
            text: comment,
            author: creatorId,
        };
        await dispatch(addComment({ drinkName, userComment })).unwrap();
        setComment('');
    };

    if (drinksIndex !== -1) {
        return (
            <div className='px-10 pb-10'>
                <div>
                    <h1 className='text-center py-10 text-4xl font-yellowTail'>
                        How to make {recipe}
                    </h1>
                </div>
                <div className=' flex-col md:flex-row flex justify-center gap-10 items-center'>
                    <div className='min-w-[320px]  md:min-w-[500px] md:max-h-[700px] overflow-hidden max-w-full flex-1 rounded-lg'>
                        <img
                            src={currentDrink.image}
                            className='rounded-lg'
                            alt={currentDrink.image}
                        />
                    </div>
                    <div className='flex flex-col flex-1 items-center font-yellowTail '>
                        <p className='text-3xl'>
                            Ingredients for {currentDrink.recipe.servings}
                            {currentDrink.recipe.servings > 1
                                ? ' servings'
                                : ' serving'}
                            :
                        </p>

                        <ul className='marker:text-quaternary list-disc pl-5 font-lato'>
                            {currentDrink.recipe.ingredients.map(
                                (ingr, idx) => (
                                    <li key={idx}>{ingr}</li>
                                )
                            )}
                        </ul>
                        <div className='pt-5 px-5 flex flex-col items-center '>
                            <p className='text-3xl'>Instructions</p>
                            <ol className='marker:text-quaternary list-decimal pl-5 font-lato'>
                                {currentDrink.recipe.steps.map((step, idx) => (
                                    <li key={idx}>{step}</li>
                                ))}
                            </ol>
                        </div>
                    </div>
                </div>

                <div className='pt-5'>
                    <h2 className='text-2xl'>Comments</h2>
                    {currentDrink?.comments?.length > 0 && (
                        <div>
                            {currentDrink.comments.map((comment, idx) => (
                                <p
                                    className='px-5 border-tertiary border-2 my-2 rounded-lg w-[24.25rem]'
                                    data-testid={`comment-${idx}`}
                                    key={idx}>
                                    {comment.text}
                                </p>
                            ))}
                        </div>
                    )}

                    {currentDrink?.comments?.length > 0 && !isAuthenticated && (
                        <div className='flex flex-col justify-center'>
                            <p>Log in if you want to leave a comment.</p>
                        </div>
                    )}
                    {currentDrink?.comments?.length <= 0 &&
                        (isAuthenticated ? (
                            <div className='flex flex-col justify-center'>
                                <p>
                                    There are no comments yet. Be the first to
                                    comment.
                                </p>
                            </div>
                        ) : (
                            <div className='flex flex-col justify-center'>
                                <p>
                                    There are no comments yet. Log in to leave
                                    the comment.
                                </p>
                            </div>
                        ))}

                    {user && (
                        <div className='flex flex-col gap-5 pt-5'>
                            <div className='flex flex-col md:flex-row gap-5 items-center'>
                                <div className='w-12 h-12'>
                                    <img
                                        className='rounded-full min-w-full'
                                        src={user?.picture}
                                        alt='your avatar'
                                    />
                                </div>
                                <AnimatedUnderlineWrapper classes={'w-80'}>
                                    <textarea
                                        className='border-t border-l border-r  w-full outline-none rounded-t-lg'
                                        onChange={(event) => {
                                            setComment(event.target.value);
                                        }}
                                        value={comment}
                                    />
                                </AnimatedUnderlineWrapper>
                                <div className='flex gap-5 w-full justify-center  md:justify-start pl-5 py-5'>
                                    <button
                                        disabled={comment.length < 2}
                                        onClick={() => {
                                            handleOnAddComment();
                                        }}>
                                        <CTAButton
                                            label='Add a comment'
                                            disabled={comment.length < 2}
                                        />
                                    </button>
                                    <button
                                        onClick={() => setComment('')}
                                        className='rounded-xl border-2 border-quaternary h-8 flex items-center px-2.5 hover:bg-quaternary hover:text-primary transition-colors'>
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }
    return (
        <Ticker
            firstLine='The recipe'
            secondLine='is not found'
            classes='min-h-[60vh]'
        />
    );
};
