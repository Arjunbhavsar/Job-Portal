import React, { Component } from 'react';

import './App.css';


import 'bootstrap/dist/css/bootstrap.min.css'

import QuickPickApplication from './component/quickPick/QuickPickApplication';

class App extends Component {
  render() {
    return (
      <div className="App">
         <QuickPickApplication/>
      </div>
    );
  }
}

export default App;