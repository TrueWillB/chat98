import React from "react";
import Toolbar from "./components/toolbar";
import ProfilePics from "./components/sidePanel";
import Home from "./pages/Home";

function App() {
  return (
    <div className="App">
      <Toolbar />
      <div style={{ display: "flex" }}>
        <Home />
        <ProfilePics />
      </div>
    </div>
  );
}

export default App;
