import { screen, render } from '../../test-utils/';
import userEvent from '@testing-library/user-event';
import Home from '../Home';
import App from '../../App';
import { mocked } from 'jest-mock';
import { useAuth0 } from '@auth0/auth0-react';
import Favs from '../../routes/Favs';

jest.mock('@auth0/auth0-react');

const mockedUseAuth0 = mocked(useAuth0, true);

describe('Home page tests', () => {
    beforeEach(() => {
        mockedUseAuth0.mockReturnValue({
            isAuthenticated: true,
            user: { sub: 'TestUserId' },
            logout: jest.fn(),
            loginWithRedirect: jest.fn(),
            isLoading: false,
        });
    });
    test('Home page shows initial data', async () => {
        render(<Home />);
        const drinks = await screen.findAllByRole('heading', { level: 4 });
        expect(drinks).toHaveLength(2);
        const innerText = drinks.map((el) => el.innerHTML);
        expect(innerText).toEqual(['Tea', 'Coffee']);
    });

    test('When typing in a search input, the drinks that match the search word are shown', async () => {
        const user = userEvent.setup();
        render(<Home />);
        const searchInput = screen.getByTestId('home-search-input');
        await user.type(searchInput, 'Tea');
        expect(searchInput.value).toEqual('Tea');
        const searchButton = screen.getByTestId('home-search-button');
        await user.click(searchButton);
        const allDrinks = screen.queryAllByRole('heading', { level: 4 });
        expect(allDrinks).toHaveLength(1);
    });

    test("When clicking on 'get a random drink', a random drink is shown", async () => {
        const user = userEvent.setup();
        render(<Home />);
        const randomDrinkButton = await screen.findByRole('button', {
            name: /get a random drink/i,
        });
        await user.click(randomDrinkButton);
        const modal = await screen.findByTestId('modal');
        expect(modal.textContent).toEqual('Coffee with cinnamon');
        const closeBtn = screen.getByRole('img', {
            name: /close random drink popup/i,
        });

        await user.click(closeBtn);
    });
    test('When user is logged in, he can add drinks to favourites and remove from favourites', async () => {
        const user = userEvent.setup();
        render(<Home />);
        const logOutButton = await screen.findByRole('button', {
            name: /Log out/i,
        });
        expect(logOutButton).toBeInTheDocument();

        const addToFavsBtn = await screen.findByRole('button', {
            name: 'add-to-favs-0',
        });
        await user.click(addToFavsBtn);

        const removeFromFavsBtn = await screen.findByRole('button', {
            name: 'remove-from-favs-0',
        });
        expect(removeFromFavsBtn).toBeInTheDocument();

        await user.click(removeFromFavsBtn);
        expect(addToFavsBtn).toBeInTheDocument();
    });

    test('Redirects to my account page when Avatar is clicked', async () => {
        const user = userEvent.setup();
        render(<App />);
        const avatarImg = await screen.findByRole('img', {
            name: /your avatar/i,
        });
        await user.click(avatarImg);
        const headerOnAccountPage = await screen.findByRole('link', {
            name: '/my-account',
        });
        expect(headerOnAccountPage).toBeInTheDocument();
    });

    test('Redirects to recipe page when read full recipe button is clicked', async () => {
        const user = userEvent.setup();
        render(<App />);
        const readFullRecipeBtns = await screen.findAllByRole('link', {
            name: /read the full recipe/i,
        });
        const buttonForTea = readFullRecipeBtns[0];
        await user.click(buttonForTea);
        const teaRecipePage = await screen.findByRole('heading', {
            level: 1,
            name: /How to make tea/i,
        });
        expect(teaRecipePage).toBeInTheDocument();
    });
});

describe("without authentication user doesn't see my account button", () => {
    beforeEach(() => {
        mockedUseAuth0.mockReturnValue({
            isAuthenticated: false,
            user: { sub: 'TestUserId' },
            logout: jest.fn(),
            loginWithRedirect: jest.fn(),
            isLoading: false,
        });
    });
    test("without authentication user doesn't see my account button", async () => {
        render(<Home />);
        const logInToAddDrinksButton = await screen.findByText(/My account/i);
        expect(logInToAddDrinksButton).toBeInTheDocument();
    });
});
