import React, { useState, useRef, useCallback, useEffect } from 'react'
import PropTypes from "prop-types";
import usePostSearch from '../search/usePostSearch'
import ProfilePost from '../Post/ProfilePost'
// https://www.youtube.com/watch?v=NZKUirTtxcg

export default function InfinitePostScroll({ sortDirection, sortField, currentUser, token, filterTag, user}) {
  const [localFilterTag, setFilterTag] = useState("none")
  const [localPageNumber, setPageNumber] = useState(1)
  const [localSortField, setSortField] = useState('createdAt')
  const [localSortDirection, setSortDirection] = useState('desc')

  useEffect(() => {
    setSortField(sortField)
    setSortDirection(sortDirection)
    setFilterTag(filterTag)
    setPageNumber(1)
  }, [sortField, sortDirection, filterTag])


  const { loading, error, posts, hasMore } = usePostSearch(
    currentUser,
    localFilterTag,
    localPageNumber,
    localSortField,
    localSortDirection,
    token,
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
    <div style={{width: "94%", margin: '3%'}}>
      {posts.map((post, index) => {
        if (posts.length === index + 1) {
          return (
            <div
              style={{ marginTop: '0vw' }}
              ref={lastPostElementRef}
              key={post._id}
            >
              <ProfilePost post={post} token={token} user={user} />
            </div>
          )
        }
        return (
          <div style={{ marginTop: '0vw' }} key={post._id}>
            <ProfilePost post={post} token={token} user={user} />
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

InfinitePostScroll.propTypes = {
  token: PropTypes.string.isRequired,
  sortField: PropTypes.string.isRequired,
  sortDirection: PropTypes.string.isRequired,
  currentUser: PropTypes.shape({}),
  filterTag: PropTypes.string.isRequired,
  user: PropTypes.shape({_id: PropTypes.string, userName: PropTypes.string}).isRequired,
}

InfinitePostScroll.defaultProps = {
  currentUser: { },
}