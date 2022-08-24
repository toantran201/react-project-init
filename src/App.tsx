import React, { useEffect } from 'react'
//
import { Login } from '@/pages'
import useAxios, { FETCH_STATUS } from '@/hooks/useAxios'

function App() {
  const { data, error, status, fetchApi } = useAxios<{
    userId: number
    id: number
    title: string
    body: string
  }>({
    data: undefined,
  })

  useEffect(() => {
    fetchApi('/posts/1', 'GET')
  }, [fetchApi])

  if (status === FETCH_STATUS.PENDING) return <h1>Pending</h1>
  if (status === FETCH_STATUS.REJECTED) return <p>{error?.toString()}</p>

  return <div>{JSON.stringify(data?.title)}</div>
}

export default App
