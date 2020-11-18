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
import docTN from "../../assets/docs.png";
import audioTN from "../../assets/audio.jpg";
import videoTN from "../../assets/video.jpg";



const ResponsiveEllipsis = responsiveHOC()(LinesEllipsis);

// https://stackoverflow.com/questions/50272814/image-on-material-ui-cardmedia
const styles = theme => ({
  postCard: {
    marginBottom: '30px',
    height: '90%'
  },
  media: {
    maxHeight: '600px',
    // paddingTop: '56.25%', // 16:9,
    paddingTop: '56.25%',
    marginTop:'0',
  }
});


class SearchPost extends Component {

  constructor(props) {
    super(props);
    this.state = {
      mimeType: "",
      contentStr: "",
      postUserName: "",
      // contentCategory: "",
    };
  }


  componentDidMount() {
    // if media is already stored
    const { media, post, token} = this.props;
    if (media){
      console.log("USING STORED MEDIA");
      this.setState({
        contentStr: media.contentStr,
        mimeType: media.mimeType,
        // contentCategory: media.contentCategory
      })
      return;
    }
    if (post.mediaID === "") {
      return;
    }

    let  controllerUrl;
    if (token){
       controllerUrl = "/api/media/";
    }
    else{
       controllerUrl = "/api/media/getPublic";
    }

    const payload = {
      // TODO make thumbnail fetching work properly
      mediaID: post.thumbnailURL,
    };

    if (!post.thumbnailURL) {
      payload.mediaID = post.mediaID
    }

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
            mimeType: res.data.mimeType,
            // contentCategory: res.data.contentCategory,
          });
        }
      })
      .catch((err) => {
        console.error(err);
        // todo;
      });



      const UserNamePayload = {filters: {"_id": post.userID}}
      Axios.post('/api/user/getPublic/', UserNamePayload)
        .then((resp) => {
          if (resp.data[0]) {
            this.setState({postUserName :resp.data[0].userName});
          }
          })
        .catch((err)=>{
          console.log(err);
        })
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
        mimeType: media.mimeType,
        // contentCategory: this.props.media.contentCategory
      })

    }
  }
  

  render(){
    const { classes, history, post, user, token, showDescription} = this.props
    const { contentStr, postUserName, mimeType } = this.state
    const heightChange = {maxHeight:"400"};
    const textLimit = {/* maxHeight: "90px" */}
    const aspectChange = {backgroundColor:"white"};
    const profileUrl =`profile?user=${postUserName}`
    const renderMedia = () => {
      console.log(mimeType)
      if (mimeType.startsWith('application')) {
        return (
          <CardMedia className={classes.media} style={aspectChange} image={docTN} />
        )
      }
      if (mimeType.startsWith('audio')) {
        return (
          <CardMedia className={classes.media} style={aspectChange} image={audioTN} />
        )
      }
      if (mimeType.startsWith('video')) {
        return <CardMedia className={classes.media} type={mimeType} controls style={aspectChange} image={videoTN} />
      }
      return <CardMedia className={classes.media} type={mimeType} controls style={aspectChange} image={contentStr} />
    }
    return (
      <Card className={classes.postCard} style={heightChange}>
        <CardActionArea onClick={() => { history.push(`/post?post=${post._id}`); }}>
          <CardContent style={{paddingBottom: "0px"}}>

            <Typography gutterBottom variant="h1" style={{fontFamily:"Verdana", fontSize:"20px", fontWeight:"bold", textAlign:"center"}} color="textPrimary" component="h1">
              <ResponsiveEllipsis text={post.title} maxLine={1} ellipsis="..." trimRight basedOn="letters" />
            </Typography>

            {showDescription && (
              <Typography gutterBottom variant="body2" color="textSecondary" component="p" style={{paddingBottom:"10px"}}>
                <ResponsiveEllipsis text={post.description} maxLine={3} ellipsis="..." trimRight basedOn="letters" />
              </Typography>
            )}

            {renderMedia()}

          </CardContent>
        </CardActionArea>

        <CardActions style={{paddingBottom: "0px", display: 'flex'}}>

          {token && (
            <div style={{ float: "left", paddingBottom: "10px", paddingLeft: "8px" }}>
              {post && <LikeButtons post={post} user={user} token={token} />}
            </div>
            )}


        </CardActions>

        <Typography variant="heading6" component="h6" style={{paddingBottom:"10px", paddingLeft:"20px"}}>
          {post && post.createdAt && `Posted ${ timeago.format(post.createdAt, 'en_US')} by `}
          <a href={profileUrl}>
            {postUserName || user.userName}
          </a>
        </Typography>
        <div style={{marginBottom: "2%"}} />

      </Card>
    )
  }
}

SearchPost.propTypes = {
  showDescription: PropTypes.bool.isRequired,
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
    userName: PropTypes.string,
  }).isRequired,
  token: PropTypes.string.isRequired,
  classes: PropTypes.objectOf(PropTypes.object).isRequired,
  history: PropTypes.shape({push: PropTypes.func}).isRequired,
  media: PropTypes.shape({contentStr: PropTypes.string, mimeType: PropTypes.string}).isRequired,

}

export default withRouter(withStyles(styles, { withTheme: true })(SearchPost))
