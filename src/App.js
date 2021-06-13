import React from "react";
import "./App.css";
import Sidebar from "./components/sidebar/Sidebar";
import Bot from './components/sidebar/Bot'

function App() {
  return (
    <div className = 'main'>
        <Sidebar />

        
      <div className='right'>
        <Bot />
      </div>
    </div>
  );
}

export default App;
