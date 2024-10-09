// // src/utils/saveLayout.js

// import { db, ref, set } from "../firebase"; // Adjust the import based on your file structure

// export const saveLayoutToFirebase = async (layout) => {
//   try {
//     const layoutRef = ref(db, "layouts/" + layout.name); // Save layout under the 'layouts' path using the layout name as the key
//     await set(layoutRef, layout); // Set the layout data
//     console.log("Layout saved to Firebase:", layout);
//   } catch (error) {
//     console.error("Error saving layout to Firebase:", error);
//   }
// };
