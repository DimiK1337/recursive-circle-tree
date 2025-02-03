import React from "react";
import CircleTree from "./components/CircleTree";
import MiniMap from "./components/MiniMap";
import treeData from "./data/sampleTree.json";

const App = () => {
  return (
    <div className="app-container">
      <h1>Recursive Circle Tree Navigation</h1>
      <div className="main-content">
        <CircleTree data={treeData} />
        <MiniMap />
      </div>
    </div>
  );
};

export default App;
