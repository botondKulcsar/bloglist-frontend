import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

test('<Blog /> renders title and author by default and does not render url and likes', () => {
  const blog = {
    title: 'test title',
    author: 'testing-library',
    url: 'http://testing-library.com'
  }

  const user = {
    username: 'testing-react',
    name: 'test name'
  }

  const component = render(
    <Blog blog={blog} user={user} />
  )

  expect(component.container.querySelector('.blog')).toHaveTextContent(
    `${blog.title} ${blog.author}`
  )
  expect(component.container.querySelector('.blog')).not.toHaveTextContent(
    `${blog.url} likes 0`
  )
})