import 'babel-polyfill';
import React, { Component } from 'react';
import './styles/App.css';
import AppRouter from './components/AppRouter';


export default class App extends Component {

  render() {
    return (
      <AppRouter />

    );
  }
}
