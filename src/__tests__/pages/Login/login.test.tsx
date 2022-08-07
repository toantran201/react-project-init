import { vi } from 'vitest'
import React from 'react'
import { Login } from '@/pages'
import { render, screen, userEvent } from '@/utils/test.utils'
import { faker } from '@faker-js/faker'

const buildLoginFormData = (overrides?: {
  username: string
  password: string
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

    render(<Login onSubmit={onSubmit} />)
    const usernameField = screen.getByLabelText(/username/i)
    const passwordField = screen.getByLabelText(/password/i)

    const submitBtn = screen.getByRole('button', {
      name: /submit/i,
    })

    const { username, password } = buildLoginFormData()

    userEvent.type(usernameField, username)
    userEvent.type(passwordField, password)

    userEvent.click(submitBtn)

    console.log({
      username,
      password,
    })

    expect(onSubmit).toHaveBeenCalledWith({
      username,
      password,
    })

    expect(onSubmit).toHaveBeenCalledTimes(1)
  })
})
