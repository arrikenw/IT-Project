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
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ShareIcon from "@material-ui/icons/Share";

//https://stackoverflow.com/questions/50272814/image-on-material-ui-cardmedia
const styles = theme => ({
  postCard: {
    height: '600px',
    marginBottom: '30px',
  },
  media: {
    height: 0,
    //paddingTop: '56.25%', // 16:9,
    paddingTop: '40%',
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
    //if media is already stored
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
      mediaID: this.props.post.mediaID,
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
    //if media is already stored
    if (this.props.media && this.props.media.contentStr != this.state.contentStr){
      console.log("USING STORED MEDIA");
      this.setState({
        contentStr: this.props.media.contentStr,
        mimeType: this.props.media.mimeType,
        contentCategory: this.props.media.contentCategory})
      return;
    }
  }

  render(){
    const classes = this.props.classes;
    let heightChange = {};
    let textLimit = {maxHeight: "80px", overflow: "hidden"}
    let aspectChange = {backgroundColor:"red"};
    if (this.props.isPinned){
      heightChange = {height: "350px"};
      textLimit = {height: "100px", overflow: "hidden"};
      aspectChange = {paddingTop: '56.25%'};
    }
    if (this.props.isExpanded){
      heightChange = {height: "1000px"};
      aspectChange = {paddingTop: '56.25%'};
    }
    return (
        <Card className={classes.postCard} style={heightChange}>
          <CardActionArea onClick={ () => { this.props.history.push("/post?post="+this.props.post._id); } }>
            <CardContent style={{paddingBottom: "0px"}}>
              <CardMedia square className={classes.media} style={aspectChange} image={this.state.contentStr}></CardMedia>
              <div style={textLimit}>
                <Typography gutterBottom variant="h5" component="h2">
                  {this.props.post.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {this.props.post.description}
                </Typography>
              </div>
            </CardContent>
          </CardActionArea>
          <CardActions style={{paddingBottom: "0px"}}>
            <div style={{float:"left"}}>
              <IconButton size="large" color="primary">
                <ThumbUpIcon />
                Like
              </IconButton>
              9 trillion likes
            </div>
            <div style={{float:"right"}}>
              <IconButton size="large" color="primary">
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
