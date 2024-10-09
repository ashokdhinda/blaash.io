// src/components/PageBuilder.js

import React, { useState, useEffect } from "react";
import { DndContext } from "@dnd-kit/core";
import { v4 as uuidv4 } from "uuid";
import Sidebar from "./Sidebar";
import Droppable from "./Droppable";
import LabelEditor from "./LabelEditor";
import InputEditor from "./InputEditor";
import CheckboxEditor from "./CheckboxEditor";
import ButtonEditor from "./ButtonEditor";
import LoadLayout from "./LoadLayout";
import PublishLayout from "./PublishPage";
import SaveLayout from "./SaveLayout"; 
import { db } from "../firebase";
import { ref, set, get, child } from "firebase/database";

const PageBuilder = () => {
  const [droppedElements, setDroppedElements] = useState([]);

  // Debugging: Log droppedElements whenever it updates
  useEffect(() => {
    console.log("droppedElements updated:", droppedElements);
  }, [droppedElements]);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active && over && over.id === "droppable-area") {
      const { type } = active.data.current;

      let newElement = { id: uuidv4(), type };

      // Initialize properties based on component type
      switch (type) {
        case "label":
          newElement = { ...newElement, text: "Enter label text" };
          break;
        case "input":
          newElement = { ...newElement, placeholder: "Enter input" };
          break;
        case "checkbox":
          newElement = {
            ...newElement,
            label: "Checkbox label",
            checked: false,
          };
          break;
        case "button":
          newElement = { ...newElement, text: "Button" };
          break;
        default:
          break;
      }

      setDroppedElements((prev) => [...prev, newElement]);
      console.log("Added new element:", newElement);
    }
  };

  const updateElement = (id, updatedProperties) => {
    if (updatedProperties === null) {
      setDroppedElements((prev) => prev.filter((el) => el.id !== id));
      console.log(`Deleted element with id: ${id}`);
    } else {
      setDroppedElements((prev) =>
        prev.map((el) => (el.id === id ? { ...el, ...updatedProperties } : el))
      );
      console.log(`Updated element with id: ${id}`, updatedProperties);
    }
  };

  const loadLayout = (layout) => {
    console.log("loadLayout called with:", layout);
    setDroppedElements(layout.elements);
    console.log("Dropped elements updated to:", layout.elements);
  };

  const saveLayoutToFirebase = async (layout) => {
    try {
      const layoutRef = ref(db, "layouts/" + layout.name);
      console.log("Writing to Firebase at:", "layouts/" + layout.name);
      await set(layoutRef, layout);
      console.log("Layout saved to Firebase:", layout);

      // Optionally, verify the save
      const snapshot = await get(child(ref(db), `layouts/${layout.name}`));
      if (snapshot.exists()) {
        console.log("Saved Layout Data:", snapshot.val());
      } else {
        console.log("No data available after saving.");
      }
    } catch (error) {
      console.error("Error saving layout to Firebase:", error);
      throw error; 
    }
  };

  const saveLayout = async (layoutToSave) => {
    console.log("saveLayout called with:", layoutToSave);

    try {
      // Save layout to Firebase (already handled in SaveLayout.js)
      await saveLayoutToFirebase(layoutToSave);
      console.log("saveLayoutToFirebase completed successfully.");
    } catch (error) {
      console.error("Failed to save layout:", error);
      
    }
  };

  const publishLayout = () => {

    console.log("Publish functionality not implemented yet.");
  };

  const addComponent = (type) => {
    let newElement = { id: uuidv4(), type };

    switch (type) {
      case "label":
        newElement = { ...newElement, text: "Enter label text" };
        break;
      case "input":
        newElement = { ...newElement, placeholder: "Enter input" };
        break;
      case "checkbox":
        newElement = {
          ...newElement,
          label: "Checkbox label",
          checked: false,
        };
        break;
      case "button":
        newElement = { ...newElement, text: "Button" };
        break;
      default:
        break;
    }

    setDroppedElements((prev) => [...prev, newElement]);
    console.log("Added component via addComponent:", newElement);
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div style={styles.container}>
        <Sidebar />
        <div style={styles.mainArea}>
          <Droppable
            id="droppable-area"
            elements={droppedElements}
            updateElement={updateElement}
          >
            <h2>Dropped Components</h2>
            {droppedElements.map((element) => (
              <div key={element.id} style={styles.element}>
                {element.type === "label" && (
                  <LabelEditor
                    element={element}
                    updateElement={updateElement}
                  />
                )}
                {element.type === "input" && (
                  <InputEditor
                    element={element}
                    updateElement={updateElement}
                  />
                )}
                {element.type === "checkbox" && (
                  <CheckboxEditor
                    element={element}
                    updateElement={updateElement}
                  />
                )}
                {element.type === "button" && (
                  <ButtonEditor
                    element={element}
                    updateElement={updateElement}
                  />
                )}
              </div>
            ))}
          </Droppable>
          <div  style={styles.buttonGroup}>
            <SaveLayout layoutData={droppedElements} onSave={saveLayout} />
            <LoadLayout loadLayout={loadLayout} />
            <PublishLayout onPublish={publishLayout} />
          </div>
        </div>
      </div>
    </DndContext>
  );
};

// Styles for the component
const styles = {
  container: {
    display: "flex",
    height: "100vh",
  },
  mainArea: {
    flex: 1,
    padding: "20px",
    border: "1px solid #ccc",
  },
  buttonGroup: {
    marginTop: "20px",
    display: "flex"
    
  },
  element: {
    margin: "10px 0",
  },
};

export default PageBuilder;
