import React, { Component } from 'react';
export default class Login extends React.Component {

    render() {

    const users=[{name: "user", password: "user"},{name: "admin", password:"admin"}];

    return(
        <div>
        <input type="text" placeholder="Username"/>
        <input type="password" placeholder="Password"/>
        <button onClick="login()">Login</button>
        </div>
    )
    }
}