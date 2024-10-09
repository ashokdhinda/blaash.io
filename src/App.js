
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PageBuilder from "./components/PageBuilde";
import PublishLayout from "./components/PublishPage";


const App = () => {
  return (
    <Router>
      <div className="app-container">
        <h1>Dynamic Page Builder</h1>
        <Routes>
          <Route path="/" element={<PageBuilder />} />
         
          <Route path="/publish" element={<PublishLayout />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
