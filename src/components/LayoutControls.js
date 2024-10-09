const LayoutControls = ({ onSave, onLoad, onPublish, onAddComponent }) => {
  return (
    <div>
      <button onClick={onSave}>Save Layout</button>
      <button onClick={onLoad}>Load Layout</button>
      <button onClick={onPublish}>Publish</button>
      <button onClick={() => onAddComponent("button")}>Add Button</button>
      <button onClick={() => onAddComponent("checkbox")}>Add Checkbox</button>
      <button onClick={() => onAddComponent("input")}>Add Input</button>
    </div>
  );
};

export default LayoutControls;
