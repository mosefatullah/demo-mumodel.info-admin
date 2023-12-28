import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Guest from "./components/Guest";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

import Home from "./pages/Home";
import Admissions from "./pages/Admissions";
import AdmissionForm from "./pages/AdmissionForm";
import AdmissionSearch from "./pages/AdmissionSearch";
import Notices from "./pages/Notices";
import Posts from "./pages/Posts";
import Academics from "./pages/Academics";
import Results from "./pages/Results";
import Error from "./pages/Error";

/* Utils */
import { Theme } from "./utils/theme";

function App() {
 const [branches] = React.useState({
  branches: {
   mumm: {
    address:
     "Molla Tower, 42, Baniarbag, Matuail South para, Jatrabari, Dhaka-1362",
    banner: "https://www.mumodel.info/madrasah/assets/images/detailed-logo.png",
    email: "info.mumm2017@gmail.com",
    name: "Misbahul Ummah Model Madrasah",
    phone: ["01787070380", "01864116188"],
   },
   mums: {
    address: "554, Donia, Goalbarimor, Kadomtoli, Dhaka-1236",
    banner: "https://www.mumodel.info/school/assets/images/detailed-logo.png",
    email: "mumodelschool2021@gmail.com",
    name: "Misbahul Ummah Model School",
    phone: ["01708420067", "01608883176"],
   },
  },
  myAccess: "full",
 });
 const [auth, setAuth] = React.useState(false);
 React.useEffect(() => {
  setTimeout(() => {
   setAuth(null);
   setTimeout(() => {
    setAuth(true);
   }, 1000);
  }, 1000);
 }, []);

 return (
  <>
   {auth && (
    <div className="Admin">
     <BrowserRouter basename="/">
      <Routes>
       <Route
        path="/"
        element={<Home branches={branches} auth={auth} />}
       ></Route>
       <Route
        path="/admissions"
        element={<Admissions branches={branches} auth={auth} />}
       ></Route>
       <Route
        path="/admissions/application"
        element={<AdmissionForm branches={branches} auth={auth} />}
       ></Route>
       <Route
        path="/admissions/applications/search"
        element={<AdmissionSearch branches={branches} auth={auth} />}
       ></Route>
       <Route
        path="/notices"
        element={<Notices branches={branches} auth={auth} />}
       ></Route>
       <Route
        path="/posts"
        element={<Posts branches={branches} auth={auth} />}
       ></Route>
       <Route
        path="/academics"
        element={<Academics branches={branches} auth={auth} />}
       ></Route>
       <Route
        path="/results"
        element={<Results branches={branches} auth={auth} />}
       ></Route>
       <Route path="*" element={<Error auth={auth} />}></Route>
      </Routes>
     </BrowserRouter>
    </div>
   )}
   {auth == false && <Guest authTop={auth} />}
   {auth == null && (
    <Box
     sx={{
      display: "flex",
      width: "100%",
      minHeight: "100vh",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor:
       Theme.palette.mode === "dark" ? "#000000cc" : "#ffffffcc",
     }}
    >
     <CircularProgress />
    </Box>
   )}
  </>
 );
}

export default App;
