import React from "react";
import { AuthProvider } from "./hook";
import Navigation from "./Navigation";

import "./App.css";

function App() {
  return (
    <AuthProvider>
      <Navigation />
    </AuthProvider>
  );
}

export default App;
