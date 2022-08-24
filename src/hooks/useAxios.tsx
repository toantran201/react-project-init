import { useCallback, useLayoutEffect, useReducer, useRef } from 'react'
import { Method } from 'axios'
import { stringify } from 'query-string'
//
import axiosClient from '@/api'

export enum FETCH_STATUS {
  IDLE = 'IDLE',
  PENDING = 'PENDING',
  RESOLVED = 'RESOLVED',
  REJECTED = 'REJECTED',
}

// ================ Type ================//
export type AxiosInitial<Type> = {
  data: Type | undefined
  status?: FETCH_STATUS
  error?: Error | undefined
}

export type AxiosActionReducer = {
  type: string
  [key: string]: any
}

// ================ Reducer function ================//
const axiosReducerFn = <Type,>(state: AxiosInitial<Type>, action: AxiosActionReducer) => {
  switch (action.type) {
    case FETCH_STATUS.PENDING: {
      return { status: FETCH_STATUS.PENDING, data: undefined, error: undefined }
    }
    case FETCH_STATUS.RESOLVED: {
      return { status: FETCH_STATUS.RESOLVED, data: action.data as Type, error: undefined }
    }
    case FETCH_STATUS.REJECTED: {
      return { status: FETCH_STATUS.REJECTED, data: undefined, error: action.error }
    }
    default:
      return { ...state }
  }
}

const useAxios = <T,>(
  initialState: AxiosInitial<T>,
  reducer: (state: AxiosInitial<T>, action: AxiosActionReducer) => AxiosInitial<T> = axiosReducerFn
) => {
  const [state, dispatch] = useReducer(reducer, {
    data: undefined,
    status: FETCH_STATUS.IDLE,
    error: undefined,
  })
  const mountedRef = useRef(false)

  useLayoutEffect(() => {
    mountedRef.current = true
    return () => {
      mountedRef.current = false
    }
  }, [])

  const fetchApi = useCallback(
    (url: string, method: Method = 'GET', payload = {}, params: Record<string, any> = {}) => {
      dispatch({ type: FETCH_STATUS.PENDING })
      axiosClient
        .request({
          method,
          data: payload,
          url: `${url}?${stringify(params)}`,
        })
        .then((res) => {
          if (!mountedRef.current) return
          dispatch({ type: FETCH_STATUS.RESOLVED, data: res.data as T })
        })
        .catch((error) => {
          if (!mountedRef.current) return
          dispatch({ type: FETCH_STATUS.REJECTED, error })
        })
    },
    [dispatch]
  )

  return { ...state, fetchApi, dispatch }
}

export default useAxios
