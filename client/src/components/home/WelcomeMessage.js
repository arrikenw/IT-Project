import React from 'react'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@material-ui/core'

function WelcomeMessage() {
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h3" component="h2">
          E-folio helps you showcase your work with the people in your life.
        </Typography>
      </CardContent>
      {/* <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions> */}
    </Card>
  )
}

export default WelcomeMessage
