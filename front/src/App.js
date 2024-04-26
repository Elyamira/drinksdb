import React from 'react';
import Home from './pages/Home';
import Favs from './routes/Favs';
import { MyAccount } from './routes/MyAccount';
import { Recipe } from './routes/Recipe';
import AddRecipe from './routes/AddRecipe';
import EditRecipe from './routes/EditRecipe';
import { Route, Routes, useLocation } from 'react-router-dom';
import Preloader from './components/Preloader';

function App() {
    const [loading, setLoading] = React.useState(false);
    const location = useLocation();

    React.useEffect(() => {
        setLoading(true);

        const timeoutId = setTimeout(() => {
            setLoading(false);
        }, 3700);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [location]);

    return (
        <div className='selection:bg-secondary flex-1 flex flex-col'>
            {loading ? (
                <Preloader loading={loading} />
            ) : (
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
            )}
        </div>
    );
}

export default App;
