import { useEffect, useReducer, useState } from 'react'

type State = {
  isLoading: boolean
  isError: boolean
  jsonData: any | null
}

type InitAction = {
  type: 'FETCH_JSON_INIT'
}
type SuccessAction = {
  type: 'FETCH_JSON_SUCCESS'
  payload: string
}
type FailureAction = {
  type: 'FETCH_JSON_FAILURE'
}

type Action = InitAction | SuccessAction | FailureAction
// inspired by https://www.robinwieruch.de/react-hooks-fetch-data/
const reducer = (state: State, action: Action): State => {
  // TODO consider real state machine and multiple requests
  switch (action.type) {
    case 'FETCH_JSON_INIT':
      return {
        ...state,
        isLoading: true,
        isError: false,
      }
    case 'FETCH_JSON_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        jsonData: action.payload,
      }
    case 'FETCH_JSON_FAILURE':
      return {
        ...state,
        isLoading: false,
        isError: true,
      }
    default:
      throw new Error()
  }
}

export const useJsonApi = (initialUrl: string) => {
  const [url, setUrl] = useState(initialUrl)
  const [state, dispatch] = useReducer(reducer, {
    isLoading: false,
    isError: false,
    jsonData: null,
  })

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_JSON_INIT' })
      try {
        const result = await fetch(url).then((res) => res.json())
        dispatch({ type: 'FETCH_JSON_SUCCESS', payload: result })
      } catch (error) {
        dispatch({ type: 'FETCH_JSON_FAILURE' })
      }
    }
    if (url) fetchData()
  }, [url])

  return {
    ...state,
    setUrl,
  }
}
