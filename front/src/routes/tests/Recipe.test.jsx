import { screen, render, waitFor } from '../../test-utils';
import { Recipe } from '../Recipe';
import { mocked } from 'jest-mock';
import { useAuth0 } from '@auth0/auth0-react';
import userEvent from '@testing-library/user-event';
import App from '../../App';
jest.mock('@auth0/auth0-react');

const mockedUseAuth0 = mocked(useAuth0, true);

describe('Recipe page tests without params', () => {
    beforeEach(() => {
        mockedUseAuth0.mockReturnValue({
            isAuthenticated: true,
            user: { sub: 'TestUserId' },
            logout: jest.fn(),
            loginWithRedirect: jest.fn(),
            isLoading: false,
        });
    });
    test('the page loads and shows the recipe for selected drink', async () => {
        render(<Recipe />);
        const errorMessage = await screen.findByRole('heading', {
            level: 3,
            name: 'The recipe is not found',
        });
        expect(errorMessage).toBeInTheDocument();
    });
});
describe('with params, not signed', () => {
    beforeEach(() => {
        mockedUseAuth0.mockReturnValue({
            isAuthenticated: false,
            user: { sub: 'not authenticated' },
            logout: jest.fn(),
            loginWithRedirect: jest.fn(),
            isLoading: false,
        });
    });
    test('Page shows recipe', async () => {
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
    test("without authentication user can't leave comments", async () => {
        const user = userEvent.setup();
        render(<App />);
        const readFullRecipeBtns = await screen.findAllByRole('link', {
            name: /read the full recipe/i,
        });
        const buttonForTea = readFullRecipeBtns[0];
        await user.click(buttonForTea);
        const textForNotLoggedInUser = await screen.findByText(
            'There are no comments yet. Log in to leave the comment.'
        );
        expect(textForNotLoggedInUser).toBeInTheDocument();
    });
});
describe('with params, signed', () => {
    beforeEach(() => {
        mockedUseAuth0.mockReturnValue({
            isAuthenticated: true,
            user: { sub: 'TestUserId' },
            logout: jest.fn(),
            loginWithRedirect: jest.fn(),
            isLoading: false,
        });
    });
    test('with authentication user can leave comment', async () => {
        const user = userEvent.setup();
        render(<App />);
        const readFullRecipeBtns = await screen.findAllByRole('link', {
            name: /read the full recipe/i,
        });
        const buttonForTea = readFullRecipeBtns[0];
        await user.click(buttonForTea);
        const textForLoggedInUserToLeaveComment = await screen.findByText(
            'There are no comments yet. Be the first to comment.'
        );
        expect(textForLoggedInUserToLeaveComment).toBeInTheDocument();
    });
    test('When the user adds comment it appears on the screen and input is cleared', async () => {
        const user = userEvent.setup();
        render(<App />);
        const readFullRecipeBtns = await screen.findAllByRole('link', {
            name: /read the full recipe/i,
        });
        const buttonForTea = readFullRecipeBtns[0];
        await user.click(buttonForTea);
        const textArea = await screen.findByRole('textbox');
        await user.type(textArea, "Hello, it's my first comment");
        const addCommentButton = await screen.findByRole('button', {
            name: /Comment/i,
        });
        await user.click(addCommentButton);
        const displayedComment = await screen.findByTestId('comment-0');

        await waitFor(() =>
            expect(displayedComment).toHaveTextContent(
                "Hello, it's my first comment"
            )
        );
    });
    test('When the user clicks cancel the text are is cleared', async () => {
        const user = userEvent.setup();
        render(<App />);
        const readFullRecipeBtns = await screen.findAllByRole('link', {
            name: /read the full recipe/i,
        });
        const buttonForTea = readFullRecipeBtns[0];
        await user.click(buttonForTea);
        const textArea = await screen.findByRole('textbox');
        await user.type(textArea, "Hello, it's my second comment");
        const canceCommentButton = await screen.findByRole('button', {
            name: /Cancel/i,
        });
        expect(textArea).toHaveTextContent("Hello, it's my second comment");
        await user.click(canceCommentButton);
        expect(textArea).toHaveTextContent('');
    });
});
