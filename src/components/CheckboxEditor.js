
import React from "react";

const CheckboxEditor = ({ element, updateElement }) => {


  const handleCheckedChange = (e) => {
    updateElement(element.id, { checked: e.target.checked });
  };

  return (
    <div>
      <label style={styles.checkboxLabel}>
        <input
          type="checkbox"
          checked={element.checked}
          onChange={handleCheckedChange}
        />
        {element.label}
      </label>
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
  checkboxLabel: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
};

export default CheckboxEditor;
