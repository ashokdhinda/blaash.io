
import React from "react";
import { useDraggable } from "@dnd-kit/core";

const DraggableItem = ({ id, label }) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id,
    data: { type: id }, 
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{
        padding: "8px",
        margin: "5px 0",
        backgroundColor: isDragging ? "#d3d3d3" : "#ffffff",
        border: "1px solid #ccc",
        borderRadius: "4px",
        cursor: "grab",
      }}
    >
      {label}
    </div>
  );
};

const Sidebar = () => {
  return (
    <div style={styles.sidebar}>
      <h3>Components</h3>
      <DraggableItem id="label" label="Label" />
      <DraggableItem id="input" label="Input" />
      <DraggableItem id="checkbox" label="Checkbox" />
      <DraggableItem id="button" label="Button" />
    </div>
  );
};

const styles = {
  sidebar: {
    width: "200px",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRight: "1px solid #ccc",
    height: "100%",
    boxSizing: "border-box",
  },
};

export default Sidebar;
