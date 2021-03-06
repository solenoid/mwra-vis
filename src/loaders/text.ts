import { useEffect, useReducer, useState } from 'react'

type State = {
  isLoading: boolean
  isError: boolean
  textData: string
}

type InitAction = {
  type: 'FETCH_TEXT_INIT'
}
type SuccessAction = {
  type: 'FETCH_TEXT_SUCCESS'
  payload: string
}
type FailureAction = {
  type: 'FETCH_TEXT_FAILURE'
}

type Action = InitAction | SuccessAction | FailureAction
// inspired by https://www.robinwieruch.de/react-hooks-fetch-data/
const reducer = (state: State, action: Action): State => {
  // TODO consider real state machine and multiple requests
  switch (action.type) {
    case 'FETCH_TEXT_INIT':
      return {
        ...state,
        isLoading: true,
        isError: false,
      }
    case 'FETCH_TEXT_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        textData: action.payload,
      }
    case 'FETCH_TEXT_FAILURE':
      return {
        ...state,
        isLoading: false,
        isError: true,
      }
    default:
      throw new Error()
  }
}

export const useTextApi = (initialUrl: string) => {
  const [url, setUrl] = useState(initialUrl)
  const [state, dispatch] = useReducer(reducer, {
    isLoading: false,
    isError: false,
    textData: '',
  })

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_TEXT_INIT' })
      try {
        const result = await fetch(url).then((res) => res.text())
        dispatch({ type: 'FETCH_TEXT_SUCCESS', payload: result })
      } catch (error) {
        dispatch({ type: 'FETCH_TEXT_FAILURE' })
      }
    }
    if (url) fetchData()
  }, [url])

  return {
    ...state,
    setUrl,
  }
}
