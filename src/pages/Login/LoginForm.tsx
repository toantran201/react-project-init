import React from 'react'

type LoginProps = {
  onSubmit: ({
    username,
    password,
  }: {
    username: string
    password: string
  }) => void
}

const LoginForm = ({ onSubmit }: LoginProps) => {
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')

  const handleSubmit = () => {
    onSubmit({ username, password })
  }

  return (
    <div id="login-form">
      <div>
        <label htmlFor="username-field">Username</label>
        <input
          id="username-field"
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password-field">Password</label>
        <input
          id="password-field"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <div>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  )
}

export default LoginForm
