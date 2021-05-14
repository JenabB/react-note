import React from "react";
import { GlobalProvider } from "./hook";
import Navigation from "./Navigation";

import "./App.css";

function App() {
  return (
    <div className="App">
      <GlobalProvider>
        <Navigation />
      </GlobalProvider>
    </div>
  );
}

export default App;
