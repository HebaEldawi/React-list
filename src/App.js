import React, { Component } from 'react';
import logo from './images/logo-landing.svg';
import './styles/App.css';
import Menu from './components/Menu';
import Login from './components/Login';
import AddEditItems from './components/AddEditItems';

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
           <button className="login" >Login</button>
         
        </header>
        <Login/>
        <Menu/>
        <AddEditItems/>  
      </div>
    );
  }
}
