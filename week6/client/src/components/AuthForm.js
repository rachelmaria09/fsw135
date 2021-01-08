import React from 'react'

export default function Authform(props) {
    const {
        handleChange,
        handleSubmit,
        btnText,
        errMsg,
        inputs: {
            username,
            password
        }
    } = props

    return (
        <form onSubmit={handleSubmit}>
            <input
            className="auth-input"
            type="text"
            value={username}
            name="username"
            onChange={handleChange}
            placeholder="Username"/>
            <input
            className="auth-input"
            type="text"
            value={password}
            name="password"
            onChange={handleChange}
            placeholder="Password"/>
            <br></br>
            <button className="btn">{btnText}</button>
            <p style={{color: "red"}}>{errMsg}</p>
        </form>
        
    )
}