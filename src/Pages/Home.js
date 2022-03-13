import { useState } from 'react';
import Navbar from '../components/navbar/Navbar';
import Search from '../components/Search';
import Drinks from '../components/Drinks';
import ResetFilterButton from '../components/ReseteFilterButton';
import AddNewDrinkButton from '../features/AddNewDrinkButton';
const Home = () => {
    const [wordForFilter, setWordForFilter] = useState("")
    const getSearchedValue = (value) => {
        setWordForFilter(value)
    }

    return <div className='flex flex-col space-between h-screen'>
        <Navbar />
        <main className='h-full flex flex-col justify-center items-center'>
            <h1>All drinks</h1>

            <AddNewDrinkButton drink={{
                name: "Shen Puerh Tea",
                taste: "bittersweet",
                categories: ["tea", "hot drinks"],
                origin: "China",
            }} />
            <Search onGetValue={(value) => getSearchedValue(value)} />
            {wordForFilter.length > 0 && <ResetFilterButton onReset={() => setWordForFilter("")} />}
            <Drinks />
        </main>
    </div>
}
export default Home;