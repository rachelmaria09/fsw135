import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import Auth from './components/Auth'
import Profile from './components/Profile'
import Public from './components/Public'

export default function App() {
  return (
    <div className='App'>
      <Navbar />
      <Switch>
        <Route
          exact path="/"
          render={() => <Auth />}
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
