import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from '../components/BlogForm'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
    const createBlog = jest.fn()
    const user = userEvent.setup()

    const { container } = render(<BlogForm handleNewBlog={createBlog} />)

    const titleInput = container.querySelector(`input[name='Title']`)
    const authorInput = container.querySelector(`input[name='Author']`)
    const urlInput = container.querySelector(`input[name='Url']`)

    screen.debug(titleInput)

    await userEvent.type(titleInput, 'title')
    await userEvent.type(authorInput, 'author')
    await userEvent.type(urlInput, 'url')

    const createButton = screen.getByText('create')

    await user.click(createButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('title')
    expect(createBlog.mock.calls[0][0].author).toBe('author')
    expect(createBlog.mock.calls[0][0].url).toBe('url')
})