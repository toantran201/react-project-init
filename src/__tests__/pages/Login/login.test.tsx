import React from 'react'
import { vi } from 'vitest'
import { Login, LoginForm } from '@/pages'
import { faker } from '@faker-js/faker'
import { customRender as render, userEvent, screen } from '@/utils/test'
import { waitForElementToBeRemoved } from '@testing-library/react'
const buildLoginFormData = (overrides?: {
  username?: string
  password?: string
}): { username: string; password: string } => {
  return {
    username: faker.internet.userName(),
    password: faker.internet.password(),
    ...overrides,
  }
}

describe('Test login component', () => {
  test('onSubmit function props call with username and password when click submit', () => {
    const onSubmit = vi.fn()

    render(<LoginForm onSubmit={onSubmit} />)
    const usernameField = screen.getByLabelText(/username/i)
    const passwordField = screen.getByLabelText(/password/i)

    const submitBtn = screen.getByRole('button', {
      name: /submit/i,
    })

    const { username, password } = buildLoginFormData()

    userEvent.type(usernameField, username)
    userEvent.type(passwordField, password)

    userEvent.click(submitBtn)

    expect(onSubmit).toHaveBeenCalledWith({
      username,
      password,
    })
    expect(onSubmit).toHaveBeenCalledTimes(1)
  })
})

describe('Test login screen functions', () => {
  test('Missing password', async () => {
    render(<Login />)
    const { username, password } = buildLoginFormData({
      password: '',
    })
    const usernameField = screen.getByLabelText(/username/i)
    const passwordField = screen.getByLabelText(/password/i)

    const submitBtn = screen.getByRole('button', {
      name: /submit/i,
    })

    userEvent.type(usernameField, username)
    userEvent.type(passwordField, password)
    userEvent.click(submitBtn)

    await waitForElementToBeRemoved(() => screen.getByText(/loading/i))
    screen.debug()

    expect(screen.getByRole('alert').textContent).toMatchInlineSnapshot(
      '"Password required"'
    )
  })
})
