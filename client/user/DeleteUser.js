//DeleteUser component a btn that asdd to Profile view that whern clicked, opens a dialog asking user to confirm the delete action
import React, {useState} from 'react'
import PropTypes from 'prop-types'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import auth from './../auth/auth-helper'
import {remove} from './api-user.js'
import {Redirect} from 'react-router-dom'

//this component initializes state w/open set to false for dialog component and redirect set to false so isn't rendered first
export default function DeleteUser(props) {
  const [open, setOpen] = useState(false)
  const [redirect, setRedirect] = useState(false)

  const jwt = auth.isAuthenticated()
  //add handler method to open dialog btn, the dialog is opened when user clicks delete btt
  const clickButton = () => {
    setOpen(true)
  }
  //rec props f/parent component contains userId sent f/Profile component; needed to call the remove Fetch method, along w/JWT cred's after user confirms delete action in dialog
  const deleteAccount = () => { 
    remove({
      userId: props.userId
    }, {t: jwt.token}).then((data) => {
      if (data && data.error) {
        console.log(data.error)
      } else {
        auth.clearJWT(() => console.log('deleted'))
        setRedirect(true)
      }
    })
  }
  //add handler method to close dialog; dialog closed when user clicks cancel
  const handleRequestClose = () => {
    setOpen(false)
  }

  //on confirmation deleteAccount f(x) calls remove fetch method w/userId f/props & JWT f/isAuthenticated; on successful deletion, user'll be signed out and redirected to home view. The Redirect component f/React Router used to redirect to home view
  if (redirect) {
    return <Redirect to='/'/>
  }
  //the component f(x) returns the DeleteUser component elements, incl DeleteIcon btn and confirm dialog
    return (<span>
      <IconButton aria-label="Delete" onClick={clickButton} color="secondary">
        <DeleteIcon/>
      </IconButton>

      <Dialog open={open} onClose={handleRequestClose}>
        <DialogTitle>{"Delete Account"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Confirm to delete your account.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRequestClose} color="primary">
            Cancel
          </Button>
          <Button onClick={deleteAccount} color="secondary" autoFocus="autoFocus">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </span>)
//DeleteUser takes userId as prop to be used in delete fetch call, so need add req'd prop validation ck for React component
//to validate the req'd injection of userId as prop to component add PropTypes req'd validator to defined component
}
DeleteUser.propTypes = {
  userId: PropTypes.string.isRequired
}
//since using DeleteUser component in ProfileComponent, gets added to app view when Profile added in MainRouter