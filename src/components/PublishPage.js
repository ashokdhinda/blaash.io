import React, { useState, useEffect } from "react";
import { db } from "../firebase"; 
import { ref, onValue } from "firebase/database";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PublishLayout = () => {
  const [layouts, setLayouts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredLayouts, setFilteredLayouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showSearchInput, setShowSearchInput] = useState(false); 

  useEffect(() => {
    const layoutsRef = ref(db, "layouts");
    const unsubscribe = onValue(
      layoutsRef,
      (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const layoutsArray = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));
          setLayouts(layoutsArray);
        } else {
          setLayouts([]);
        }
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching layouts:", error);
        setError("Failed to fetch layouts.");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  // Update filtered layouts based on the search term
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredLayouts([]); 
    } else {
      const filtered = layouts.filter((layout) =>
        layout.name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredLayouts(filtered);
    }
  }, [searchTerm, layouts]);

 
  if (loading) {
    return <p>Loading layouts...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  return (
    <>
      <button
        onClick={() => setShowSearchInput((prev) => !prev)}
        style={styles.publishButton}
      >
        Publish Layout
      </button>

      {showSearchInput && (
        <div style={styles.container}>
          <input
            type="text"
            placeholder="Search layouts by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={styles.searchInput}
          />

          {filteredLayouts.length > 0 && (
            <table style={styles.table}>
              <thead>
                <tr>
                  <th>Type</th>
               
              
                </tr>
              </thead>
              <tbody>
                {filteredLayouts.map((layout) => (
                  <tr key={layout.id}>
                    <td>{layout.id}</td>
                    <td>
                   
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {filteredLayouts.length === 0 && searchTerm && (
            <p>No layouts found matching your search.</p>
          )}

          <ToastContainer />
        </div>
      )}
    </>
  );
};

// Inline Styles for the Component
const styles = {
  container: {
    marginTop: "20px",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    maxWidth: "1000px",
    margin: "20px auto",
    backgroundColor: "#f9f9f9",
  },
  searchInput: {
    padding: "10px",
    width: "100%",
    marginBottom: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  publishButton: {
    padding: "10px 15px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginLeft: "10px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "10px",
  },
  tableHeader: {
    backgroundColor: "#f2f2f2",
  },
  tableCell: {
    border: "1px solid #ccc",
    padding: "8px",
  },
};

export default PublishLayout;
