import React, { Component } from 'react';
import HeaderComponent from './component/HeaderComponent'
import FooterComponent from './component/FooterComponent'
import ThirdComponent from './component/ThirdComponent'
import Counter from './component/Counter/Counter'
import Login from './component/Login'
import logo from './logo.svg';
import Navigation from './component/Navigation'
import Dashboard from './component/Dashboard'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
          <Dashboard/>
          <Navigation index={"dash"}/>
      </div>
    );
  }
}

export default App;