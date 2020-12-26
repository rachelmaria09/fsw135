import React, {useContext} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import Navbar from './components/Navbar'
import Auth from './components/Auth'
import Profile from './components/Profile'
import Public from './components/Public'
import {UserContext} from './context/UserProvider'

export default function App() {
  const {token, logout} = useContext(UserContext)
  return (
    <div className='App'>
      <Navbar logout={logout} />
      <Switch>
        <Route
          exact path="/"
          render={() => token? <Redirect to="/profile" /> : <Auth />}
        />
        <Route
        path="/profile"
        render={() => <Profile />}
        />
        <Route
        path="/public"
        render={() => <Public />}
        />
      </Switch>
    </div>
  )
}
