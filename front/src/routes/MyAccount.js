import { useAuth0 } from '@auth0/auth0-react';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { fetchDrinks } from '../components/slices/drinksSlice';
import DrinkCard from '../components/DrinkCard';
import Ticker from '../components/Ticker';

export const MyAccount = () => {
    const { user } = useAuth0();
    const allDrinks = useSelector((state) => state.drinksData);
    let currentUserId;
    if (user) {
        currentUserId = user.sub;
    }
    const drinksAddedByUser = allDrinks.drinks?.filter((drink) => {
        return drink.creatorId === currentUserId;
    });
    const dispatch = useDispatch();
    const drinksStatus = useSelector((state) => state.drinksData.status);

    useEffect(() => {
        if (drinksStatus === 'idle') {
            dispatch(fetchDrinks());
        }
    }, [drinksStatus, dispatch]);

    if (!user) {
        return (
            <Ticker
                firstLine='Please log in'
                secondLine='to manage your drinks'
                classes='min-h-[60vh]'
            />
        );
    }

    return (
        <div className='overflow-x-hidden'>
            <div>
                <h3 className='text-6xl text-center py-7 font-yellowTail overflow-x-hidden'>
                    Manage drinks you've added
                </h3>
                <div className='w-full flex justify-center relative overflow-x-hidden'>
                    <div
                        className='flex flex-col items-center md:grid pb-12 lg:px-7 px-24'
                        style={{
                            width: '100%',
                            gridAutoRows: '1fr',
                            gridTemplateColumns:
                                'repeat(auto-fill, minmax(300px, 1fr))',
                            gridGap: '20px 20px',
                            justifyItems: 'center',
                        }}>
                        {drinksAddedByUser.length > 0 ? (
                            drinksAddedByUser.map((drink, idx) => {
                                return (
                                    <DrinkCard
                                        key={idx}
                                        drink={drink}
                                        isWithUserButtons={false}
                                        index={idx}
                                    />
                                );
                            })
                        ) : (
                            <Ticker
                                firstLine="You haven't added"
                                secondLine='any drinks yet'
                                classes='pt-[10vh]'
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
