import Navbar from "../navbar/Navbar";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux"
import { store } from '../../app/store';
import Drinks from '../Drinks';
import { BrowserRouter } from 'react-router-dom';
import Home from '../../Pages/Home';
describe("Single drink page tests", () => {
    test("Renders a page for a single drink when the drink is clicked", () => {
        render(
            <BrowserRouter>
                <Provider store={store}>
                    <Drinks />
                </Provider>
            </BrowserRouter>
        );
        const btn = screen.queryByTestId('detailedDrinkInfoBtn1')
        console.log(btn);

    })
})