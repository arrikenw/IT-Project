import React, { useState, useEffect } from "react"
import Axios from "axios"
import {withRouter} from "react-router-dom";
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
  Checkbox, FormControlLabel, Select, FormHelperText, MenuItem, InputLabel, FormControl, Snackbar
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import CardMedia from "@material-ui/core/CardMedia";
import MuiAlert from "@material-ui/lab/Alert";
import add from "../utils/addMedia"
import testImage from '../../assets/logo512.png'
import GenericMedia from "../utils/GenericMedia";

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
    justifyContent: 'center',
    height: '60px',
    backgroundColor: '#34b9ed',
    '&:hover': {
      background: '#30a6d1',
    },
  },
  buttonText: {
    color: 'white',
  },
  media: {
    height:" 100%",
    // paddingTop: '56.25%', // 16:9
  }

})

function Alert(props) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function AddPostForm({ user, token, history }){
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [postPrivacy, setPostPrivacy] = useState(false)

  // for media
  const [rawMedia, setRawMedia] = useState(null)
  const [file, setFile] = useState(null)
  const [mimeType, setMimeType] = useState("image/jpg")
  const [mediaName, setMediaName] = useState("Media File")

  // for thumbnail
  const [rawMediaTN, setRawMediaTN] = useState(null)
  const [fileTN, setFileTN] = useState(null)
  const [mimeTypeTN, setMimeTypeTN] = useState("image/jpg")
  const [mediaNameTN, setMediaNameTN] = useState("Thumbnail File")

  // for tags
  const [tag, setTag] = useState("Untagged")
  const [currentTags, setCurrentTags] = useState([])

  // for warnings
  const [warning, setWarning] = useState(false);
  const [warningMessage, setWarningMessage] = useState('');

  useEffect(() => {
    console.log(user)
    if (user && user.tags) {
      setCurrentTags(user.tags)
    }
  }, [user])

  const changeTitle = (e) => {
      setTitle(e.target.value)
  }
  const changeDescription = (e) => {
      setDescription(e.target.value)
  }
  const changeTag = (e) => {
      setTag(e.target.value)
  }

  const changePostPrivacy = (e) => {
      setPostPrivacy((old) => !old)
  }

  // sets media file
  const onFileChange = (e) => {
    setRawMedia(e.target.files[0])
    console.log(e.target.files[0])
    const fileReader = new FileReader();
    fileReader.onloadend = (f) => {
      const content = f.target.result;
      setFile(null)
      setFile(content)
    }

    if (!e.target.files[0]) {
      setFile(null)
      setMediaName("Media File")
      setMimeType("image/jpg")
      return;
    }
    setMimeType(e.target.files[0].type)
    setMediaName(e.target.files[0].name)
    fileReader.readAsDataURL(e.target.files[0]);
  }

  // sets file for thumbnail
  const onFileChangeTN = (e) => {


    const fileReader = new FileReader();
    fileReader.onloadend = (f) => {
      const content = f.target.result;
      setFileTN(null)
      setFileTN(content)
    }

    if (!e.target.files[0]) {
      setFileTN(null)
      setMediaNameTN("Thumbnail File")
      setMimeTypeTN("image/jpg")
      setRawMediaTN(e.target.files[0])
      return;
    }
    if (!e.target.files[0].type.startsWith("image")) {
      setWarningMessage("Thumbnail must be an image")
      setWarning(true)
      return
    }
    setRawMediaTN(e.target.files[0])
    setMimeTypeTN(e.target.files[0].type)
    setMediaNameTN(e.target.files[0].name)
    fileReader.readAsDataURL(e.target.files[0]);
  }

  // redirects user back to their profile page
  const redirect = () => {
    history.push("/profile")
  }

  const validateFields = () => {
    if (!mimeTypeTN.startsWith("image")) {
      setWarningMessage("Thumbnail must be an image")
      setWarning(true)
      return 1
    }
    if (!(
      (mimeType.startsWith("image")) || (mimeType.startsWith("text")) ||
      (mimeType.startsWith("text")) || (mimeType.startsWith("video")) ||
      (mimeType.startsWith("audio")) || (mimeType.startsWith("application/pdf"))||
      (mimeType.startsWith("application/vnd.openxmlformats-officedocument.wordprocessingml.document")) ||
      (mimeType.startsWith("application/msword")) ||
      (mimeType.startsWith("application/vnd.ms-powerpoint")) ||
      (mimeType.startsWith("application/vnd.openxmlformats-officedocument.presentationml.presentation")) ||
      (mimeType.startsWith("application/vnd.ms-excel")) ||
      (mimeType.startsWith("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
      )) {
      setWarningMessage("Invalid file type")
      setWarning(true)
      return 1
    }
    if (title.length > 200) {
      setWarningMessage("Title must be less than 201 characters long")
      setWarning(true)
      return 1
    }
    if (description.length > 2200) {
      setWarningMessage("Description must be less than 2200 characters long")
      setWarning(true)
      return 1
    }
    return 0
  }

  // creates post
  const onSubmit = (e) => {
    if (validateFields() === 1) {
      return
    }
  const firstCallBack = (resOne) => {
      const callback = (resTwo) => {
        const payload = {
          title,
          description,
          private: postPrivacy,
          mediaID: resTwo._id,
        }
        if (resOne !== "") {
          payload.thumbnailURL = resOne._id
        }
        Axios.post("/api/post/add", payload, {headers: {Authorization: `Bearer ${token}`}})
          .then( (resp) => {
            console.log(resp.data);
            redirect();
          }).catch((err) => {
          console.error(err)
        });
      }
      console.log(rawMedia)
      add(rawMedia, postPrivacy, mediaName, token, callback);
    }

    if (rawMediaTN) {
      add(rawMediaTN, postPrivacy, mediaNameTN, token, firstCallBack)
    }
    else {
      firstCallBack("")
    }
  }

  // renders the correct preview media
  const renderMedia = () => {
    if (rawMediaTN) {
      return (
        <GenericMedia
          title={mediaNameTN}
          src={fileTN}
          className={classes.media}
          mimeType={mimeTypeTN}
        />
      )
    }
    return (
      <GenericMedia
        title={mediaName}
        src={file}
        className={classes.media}
        mimeType={mimeType}
      />
    )
  }

  const renderAddTag = () => {
    if (currentTags.length < 5) {
      return (
        <MenuItem onClick={onClickNewTag} value={7}> Add a new tag</MenuItem>
      )
    }
    return (<> </>)
  }

  const onClickNewTag = () => {
    console.log('we work!')
  }

  const classes = useStyles()

  if (!user || user === "" || !user.tags) {
    return <> </>
  }

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
          <div style={{ marginTop: '20px', marginBottom: "20px" }}>
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
            accept="*"
            id="contained-button-file"
            onChange={onFileChange}
            type="file"
          />
          <input
            style={{display: "none"}}
            accept="image/*"
            id="contained-button-thumbnail"
            onChange={onFileChangeTN}
            type="file"
          />
          {renderMedia()}
          <div className={classes.center} style={{marginTop: "20px", height: "40px", width: '100%'}}>

            <div style={{float: "left", marginBottom: "20px", marginLeft: "60px"}}>
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label htmlFor="contained-button-file">
                <Button variant="contained" color="primary" component="span">
                  Choose File
                </Button>
              </label>
            </div>
            <div style={{float: "right", marginBottom: "20px", marginRight: "40px"}}>
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label htmlFor="contained-button-thumbnail">
                <Button variant="contained" color="primary" component="span">
                  Choose Thumbnail
                </Button>
              </label>
            </div>
          </div>
          <div style={{width: "100%", marginTop: "20px",  marginBottom: "20px"}}>
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-label" style={{width: "300px"}}>Select post tag</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={tag}
                onChange={changeTag}
              >
                <MenuItem value="Untagged"> Untagged</MenuItem>
                {currentTags.map((singleTag) => {
                  return (
                    <MenuItem value={singleTag} key={singleTag}>
                      {' '}
                      {singleTag}
                    </MenuItem>
                  )
                })}
                {/* renderAddTag() */}
              </Select>
            </FormControl>
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
      <Snackbar open={warning} onClose={() => {setWarning(false)}}>
        <Alert onClose={() => {setWarning(false)}} severity="error">
          {warningMessage}
        </Alert>
      </Snackbar>
    </Card>
  )
}

export default withRouter(AddPostForm);

AddPostForm.propTypes = {
  token: PropTypes.string.isRequired,
  user: PropTypes.shape({tags: PropTypes.arrayOf(PropTypes.string)}).isRequired,
  history: PropTypes.shape({push: PropTypes.func}).isRequired,
}