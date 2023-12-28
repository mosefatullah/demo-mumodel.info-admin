import React from "react";
import Edit from "../components/Edit";
import Alert from "../components/Alert";

/* Components */
import Navbar from "../components/Navbar";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Modal from "../components/Modal";
import CircularProgress from "@mui/material/CircularProgress";
import profileDemoImg from "../assets/profile.webp";

/* Icons */
import { Pending, PostAddOutlined } from "@mui/icons-material";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";

/* Utils */
import { Theme } from "../utils/theme";
import { Divider } from "@mui/material";

export default function Academics({ branches, auth }) {
 let getBranch = window.localStorage.getItem("admin.mumodel.info-branch");

 const [academics, setAcademics] = React.useState({
  information: false,
  faculty: [],
 });
 const [branch, setBranch] = React.useState(getBranch || "");
 const [myAccess, setMyAccess] = React.useState("full");
 const [owners, setOwners] = React.useState(false);

 const [errorAlert, setErrorAlert] = React.useState("");
 const [openAlert, setOpenAlert] = React.useState(false);
 const [refresh, setRefresh] = React.useState({
  academics: 0,
 });
 const [openEdit, setOpenEdit] = React.useState([false, null, null]);
 const [openSnackbar, setOpenSnackbar] = React.useState(false);
 const [snackbarAlert, setSnackbarAlert] = React.useState("");
 const [openDelete, setOpenDelete] = React.useState({
  flag: false,
  faculty: null,
 });

 const [loadingAfterBranch, setLoadingAfterBranch] = React.useState(true);

 React.useEffect(() => {
  if (academics) {
   setLoadingAfterBranch(false);
  }
 }, [branch, academics]);

 return (
  <>
   <Navbar auth={auth}>
    <div
     style={{
      width: "100%",
      height: "100%",
      position: "fixed",
      top: 0,
      left: 0,
      zIndex: 200,
      backgroundColor:
       Theme.palette.mode === "dark" ? "#000000cc" : "#ffffffcc",
      display: loadingAfterBranch ? "block" : "none",
     }}
    >
     <CircularProgress
      sx={{
       position: "absolute",
       top: "calc(50% - 30px)",
       left: "calc(50% - 30px)",
      }}
      size={60}
     />
    </div>
    <Modal
     title="Academics"
     body={errorAlert}
     isOpen={openAlert}
     onCancel={() => {
      setOpenAlert(false);
      setErrorAlert("");
     }}
    />
    <Modal
     title="Delete"
     body="Are you sure you want to delete this faculty person?"
     submitButton="Delete"
     isOpen={openDelete.flag}
     onCancel={() => {
      setOpenDelete({ flag: false, faculty: null });
     }}
    />
    <Edit
     isOpen={openEdit[0]}
     type={openEdit[2] ? openEdit[2] : "post"}
     post={openEdit[1]}
     onCancel={() => {
      setOpenEdit(false, null);
     }}
     onEdited={() => {
      setOpenSnackbar(true);
      setSnackbarAlert("Successfully edited.");
      setRefresh((rf) => {
       return {
        academics: rf.academics + 1,
       };
      });
     }}
    />
    <Alert
     color={
      (snackbarAlert &&
      snackbarAlert
       .toLowerCase()
       .match(
        /(error|sorry|unsuccessful|failed|wrong|invalid|not found|deleted)/g
       )
       ? "error"
       : false) || false
     }
     body={snackbarAlert}
     isOpen={openSnackbar}
     onCancel={() => {
      setOpenSnackbar(false);
      setSnackbarAlert("");
     }}
    />
    <div className="Academics">
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
        Academics
        <Button
         sx={{ marginLeft: "auto" }}
         size="small"
         variant="outlined"
         onClick={() => {
          setRefresh((rf) => {
           return {
            academics: rf.academics + 1,
           };
          });
         }}
        >
         Refresh
        </Button>
       </h2>
       <FormControl>
        <Typography
         variant="p"
         style={{ paddingBottom: "0.2rem" }}
         color={"text.secondary"}
         sx={{
          fontSize: "0.8rem",
         }}
        >
         Select Branch
        </Typography>
        <Select
         id="branch-select"
         value={branch}
         label="Branch"
         variant="standard"
         onChange={(e) => {
          function a() {
           setAcademics(false);
           setBranch(e.target.value);
           window.localStorage.setItem(
            "admin.mumodel.info-branch",
            e.target.value
           );
           setLoadingAfterBranch(true);
           setRefresh((rf) => {
            return {
             academics: rf.academics + 1,
            };
           });
          }
          if (myAccess && Array.isArray(myAccess)) {
           if (myAccess.includes(e.target.value)) {
            a();
           } else {
            setErrorAlert(
             "You don't have access to this branch: " + e.target.value
            );
            setOpenAlert(true);
           }
          } else if (!myAccess || myAccess == "full") {
           a();
          }
         }}
        >
         {branches.branches.length !== 0 ? (
          Object.entries(branches.branches).map(([b, i]) => (
           <MenuItem value={b}>{i.name}</MenuItem>
          ))
         ) : (
          <MenuItem>Loading ...</MenuItem>
         )}
        </Select>
       </FormControl>
       <br />
       <Button
        variant="contained"
        style={{ marginTop: "1rem" }}
        startIcon={<PostAddOutlined />}
       >
        Add New Person to Faculty
       </Button>
      </Container>
     </Paper>
     <Container sx={{ marginTop: 4, marginBottom: 5 }}>
      <Grid container spacing={5}>
       <Grid item xs={12} lg={8} xl={7}>
        <Typography variant="h6" style={{ paddingBottom: "1.3rem" }}>
         Faculty
        </Typography>
        <Grid container spacing={2}>
         {!academics.faculty ? (
          <p
           style={{
            padding: "1rem",
            color: "#666",
            fontSize: "0.9rem",
            display: "flex",
            alignItems: "center",
           }}
          >
           <Pending color="disabled" />
           <Typography
            variant="p"
            sx={{
             ml: 1,
            }}
           >
            Loading ...
           </Typography>
          </p>
         ) : academics.faculty.length === 0 ? (
          <p
           style={{
            padding: "1rem",
            color: "#666",
            fontSize: "0.9rem",
            display: "flex",
            alignItems: "center",
           }}
          >
           <ReportProblemIcon color="disabled" />
           <Typography
            variant="p"
            sx={{
             ml: 1,
            }}
           >
            No faculty list yet!
           </Typography>
          </p>
         ) : (
          academics.faculty.map((f) => {
           return (
            <Grid item xs={12} md={6}>
             <Card sx={{ padding: 2 }} elevation={1}>
              <div
               style={{
                display: "flex",
                gap: "1rem",
               }}
              >
               <div
                style={{
                 display: "flex",
                 flexDirection: "column",
                 justifyContent: "center",
                 width: "50%",
                }}
               >
                <h4
                 style={{
                  marginBottom: "0.5rem",
                  fontWeight: "normal",
                 }}
                >
                 {f.name || "Faculty Person"}
                </h4>
                <p
                 style={{
                  display: "flex",
                 }}
                >
                 <Chip
                  label={f.designation || "Unknown Designation"}
                  size="small"
                  sx={{
                   fontSize: "0.75rem",
                  }}
                 />
                </p>
                <Divider sx={{ marginTop: "1rem" }} />
                <div style={{ display: "flex", gap: "0.5rem" }}>
                 <Button
                  size="small"
                  onClick={() => {
                   setOpenEdit([true, f, "faculty"]);
                  }}
                 >
                  Edit
                 </Button>
                 <Button
                  size="small"
                  color="error"
                  onClick={() => {
                   setOpenDelete({ flag: true, faculty: f });
                  }}
                 >
                  Delete
                 </Button>
                </div>
               </div>
               <img
                src={f.image || profileDemoImg}
                style={{
                 height: "100px",
                 width: "100px",
                 objectFit: "cover",
                 marginLeft: "auto",
                 backgroundColor: "#eee",
                 borderRadius: "0.2rem",
                }}
               />
              </div>
             </Card>
            </Grid>
           );
          })
         )}
        </Grid>
       </Grid>
       <Grid item xs={12} lg={4} xl={5}>
        <Typography variant="h6" style={{ paddingBottom: "0.2rem" }}>
         Information
        </Typography>
        {!academics.information ? (
         <p
          style={{
           paddingTop: "1rem",
           color: "#666",
           fontSize: "0.9rem",
           display: "flex",
           alignItems: "center",
          }}
         >
          <Pending color="disabled" />
          <Typography
           variant="p"
           sx={{
            ml: 1,
           }}
          >
           Loading ...
          </Typography>
         </p>
        ) : Object.entries(academics.information).length === 0 ? (
         <p
          style={{
           paddingTop: "1rem",
           color: "#666",
           fontSize: "0.9rem",
           display: "flex",
           alignItems: "center",
          }}
         >
          <ReportProblemIcon color="disabled" />
          <Typography
           variant="p"
           sx={{
            ml: 1,
           }}
          >
           No academic information yet!
          </Typography>
         </p>
        ) : (
         <Card sx={{ marginTop: 2, padding: 2 }} elevation={1}>
          <h4>{academics.information.title}</h4>
          <p
           style={{
            color: "gray",
            fontSize: "0.93rem",
            padding: "0.66rem 0",
           }}
          >
           {academics.information.body &&
            academics.information.body.substring(0, 200).replaceAll("\\n", " ")}
          </p>
         </Card>
        )}
       </Grid>
      </Grid>
     </Container>
    </div>
   </Navbar>
  </>
 );
}
