import React, { useState, useEffect } from "react"
import Axios from "axios"
import { DropzoneArea } from 'material-ui-dropzone'
import PropTypes from 'prop-types'
import add from "../utils/addMedia"

function AddPost({ token }) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [mediaID, setMediaID] = useState("")
  const [rawMedia, setRawMedia] = useState(null)
  const [file, setFile] = useState(null)
  const [mimeType, setMimeType] = useState("")

  const onFileChange = (e) => {
    setRawMedia(e.target.files[0])
    const fileReader = new FileReader();
    fileReader.onloadend = (f) => {
      const content = f.target.result;
      setFile(null)
      setFile(content)
    }

    if (!e.target.files[0]) {
      setFile(null)
      setMimeType("")
      return;
    }
    setMimeType(e.target.files[0].type)
    fileReader.readAsDataURL(e.target.files[0]);
  }

  const onSubmit = (e) => {
    console.log("button pressed");
    // const {file, token, title, description, rawMedia} = this.state;

    const callback = (res) => {
      const payload = {
        title,
        description,
        private: false,
        mediaID: res._id
      }
      Axios.post("/api/post/add", payload, {headers: {Authorization: `Bearer ${token}`}})
        .then( (resp) => {
          console.log(resp.data);
        });
    }

    add(rawMedia, false, token, callback);
  }

  return (
    <DropzoneArea />
  )
}

export default AddPost;

AddPost.propTypes = {
  token: PropTypes.string.isRequired,
}