import React, { Component } from 'react';
import HeaderComponent from './component/HeaderComponent'
import FooterComponent from './component/FooterComponent'
import ThirdComponent from './component/ThirdComponent'
import Counter from './component/Counter/Counter'
import Login from './component/Login'
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <HeaderComponent />

          <Counter/>
         
         
        <FooterComponent />
        <ThirdComponent/>
      </div>
    );
  }
}

export default App;