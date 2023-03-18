// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

import { server } from './mocks/server.js';
// Establish API mocking before all tests.
beforeAll(() => server.listen());
// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
beforeEach(() => {
    window.history.pushState({}, '', '/');
});
afterEach(() => server.resetHandlers());
// Clean up after the tests are finished.
afterAll(() => server.close());

// jest.mock('@auth0/auth0-react', () => ({
//     Auth0Provider: ({ children }) => children,
//     withAuthenticationRequired: (component, _) => component,
//     useAuth0: () => {
//         return {
//             isLoading: false,
//             user: { sub: 'TestUserId' },
//             isAuthenticated: true,
//             loginWithRedirect: jest.fn(),
//         };
//     },
// }));
// const reactRouterDom = require('react-router-dom');
// reactRouterDom.BrowserRouter = ({ children }) => <div>{children}</div>;

// module.exports = reactRouterDom;
