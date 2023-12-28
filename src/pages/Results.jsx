import React from "react";

/* Components */
import Navbar from "../components/Navbar";

/* Utils */

function Results({ branches, auth }) {
 return (
  <>
   <Navbar auth={auth}></Navbar>
  </>
 );
}

export default Results;
