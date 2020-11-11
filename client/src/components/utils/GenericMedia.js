import React, { useEffect, useState } from "react";
import CardMedia from "@material-ui/core/CardMedia";
import PropTypes from 'prop-types'
import tempImg from "../../assets/logo512.png"

function GenericMedia({ style, mimeType, src, className, title }) {
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
        setRealSrc(src)
        setRealType('audio')
        setRealStyle(style)
        break
      case "application":
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
            setRealSrc(tempImg)
            setRealType('img')
            setRealStyle(style)
            break
          case "msword":
            setRealSrc(tempImg)
            setRealType('img')
            setRealStyle(style)
            break
          case "application/vnd.ms-powerpoint":
            setRealSrc(tempImg)
            setRealType('img')
            setRealStyle(style)
            break
          case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
            setRealSrc(tempImg)
            setRealType('img')
            setRealStyle(style)
            break
          case "application/vnd.ms-excel":
            setRealSrc(tempImg)
            setRealType('img')
            setRealStyle(style)
            break
          case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
            setRealSrc(tempImg)
            setRealType('img')
            setRealStyle(style)
            break
          default:
            setRealSrc(tempImg)
            setRealType('img')
            setRealStyle(style)
            break
        }
        break
      default:
        setRealSrc(tempImg)
        setRealType('img')
        setRealStyle(style)
        break
    }
  }, [mimeType, src, style])
  if (!src || src === "") {
    return <> </>
  }
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <CardMedia component={realType} title={title} src={realSrc} className={className} style={realStyle} />
  );
}

GenericMedia.propTypes = {
  mimeType: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.shape({}),
  src: PropTypes.string,
  title: PropTypes.string,
}

GenericMedia.defaultProps = {
  mimeType: 'image/jpg',
  className: "",
  style: {},
  src: '',
  title: "File"
}

export default GenericMedia;