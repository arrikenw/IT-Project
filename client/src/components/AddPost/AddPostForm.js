import React, { useState, useEffect } from "react"
import Axios from "axios"
import { DropzoneArea } from 'material-ui-dropzone'
import PropTypes from 'prop-types'
import {
    Button,
    Card,
    CardContent,
    Container,
    Divider,
    Grid,
    TextField,
    Typography,
    TableRow,
    Checkbox, FormControlLabel
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import add from "../utils/addMedia"

const useStyles = makeStyles({
    mainContainer: {
        height: '100%',
        width: '100%',
        overflowX: 'hidden',
    },
    center: {
        justifyContent: 'center',
        textAlign: 'center',
    },
    discard: {
        justifyContent: 'left',
        height: '60px',
        backgroundColor: '#33d130',
        '&:hover': {
            background: '#26b324',
        },
    },
    post: {
        justifyContent: 'right',
        height: '60px',
        backgroundColor: '#34b9ed',
        '&:hover': {
            background: '#30a6d1',
        },
    },
    buttonText: {
        color: 'white',
    },

})

function AddPostForm({ user, token, history }){
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [tag, setTag] = useState("")
    const [reflection, setReflection] = useState("")
    const [postPrivacy, setPostPrivacy] = useState("")
    const [mediaID, setMediaID] = useState("")
    const [rawMedia, setRawMedia] = useState(null)
    const [file, setFile] = useState(null)
    const [mimeType, setMimeType] = useState("")
    // const query = new URLSearchParams(location.search)
    // const userName = query.get('user')

    const changeTitle = (e) => {
        setTitle(e.target.value)
    }
    const changeDescription = (e) => {
        setDescription(e.target.value)
    }
    const changeTag = (e) => {
        setTag(e.target.value)
    }
    const changeReflection = (e) => {
        setReflection(e.target.value)
    }
    const changePostPrivacy = (e) => {
        setPostPrivacy(e.target.value)
    }

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
                    history.push("/profile")
                });
        }

        add(rawMedia, false, token, callback);
    }


    const classes = useStyles()

    return (
      <Card>
        <CardContent>
          <Typography className={classes.center} variant="h5">Add New Post</Typography>
          <form>
            <div style={{ marginTop: '20px' }}>
              <TextField
                id="addPost-title"
                type="title"
                label="Give your post a title"
                variant="outlined"
                fullWidth
                value={title}
                onChange={changeTitle}
              />
            </div>
            <div style={{ marginTop: '20px' }}>
              <TextField
                id="addPost-description"
                label="Give your work a description"
                variant="outlined"
                type="description"
                fullWidth
                multiline
                rows={6}
                value={description}
                onChange={changeDescription}
              />
            </div>
            <input
              style={{display: "none"}}
              accept="image/*"
              id="contained-button-file"
              onChange={onFileChange}
              type="file"
            />
            <div className={classes.center} style={{marginTop: "20px"}}>
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label htmlFor="contained-button-file">
                <Button variant="contained" color="primary" component="span">
                  Choose File
                </Button>
              </label>
            </div>
            <div style={{ marginTop: '20px' }}>
              <TextField
                id="addPost-tag"
                label="Add tags to your post"
                variant="outlined"
                type="tag"
                fullWidth
                value={tag}
                onChange={changeTag}
              />
            </div>
            <div style={{ marginTop: '20px' }}>
              <TextField
                id="addPost-reflection"
                label="Give your reflections of your work"
                variant="outlined"
                type="reflection"
                fullWidth
                value={reflection}
                onChange={changeReflection}
              />
            </div>
            <FormControlLabel
              control={(
                <Checkbox
                  checked={postPrivacy}
                  onClick={changePostPrivacy}
                  name="postPrivacy"
                />
                        )}
              label="Make post private"
            />
          </form>
          <div style={{ marginTop: '20px' }}>
            <Button className={classes.discard} fullWidth>
              <Typography className={classes.buttonText} variant="h6">
                Discard
              </Typography>
            </Button>
          </div>
          <div style={{ marginTop: '20px' }}>
            <Divider variant="middle" />
          </div>
          <div style={{ marginTop: '10px' }}>
            <Button className={classes.post} onClick={onSubmit} fullWidth>
              <Typography className={classes.buttonText} variant="h6">
                Post
              </Typography>
            </Button>
          </div>
        </CardContent>
      </Card>
    )
}

export default AddPostForm;

AddPostForm.propTypes = {
  token: PropTypes.string.isRequired,
  user: PropTypes.objectOf(PropTypes.object).isRequired,
  history: PropTypes.objectOf(PropTypes.object).isRequired,
}