import React from "react";

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
import Alert from "../components/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import { TextField } from "@mui/material";

/* Icons */
import { WebOutlined } from "@mui/icons-material";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";

/* Utils */

export default function Admissions({ branches, auth }) {
 let getBranch = window.localStorage.getItem("admin.mumodel.info-branch");

 const [admissionForms, setAdmissionForms] = React.useState(false);
 const [admissionFormsLimit, setAdmissionFormsLimit] = React.useState(8);
 const [branch, setBranch] = React.useState(getBranch || "");
 const [myAccess, setMyAccess] = React.useState(false);
 const [admissionFormsInfo, setAdmissionFormsInfo] = React.useState({
  classes: [],
  divisions: [],
  status: [],
  dateFrom: "",
  dateTo: "",
 });
 const [selectInfo, setSelectInfo] = React.useState({
  class: "",
  division: "",
 });

 const [errorAlert, setErrorAlert] = React.useState("");
 const [openAlert, setOpenAlert] = React.useState(false);
 const [snackbarAlert, setSnackbarAlert] = React.useState(false);
 const [openSnackbar, setOpenSnackbar] = React.useState(false);
 const [refresh, setRefresh] = React.useState({
  admissions: 0,
 });

 const [loadingAfterBranch, setLoadingAfterBranch] = React.useState(true);

 React.useEffect(() => {
  if (admissionForms) {
   setLoadingAfterBranch(false);
  } else {
   setLoadingAfterBranch(true);
  }
 }, [branch, admissionForms]);

 return (
  <>
   <Navbar auth={auth}>
    <Modal
     title="Admissions"
     body={errorAlert}
     isOpen={openAlert}
     onCancel={() => {
      setOpenAlert(false);
      setErrorAlert("");
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
    <div className="admissions">
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
        Admissions
        <Button
         sx={{ marginLeft: "auto" }}
         size="small"
         variant="outlined"
         onClick={() => {
          setRefresh((rf) => {
           return {
            admissions: rf.admissions + 1,
           };
          });
          setLoadingAfterBranch(true);
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
           setAdmissionForms(false);
           setBranch(e.target.value);
           setAdmissionFormsLimit(8);
           window.localStorage.setItem(
            "admin.mumodel.info-branch",
            e.target.value
           );
           setLoadingAfterBranch(true);
           setRefresh((rf) => {
            return {
             admissions: rf.admissions + 1,
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
       <a href="https://www.mumodel.info/" target="_blank">
        <Button
         variant="contained"
         style={{ marginTop: "1rem" }}
         startIcon={<WebOutlined />}
        >
         Visit Website to Apply
        </Button>
       </a>
      </Container>
     </Paper>
     <Container sx={{ marginTop: 4, marginBottom: 5 }}>
      <Grid container spacing={4}>
       <Grid item xs={12} md={6}>
        <Typography variant="h6" style={{ paddingBottom: "0.2rem" }}>
         Actions
        </Typography>
        <Typography
         variant="p"
         sx={{
          fontSize: "0.8rem",
          color: "gray",
          display: "block",
          marginBottom: "0",
          mt: 2,
          mb: 1,
         }}
        >
         Search
        </Typography>
        <form
         style={{ display: "flex", alignItems: "center" }}
         action="/admissions/application/"
        >
         <TextField
          variant="filled"
          label="Application Form"
          name="q"
          size="small"
          sx={{
           width: "100%",
           maxWidth: "300px",
          }}
          placeholder="Form ID"
         />
         <input type="hidden" name="b" value={branch} readOnly={true} />
         <Button
          variant="contained"
          sx={{ ml: 2, py: 1.4, px: 2, width: "100%", maxWidth: "100px" }}
          color="primary"
          type="submit"
         >
          Review
         </Button>
        </form>
        <Paper sx={{ mt: 2, p: 2, minHeight: "200px" }}>
         <Typography variant="p" sx={{ fontSize: "0.8rem" }}>
          Advanced Search
         </Typography>
         <div
          style={{
           display: "flex",
           gap: "1rem",
          }}
         >
          <div>
           <Typography
            variant="p"
            sx={{
             fontSize: "0.8rem",
             color: "gray",
             display: "block",
             mt: 2,
            }}
           >
            Class
           </Typography>
           <Select
            id="select-admissions"
            value={selectInfo.class || ""}
            label="Select"
            variant="standard"
            onChange={(e) => {
             setSelectInfo((i) => {
              return {
               ...i,
               class: e.target.value,
              };
             });
            }}
            sx={{ minWidth: "100px" }}
           >
            {admissionFormsInfo.classes.length !== 0 &&
             admissionFormsInfo.classes.map((c) => (
              <MenuItem value={c}>{c}</MenuItem>
             ))}
           </Select>
          </div>
          <div>
           <Typography
            variant="p"
            sx={{
             fontSize: "0.8rem",
             color: "gray",
             display: "block",
             mt: 2,
            }}
           >
            Division
           </Typography>
           <Select
            id="select-admissions"
            value={selectInfo.division || ""}
            label="Select"
            variant="standard"
            onChange={(e) => {
             setSelectInfo((i) => {
              return {
               ...i,
               division: e.target.value,
              };
             });
            }}
            sx={{ minWidth: "100px" }}
           >
            {admissionFormsInfo.divisions.length !== 0 &&
             admissionFormsInfo.divisions.map((c) => (
              <MenuItem value={c}>{c}</MenuItem>
             ))}
           </Select>
          </div>
          <div>
           <Typography
            variant="p"
            sx={{
             fontSize: "0.8rem",
             color: "gray",
             display: "block",
             mt: 2,
            }}
           >
            Status
           </Typography>
           <Select
            id="select-admissions"
            value={selectInfo.status || ""}
            label="Select"
            variant="standard"
            onChange={(e) => {
             setSelectInfo((i) => {
              return {
               ...i,
               status: e.target.value,
              };
             });
            }}
            sx={{ minWidth: "100px" }}
           >
            <MenuItem value="Accepted">Accepted</MenuItem>
            <MenuItem value="Declined">Declined</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
           </Select>
          </div>
         </div>
         <div>
          <Typography
           variant="p"
           sx={{
            fontSize: "0.8rem",
            color: "gray",
            display: "block",
            mt: 2,
           }}
          >
           Date
          </Typography>
          <div
           style={{
            display: "flex",
            gap: "1rem",
           }}
          >
           <TextField
            variant="standard"
            name="from"
            size="small"
            type="date"
            sx={{
             width: "100%",
             maxWidth: "300px",
            }}
            value={selectInfo.dateFrom || ""}
            onChange={(e) => {
             setSelectInfo((i) => {
              return {
               ...i,
               dateFrom: e.target.value,
              };
             });
            }}
           />
           to
           <TextField
            variant="standard"
            name="to"
            size="small"
            type="date"
            sx={{
             width: "100%",
             maxWidth: "300px",
            }}
            value={selectInfo.dateTo || ""}
            onChange={(e) => {
             setSelectInfo((i) => {
              return {
               ...i,
               dateTo: e.target.value,
              };
             });
            }}
           />
          </div>
         </div>
         <div
          style={{
           display: "flex",
           gap: "1rem",
          }}
         >
          <Button
           variant="contained"
           size="small"
           sx={{
            mt: 3,
            p: 1,
            px: 2,
           }}
           color="primary"
           onClick={() => {
            let q = "";
            if (selectInfo.class) {
             q += `&class=${selectInfo.class}`;
            }
            if (selectInfo.division) {
             q += `&division=${selectInfo.division}`;
            }
            if (selectInfo.status) {
             q += `&status=${selectInfo.status}`;
            }
            if (selectInfo.dateFrom) {
             q += `&from=${selectInfo.dateFrom}`;
            }
            if (selectInfo.dateTo) {
             q += `&to=${selectInfo.dateTo}`;
            }
            window.location.href = `/admissions/applications/search/?b=${branch}${q}`;
           }}
          >
           Search
          </Button>
          <Button
           variant="contained"
           size="small"
           sx={{
            mt: 3,
            p: 1,
            px: 2,
           }}
           color="error"
           onClick={() => {
            setSelectInfo({});
           }}
          >
           Reset
          </Button>
         </div>
        </Paper>
       </Grid>
       <Grid item xs={12} md={6}>
        <Typography variant="h6" style={{ paddingBottom: "0.2rem" }}>
         All Admissions
        </Typography>
        {!admissionForms ? (
         <div
          style={{
           display: loadingAfterBranch ? "block" : "none",
          }}
         >
          <CircularProgress
           size={30}
           sx={{
            mt: 2,
           }}
          />
         </div>
        ) : admissionForms.length === 0 ? (
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
           No application yet!
          </Typography>
         </p>
        ) : (
         admissionForms
          .sort(
           ([k, a], [p, b]) =>
            new Date(b.date).getTime() - new Date(a.date).getTime()
          )
          .map(([p, i]) => {
           return (
            i && (
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
                href={`/admissions/application/?b=${branch}&q=${p}`}
               >
                Review
               </Button>
              </div>
             </Card>
            )
           );
          })
        )}
        <div>
         {admissionForms && admissionForms.length > 0 && (
          <div
           style={{ marginTop: "1rem", display: "flex", alignItems: "center" }}
          >
           <Button
            variant="outlined"
            size="small"
            style={{ marginTop: "1rem" }}
            onClick={() => {
             setAdmissionFormsLimit((k) => k + 8);
            }}
           >
            Load More
           </Button>
           <Typography
            variant="p"
            sx={{ display: "inline", ml: "auto", mt: 1, color: "gray" }}
           >
            1 to {admissionFormsLimit} Results
           </Typography>
          </div>
         )}
        </div>
       </Grid>
      </Grid>
     </Container>
    </div>
   </Navbar>
  </>
 );
}
