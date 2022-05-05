//Menu component will f(x) as navigation bar across frontend app by providing links to all available views, and by indicating user's current location in app

import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import HomeIcon from '@material-ui/icons/Home'
import Button from '@material-ui/core/Button'
import auth from './../auth/auth-helper'
import {Link, withRouter} from 'react-router-dom'

//to indicate the current locaiton of the app on the menu, we'll highlight the link that matches the current location by changing the color conditionally
const isActive = (history, path) => {
  if (history.location.pathname == path)
    return {color: '#9778ce'}
  else
    return {color: '#ffffff'}
}
//following code in Menu component adds just title, Home icon linked to root route and Users button linked to users route
//use HOC withRouter f/React Router to get access to the history obj's props
//the isActive f(x) used to apply color to btns in menu as: 'style={isActive(history, "/users")}
const Menu = withRouter(({history}) => (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="h6" color="inherit">
        PNW Auctions
      </Typography>
      <Link to="/">
        <IconButton aria-label="Home" style={isActive(history, "/")}>
          <HomeIcon/>
        </IconButton>
      </Link>
      <Link to="/users">
        <Button style={isActive(history, "/users")}>Users</Button>
      </Link>
      {/* links to Sign In and Sign Up should only appear on menu when user not signed in, so add cond */
        !auth.isAuthenticated() && (<span>
          <Link to="/signup">
            <Button style={isActive(history, "/signup")}>Sign up
            </Button>
          </Link>
          <Link to="/signin">
            <Button style={isActive(history, "/signin")}>Sign In
            </Button>
          </Link>
        </span>)
      }
      {/* link to sign out and my profile should only appear on menu when user signed in so add cond ck */
        auth.isAuthenticated() && (<span>
          <Link to={"/user/" + auth.isAuthenticated().user._id}>
            <Button style={isActive(history, "/user/" + auth.isAuthenticated().user._id)}>My Profile</Button>
          </Link>
          <Button color="inherit" onClick={() => {
              auth.clearJWT(() => history.push('/'))
            }}>Sign out</Button>
        </span>)
      }
    </Toolbar>
  </AppBar>
))

export default Menu