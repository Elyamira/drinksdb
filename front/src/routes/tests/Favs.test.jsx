import { screen, render } from '../../test-utils/';
import Favs from '../Favs';
import { mocked } from 'jest-mock';
import { useAuth0 } from '@auth0/auth0-react';
import userEvent from '@testing-library/user-event';
import { waitFor } from '../../test-utils/';
jest.mock('@auth0/auth0-react');

const mockedUseAuth0 = mocked(useAuth0, true);
jest.useFakeTimers();
describe('Favs tests', () => {
    beforeEach(() => {
        mockedUseAuth0.mockReturnValue({
            isAuthenticated: true,
            user: { sub: 'TestUserId' },
            logout: jest.fn(),
            loginWithRedirect: jest.fn(),
            isLoading: false,
        });
    });
    test('Page shows correct header', async () => {
        render(<Favs />);
        const header = await screen.findByRole('heading', {
            level: 2,
            name: /my favs/i,
        });
        expect(header).toBeInTheDocument();
    });
    test('Page shows favourite drinks', async () => {
        render(<Favs />);
        const header = await screen.findByRole('heading', {
            level: 2,
            name: /my favs/i,
        });
        expect(header).toBeInTheDocument();
        const favouriteDrink = await screen.findByText(/coffee/i);
        expect(favouriteDrink).toBeInTheDocument();
    });
    test("When the user clicks 'remove from favourites button' the drink is removed", async () => {
        const user = userEvent.setup();
        render(<Favs />);
        const favouriteDrink = await screen.findByText(/coffee/i);
        expect(favouriteDrink).toBeInTheDocument();
        const removeButton = await screen.findByRole('button', {
            name: /Remove From favourites/i,
        });
        await waitFor(() => expect(removeButton).toBeInTheDocument());
        await user.click(removeButton);
        await waitFor(() => expect(favouriteDrink).not.toBeInTheDocument());
    });
});
