import { screen, render } from '../../test-utils/';
import { mocked } from 'jest-mock';
import { useAuth0 } from '@auth0/auth0-react';
import userEvent from '@testing-library/user-event';
import { waitFor } from '../../test-utils/';
import { MyAccount } from '../MyAccount';
jest.mock('@auth0/auth0-react');

const mockedUseAuth0 = mocked(useAuth0, true);
describe('My account page for logged user', () => {
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
        render(<MyAccount />);
        const header = await screen.findByRole('heading', {
            level: 2,
            name: /my account/i,
        });
        expect(header).toBeInTheDocument();
    });
    test('Page shows favourite drinks', async () => {
        render(<MyAccount />);
        const drinkAddedByUser = await screen.findByText(/Tea/i);
        expect(drinkAddedByUser).toBeInTheDocument();
    });
    test("When the user clicks 'delete from website' the drink is removed", async () => {
        const user = userEvent.setup();
        render(<MyAccount />);
        const drinkAddedByUser = await screen.findByText(/tea/i);
        expect(drinkAddedByUser).toBeInTheDocument();
        const removeButton = await screen.findByRole('button', {
            name: /Delete drink from website/i,
        });
        await user.click(removeButton);
        await waitFor(() => expect(drinkAddedByUser).not.toBeInTheDocument());
    });
});
describe('my account page without logged user', () => {
    beforeEach(() => {
        mockedUseAuth0.mockReturnValue({
            isAuthenticated: false,
            isLoading: false,
        });
    });
    test('Message to log in is shown when the user is not logged in', async () => {
        render(<MyAccount />);
        const errorMessage = await screen.findByRole('heading', {
            level: 2,
            name: /Please log in to see your account details and manage drinks/i,
        });
        expect(errorMessage).toBeInTheDocument();
    });
});
