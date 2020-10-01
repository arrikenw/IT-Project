import React from "react";
import { withRouter } from "react-router-dom";
import InfiniteScroll from "../ProfileDetails/infinteScroll";

class Posts extends React.Component {
  render() {
    return (
      <div className="a">
        <InfiniteScroll token={window.localStorage.getItem("token")} />
      </div>
    );
  }
}

export default withRouter(Posts);
