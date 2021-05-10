import React from "react";
import { AuthProvider } from "./hook";

import Navigation from "./Navigation";

import "./App.css";
import Footer from "./components/Footer";

function App() {
  return (
    <AuthProvider>
      <Navigation />
      <Footer />
    </AuthProvider>
  );
}

export default App;
