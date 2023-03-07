import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Note from '../components/Note'

test('renders content', () => {
    const note = {
        content: 'Component testing is done with react-testing-library',
        important: true
    }

    // const { container } = render(<Note note={note} />)

    render(<Note note={note} />)

    // screen.debug()
    // screen.debug(container)

    // const div = container.querySelector('.note')
    // expect(div).toHaveTextContent(
    // 'Component testing is done with react-testing-library'
    // )

    const element = screen.getByText('Component testing is done with react-testing-library')
    expect(element).toBeDefined()
})

test('clicking the button calls event handler once', async () => {
    const note = {
        content: 'Component testing is done with react-testing-library',
        important: true
    }

    // The event handler is a mock function defined with Jest:
    const mockHandler = jest.fn()

    render(
        <Note note={note} toggleImportance={mockHandler} />
    )

    //A session is started to interact with the rendered component:
    const user = userEvent.setup()

    const button = screen.getByText('make not important')
    await user.click(button)

    //The expectation of the test verifies that the mock function has been called exactly once.
    expect(mockHandler.mock.calls).toHaveLength(1)
})