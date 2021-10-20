import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

test('<BlogForm /> calls event handler with the right details when a new blog is created', () => {
  const createBlog = jest.fn()

  const component = render(
    <BlogForm handleSubmit={createBlog} />
  )

  const authorInput = component.container.querySelector('#author')
  const form = component.container.querySelector('form')

  fireEvent.change(authorInput, {
    target: { value: 'complicated' }
  })
  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].author).toBe('complicated')
})