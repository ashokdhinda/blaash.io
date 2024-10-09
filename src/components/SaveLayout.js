

import React, { useState } from "react";
import { db, ref, set } from "../firebase"; 

const SaveLayout = ({ layoutData }) => {
  const [layoutName, setLayoutName] = useState(""); 
  const [message, setMessage] = useState(""); 

   const saveLayoutToFirebase = async (layout) => {
    try {
      const layoutRef = ref(db, "layouts/" + layout.name); 
      await set(layoutRef, layout);
      console.log("Layout saved to Firebase:", layout);
    } catch (error) {
      console.error("Error saving layout to Firebase:", error);
      throw error; 
    }
  };

  const handleSaveLayout = async () => {
    if (!layoutName.trim()) {
      alert("Please enter a layout name."); 
      return;
    }

    // Create a layout object that includes the name
    const layoutToSave = {
      name: layoutName.trim(), 
      elements: layoutData, 
    };

    try {
  
      localStorage.setItem("latestLayout", JSON.stringify(layoutToSave));

      await saveLayoutToFirebase(layoutToSave); 
      setMessage("Layout saved successfully!");
      setLayoutName("");
    } catch (error) {
      console.error("Failed to save layout:", error);
      setMessage("Failed to save layout. Please try again.");
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter your layout name"
        value={layoutName}
        onChange={(e) => setLayoutName(e.target.value)} 
        style={{ marginBottom: "10px", padding: "8px", width: "200px" }} 
      />
      <button onClick={handleSaveLayout} style={{ padding: "8px 16px" }}>
        Save Layout
      </button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default SaveLayout;
