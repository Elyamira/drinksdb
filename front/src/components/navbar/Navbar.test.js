
import { fireEvent, render } from '@testing-library/react';
import { screen } from '@testing-library/react';
import Modal from '../Modal';
import closeBtn from '../../icons/close-btn.svg'

describe("Testing Navbar", () => {
    test("testing modal portal", () => {
        const hideFunc = jest.fn();
        render(
            <Modal hideFunc={hideFunc}>
                <button data-testid="randomDrinkButton" className='absolute top-0 right-1' onClick={() => hideFunc()}>
                    <img src={closeBtn} alt="close random drink popup" />
                </button>
            </Modal>
        )
        const btn = screen.queryByTestId("randomDrinkButton")
        expect(btn).toBeInTheDocument()
        const closeImg = screen.queryByAltText("close random drink popup")
        expect(closeImg).toBeInTheDocument();
        fireEvent.click(screen.queryByTestId("randomDrinkButton"));
        expect(hideFunc).toHaveBeenCalledTimes(1)

    })
    test("modal portal should be unmounted", () => {
        const hideFunc = jest.fn();
        const { unmount, queryByAltText } = render(
            <Modal>
                <button data-testid="randomDrinkButton" className='absolute top-0 right-1' onClick={() => hideFunc()}>
                    <img src={closeBtn} alt="close random drink popup" />
                </button>
            </Modal>
        )
        const closeImg = queryByAltText("close random drink popup")

        expect(closeImg).toBeInTheDocument();
        unmount();
        expect(closeImg).not.toBeInTheDocument();

    })

})