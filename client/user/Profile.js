//the profile component shows a single user's info in view @ '/user/:userId' path, where userId param rep the ID of specific user
//completed profile will display user details, & also conditionally show edit/delete options
//this prof info can be fetched f/server if user signed in; to verify this, component has to provide JWT cred to the read fetch call or redirect user to Signin view
import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import Edit from '@material-ui/icons/Edit'
import Person from '@material-ui/icons/Person'
import Divider from '@material-ui/core/Divider'
import DeleteUser from './DeleteUser'
import auth from './../auth/auth-helper'
import {read} from './api-user.js'
import {Redirect, Link} from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  root: theme.mixins.gutters({
    maxWidth: 600,
    margin: 'auto',
    padding: theme.spacing(3),
    marginTop: theme.spacing(5)
  }),
  title: {
    marginTop: theme.spacing(3),
    color: theme.palette.protectedTitle
  }
}))
//in the prof component def need to initialize the state w/empty user & set redirectToSignin to false
export default function Profile({ match }) {
  const classes = useStyles()
  const [user, setUser] = useState({})
  const [redirectToSignin, setRedirectToSignin] = useState(false)
  const jwt = auth.isAuthenticated()
//also need to get access to the match props passed by the Route component, which'll contain userId param val w/match.params.userId
//the prof component should fetch user info & render the view w/ these deets w/useEffect hook
//this effect uses match.params.userId val & calls the read user fetch method, req's cred's to auth the signed-in user, the JWT is ret'd f/sessionStorage using isAuthenticated() f/auth-helper.js & passed ih call to read
//state updated w/user info or view redirected to Signin if user not authenticated
//add cleanup f(x) in effect hook to abort fetch signal when component unmounts
//effect only needs to rerun when userId param's chg; add match.params.userId in second arg to useEffect
  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    read({
      userId: match.params.userId
    }, {t: jwt.token}, signal).then((data) => {
      if (data && data.error) {
        setRedirectToSignin(true)
      } else {
        setUser(data)
      }
    })

    return function cleanup(){
      abortController.abort()
    }

  }, [match.params.userId])
//if user not authenticated set up cond redirect to sign in view  
    if (redirectToSignin) {
      return <Redirect to='/signin'/>
    }
    //the f(x) will return Profile view for other user's profile to signed-in user, if viewing own profile will show edit and delete options
    return (
      <Paper className={classes.root} elevation={4}>
        <Typography variant="h6" className={classes.title}>
          Profile
        </Typography>
        <List dense>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <Person/>
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={user.name} secondary={user.email}/> 
            {/* in 1st ListItem component in Profile, add ListItemSecondaryAction component containing the edit btn & deleteUser component will conditionally render based on if user viewing own profile  */}
            { auth.isAuthenticated().user && auth.isAuthenticated().user._id == user._id &&
              (<ListItemSecondaryAction>
                <Link to={"/user/edit/" + user._id}>
                    {/* Edit btn will route to EditProfile component */}
                  <IconButton aria-label="Edit" color="primary">
                    <Edit/>
                  </IconButton>
                </Link>
                {/* DeleteUser component will handle delete operation w/userId passed as prop */}
                <DeleteUser userId={user._id}/>
              </ListItemSecondaryAction>)
            }
          </ListItem>
          <Divider/>
          <ListItem>
            <ListItemText primary={"Joined: " + (
              new Date(user.created)).toDateString()}/>
          </ListItem>
        </List>
      </Paper>
    )
  }