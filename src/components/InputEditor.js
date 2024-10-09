
import React from "react";

const InputEditor = ({ element, updateElement }) => {
  const handlePlaceholderChange = (e) => {
    updateElement(element.id, { placeholder: e.target.value });
  };

  return (
    <div>
      <label>Placeholder (Name):</label>
      <input
        type="text"
        value={element.placeholder}
        onChange={handlePlaceholderChange}
        style={styles.input}
      />
      <input
        type="text"
        placeholder={element.placeholder}
        disabled
        style={styles.preview}
      />
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
  preview: {
    width: "100%",
    padding: "6px",
    marginTop: "4px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    backgroundColor: "#e9ecef",
  },
};

export default InputEditor;
