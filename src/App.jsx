import React from "react";
import CircleTree from "./components/CircleTree";
import MiniMap from "./components/MiniMap";
import treeData from "./data/sampleTree.json";

const App = () => {
  return (
    <div className="app-container">
      <MiniMap data={treeData} />
      <div className="main-content">
        <h1>Recursive Circle Tree Navigation</h1>
        <CircleTree data={treeData} />
      </div>
    </div>
  );
};

export default App;
