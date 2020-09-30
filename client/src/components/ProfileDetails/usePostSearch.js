import { useEffect, useState } from "react";
import axios from "axios";

export default function usePostSearch(
  query,
  pageNumber,
  sortField,
  sortDirection,
  token
) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    setPosts([]);
  }, [query]);

  useEffect(() => {
    setLoading(true);
    setError(false);
    let cancel;
    const skip = (pageNumber - 1) * 5;
    axios
      .post(
        "api/post/get",
        { skip, search: query, limit: 5, sortField, sortDirection },
        {
          headers: { Authorization: `Bearer ${token}` },
          cancelToken: new axios.CancelToken((c) => (cancel = c)),
        }
      )
      .then((res) => {
        setPosts((prevPosts) => {
          return [...prevPosts, ...res.data];
        });
        setHasMore(res.data.length > 0);
        setLoading(false);
        console.log(res.data);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        setError(true);
        console.log("error?>");
        console.error(e);
      });
    return () => cancel();
  }, [query, pageNumber, sortField, sortDirection, token]);
  return { loading, error, posts, hasMore };
}
