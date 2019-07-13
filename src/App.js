import React from 'react';
import './App.css';
import Keyboard from './Keyboard'
import SynthCore from './SynthCore'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        JS Synth
      </header>

      <div>
        <SynthCore />
      </div>


    </div>
  );
}

export default App;
