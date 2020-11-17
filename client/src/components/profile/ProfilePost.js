import Axios from "axios";
import React, {Component} from "react";
import { withRouter } from 'react-router-dom'
import { withStyles } from "@material-ui/core/styles";
import {
  Card,
  CardMedia,
  CardActionArea,
  CardContent,
  Button,
  Typography,
  CardActions, IconButton,
} from '@material-ui/core'
import AddIcon from "@material-ui/icons/Add";



// truncation is not supported for multiline, so using this lib
import LinesEllipsis from 'react-lines-ellipsis'
import responsiveHOC from 'react-lines-ellipsis/lib/responsiveHOC'
import * as timeago from "timeago.js";
import PropTypes from "prop-types";
import LikeButtons from "./LikeButtons";



const ResponsiveEllipsis = responsiveHOC()(LinesEllipsis);

// https://stackoverflow.com/questions/50272814/image-on-material-ui-cardmedia
const styles = theme => ({
  postCard: {
    marginBottom: '30px',
  },
  media: {
    maxHeight: '600px',
    // paddingTop: '56.25%', // 16:9,
    paddingTop: '56.25%',
    marginTop:'0',
  }
});


class ProfilePost extends Component {

  constructor(props) {
    super(props);
    this.state = {
      // mimeType: "",
      contentStr: "",
      // contentCategory: "",
    };
  }

  componentDidMount() {
    // if media is already stored
    const { media, post } = this.props;
    if (media){
      console.log("USING STORED MEDIA");
      this.setState({
        contentStr: media.contentStr,
        // mimeType: media.mimeType,
        // contentCategory: media.contentCategory
      })
      return;
    }
    if (post.mediaID === "") {
      return;
    }

    const controllerUrl = "/api/media/";
    const payload = {
      // TODO make thumbnail fetching work properly
      mediaID: post.thumbnailURL,
    };
    const headers = {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
    };
    Axios.post(controllerUrl, payload, headers)
        .then((res) => {
          if (res.status === 200) {
            const str = `data:${res.data.mimeType};base64,${res.data.b64media}`;
            this.setState({
              contentStr: str,
              // mimeType: res.data.mimeType,
              // contentCategory: res.data.contentCategory,
            });
          }
        })
        .catch((err) => {
          console.error(err);
          // todo;
        });
  }

  componentDidUpdate(props) {
    // if media is already stored
    const { media } = this.props
    const { contentStr } = this.state
    if (media && media.contentStr !== contentStr){
      console.log("USING STORED MEDIA");
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        contentStr: media.contentStr,
        // mimeType: this.props.media.mimeType,
        // contentCategory: this.props.media.contentCategory
      })
      
    }
  }



  render(){
    const { classes, history, post, user, token} = this.props
    const { contentStr } = this.state
    const heightChange = {maxHeight:"800"};
    const textLimit = {/* maxHeight: "90px" */}
    const aspectChange = {backgroundColor:"red"};
    return (
      <Card className={classes.postCard} style={heightChange}>
        <CardActionArea onClick={() => { history.push(`/post?post=${post._id}`); }}>
          <CardContent style={{paddingBottom: "0px"}}>

            <Typography gutterBottom variant="h1" style={{fontFamily:"Verdana", fontSize:"25px", fontWeight:"bold", textAlign:"center"}} color="textPrimary" component="h1">
              <ResponsiveEllipsis text={post.title} maxLine={2} ellipsis="..." trimRight basedOn="letters" />
            </Typography>

            <Typography gutterBottom variant="body2" color="textSecondary" component="p" style={{paddingBottom:"10px"}}>
              <ResponsiveEllipsis text={post.description} maxLine={3} ellipsis="..." trimRight basedOn="letters" />
            </Typography>

            <CardMedia className={classes.media} style={aspectChange} image={contentStr} />

          </CardContent>
        </CardActionArea>

        <CardActions style={{paddingBottom: "0px"}}>

          <div style={{float:"left", paddingBottom:"10px", paddingLeft:"8px"}}>
            {post && <LikeButtons post={post} user={user} token={token} />}
          </div>


        </CardActions>

        <Typography variant="heading6" component="h6" style={{paddingBottom:"10px", paddingLeft:"20px"}}>
          {post && post.createdAt && `Posted ${ timeago.format(post.createdAt, 'en_US')}`}
        </Typography>

      </Card>
    )
  }
}

ProfilePost.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string,
    _id: PropTypes.string,
    thumbnailURL: PropTypes.string,
    mediaID: PropTypes.string,
    description: PropTypes.string,
    createdAt: PropTypes.string,
    userID: PropTypes.string,
  }).isRequired,
  user: PropTypes.shape({
    _id: PropTypes.string,
    pinnedPosts: PropTypes.array,
  }).isRequired,
  token: PropTypes.string.isRequired,
  classes: PropTypes.objectOf(PropTypes.object).isRequired,
  history: PropTypes.shape({push: PropTypes.func}).isRequired,
  media: PropTypes.shape({contentStr: PropTypes.string}).isRequired,

}

export default withRouter(withStyles(styles, { withTheme: true })(ProfilePost))
