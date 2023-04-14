import React, {useReducer, useEffect, useState} from 'react'
import axios from 'axios'

const initialState = {
  loading: true,
  error: '',
  post: {}
}

const reducer = (state, action) => {
  switch(action.type) {
    case 'FETCHING' :
      return {
        loading: true,
        post: {},
        error: 'fetching'
      }
    case 'FETCH_SUCCESS' :
      console.log('action.payload : ', action.payload);
      return {
        loading: false,
        post: action.payload,
        error: ''
      }
    case 'FETCH_ERROR' :
      return {
        loading: false,
        post: {},
        error: 'Something went wrong!'
      }
    default:
      return state
  }
}

function DataFetchingTwo() {
  const [state, dispatch] = useReducer(reducer, initialState)

  const handleSubmit = (e) => {
    e.preventDefault()
    fetchData()
  }

  function fetchData() {
    dispatch({type:'FETCHING'})
    // console.log('fetching ', state.error);

    // console.log('post before fetch', typeof state.post.title)

    // axios를 사용
    // axios.get(`https://jsonplaceholder.typicode.com/posts/${search}`)
    //   .then(response => {
    //     console.log('payload:response.data : ', response.data)
    //     console.log('typeof response.data : ', typeof response.data)
    //     if(Array.isArray(response.data) === true) {
    //       dispatch({tyep:'FETCH_ERROR'})
    //       console.log('axios response fetch error')
    //     } else {
    //       dispatch({type: 'FETCH_SUCCESS', payload:response.data})
    //       console.log('axios response fetch success')
    //       console.log('response.data', response.data)
    //     }
    //   })
      // axios를 사용

    // fetch를 사용
    fetch(`https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,racist,sexist&type=twopart`)
      .then(response => {
        if(response.ok) return response.json()
        dispatch({tyep:'FETCH_ERROR'})
        throw new Error('cannot get response')
      })
      .then(data => {
        dispatch({type: 'FETCH_SUCCESS', payload:data})
      })
      // fetch를 사용

      .catch(error => {
        dispatch({type:'FETCH_ERROR'})
      })
  }


  return (
    <div>
      <h1>Joke Fetching</h1>
      
      {state.loading 
        ? 'Loading ...' 
        : `${state.post.setup}
            -> ${state.post.delivery}`
      }
      {/* {state.loading 
        ? 'Loading ...' 
        : typeof state.post.title === 'undefined'
          ? 'undefined'
          : state?.post?.title
      } */}
      {state.error ? state.error : null}
      <form onSubmit={handleSubmit}>
        <button type='submit'>Get new joke</button>
      </form>
    </div>
  )
}

export default DataFetchingTwo