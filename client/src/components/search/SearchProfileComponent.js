import React from 'react'
import {
    Card,
    CardActionArea,
    CardContent,
    Button,
    Typography,
    CardActions,
    ButtonBase,
    CardMedia,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 450,
        backgroundColor: theme.palette.background.paper,
    },
    avatarSize: {//Need adjustment
        width: '100px',
        height: '100px',
    },
    center: {
        justifyContent: 'center',
        textAlign: 'center',
    },
    profileCard: { //Need adjustment
        height: '170px',
        marginBottom: '30px',
    },
}))

function SearchProfileComponent({ user }) {
    const classes = useStyles()

    return (
        <Card className={classes.profileCard}>
            <ButtonBase className={classes.cardAction} onClick={//Need to send to profile page
            }>
                <CardActionArea>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {user.firstName} {user.lastName}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {user.bio}
                        </Typography>
                    </CardContent>
                    <CardMedia
                        className={classes.avatarSize}
                        image = {user.avatar} //
                        title="User Profile Picture"
                    />
                </CardActionArea>
            </ButtonBase>
        </Card>
    )
}

export default SearchProfileComponent