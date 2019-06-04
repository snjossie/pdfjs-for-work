import React from 'react';
import logo from './logo.svg';
import './App.css';
import PdfViewer from './PdfViewer';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
          <PdfViewer />
      </header>
    </div>
  );
}

export default App;
