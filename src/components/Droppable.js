
import React from "react";
import { useDroppable } from "@dnd-kit/core";
import LabelEditor from "./LabelEditor";
import InputEditor from "./InputEditor";
import CheckboxEditor from "./CheckboxEditor";
import ButtonEditor from "./ButtonEditor";

const Droppable = ({ id, elements, updateElement }) => {
  const { isOver, setNodeRef } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      style={{
        flex: 1,
        margin: "10px",
        padding: "20px",
        backgroundColor: isOver ? "#e0f7fa" : "#ffffff",
        border: "2px dashed #ccc",
        borderRadius: "4px",
        minHeight: "300px",
        boxSizing: "border-box",
        overflowY: "auto",
      }}
    >
      {elements.length === 0 && <p>Drag components here</p>}
      {elements.map((element) => (
        <div key={element.id} style={{ marginBottom: "10px" }}>
          {element.type === "label" && (
            <LabelEditor element={element} updateElement={updateElement} />
          )}
          {element.type === "input" && (
            <InputEditor element={element} updateElement={updateElement} />
          )}
          {element.type === "checkbox" && (
            <CheckboxEditor element={element} updateElement={updateElement} />
          )}
          {element.type === "button" && (
            <ButtonEditor element={element} updateElement={updateElement} />
          )}
        </div>
      ))}
    </div>
  );
};

export default Droppable;
