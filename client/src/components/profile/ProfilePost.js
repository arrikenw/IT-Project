import Axios from "axios";
import React, {Component} from "react";
import { withStyles } from "@material-ui/core/styles";
import {
  Card,
  CardMedia,
  CardActionArea,
  CardContent,
  Button,
  Typography,
  CardActions,
} from '@material-ui/core'

//https://stackoverflow.com/questions/50272814/image-on-material-ui-cardmedia
const styles = theme => ({
  postCard: {
    height: '350px',
    marginBottom: '30px',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9,
    marginTop:'30'
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

  render(){
    const classes = this.props.classes;
    console.log("media:")
    console.log(this.state.contentStr);
    return (
        <Card className={classes.postCard}>
          <CardActionArea>
            <CardContent>
              <CardMedia square  className={classes.media} src={this.state.contentStr}></CardMedia>
              <Typography gutterBottom variant="h5" component="h2">
                {this.props.post.title}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {this.props.post.description}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary">
              Share
            </Button>
            <Button size="small" color="primary">
              Learn More
            </Button>
          </CardActions>
        </Card>
    )
  }
}
export default withStyles(styles, { withTheme: true })(ProfilePost)
