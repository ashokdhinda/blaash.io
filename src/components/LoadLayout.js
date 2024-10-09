
import React, { useState } from "react";

const LoadLayout = ({ loadLayout }) => {
  const [loadedLayout, setLoadedLayout] = useState(null);

  const handleLoadLayout = () => {
  
    const layout = JSON.parse(localStorage.getItem("latestLayout"));
    console.log("Attempting to load layout from localStorage:", layout);

    if (layout) {
      loadLayout(layout);
      setLoadedLayout(layout);
      console.log("Successfully loaded layout:", layout);
    } else {
      alert("No layout found to load.");
      console.log("No layout found in localStorage.");
    }
  };

  // Styling for the table and its elements
  const tableStyle = {
    marginTop: "10px",
    borderCollapse: "collapse",
    width: "100%",
  };

  const thStyle = {
    backgroundColor: "#4CAF50", 
    color: "white",
    padding: "8px",
    textAlign: "left",
  };

  const tdStyle = {
    border: "1px solid #ddd", 
    padding: "8px",
  };

  const trStyle = {
    backgroundColor: "#f2f2f2", 
  };

  return (
    <div>
      <button onClick={handleLoadLayout} style={{ padding: "8px 16px" }}>
        Load Layout
      </button>
      {loadedLayout && (
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Type</th>
              <th style={thStyle}>ID</th>
              <th style={thStyle}>Details</th>
            </tr>
          </thead>
          <tbody>
            {loadedLayout.elements.map((element) => (
              <tr key={element.id} style={trStyle}>
                <td style={tdStyle}>{element.type}</td>
                <td style={tdStyle}>{element.id}</td>
                <td style={tdStyle}>
                  {element.type === "label" && (
                    <pre>{`{"text":"${element.text}"}`}</pre>
                  )}
                  {element.type === "input" && (
                    <pre>{`{"placeholder":"${element.placeholder}"}`}</pre>
                  )}
                  {element.type === "checkbox" && (
                    <pre>{`{"label":"${element.label}","checked":${element.checked}}`}</pre>
                  )}
                  {element.type === "button" && (
                    <pre>{`{"text":"${element.text}"}`}</pre>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default LoadLayout;
