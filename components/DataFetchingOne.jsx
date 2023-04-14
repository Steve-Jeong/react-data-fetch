import React, {useState, useEffect} from 'react'
import axios from 'axios'

function DataFetchingOne() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [post, setPost] = useState({})
  const [id, setId] = useState('')
  const [search, setSearch] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    setSearch(e.target.id.value)
    setId('')
  }
  useEffect(() => {
    setLoading(true)
    setError('')

    // console.log('post before fetch', post.title)
    // axios를 사용
    axios.get(`https://jsonplaceholder.typicode.com/posts/${search}`)
      .then(response => {
        setLoading(false)
        setPost(response.data)
        setError('')
        // console.log('post after fetch', post.title)
      })
      // axios를 사용

    // fetch를 사용
    // fetch(`https://jsonplaceholder.typicode.com/posts/${search}`)
    //   .then(response => {
    //     if(response.ok) return response.json()
    //     setLoading(false)
    //     setPost({})
    //     setError('Something went wrong!')
    //     throw new Error('cannot get response')
    //   })
    //   .then(data => {
    //     setLoading(false)
    //     setPost(data)
    //     setError('')
    //   })
      // fetch를 사용

      .catch(error => {
        setLoading(false)
        setPost({})
        setError('Something went wrong!')
        console.log(error);
      })
  }, [search])
  
  return (
    <div>
      {loading ? 'Loading ...' : post.title}
      {error ? error : null}
      <form onSubmit={handleSubmit}>

        <input type='text' value={id} placeholder='type post id' name='id' onChange={(e) => setId(e.target.value)} />
        <button type='submit'>Get Post</button>
      </form>
    </div>
  )
}

export default DataFetchingOne
