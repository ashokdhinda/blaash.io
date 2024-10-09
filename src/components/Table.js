
import React from "react";

const Table = ({ data }) => {
  if (!Array.isArray(data)) {
    console.error("Table component received invalid data:", data);
    return <p>No data available.</p>;
  }

  return (
    <table style={styles.table}>
      <thead>
        <tr>
          <th style={styles.th}>Layout ID</th>
          <th style={styles.th}>Name</th>
          <th style={styles.th}>Elements</th>
          <th style={styles.th}>Timestamp</th>
        </tr>
      </thead>
      <tbody>
        {data.map((layout) => (
          <tr key={layout.id}>
            <td style={styles.td}>{layout.id}</td>
            <td style={styles.td}>{layout.name}</td>
            <td style={styles.td}>
              {Array.isArray(layout.elements) && layout.elements.length > 0
                ? layout.elements
                    .map(
                      (el) => el.text || el.label || el.placeholder || el.type
                    )
                    .join(", ")
                : "N/A"}
            </td>
            <td style={styles.td}>
              {new Date(layout.timestamp).toLocaleString()}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const styles = {
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
  },
  th: {
    border: "1px solid #ddd",
    padding: "12px",
    backgroundColor: "#f2f2f2",
    textAlign: "left",
  },
  td: {
    border: "1px solid #ddd",
    padding: "12px",
    verticalAlign: "top",
  },
};

export default Table;
