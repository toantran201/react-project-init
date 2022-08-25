import React from 'react'

const Counter = () => {
  const [count, setCount] = React.useState(0)
  const increment = () => setCount((c) => c + 1)
  const decrement = () => setCount((c) => c - 1)

  return (
    <div>
      <div>Current count: {count}</div>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  )
}

export default Counter
