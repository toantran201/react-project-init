import React from 'react'
//
import LoginForm from './LoginForm'
//
import fetch from 'cross-fetch'

const LOGIN_ENDPOINT = 'https://abc.example.com/api/login'

const Login = () => {
  const [userData, setUserData] = React.useState<any>()
  const [fetchingStatus, setFetchingStatus] = React.useState<'idle' | 'pending' | 'resolved' | 'rejected'>('idle')
  const [errorMsg, setErrorMsg] = React.useState<any>(undefined)

  const onSubmit = (submitData: { username: string; password: string }) => {
    setFetchingStatus('pending')

    fetch(LOGIN_ENDPOINT, {
      method: 'POST',
      body: JSON.stringify(submitData),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(async (res) => {
      const data = await res.json()
      console.log('data', data)
      console.log('data', data)
      if (res.ok) {
        setFetchingStatus('resolved')
        setUserData(data)
      } else {
        setFetchingStatus('rejected')
        setErrorMsg(data.message || 'Error')
      }
    })
  }

  return (
    <div className="App">
      {fetchingStatus === 'resolved' ? (
        <div>
          Welcome <b>{userData.username}</b>
        </div>
      ) : (
        <LoginForm onSubmit={onSubmit} />
      )}
      <div>
        {fetchingStatus === 'pending' && <b>Loading</b>}
        {fetchingStatus === 'rejected' && (
          <div role="alert" style={{ color: 'red' }}>
            {errorMsg}
          </div>
        )}
      </div>
    </div>
  )
}

export default Login
