import React, { Component } from 'react';
import ThirdComponent from './component/ThirdComponent'
import logo from './logo.svg';
import AppRouting from './component/quickPick/Routing'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
          <AppRouting/>
      </div>
    );
  }
}

export default App;