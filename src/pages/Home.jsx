import React from "react";
import Navbar from "../components/Navbar";
import Dashboard from "../components/Dashboard";

function Home({ branches, auth }) {
 return (
  <>
   <Navbar auth={auth}>
    <Dashboard branches={branches} />
   </Navbar>
  </>
 );
}

export default Home;
