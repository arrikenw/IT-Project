import React from 'react'
import {
  Card,
  CardActionArea,
  CardContent,
  Button,
  Typography,
  CardActions,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  postCard: {
    height: '350px',
    marginBottom: '30px',
  },
})

function ProfilePost({ post }) {
  const classes = useStyles()
  return (
    <Card className={classes.postCard}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {post.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {post.description}
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

export default ProfilePost
