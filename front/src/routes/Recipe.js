import React from 'react';
import { useParams } from 'react-router-dom';
import { selectAllDrinks } from '../components/slices/drinksSlice';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';
import { addComment } from '../components/slices/drinksSlice';

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
    const commentsHeader =
        user && isAuthenticated
            ? ' There are no comments yet. Be the first to comment.'
            : ' There are no comments yet. Log in to leave the comment.';
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
            <div>
                <h1>{`This is my awesome recipe of ${recipe}`}</h1>
                {currentDrink.recipe.ingredients.map((ingr, idx) => (
                    <p key={idx}>{ingr}</p>
                ))}
                {currentDrink.recipe.steps.map((step, idx) => (
                    <p key={idx}>{step}</p>
                ))}
                <p>Servings: {currentDrink.recipe.servings}</p>
                <div>
                    <h2>Comments</h2>
                    {currentDrink?.comments?.length > 0 ? (
                        <div>
                            {currentDrink.comments.map((comment, idx) => (
                                <p data-testid={`comment-${idx}`} key={idx}>
                                    {comment.text}
                                </p>
                            ))}
                        </div>
                    ) : (
                        <div className='flex flex-col justify-center'>
                            <p>{commentsHeader}</p>
                        </div>
                    )}
                    {user && (
                        <div className='flex flex-col gap-5'>
                            <div className='flex'>
                                <div className='w-12 h-12'>
                                    <img
                                        className='rounded-full min-w-full'
                                        src={user?.picture}
                                        alt='your avatar'
                                    />
                                </div>
                                <textarea
                                    className='border border-black w-full'
                                    onChange={(event) => {
                                        setComment(event.target.value);
                                    }}
                                    value={comment}
                                />
                            </div>
                            <div className='flex gap-5 w-full justify-center'>
                                <button
                                    onClick={() => {
                                        handleOnAddComment();
                                    }}>
                                    Comment
                                </button>
                                <button onClick={() => setComment('')}>
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }
    return (
        <div>
            <h3>The recipe is not found</h3>
        </div>
    );
};
