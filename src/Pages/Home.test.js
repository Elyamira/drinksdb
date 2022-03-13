import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../app/store';
import userEvent from '@testing-library/user-event'
import Home from './Home';

const { getByTestId, getByText, queryByText } = render(
    <Provider store={store}>
        {/* <Search /> */}
        <Home />
    </Provider>
);
const input = getByTestId("home-search-input");
const button = getByTestId("home-search-button");


test('when type in the search input the value changes', () => {
    expect(input.value).toBe("")
    userEvent.type(input, 'su');
    expect(input.value).toBe('su')
});

test('when click on the search button, non-related elements are not shown', () => {
    waitFor(() => expect(queryByText("Cocoa")).toBeInTheDocument())
    userEvent.type(input, 'Puerh');
    userEvent.click(button);
    expect(queryByText("Cocoa")).not.toBeInTheDocument()
    waitFor(() => expect(queryByText("Puerh Tea")).toBeInTheDocument())
});


