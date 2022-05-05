import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Home from './core/Home'
import Users from './user/Users'
import Signup from './user/Signup'
import Signin from './auth/Signin'
import EditProfile from './user/EditProfile'
import Profile from './user/Profile'
import PrivateRoute from './auth/PrivateRoute'
import Menu from './core/Menu'

const MainRouter = () => {
    return (<div>
      {/* to have menu navigation bar present in all views, need add to MainRouter b4 all other routes & outside switch; this makes menu component render on top of all other components when these componment are accessed at their respective routes */}
      <Menu/>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/users" component={Users}/>
        <Route path="/signup" component={Signup}/>
        <Route path="/signin" component={Signin}/>
        {/* use a PrivateRoute will restrict component f/loading if user not signed in; user/edi/:userId needs go b4 user/:userId path so edit path is matched exclusively in switch component when route is req'd and not confused w/Profile route */}
        <PrivateRoute path="/user/edit/:userId" component={EditProfile}/>
        <Route path="/user/:userId" component={Profile}/>
      </Switch>
    </div>)
}

export default MainRouter

