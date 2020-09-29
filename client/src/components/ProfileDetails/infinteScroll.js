import React, { Component, useState, useRef, useCallback } from "react";
import usePostSearch from "./usePostSearch";

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
      <input type="text" value={search} onChange={handleSearch}/>
      {posts.map((post, index) => {
        if (posts.length === index + 1) {
          return <div style={{height: "300px", backgroundColor: "#bdeb34", margin: "20px"}} ref={lastPostElementRef} key={post._id}>{post.title} <br/> {post.description} </div>
        } else {
          return <div style={{height: "300px", backgroundColor: "#bdeb34", margin: "20px"}} key={post._id}>{post.title}  <br/> {post.description}</div>
        }
      })}
      <div>{loading && "Loading posts"}</div>
      <div>{error && "Error"}</div>
    </div>
    );
}
