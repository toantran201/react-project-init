import React from 'react'
//
import { Login } from '@/pages'

const LOGIN_ENDPOINT = 'https://abc.example.com/api/login'

function App() {
  const [userData, setUserData] = React.useState<any>()
  const [fetchingStatus, setFetchingStatus] = React.useState<
    'idle' | 'pending' | 'resolved' | 'rejected'
  >('idle')
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
      if (res.ok) {
        setFetchingStatus('resolved')
        setUserData(data)
      } else {
        setFetchingStatus('rejected')
        setErrorMsg(data)
      }
    })
  }

  return (
    <div className="App">
      {fetchingStatus === 'resolved' ? (
        <div>
          Welcome <b>{userData.name}</b>
        </div>
      ) : (
        <Login onSubmit={onSubmit} />
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

export default App
