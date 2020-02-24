import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

test('BlogForm calls createBlog correctly', () => {
  const createNewBlog = jest.fn()

  const component = render(<BlogForm createNewBlog={createNewBlog} />)

  const titleComponent = component.container.querySelector('#title')
  const authorComponent = component.container.querySelector('#author')
  const urlComponent = component.container.querySelector('#urlComponent')
  const form = component.container.querySelector('#form')

  fireEvent.change(titleComponent, {
    target: { value: 'aaa' }
  })

  fireEvent.change(authorComponent, {
    target: { value: 'bbb' }
  })

  fireEvent.change(urlComponent, {
    target: { value: 'ccc' }
  })

  fireEvent.submit(form)
  expect(createNewBlog.mock.calls.length).toBe(1)
})
