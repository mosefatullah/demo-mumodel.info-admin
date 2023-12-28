import React from "react";

/* Components */
import Navbar from "../components/Navbar";

export default function Admissions({ auth }) {
 return (
  <>
   <Navbar auth={auth} />
   <div
    style={{
     display: "flex",
     flexDirection: "column",
     justifyContent: "center",
     alignItems: "center",
     minHeight: "90vh",
     padding: "0 1rem",
    }}
   >
    <h2
     style={{
      color: "#333",
      fontSize: "2rem",
      marginBottom: "0.5rem",
     }}
    >
     404 Not Found!
    </h2>
    <p style={{ color: "gray" }}>
     The page you are looking for does not exist. Please check the URL or go
     back.
    </p>
    <button
     style={{
      padding: "0.5rem 1rem",
      backgroundColor: "#333",
      color: "#fff",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      marginTop: "1rem",
     }}
     onClick={() => {
      window.history.back();
     }}
    >
     Go Back
    </button>
   </div>
  </>
 );
}
