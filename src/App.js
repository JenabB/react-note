import React from "react";
import { GlobalProvider } from "./hook";
import Navigation from "./Navigation";

import "./App.css";

function App() {
  return (
    <GlobalProvider>
      <Navigation />
    </GlobalProvider>
  );
}

export default App;
