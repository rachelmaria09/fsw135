import React, {useContext} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import Navbar from './components/Navbar'
import Auth from './components/Auth'
import Profile from './components/Profile'
import Public from './components/Public'
import ProtectedRoute from './components/ProtectedRoute'
import {UserContext} from './context/UserProvider'

export default function App() {
  const {token, logout} = useContext(UserContext)
  return (
    <div className='App'>
      { token && <Navbar logout={logout} />}
      <Switch>
        <Route
          exact path="/"
          render={() => token? <Redirect to="/profile" /> : <Auth />}
        />
        <ProtectedRoute
        path="/profile"
        component = {Profile}
        redirectTo = "/"
        token = {token}
        />
        <ProtectedRoute
        path="/public"
        component = {Public}
        redirectTo = "/"
        token = {token}
        />
      </Switch>
    </div>
  )
}
