import React from 'react';
import './App.css';
import Home from './pages/Home';
import Favs from './routes/Favs';
import { MyAccount } from './routes/MyAccount';
import { Recipe } from './routes/Recipe';
import AddRecipe from './routes/AddRecipe';
import EditRecipe from './routes/EditRecipe';
import { Route, Routes } from 'react-router-dom';
import Preloader from './components/Preloader';

function App() {
    return (
        <div className='App selection:bg-secondary'>
            <Preloader />
            <Routes>
                <Route path='/' element={<Home />}></Route>
                <Route path='/favs' element={<Favs />}></Route>
                <Route path='/my-account' element={<MyAccount />}></Route>
                <Route path='/recipes/:recipe' element={<Recipe />}></Route>
                <Route
                    path='/recipes/add-recipe'
                    element={<AddRecipe />}></Route>
                <Route
                    path='/account/edit-recipe/:recipe'
                    element={<EditRecipe />}></Route>
            </Routes>
        </div>
    );
}

export default App;
