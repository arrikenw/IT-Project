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
import PropTypes from "prop-types";
import InfinitePostScroll from "./InfinitePostScroll";


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


class PinnedPostElement extends Component {

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
                // mimeType: this.props.media.mimeType,
                // contentCategory: this.props.media.contentCategory
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

    componentDidUpdate(props){
        // if media is already stored
        const { media } = this.props
        const { contentStr } = this.state
        if (media && media.contentStr !== contentStr){
            console.log("USING STORED MEDIA");
            // eslint-disable-next-line react/no-did-update-set-state
            this.setState({
                contentStr: media.contentStr,
                // mimeType: media.mimeType,
                // contentCategory: media.contentCategory
            })
        }
    }

    render(){
        const { classes, history, post } = this.props;
        const { contentStr } = this.state
        const textLimit = {height: "60px"};
        const aspectChange = {paddingTop: '56.25%'};
        return (
          <Card className={classes.postCard}>
            <CardActionArea onClick={() => { history.push(`/post?post=${post._id}`); }}>
              <CardContent style={{paddingBottom: "0px"}}>
                <CardMedia className={classes.media} style={aspectChange} image={contentStr} />
                <div style={textLimit}>
                  <Typography gutterBottom variant="h5" component="h2" style={{overflow:"hidden", textOverflow: "ellipsis"}}>
                    {post.title}
                  </Typography>
                </div>
              </CardContent>
            </CardActionArea>
          </Card>
        )
    }
}

PinnedPostElement.propTypes = {
    post: PropTypes.objectOf(PropTypes.object).isRequired,
    classes: PropTypes.objectOf(PropTypes.object).isRequired,
    history: PropTypes.objectOf(PropTypes.object).isRequired,
    media: PropTypes.objectOf(PropTypes.object).isRequired,

}

export default withRouter(withStyles(styles, { withTheme: true })(PinnedPostElement))