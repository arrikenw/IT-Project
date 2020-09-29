import React, { Component, useState, useRef, useCallback } from "react";
import usePostSearch from "./usePostSearch";
import Card from "react-bootstrap/Card"
import InputGroup from "react-bootstrap/InputGroup"
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
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text>Search here</InputGroup.Text>
          </InputGroup.Prepend>
        <input type="text" value={search} onChange={handleSearch}/>
        </InputGroup>
      </div>
      <Card style={{width: "45vw", margin:"auto"}}>


      {posts.map((post, index) => {
        if (posts.length === index + 1) {
          return (<div className="d-flex justify-content-center" style={{height: "20vw", backgroundColor: "#bdeb34", margin: "20px"}} ref={lastPostElementRef} key={post._id}>
            {(post.mediaID && <PostThumb title={post.title} postID = {post._id} desc = {post.description} targetMediaID={post.mediaID}/>)} {post.description}
          </div>)
        } else {
          return <div className="d-flex justify-content-center" style={{height: "20vw", backgroundColor: "#bdeb34", margin: "20px"}} key={post._id}>
            {(post.mediaID && <PostThumb title={post.title} postID = {post._id} desc = {post.description} targetMediaID={post.mediaID}/>)}
          </div>
        }
      })}


      <div>{error && "Error (most likely auth error)"}</div>
      <div>{!error && loading && "Loading posts"}</div>
      <div>{!error && !loading && posts.length == 0 && "Couldn't find a post that matched your query"}</div>

      </Card>
    </div>
    );
}
