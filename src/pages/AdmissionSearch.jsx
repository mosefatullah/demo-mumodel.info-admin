import React from "react";
import { Link } from "react-router-dom";
import "https://printjs-4de6.kxcdn.com/print.min.js";

/* Components */
import Navbar from "../components/Navbar";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "../components/Modal";
import Chip from "@mui/material/Chip";

/* Icons */
import { ArrowBack } from "@mui/icons-material";


export default function Admissions({ branches, auth }) {
 let formQuery = new URLSearchParams(window.location.search);
 let formBranch = new URLSearchParams(window.location.search).get("b");

 const FormErrorContainer = (
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
    The form you are looking for does not exist. Please double check the Form
    ID.
   </p>
  </div>
 );

 const [admissionForms, setAdmissionForms] = React.useState(false);
 const [show404, setShow404] = React.useState(false);
 const [errorAlert, setErrorAlert] = React.useState("");
 const [openAlert, setOpenAlert] = React.useState(false);
 const [refresh, setRefresh] = React.useState({
  admission: 0,
 });


 return (
  <>
   <Navbar auth={auth}>
    {formBranch && !show404 && (
     <>
      <Modal
       title="Admissions"
       body={errorAlert}
       isOpen={openAlert}
       onCancel={() => {
        setOpenAlert(false);
        setErrorAlert("");
       }}
      />
      <div className="admission">
       <Paper elevation={0} sx={{ padding: "2rem 1.5rem", marginBottom: 3, borderRadius:0, borderBottom: "1px solid rgba(0, 0, 0, 0.12)" }}>
        <Container
         sx={{
          padding: 0,
         }}
        >
         <h2
          style={{
           paddingBottom: "0.5rem",
           display: "flex",
           alignItems: "center",
          }}
         >
          Admission Form
          <Button
           sx={{ marginLeft: "auto" }}
           size="small"
           variant="outlined"
           onClick={() => {
            setRefresh((rf) => {
             return {
              admission: rf.admission + 1,
             };
            });
            setLoadingAfterBranch(true);
           }}
          >
           Refresh
          </Button>
         </h2>
         <br />
         <Link to="/admissions">
          <Button variant="contained" startIcon={<ArrowBack />}>
           Go Back
          </Button>
         </Link>
        </Container>
       </Paper>
       <Container sx={{ marginTop: 4, marginBottom: 5 }}>
        <Grid container spacing={4}>
         <Grid item xs={12} md={6}>
          {admissionForms ? (
           Object.entries(admissionForms).length > 0 &&
           Object.entries(admissionForms)
            .map(([p, i]) => {
             if (formQuery) {
              let a = formQuery.get("class"),
               b = formQuery.get("division"),
               c = formQuery.get("status"),
               d = formQuery.get("from"),
               e = formQuery.get("to");
              if (
               (a && i.class !== a) ||
               (b && i.division !== b) ||
               (c && i.status !== c) ||
               (d && new Date(i.date).getTime() < new Date(d).getTime()) ||
               (e && new Date(i.date).getTime() > new Date(e).getTime())
              ) {
               return [false, false];
              }
              return [p, i];
             }
            })
            .map(([p, i]) => {
             return p && i ? (
              <Card sx={{ marginTop: 2, padding: 2 }} elevation={1}>
               <h4>{p}</h4>
               <p style={{ color: "gray", fontSize: "0.93rem" }}>
                {i.apply_mobile}
                <br />
                Status:-{" "}
                <span
                 style={{
                  color:
                   i.status === "Accepted"
                    ? "green"
                    : i.status === "Declined"
                    ? "red"
                    : "orange",
                 }}
                >
                 {i.status || "Pending"}
                </span>
               </p>
               <br />
               <div
                style={{
                 display: "flex",
                 overflowX: "scroll",
                 alignItems: "center",
                }}
               >
                <p
                 style={{
                  fontSize: "0.8rem",
                  display: "flex",
                 }}
                >
                 <Chip
                  label={new Date(i.date).toDateString()}
                  size="small"
                  sx={{ marginRight: "0.3rem" }}
                 />
                 <Chip
                  label={i.class}
                  size="small"
                  sx={{
                   display: !i.class && "none",
                   marginRight: "0.3rem",
                  }}
                 />
                 <Chip
                  label={i.division}
                  size="small"
                  sx={{
                   display: !i.division && "none",
                  }}
                 />
                </p>
                <Button
                 variant="outlined"
                 size="small"
                 centerRipple={true}
                 style={{ marginLeft: "auto" }}
                 href={`/admissions/application/?b=${formBranch}&q=${p}`}
                >
                 Review
                </Button>
               </div>
              </Card>
             ) : (
              <>
               <h4 style={{ color: "gray", marginTop: "1rem" }}>
                No Results Found!
               </h4>
               <p style={{ color: "gray" }}>
                The form you are looking for does not exist. Please double check
                the Form ID.
               </p>
              </>
             );
            })
          ) : (
           <p style={{ color: "gray" }}>Loading...</p>
          )}
         </Grid>
        </Grid>
       </Container>
      </div>
     </>
    )}
    {(!formBranch || show404) && FormErrorContainer}
   </Navbar>
  </>
 );
}
