import { useEffect, useState } from 'react'
import axios from 'axios'

export default function usePostSearch(
  currentUser,
  filterTag,
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
  }, [filterTag, sortField, sortDirection, currentUser])

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
    const filters = { userID: currentUser._id }
    axios
      .post(
        url,
        { skip, limit: 5, sortField, sortDirection, search: filterTag, filters },
        {
          headers: { Authorization: `Bearer ${token}` },
          // eslint-disable-next-line no-return-assign
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
    // eslint-disable-next-line consistent-return
    return () => cancel()
  }, [currentUser, filterTag, pageNumber, sortField, sortDirection, token])
  return { loading, error, posts, hasMore }
}
