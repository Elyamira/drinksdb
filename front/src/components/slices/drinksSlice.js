import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
const URL = 'http://localhost:3001/';
export const fetchDrinks = createAsyncThunk('/', async () => {
    const response = await fetch(URL);
    const jsonResponse = await response.json();
    return jsonResponse;
});

export const addNewDrink = createAsyncThunk(
    '/add',
    // The payload creator receives the partial `{taste, name}` object
    async (initialDrink) => {
        // We send the initial data to the fake API server
        const response = await fetch(URL, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify(initialDrink),
        });
        const jsonResponse = await response.json();
        if (response.status === 400) {
            throw new Error(jsonResponse.message);
        }
        if (response.status === 200) {
            fetchDrinks();
            return jsonResponse;
        }
    }
);
export const updateDrink = createAsyncThunk(
    '/edit',
    // The payload creator receives the partial `{taste, name}` object
    async (updatedDrink) => {
        // We send the initial data to the fake API server
        const response = await fetch(`${URL}edit`, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({ updatedDrink: { ...updatedDrink } }),
        });
        const jsonResponse = await response.json();
        if (response.status === 400) {
            throw new Error(jsonResponse.message);
        }
        if (response.status === 200) {
            return jsonResponse;
        }
    }
);

export const addToFavourites = createAsyncThunk(
    '/addToFavs',
    async (updatedDrink) => {
        const response = await fetch(`${URL}addToFavs`, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({ ...updatedDrink }),
        });
        const jsonResponse = await response.json();
        if (response.status === 400) {
            throw new Error(jsonResponse.message);
        }
        if (response.status === 200) {
            return jsonResponse;
        }
    }
);
export const removeFromFavs = createAsyncThunk(
    '/removeFromFavs',
    async (updatedDrink) => {
        const response = await fetch(`${URL}removeFromFavs`, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({ ...updatedDrink }),
        });
        const jsonResponse = await response.json();
        if (response.status === 400) {
            throw new Error(jsonResponse.message);
        }
        if (response.status === 200) {
            return jsonResponse;
        }
    }
);

export const addComment = createAsyncThunk(
    '/addComment',
    async (newComment) => {
        const response = await fetch(`${URL}addComment`, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({ ...newComment }),
        });
        const jsonResponse = await response.json();
        if (response.status === 400) {
            throw new Error(jsonResponse.message);
        }
        if (response.status === 200) {
            return jsonResponse;
        }
    }
);

const initialState = {
    drinks: [],
    status: 'idle',
    filteredDrinks: [],
    error: null,
};
export const drinksSlice = createSlice({
    name: 'allDrinks',
    initialState,
    reducers: {
        filter: (state, action) => {
            if (action.payload === '') {
                state.filteredDrinks = [];
            }
            const filteredData = state.drinks.filter((value) => {
                return (
                    value.name
                        .toLowerCase()
                        .trim()
                        .includes(action.payload.toLowerCase().trim()) ||
                    value.category.includes(action.payload)
                );
            });
            state.filteredDrinks = filteredData;
        },
        resetFilter: (state, action) => {
            if (action.payload === '') {
                state.filteredDrinks = [];
            }
            state.filteredDrinks = [];
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchDrinks.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchDrinks.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.drinks = state.drinks.concat(action.payload);
            })
            .addCase(fetchDrinks.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addNewDrink.fulfilled, (state, action) => {
                // We can directly add the new drink object to our drinks array
                state.drinks.push(action.payload);
            })
            .addCase(updateDrink.fulfilled, (state, action) => {
                state.status = 'succeeded';
                // We can directly add the new drink object to our drinks array
                state.drinks = action.payload;
            })
            .addCase(addToFavourites.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.drinks = action.payload;
            })
            .addCase(removeFromFavs.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.drinks = action.payload;
            })
            .addCase(addComment.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.drinks = action.payload;
            });
    },
});
export const selectAllDrinks = (state) => state.drinksData.drinks;
export const { edit, add, filter, resetFilter } = drinksSlice.actions;
export default drinksSlice.reducer;
