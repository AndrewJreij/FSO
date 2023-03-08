import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from '../components/Blog'

test('renders content without likes and url', () => {
    const blog = {
        title: 'title',
        author: 'author',
        likes: 0,
        url: 'url',
        user: {
            name: 'name'
        }
    }

    const { container } = render(<Blog blog={blog} />)

    const div = container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: none')

})

test('renders all content when show button is clicked', async () => {
    const blog = {
        title: 'title',
        author: 'author',
        likes: 0,
        url: 'url',
        user: {
            name: 'name'
        }
    }

    const { container } = render(<Blog blog={blog} />)

    const user = userEvent.setup()

    const button = screen.getByText('view')
    await user.click(button)

    const div = container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')
})

test('clicking the like button twice starts 2 events', async () => {
    const blog = {
        title: 'title',
        author: 'author',
        likes: 0,
        url: 'url',
        user: {
            name: 'name'
        }
    }

    const mockHandler = jest.fn()

    render(<Blog blog={blog} handleLikeBlog={mockHandler} />)

    const user = userEvent.setup()

    const button = screen.getByText('like')
    await user.click(button)
    await user.click(button)

    expect(mockHandler.mock.calls).toHaveLength(2)
})