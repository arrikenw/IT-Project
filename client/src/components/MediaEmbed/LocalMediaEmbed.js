import React from "react";
import ResponsiveEmbed from "react-bootstrap/ResponsiveEmbed";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import Image from "react-bootstrap/Image";


// takes media id via props
class MediaEmbed extends React.Component {
  constructor(props) {
    super(props);
    const { mwidth, mheight, mediaURL, mimeType } = this.props;
    this.state = {
      mimeType,
      mwidth,
      mheight,
      mediaURL,
    };
  }


  renderMedia = (
    mimeType,
    mwidth,
    mheight,
    mediaURL,
  ) => {
    if (mimeType.startsWith("video/")) {
      return (
        <video
          src={mediaURL}
          type={mimeType}
          style={{
            maxWidth: mwidth,
            maxHeight: mheight,
          }}
          controls
        />
      );
    }
    if (mimeType.startsWith("image/")) {
      return (
        <div style={{
          width: "100%",
          height: "100%",
          padding: 0,
          margin: 0}}
        >
          <Image
            src={mediaURL}
            type={mimeType}
            style={{ width: "39vw",
              height: "100%" }}
            rounded
          />
        </div>
      );
    }
      return (
        <ResponsiveEmbed
          style={{
            width: mwidth,
            height: mheight,
            padding: 0,
            margin: 0,
          }}
        >
          <object type={mimeType} data={mediaURL} />
        </ResponsiveEmbed>
      );
    
  };

  // TODO look into bug with pdfs in chrome (works in firefox)
  // TODO improve styling
  render() {
    const {
      mimeType,
      mwidth,
      mheight,
      mediaURL,
    } = this.state;

    return (
      <div
        style={{ padding: "0", width: "100%", height: "100%" }}
      >
        {this.renderMedia(
          mimeType,
          mwidth,
          mheight,
          mediaURL,
        )}
      </div>
    );
  }
}
export default withRouter(MediaEmbed);

MediaEmbed.propTypes = {
  mwidth: PropTypes.string,
  mheight: PropTypes.string,
  mediaURL: PropTypes.string.isRequired,
  mimeType: PropTypes.string,
};

MediaEmbed.defaultProps = {
  mwidth: "",
  mheight: "",
  mimeType: "",
};
