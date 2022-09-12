import React from 'react';
import './App.css';
import { HashRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";

function App() {
  return (
    <HashRouter>
      <AppRouter/>
    </HashRouter>
  );
}

export default App;
