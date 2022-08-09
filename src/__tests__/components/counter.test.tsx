import React from 'react'
import { Counter } from '@/components'
import { customRender as render, screen, userEvent } from '@/utils/test'

describe('Test counter action', () => {
  test('Counter increment click', () => {
    render(<Counter />)
    const btnIncrement = screen.getByRole('button', { name: /increment/i })
    const message = screen.getByText(/current count:/i)
    expect(message).toHaveTextContent('Current count: 0')
    userEvent.click(btnIncrement)
    expect(message).toHaveTextContent('Current count: 1')
  })

  test('Counter decrement click', () => {
    render(<Counter />)
    const btnIncrement = screen.getByRole('button', { name: /decrement/i })
    const message = screen.getByText(/current count:/i)
    expect(message).toHaveTextContent('Current count: 0')
    userEvent.click(btnIncrement)
    expect(message).toHaveTextContent('Current count: -1')
  })
})

export {}
