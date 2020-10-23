import { useEffect, useState } from 'react'
import axios from 'axios'

export default function usePostSearch(
  currentUser,
  query,
  pageNumber,
  sortField,
  sortDirection,
  token,
) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [posts, setPosts] = useState([])
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    setPosts([])
  }, [query, sortField, sortDirection, currentUser])

  useEffect(() => {
    if (!currentUser) {
      return;
    }
    setLoading(true)
    setError(false)
    let cancel
    const skip = (pageNumber - 1) * 5
    let  url = 'api/post/get';
    if (token === '' || !token) {
      url = 'api/post/getPublic';
    }
    console.log("currentUser")
    console.log(currentUser)
    axios
      .post(
        url,
        { skip, search: query, limit: 5, sortField, sortDirection, filters: { userID: currentUser._id } },
        {
          headers: { Authorization: `Bearer ${token}` },
          cancelToken: new axios.CancelToken((c) => (cancel = c)),
        },
      )
      .then((res) => {
        setPosts((prevPosts) => [...prevPosts, ...res.data])
        setHasMore(res.data.length > 0)
        setLoading(false)
      })
      .catch((e) => {
        if (axios.isCancel(e)) return
        setError(true)
        console.log('error?>')
        console.error(e)
      })
    return () => cancel()
  }, [currentUser, query, pageNumber, sortField, sortDirection, token])
  return { loading, error, posts, hasMore }
}
