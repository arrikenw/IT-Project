import React, {useState, useRef, useCallback } from "react";
import usePostSearch from "./usePostSearch";
import PostThumb from "../Post/PostThumb";
// https://www.youtube.com/watch?v=NZKUirTtxcg

export default function InfinteScroll(props) {
  const [search, setSearch] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [sortField, setSortField] = useState("createdAt");
  const [sortDirection, setSortDirection] = useState("desc");

  const {loading, error, posts, hasMore } = usePostSearch(search, pageNumber, sortField, sortDirection, props.token);

  const observer = useRef();
  const lastPostElementRef = useCallback((node) => {
    if (loading) {
      return;
    }
    if (observer.current) {
      observer.current.disconnect();
    }
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        setPageNumber((prevPageNumber) => prevPageNumber + 1);
        console.log("visible");
      }

    });
    if (node) {
      observer.current.observe(node);
    }
  }, [hasMore, loading]);


  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPageNumber(1);
  }
  


  return (
    <div style={{overflowY: "scroll", height: "100%"}}>

      <div style={{paddingTop: "2vw", paddingLeft:"2vw"}}>
      </div>

      {posts.map((post, index) => {
        if (posts.length === index + 1) {
          return <div style={{margin:"0"}} ref={lastPostElementRef} key={post._id}> <PostThumb post={post} /> </div>
        } else {
          return <div style={{margin:"0"}} key={post._id}> <PostThumb post={post} /> </div>
        }
      })}


      <div>{error && "Error (most likely auth error)"}</div>
      <div>{!error && loading && "Loading posts"}</div>
      <div>{!error && !loading && posts.length == 0 && "Couldn't find a post that matched your query"}</div>
    </div>
    );
}
