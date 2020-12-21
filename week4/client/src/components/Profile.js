import React from 'react'
import UserForm from './UserForm'
import UserList from './UserList'
import User from './User'

export default function Profile() {
    return (
        <div className="profile">
            <h1>Welcome @Username!</h1>
            <h3>Add a comment</h3>
            <UserForm />
            <h3>Your Comments</h3>
        </div>
    )
}