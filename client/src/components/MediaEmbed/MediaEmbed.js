import React from "react";
import ResponsiveEmbed from "react-bootstrap/ResponsiveEmbed";
import Spinner from "react-bootstrap/Spinner";
import Axios from "axios";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import Image from "react-bootstrap/Image";
import noImage from "../../assets/noImage.png";

// takes media id via props
class MediaEmbed extends React.Component {
  constructor(props) {
    super(props);
    const { mwidth, mheight, targetMediaID } = this.props;
    this.state = {
      mimeType: "",
      contentStr: "",
      mwidth,
      mheight,
      targetMediaID,
      contentCategory: "",
    };
  }

  componentDidMount() {
    const { targetMediaID } = this.state;

    if (targetMediaID === "") {
      return;
    }

    const controllerUrl = "/api/media/";
    const payload = {
      mediaID: targetMediaID,
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

  renderMedia = (
    mediaID,
    contentCategory,
    contentStr,
    mwidth,
    mheight,
    mimeType
  ) => {
    if (contentCategory === "video" && contentStr) {
      return (
        <video
          src={contentStr}
          type={mimeType}
          style={{
            maxWidth: mwidth,
            maxHeight: mheight,
          }}
          controls
          autoPlay
        />
      );
    }
    if (contentStr) {
      return (
        <ResponsiveEmbed
          style={{
            width: mwidth,
            height: mheight,
            padding: 0,
            margin: 0,
          }}
        >
          <object type={mimeType} data={contentStr} />
        </ResponsiveEmbed>
      );
    }
    if (mediaID === "") {
      return (
        <div style={{
          width: mwidth,
          height: mheight,
          padding: 0,
          margin: 0,
        }}
        >
          <Image src={noImage} fluid />
        </div>
);
    }
    return <Spinner animation="border" style={{ margin: "auto" }} />;
  };

  // TODO look into bug with pdfs in chrome (works in firefox)
  // TODO improve styling
  render() {
    const {
      mimeType,
      contentStr,
      mwidth,
      mheight,
      contentCategory,
    } = this.state;
    const { targetMediaID } = this.props;


    return (
      <div
        className="d-flex justify-content-center"
        style={{ padding: "0", backgroundColor: "red" }}
      >
        {this.renderMedia(
          targetMediaID,
          contentCategory,
          contentStr,
          mwidth,
          mheight,
          mimeType
        )}
      </div>
    );
  }
}
export default withRouter(MediaEmbed);

MediaEmbed.propTypes = {
  mwidth: PropTypes.string,
  mheight: PropTypes.string,
  targetMediaID: PropTypes.string,
};

MediaEmbed.defaultProps = {
  mwidth: "",
  mheight: "",
  targetMediaID: "",
};
