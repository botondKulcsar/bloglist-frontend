import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let component
  const blog = {
    title: 'test title',
    author: 'testing-library',
    url: 'http://testing-library.com'
  }

  const mockLike = jest.fn()

  beforeEach(() => {
    component = render(
      <Blog blog={blog} likeBlog={mockLike}/>
    )
  })

  test('renders title and author by default and does not render url and likes', () => {

    expect(component.container.querySelector('.blog')).toHaveTextContent(
      `${blog.title} ${blog.author}`
    )
    expect(component.container.querySelector('.blog')).not.toHaveTextContent(
      `${blog.url} likes 0`
    )
  })

  test('the url and likes of blog are display when clicking the <view> button', () => {
    const button = component.getByText('view')
    fireEvent.click(button)

    expect(component.container.querySelector('.blog')).toHaveTextContent(
      `${blog.title} ${blog.author}hide${blog.url}likes likeremove`
    )
  })

  test('if the <like> button is clicked twice the event handler is called twice', () => {
    const button = component.getByText('view')
    fireEvent.click(button)

    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)


    expect(mockLike.mock.calls).toHaveLength(2)
  })

})