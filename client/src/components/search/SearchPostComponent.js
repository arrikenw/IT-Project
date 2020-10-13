import React from 'react'
import {
    Card,
    CardActionArea,
    CardContent,
    Button,
    Typography,
    CardActions,
    ButtonBase,
    CardMedia
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
    postCard: { //Need adjustment
        height: '170px',
        marginBottom: '30px',
    },
    thumbnail: { //Need adjustment
        height: '170px',
        marginBottom: '30px',
    },
    cardAction: {
        display: 'block',
        textAlign: 'initial'
    }
})

function SearchPostComponent({ post }) {
    const classes = useStyles()
    return(
        <Card className={classes.postCard}>
            <ButtonBase className={classes.cardAction} onClick={//Need to send to post page
            }>
                <CardActionArea>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {post.title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {post.description}
                        </Typography>
                    </CardContent>
                    <CardMedia
                        className={classes.thumbnail}
                        image = {post.body.thumbnailURL}
                        title="Post Thumbnail"
                    />
                </CardActionArea>
            </ButtonBase>
        </Card>
    )
}

export default SearchPostComponent