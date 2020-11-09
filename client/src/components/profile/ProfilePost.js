import Axios from "axios"
import React, {Component} from "react"
import { withRouter } from 'react-router-dom'
import { withStyles } from "@material-ui/core/styles"
import {
  Card,
  CardMedia,
  CardActionArea,
  CardContent,
  Button,
  Typography,
  CardActions, IconButton,
} from '@material-ui/core'
import ThumbUpIcon from "@material-ui/icons/ThumbUp"
import ShareIcon from "@material-ui/icons/Share"
import Icon from '@material-ui/core/Icon'
import RoomIcon from '@material-ui/icons/Room'

//truncation is not supported for multiline, so using this lib
import LinesEllipsis from 'react-lines-ellipsis'
import responsiveHOC from 'react-lines-ellipsis/lib/responsiveHOC'
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
      mimeType: "",
      contentStr: "",
      contentCategory: "",
    };
  }


  componentDidMount() {
    // if media is already stored
    if (this.props.media){
      console.log("USING STORED MEDIA");
      this.setState({
        contentStr: this.props.media.contentStr,
        mimeType: this.props.media.mimeType,
        contentCategory: this.props.media.contentCategory})
      return;
    }
    if (this.props.post.mediaID === "") {
      return;
    }

    const controllerUrl = "/api/media/";
    const payload = {
      // TODO make thumbnail fetching work properly
      mediaID: this.props.post.thumbnailURL,
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
              mimeType: res.data.mimeType,
              contentCategory: res.data.contentCategory,
            });
          }
        })
        .catch((err) => {
          console.error(err);
          // todo;
        });
  }

  componentDidUpdate(props){
    // if media is already stored
    if (this.props.media && this.props.media.contentStr != this.state.contentStr){
      console.log("USING STORED MEDIA");
      this.setState({
        contentStr: this.props.media.contentStr,
        mimeType: this.props.media.mimeType,
        contentCategory: this.props.media.contentCategory})
      
    }
  }

  render(){
    const classes = this.props.classes;
    let heightChange = {maxHeight:"800"};
    let textLimit = {maxHeight: "90px"}
    let aspectChange = {backgroundColor:"red"};
    return (
      <Card className={classes.postCard} style={heightChange}>
        <CardActionArea onClick={() => { this.props.history.push(`/post?post=${this.props.post._id}`); }}>
          <CardContent style={{paddingBottom: "0px"}}>

            <div style={textLimit}>
              <Typography gutterBottom variant="heading1" color="textPrimary" component="h2">
                {this.props.post.title}
              </Typography>
              <Typography gutterBottom variant="body2" color="textSecondary" component="p">
                <ResponsiveEllipsis text={this.props.post.description} maxLine={3} ellipsis="..." trimRight basedOn="letters"/>
              </Typography>
            </div>
            <CardMedia className={classes.media} style={aspectChange} image={this.state.contentStr} />
          </CardContent>
        </CardActionArea>
        <CardActions style={{paddingBottom: "0px"}}>
          <div style={{float:"left"}}>
            <IconButton size="medium" color="primary">
              <ThumbUpIcon />
              Like
            </IconButton>
            9 trillion likes
          </div>
          <div style={{float:"right"}}>
            <IconButton size="medium" color="primary">
              <ShareIcon />
              Share
            </IconButton>
          </div>

        </CardActions>
      </Card>
    )
  }
}
export default withRouter(withStyles(styles, { withTheme: true })(ProfilePost))
