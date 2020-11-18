import Axios from "axios";
import React, {Component} from "react";
import { withRouter } from 'react-router-dom'
import { withStyles } from "@material-ui/core/styles";
import {
    Card,
    CardMedia,
    CardActionArea,
    CardContent,
    Typography,
} from '@material-ui/core'
import PropTypes from "prop-types";
import audioTN from "../../assets/audio.jpg"
import videoTN from "../../assets/video.jpg"
import docTN from "../../assets/docs.png"


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
            mimeType: "",
            contentStr: "",
            // contentCategory: "",
        };
    }


    componentDidMount() {
        // if media is already stored
        const { media, post } = this.props;
        if (media){
            this.setState({
                contentStr: media.contentStr,
                mimeType: media.mimeType,
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
    }

    componentDidUpdate(props){
        // if media is already stored
        const { media } = this.props
        const { contentStr } = this.state
        if (media && media.contentStr !== contentStr){
            // eslint-disable-next-line react/no-did-update-set-state
            this.setState({
                contentStr: media.contentStr,
                mimeType: media.mimeType,
                // contentCategory: media.contentCategory
            })
        }
    }

    render(){
        const { classes, history, post } = this.props;
        const { contentStr,mimeType } = this.state
        const textLimit = {height: "60px"};
        const aspectChange = {paddingTop: '56.25%'};
        const renderMedia = () => {
            if (!mimeType) {
                return <CardMedia className={classes.media} type={mimeType} controls style={aspectChange} image={contentStr} />
            }
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
          <Card className={classes.postCard} style={{backgroundColor: "#ebebeb"}}>
            <CardActionArea onClick={() => { history.push(`/post?post=${post._id}`); }}>
              <CardContent style={{paddingBottom: "0px"}}>
                {renderMedia()}
                <div style={textLimit}>
                  <Typography gutterBottom variant="h5" component="h2" style={{overflow:"hidden", textOverflow: "ellipsis", textAlign: "center"}}>
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
    post: PropTypes.shape({
        title: PropTypes.string,
        _id: PropTypes.string,
        thumbnailURL: PropTypes.string,
        mediaID: PropTypes.string,
    }).isRequired,
    classes: PropTypes.string.isRequired,
    history: PropTypes.shape({push: PropTypes.func}).isRequired,
    media: PropTypes.shape({contentStr: PropTypes.string, mimeType: PropTypes.string}).isRequired,

}

export default withRouter(withStyles(styles, { withTheme: true })(PinnedPostElement))