import React, { Component } from 'react';
import './App.css';
import './style/sass/3-modules/_searchBox.sass';
import StepsContainer from './container/StepsContainer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 style={{ color: '#25A2F4' }}>Flag Picker</h1>
          <p style={{ color: '#424949', marginBottom: '20px' }}>This app will help you to learn flags around the world in <u>3 Steps</u></p>
        </header>
        <StepsContainer />
      </div>
    );
  }
}

export default App;
