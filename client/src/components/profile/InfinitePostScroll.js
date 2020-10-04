import React, { useState, useRef, useCallback, useEffect } from 'react'
import usePostSearch from './usePostSearch'
import ProfilePost from './ProfilePost'
// https://www.youtube.com/watch?v=NZKUirTtxcg

export default function InfinitePostScroll(props) {
  // const [search, setSearch] = useState("");
  const [pageNumber, setPageNumber] = useState(1)
  const [sortField, setSortField] = useState('createdAt')
  const [sortDirection, setSortDirection] = useState('desc')

  useEffect(() => {
    setSortField(props.sortField)
    setSortDirection(props.sortDirection)
  }, [props.sortField, props.sortDirection])

  const { loading, error, posts, hasMore } = usePostSearch(
    '',
    pageNumber,
    sortField,
    sortDirection,
    props.token,
  )

  const observer = useRef()
  const lastPostElementRef = useCallback(
    (node) => {
      if (loading) {
        return
      }
      if (observer.current) {
        observer.current.disconnect()
      }
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1)
          console.log('visible')
        }
      })
      if (node) {
        observer.current.observe(node)
      }
    },
    [hasMore, loading],
  )

  // const handleSearch = (e) => {
  //   setSearch(e.target.value);
  //   setPageNumber(1);
  // };

  return (
    <div style={{ padding: '60px', backgroundColor: '#f7ad23' }}>
      {posts.map((post, index) => {
        if (posts.length === index + 1) {
          return (
            <div
              style={{ marginTop: '0vw' }}
              ref={lastPostElementRef}
              key={post._id}
            >
              {' '}
              <ProfilePost post={post} />
            </div>
          )
        }
        return (
          <div style={{ marginTop: '0vw' }} key={post._id}>
            {' '}
            <ProfilePost post={post} />
          </div>
        )
      })}

      <div>{error && 'Error (most likely auth error)'}</div>
      <div>{!error && loading && 'Loading posts'}</div>
      <div>
        {!error &&
          !loading &&
          posts.length === 0 &&
          "Couldn't find a post that matched your query"}
      </div>
    </div>
  )
}
