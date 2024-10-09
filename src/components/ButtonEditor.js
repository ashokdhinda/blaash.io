

import React from "react";

const ButtonEditor = ({ element, updateElement }) => {
  const handleTextChange = (e) => {
    updateElement(element.id, { text: e.target.value });
  };

  return (
    <div>
      <button style={styles.button}>{element.text}</button>
    </div>
  );
};

const styles = {
  
  button: {
    padding: "8px 16px",
    backgroundColor: "#1890ff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default ButtonEditor;
