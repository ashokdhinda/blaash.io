
import React from "react";

const LabelEditor = ({ element, updateElement }) => {
  const handleChange = (e) => {
    updateElement(element.id, { text: e.target.value });
  };

  return (
    <div>
      <label>Label Text:</label>
      <input
        type="text"
        value={element.text}
        onChange={handleChange}
        style={styles.input}
      />
      <p>{element.text}</p>
    </div>
  );
};

const styles = {
  input: {
    width: "100%",
    padding: "6px",
    marginTop: "4px",
    marginBottom: "8px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
};

export default LabelEditor;
