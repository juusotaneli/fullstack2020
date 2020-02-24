import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog tests/>', () => {
  let username = 'juuso'
  const mock = jest.fn()

  let blogComponent
  const blog = {
    title: 'aaa',
    author: 'bbb',
    url: 'ccc',
    visible: false,
    likes: 0,
    user: {
      username: 'make'
    }
  }

  const blogs = [blog]
  beforeEach(() => {
    blogComponent = render(
      <Blog username={username} b={blogs} addLike={mock} />
    )
  })
  test('only title and author are rendered "view more" is not selected', () => {
    const titleAndAuthor = blogComponent.container.querySelector(
      '#titleAndAuthor'
    )
    const url = blogComponent.container.querySelector('#blogUrl')
    const likes = blogComponent.container.querySelector('#likes')
    expect(titleAndAuthor).toHaveTextContent('aaa' && 'bbb')
    expect(url).toBe(null)
    expect(likes).toBe(null)
  })
  test('title, author and likes are rendered after "view..." button is clicked', () => {
    const button = blogComponent.getByText('view')
    const titleAndAuthor = blogComponent.container.querySelector(
      '#titleAndAuthor'
    )
    const url = blogComponent.container.querySelector('#url')
    const likes = blogComponent.container.querySelector('#NumberOfLikes')
    expect(titleAndAuthor).toHaveTextContent('aaa' && 'bbb')
    fireEvent.click(button)
    expect(url).toBeDefined()
    expect(likes).toBeDefined()
  })
  test('if like button is pressed twice, like -handler is called 2 times', () => {
    const button = blogComponent.getByText('view')
    fireEvent.click(button)
    setTimeout(() => {
      const button1 = blogComponent.getByText('like')
      fireEvent.click(button1)
      fireEvent.click(button1)
      expect(mock.mock.calls.length).toBe(2)
    }, 1000)
  })
})
