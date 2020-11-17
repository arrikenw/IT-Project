import React, { useEffect, useState } from "react";
import CardMedia from "@material-ui/core/CardMedia";
import PropTypes from 'prop-types'
import { makeStyles } from "@material-ui/core/styles";
import tempImg from "../../assets/logo512.png"

import docTN from "../../assets/docs.png"
import audioTN from "../../assets/audio.jpg"

const useStyles = makeStyles({
  media: {
    /* height: 0,
    paddingTop: '56.25%', // 16:9,
    marginTop:'30' */
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  }
})

function GenericMedia({ style, mimeType, src, className, title, thumbnail }) {
  const [realSrc, setRealSrc] = useState(tempImg)
  const [realType, setRealType] = useState('img')
  const [realStyle, setRealStyle] = useState({})


  useEffect(() => {
    if (!mimeType || mimeType === "") {
      setRealSrc(tempImg)
      setRealType('img')
    }
    const split = mimeType.split("/")
    const firstPart = split[0]
    const secondPart = split[1]
    switch (firstPart) {
      case "image":
        setRealSrc(src)
        setRealType('img')
        setRealStyle(style)
        break
      case "video":
        setRealSrc(src)
        setRealType('video')
        setRealStyle(style)
        break
      case "audio":
        if (thumbnail) {
          setRealSrc(audioTN)
        }
        setRealSrc(src)
        setRealType('audio')
        setRealStyle(style)
        break
      case "application":
        if (thumbnail) {
          setRealSrc(docTN)
          setRealType('img')
          setRealStyle(style)
          break
        }
        switch (secondPart) {
          case "pdf":
            setRealStyle((oldStyle) => {
              const newStyle = { ...oldStyle }
              newStyle.height = "650px"
              return newStyle
            })
            setRealSrc(src)
            setRealType('iframe')
            break
          case "vnd.openxmlformats-officedocument.wordprocessingml.document":
            setRealSrc(docTN)
            setRealType('img')
            setRealStyle(style)
            break
          case "msword":
            setRealSrc(docTN)
            setRealType('img')
            setRealStyle(style)
            break
          case "application/vnd.ms-powerpoint":
            setRealSrc(docTN)
            setRealType('img')
            setRealStyle(style)
            break
          case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
            setRealSrc(docTN)
            setRealType('img')
            setRealStyle(style)
            break
          case "application/vnd.ms-excel":
            setRealSrc(docTN)
            setRealType('img')
            setRealStyle(style)
            break
          case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
            setRealSrc(docTN)
            setRealType('img')
            setRealStyle(style)
            break
          default:
            setRealSrc(docTN)
            setRealType('img')
            setRealStyle(style)
            break
        }
        break
      default:
        setRealSrc(docTN)
        setRealType('img')
        setRealStyle(style)
        break
    }
  }, [mimeType, src, style])

  const classes = useStyles()
  if (!src || src === "") {
    return <> </>
  }

  if (realType !== "audio") {
    return (
      // eslint-disable-next-line react/jsx-props-no-spreading
      <CardMedia type={mimeType} component={realType} title={title} src={realSrc} controls className={className} style={realStyle} />
    );
  }
  
    return (
      <div style={{width: "100%", justifyContent: "center", textAlign: "center"}}>
        <audio controls>
          <source type={mimeType} src={realSrc} />
        </audio>
      </div>
    )
}

GenericMedia.propTypes = {
  mimeType: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.shape({}),
  src: PropTypes.string,
  title: PropTypes.string,
  thumbnail: PropTypes.bool.isRequired
}

GenericMedia.defaultProps = {
  mimeType: 'image/jpg',
  className: "",
  style: {},
  src: '',
  title: "File"
}

export default GenericMedia;