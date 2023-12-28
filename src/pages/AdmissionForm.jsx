import React from "react";
import { Link } from "react-router-dom";
import "https://printjs-4de6.kxcdn.com/print.min.js";
import passportSizePhoto from "../assets/passport-size-photo.png";

/* Components */
import Navbar from "../components/Navbar";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "../components/Modal";
import TextField from "@mui/material/TextField";

/* Icons */
import { ArrowBack } from "@mui/icons-material";

/* Utils */

export default function Admissions({ branches, auth }) {
 let formQuery = new URLSearchParams(window.location.search).get("q");
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

 const [admissionForm, setAdmissionForm] = React.useState(false);
 const [show404, setShow404] = React.useState(false);
 const [errorAlert, setErrorAlert] = React.useState("");
 const [openAlert, setOpenAlert] = React.useState(false);
 const [refresh, setRefresh] = React.useState({
  admission: 0,
 });


 return (
  <>
   <Navbar auth={auth}>
    {formQuery && !show404 && (
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
          <div style={{ display: "flex", alignItems: "center" }}>
           <TextField
            variant="filled"
            label="Application Form"
            size="small"
            disabled
            value={formQuery}
            sx={{
             width: "100%",
             maxWidth: "300px",
            }}
            placeholder="Form ID"
           />
           <Button
            variant="contained"
            sx={{ ml: 2, py: "0.73rem" }}
            color="primary"
            disabled
           >
            Search
           </Button>
          </div>
         </Grid>
         <Grid item xs={12} md={6}>
          <Typography variant="h6" style={{ paddingBottom: "0.2rem" }}>
           Searched Form
          </Typography>
          {admissionForm ? (
           Object.keys(admissionForm).length >= 0 && (
            <Card sx={{ marginTop: 2, padding: 2 }} elevation={1}>
             <h4>{admissionForm.id}</h4>
             <p style={{ color: "gray", fontSize: "0.93rem" }}>
              {admissionForm.apply_mobile}
              <br />
              Status:-{" "}
              <span
               style={{
                color:
                 admissionForm.status === "Accepted"
                  ? "green"
                  : admissionForm.status === "Declined"
                  ? "red"
                  : "orange",
               }}
              >
               {admissionForm.status || "Pending"}
              </span>
             </p>
             <br />
             <div style={{ display: "flex", overflowX: "scroll" }}>
              <p
               style={{
                fontSize: "0.8rem",
                display: "flex",
               }}
              >
               <Chip
                label={new Date(admissionForm.date).toDateString()}
                size="small"
                sx={{ marginRight: "0.3rem" }}
               />
               <Chip
                label={admissionForm.class}
                size="small"
                sx={{
                 display: !admissionForm.class && "none",
                 marginRight: "0.3rem",
                }}
               />
               <Chip
                label={admissionForm.division}
                size="small"
                sx={{
                 display: !admissionForm.division && "none",
                }}
               />
              </p>
             </div>
            </Card>
           )
          ) : (
           <p style={{ color: "gray" }}>Loading...</p>
          )}
         </Grid>
        </Grid>
        {admissionForm && Object.keys(admissionForm).length >= 0 && (
         <>
          <Paper
           sx={{
            marginTop: 3,
            padding: 2,
            display: "flex",
           }}
          >
           <div>
            <Button
             variant="contained"
             color="primary"
             onClick={() => {
              if (
               !document.getElementById("date").value ||
               !document.getElementById("birthDate").value
              ) {
               document.getElementById("date").type = "text";
               document.getElementById("birthDate").type = "text";
              }
              document.getElementById("admissionClassSelect").style.display =
               "none";
              document.getElementById("admissionClass").style.display = "block";
              document.getElementById("admissionClass").value =
               document.getElementById("admissionClassSelect").value;
              printJS({
               printable: "admissionForm",
               type: "html",
               ignoreElements: ["admissionPhotoUpload", "printButton"],
               onPrintDialogClose: function () {
                document.getElementById("date").type = "date";
                document.getElementById("birthDate").type = "date";
                document.getElementById("admissionClassSelect").style.display =
                 "block";
                document.getElementById("admissionClass").style.display =
                 "none";
               },
               css: [
                "https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css",
                "https://fonts.googleapis.com/css2?family=Noto+Serif+Bengali:wght@400;700&display=swap",
               ],
              });
             }}
            >
             Print
            </Button>
           </div>
           <div
            style={{
                display: "flex",
             marginLeft: "auto",
            }}
           >
            <Button
             variant="outlined"
             color="primary"
             sx={{
              marginLeft: 2,
              display: admissionForm.status === "Accepted" ? "none" : "block",
             }}
             onClick={() => {
             }}
            >
             Accept
            </Button>
            <Button
             variant="outlined"
             color="error"
             sx={{
              marginLeft: 2,
              display: admissionForm.status === "Declined" ? "none" : "block",
             }}
             onClick={() => {
             }}
            >
             Decline
            </Button>
           </div>
          </Paper>
          <Paper
           sx={{
            padding: "2rem 1.5rem",
            marginTop: 2,
            overflowX: "scroll",
            backgroundColor: "#ffffff",
            color: "#333",
           }}
          >
           <div
            id="admissionForm"
            style={{
             minWidth: "700px",
            }}
           >
            <style>
             {`@import url("https://fonts.googleapis.com/css2?family=Noto+Serif+Bengali:wght@400;700&display=swap");
    
    #admissionForm *,
    #admissionForm *::before,
    #admissionForm *::after {
     font-family: "Noto Serif Bengali", sans-serif !important;
    }
    
    #admissionForm table {
     width: 100%;
     border-collapse: collapse;
    }
    
    #admissionForm td:not(.np) {
     padding: 0 0.5rem;
     border: 1px solid #333;
     text-align: center;
    }
    
    #admissionForm td.np {
     background: #f5f5f5;
    }
    
    #admissionForm td > input,
    #admissionForm td > select {
     width: 100%;
     min-width: 70px;
     border: none;
     outline: none;
     text-align: center;
     background-color: transparent;
    }
    
    #admissionForm .form input,
    #admissionForm p,
    #admissionForm ol {
     font-size: 0.85rem;
    }
    
    #admissionForm .form input {
     max-width: 250px;
     padding: 0.25rem 0.5rem;
     margin-left: 0.3rem;
     margin-right: 0.75rem;
    }
    
    #admissionForm label {
     font-size: 0.75rem;
    }
    
    #admissionForm .form > div {
     padding: 0rem;
     display: flex;
     align-items: center;
     gap: 0.5rem;
    }
    
    #admissionForm .form > div > div {
     flex: 1;
     display: flex;
    }
    
    #admissionForm .form > div > div:first-child span {
     margin-left: 0.35rem;
    }
    
    #admissionForm ::placeholder {
     font-family: "Open Sans", sans-serif !important;
    }
    
    .row {
        display: flex;
        flex-wrap: wrap;
    }
    
    .row-gap-2 > * {
        margin-top: 0.3rem;
        margin-bottom: 0.3rem;
    }
    
    .col-6 {
        flex: 0 0 50%;
        max-width: 50%;
    }
    
    
    @media print {
     #admissionForm .form {
      row-gap: 0 !important;
      line-height: 1.2rem !important;
     }
    
     #admissionForm .form span[style] {
      display: none;
     }
    
     #admissionForm .form input,
     #admissionForm label {
      font-size: 0.7rem;
     }
    
     #admissionForm .form > div {
      margin: 0;
      padding-right: 0.8rem !important;
     }
    
     #admissionForm .form input {
      padding: 0 0.3rem !important;
      padding-top: 0.1rem !important;
      border: 0 !important;
      border-radius: 0 !important;
      border-bottom: 3px dotted #333 !important;
     }
    
     #admissionForm ::placeholder {
      color: transparent;
     }
    
     #admissionForm p {
      line-height: 1.2rem !important;
     }
    }
    
    #admissionForm .signdiv {
     border-top: 2px dotted #333;
     margin: 0 0.5rem;
     padding: 0 1rem;
    }
    `}
            </style>
            <div
             style={{
              borderBottom: "5px solid #333",
              paddingBottom: "0.35rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
             }}
            >
             <div style={{ margin: "0 auto" }}>
              <img
               src={branches.branches[formBranch].banner || ""}
               alt={branches.branches[formBranch].name || ""}
               style={{
                minHeight: "100px",
                maxHeight: "130px",
                width: "100%;",
               }}
              />
             </div>
             <img
              src={passportSizePhoto}
              alt="Passport Size Photo"
              height="100px"
              style={{ maxWidth: "80px", objectFit: "cover" }}
              id="admissionPhoto"
             />
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
             <h5
              style={{
               padding: "0.5rem",
               margin: "1rem 0",
               border: "7px double red",
              }}
             >
              ভর্তির আবেদন ফরম
             </h5>
            </div>
            <table border={1} style={{ marginBottom: "1rem" }}>
             <tbody>
              <tr>
               <td rowSpan={2} style={{ color: "green" }}>
                বিভাগ
               </td>
               <td>জেনারেল</td>
               <td className="np" style={{ padding: "0 0.8rem" }}>
                <input
                 disabled
                 type="radio"
                 name="Division"
                 defaultValue="General"
                 className="division"
                 checked={admissionForm.division === "General"}
                />
               </td>
               <td rowSpan={2} style={{ color: "green" }}>
                শ্রেণি
               </td>
               <td rowSpan={2} className="np">
                <select
                 id="admissionClassSelect"
                 disabled
                 value={admissionForm.class}
                >
                 <option value="">Select</option>
                 <option value="প্লে">প্লে</option>
                 <option value="নার্সারী">নার্সারী</option>
                 <option value="প্রথম">প্রথম</option>
                 <option value="দ্বিতীয়">দ্বিতীয়</option>
                 <option value="তৃতীয়">তৃতীয়</option>
                 <option value="চতুর্থ">চতুর্থ</option>
                 <option value="পঞ্চম">পঞ্চম</option>
                 <option value="ষষ্ঠ">ষষ্ঠ</option>
                 <option value="সপ্তম">সপ্তম</option>
                 <option value="অষ্টম">অষ্টম</option>
                 <option value="নবম">নবম</option>
                 <option value="দশম">দশম</option>
                </select>
                <input
                 disabled
                 type="text"
                 id="admissionClass"
                 placeholder="শ্রেণী"
                 style={{ display: "none" }}
                />
               </td>
               <td rowSpan={2} style={{ color: "green" }}>
                শিক্ষাবর্ষ
               </td>
               <td rowSpan={2} className="np">
                <input
                 disabled
                 type="text"
                 placeholder="শিক্ষাবর্ষ"
                 id="admissionAcademicYear"
                 value={admissionForm.academic_year}
                />
               </td>
               <td rowSpan={2} style={{ color: "green" }}>
                তারিখ
               </td>
               <td rowSpan={2} className="np">
                <input
                 disabled
                 type="date"
                 placeholder="তারিখ"
                 id="date"
                 value={admissionForm.date}
                />
               </td>
              </tr>
              <tr>
               <td>হিফয</td>
               <td className="np" style={{ padding: "0 0.8rem" }}>
                <input
                 disabled
                 type="radio"
                 name="Division"
                 defaultValue="Hifz"
                 className="division"
                 checked={admissionForm.division === "Hifz"}
                />
               </td>
              </tr>
             </tbody>
            </table>
            <p>
             বরাবর
             <br />
             প্রিন্সিপাল
             <br />
             আসসালামু আলাইকুম ওয়া রাহমাতুল্লাহ।
             <br />
             যথাবিহিত সম্মান প্রদর্শন পূর্বক বিনীত নিবেদন এই যে, আমি নিম্ন লিখিত
             “অঙ্গীকারনামা” পাঠ করত: দৃঢ় অঙ্গীকার করছি যে, আল্লাহ তা’য়ালার
             সন্তুষ্টি বিধানের লক্ষ্যে ইলমে দ্বীন শিক্ষার মানসে মাদরাসার সকল
             নিয়ম-কানুন মেনে চলতে বাধ্য থাকবো ইনশাআল্লাহ।
             <br />
             <span
              style={{
               display: "block",
               marginTop: "0.5rem",
              }}
             >
              অতএব, অনুগ্রহ পূর্বক আমার আবেদন মঞ্জর করত: ইলমে দ্বীন হাসিল করে
              যোগ্য আলিম হওয়ার সুযোগ দানে স্যারের মর্জি হয়।
             </span>
            </p>
            <form className="form row p-0 mx-0 row-gap-2">
             <div className="col-6" style={{ maxWidth: 450 }}>
              <div>
               <label htmlFor="admissionName">
                ছাত্র-ছাত্রীর নাম (বাংলায়)
                <span style={{ color: "red" }}>*</span>
               </label>
              </div>
              <div>
               :
               <input
                disabled
                type="text"
                className="form-control"
                placeholder="Student's Name (Bangla)"
                value={admissionForm.student_name_bangla}
               />
              </div>
             </div>
             <div className="col-6" style={{ maxWidth: 450 }}>
              <div>
               <label htmlFor="admissionName">
                (ইংরেজিতে)<span style={{ color: "red" }}>*</span>
               </label>
              </div>
              <span>: </span>
              <input
               disabled
               type="text"
               className="form-control w-100"
               placeholder="Student's Name (English)"
               value={admissionForm.student_name_english}
              />
             </div>
             <div className="col-6" style={{ maxWidth: 450 }}>
              <div>
               <label htmlFor="admissionName">
                পিতা (বাংলায়)<span style={{ color: "red" }}>*</span>
               </label>
              </div>
              <div>
               :
               <input
                disabled
                type="text"
                className="form-control"
                placeholder="Father's Name (Bangla)"
                value={admissionForm.father_name_bangla}
               />
              </div>
             </div>
             <div className="col-4">
              <div>
               <label htmlFor="admissionName">
                (ইংরেজিতে)<span style={{ color: "red" }}>*</span>
               </label>
              </div>
              <span>: </span>
              <input
               disabled
               type="text"
               className="form-control w-100"
               placeholder="Father's Name (English)"
               value={admissionForm.father_name_english}
              />
             </div>
             <div className="col-2">
              <div>
               <label htmlFor="admissionName">
                পেশা<span style={{ color: "red" }}>*</span>
               </label>
              </div>
              <div>
               :
               <input
                disabled
                type="text"
                className="form-control"
                placeholder="Occupation (Father)"
                value={admissionForm.occupation_father}
                style={{ minWidth: 90 }}
               />
              </div>
             </div>
             <div className="col-6" style={{ maxWidth: 450 }}>
              <div>
               <label htmlFor="admissionName">
                মাতা (বাংলায়)<span style={{ color: "red" }}>*</span>
               </label>
              </div>
              <div>
               :
               <input
                disabled
                type="text"
                className="form-control"
                placeholder="Mother's Name (Bangla)"
                value={admissionForm.mother_name_bangla}
               />
              </div>
             </div>
             <div className="col-4">
              <div>
               <label htmlFor="admissionName">
                (ইংরেজিতে)<span style={{ color: "red" }}>*</span>
               </label>
              </div>
              <span>: </span>
              <input
               disabled
               type="text"
               className="form-control w-100"
               placeholder="Mother's Name (English)"
               value={admissionForm.mother_name_english}
              />
             </div>
             <div className="col-2">
              <div>
               <label htmlFor="admissionName">
                পেশা<span style={{ color: "red" }}>*</span>
               </label>
              </div>
              <div>
               :
               <input
                disabled
                type="text"
                className="form-control"
                placeholder="Occupation (Mother)"
                value={admissionForm.occupation_mother}
                style={{ minWidth: 90 }}
               />
              </div>
             </div>
             <div className="col-6" style={{ maxWidth: 450 }}>
              <div>
               <label htmlFor="admissionName">
                বর্তমান ঠিকানা (গ্রাম)<span style={{ color: "red" }}>*</span>
               </label>
              </div>
              <div>
               :
               <input
                disabled
                type="text"
                className="form-control"
                placeholder="Current Address"
                value={admissionForm.current_address}
               />
              </div>
             </div>
             <div className="col-6" style={{ maxWidth: 450 }}>
              <div>
               <label htmlFor="admissionName">
                পোস্ট<span style={{ color: "red" }}>*</span>
               </label>
              </div>
              <span>: </span>
              <input
               disabled
               type="text"
               className="form-control w-100"
               placeholder="Post (Current)"
               value={admissionForm.post_current}
              />
             </div>
             <div className="col-6" style={{ maxWidth: 450 }}>
              <div>
               <label htmlFor="admissionName">
                থানা<span style={{ color: "red" }}>*</span>
               </label>
              </div>
              <div>
               :
               <input
                disabled
                type="text"
                className="form-control"
                placeholder="Thana (Current)"
                value={admissionForm.thana_current}
               />
              </div>
             </div>
             <div className="col-6" style={{ maxWidth: 450 }}>
              <div>
               <label htmlFor="admissionName">
                জেলা<span style={{ color: "red" }}>*</span>
               </label>
              </div>
              <span>: </span>
              <input
               disabled
               type="text"
               className="form-control w-100"
               placeholder="District (Current)"
               value={admissionForm.district_current}
              />
             </div>
             <div className="col-6" style={{ maxWidth: 450 }}>
              <div>
               <label htmlFor="admissionName">
                স্থায়ী ঠিকানা (গ্রাম)<span style={{ color: "red" }}>*</span>
               </label>
              </div>
              <div>
               :
               <input
                disabled
                type="text"
                className="form-control"
                placeholder="Permanent Address"
                value={admissionForm.permanent_address}
               />
              </div>
             </div>
             <div className="col-6" style={{ maxWidth: 450 }}>
              <div>
               <label htmlFor="admissionName">
                পোস্ট<span style={{ color: "red" }}>*</span>
               </label>
              </div>
              <span>: </span>
              <input
               disabled
               type="text"
               className="form-control w-100"
               placeholder="Post (Permanent)"
               value={admissionForm.post_permanent}
              />
             </div>
             <div className="col-6" style={{ maxWidth: 450 }}>
              <div>
               <label htmlFor="admissionName">
                থানা<span style={{ color: "red" }}>*</span>
               </label>
              </div>
              <div>
               :
               <input
                disabled
                type="text"
                className="form-control"
                placeholder="Thana (Permanent)"
                value={admissionForm.thana_permanent}
               />
              </div>
             </div>
             <div className="col-6" style={{ maxWidth: 450 }}>
              <div>
               <label htmlFor="admissionName">
                জেলা<span style={{ color: "red" }}>*</span>
               </label>
              </div>
              <span>: </span>
              <input
               disabled
               type="text"
               className="form-control w-100"
               placeholder="District (Permanent)"
               value={admissionForm.district_permanent}
              />
             </div>
             <div className="col-6" style={{ maxWidth: 450 }}>
              <div>
               <label htmlFor="admissionName">
                মোবাইল (পিতা)<span style={{ color: "red" }}>*</span>
               </label>
              </div>
              <div>
               :
               <input
                disabled
                type="text"
                className="form-control"
                placeholder="Mobile Number (Father)"
                value={admissionForm.mobile_number_father}
               />
              </div>
             </div>
             <div className="col-6" style={{ maxWidth: 450 }}>
              <div>
               <label htmlFor="admissionName">
                মোবাইল (মাতা)<span style={{ color: "red" }}>*</span>
               </label>
              </div>
              <span>: </span>
              <input
               disabled
               type="text"
               className="form-control w-100"
               placeholder="Mobile Number (Mother)"
               value={admissionForm.mobile_number_mother}
              />
             </div>
             <div className="col-6" style={{ maxWidth: 450 }}>
              <div>
               <label htmlFor="admissionName">
                পিতার অবর্তমানে অভিভাবকের নাম
               </label>
              </div>
              <div>
               :
               <input
                disabled
                type="text"
                className="form-control"
                placeholder="Name (Guardian)"
                value={admissionForm.name_guardian}
               />
              </div>
             </div>
             <div className="col-6" style={{ maxWidth: 450 }}>
              <div>
               <label htmlFor="admissionName">সম্পর্ক</label>
              </div>
              <span>: </span>
              <input
               disabled
               type="text"
               className="form-control w-100"
               placeholder="Relation (Guardian)"
               value={admissionForm.relation_guardian}
              />
             </div>
             <div className="col-6" style={{ maxWidth: 450 }}>
              <div>
               <label htmlFor="admissionName">ঠিকানা</label>
              </div>
              <div>
               :
               <input
                disabled
                type="text"
                className="form-control"
                placeholder="Address (Guardian)"
                value={admissionForm.address_guardian}
               />
              </div>
             </div>
             <div className="col-6" style={{ maxWidth: 450 }}>
              <div>
               <label htmlFor="admissionName">মোবাইল</label>
              </div>
              <span>: </span>
              <input
               disabled
               type="text"
               className="form-control w-100"
               placeholder="Mobile Number (Guardian)"
               value={admissionForm.mobile_number_guardian}
              />
             </div>
             <div className="col-6" style={{ maxWidth: 450 }}>
              <div>
               <label htmlFor="admissionName">
                জন্ম তারিখ (জন্ম নিবন্ধন অনুসারে)
                <span style={{ color: "red" }}>*</span>
               </label>
              </div>
              <div>
               :
               <input
                disabled
                type="date"
                className="form-control"
                id="birthDate"
                placeholder="Date of Birth"
                value={admissionForm.date_of_birth}
               />
              </div>
             </div>
             <div className="col-6" style={{ maxWidth: 450 }}>
              <div>
               <label htmlFor="admissionName">রক্তের গ্ৰুপ</label>
              </div>
              <span>: </span>
              <input
               disabled
               type="text"
               className="form-control w-100"
               placeholder="Blood Group"
               value={admissionForm.blood_group}
              />
             </div>
             <div className="col-6" style={{ maxWidth: 450 }}>
              <div>
               <label htmlFor="admissionName">
                পূর্বে অধ্যয়নরত প্রতিষ্ঠানের নাম
                <span style={{ color: "red" }}>*</span>
               </label>
              </div>
              <div>
               :
               <input
                disabled
                type="text"
                className="form-control"
                placeholder="Previous Institution's Name"
                value={admissionForm.previous_institution_name}
               />
              </div>
             </div>
             <div className="col-6" style={{ maxWidth: 450 }}>
              <div>
               <label htmlFor="admissionName">
                যে শ্রেণিতে<span style={{ color: "red" }}>*</span>
               </label>
              </div>
              <span>: </span>
              <input
               disabled
               type="text"
               className="form-control w-100"
               placeholder="Class (Previous)"
               value={admissionForm.class_previous}
              />
             </div>
             <div className="w-100 d-flex align-items-center mt-1">
              <label>
               এই প্রতিষ্ঠানে অধ্যয়নরত সহোদর ভাই-বোন (যদি থাকে)
               <span className="ps-2 pe-3">: </span>
              </label>
              <div
               className="col-4"
               style={{ maxWidth: 300, display: "flex", alignItems: "center" }}
              >
               <div>
                <label htmlFor="admissionName">নাম</label>
               </div>
               <span className="ps-2">: </span>
               <input
                disabled
                type="text"
                className="form-control w-100"
                placeholder="Name (Sibling Student)"
                value={admissionForm.name_sibling_student}
               />
              </div>
              <div
               className="col-4"
               style={{ maxWidth: 300, display: "flex", alignItems: "center" }}
              >
               <div>
                <label htmlFor="admissionName">শ্রেণি</label>
               </div>
               <span className="ps-2">: </span>
               <input
                disabled
                type="text"
                className="form-control w-100"
                placeholder="Class (Sibling Student)"
                value={admissionForm.class_sibling_student}
               />
              </div>
             </div>
            </form>
            <div
             style={{
              marginTop: "1rem",
              display: "flex",
              justifyContent: "center",
             }}
            >
             <h5
              style={{
               padding: "0.5rem",
               margin: "1rem 0",
               border: "3px double #333",
              }}
             >
              অঙ্গীকারনামা
             </h5>
            </div>
            <ol style={{ padding: "0 1rem" }}>
             <li>মাদরাসার লক্ষ্য-উদ্দেশ্যের বিপরীত কোনো কাজ করবো না।</li>
             <li>প্রতিষ্ঠানের সকল নিয়ম কানুন অবশ্যই মেনে চলবো।</li>
             <li>দেশ ও ধর্মের ক্ষতিকর কোনো কাজ করবো না।</li>
             <li>
              মাদরাসার সকল কর্মসূচিতে সক্রিয় অংশ গ্রহণ করবো। যেমন- শিক্ষা, জাতীয়
              দিবস ও আর্ত-মানবতার সেবা ইত্যাদি।
             </li>
             <li>
              আমার দ্বারা প্রতিষ্ঠান ও রাষ্ট্র বিরোধী কোনো কাজ হলে মাদরাসা
              কর্তৃপক্ষ যে ব্যবস্থা বা শাস্তি প্রদান করবেন তা মেনে নিতে বাধ্য
              থাকবো।
             </li>
            </ol>
            <div
             style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "3rem",
             }}
            >
             <div className="signdiv">
              <p>আবেদনকারীর স্বাক্ষর</p>
             </div>
             <div className="signdiv">
              <p>অভিভাবকের স্বাক্ষর</p>
             </div>
             <div className="signdiv">
              <p>দায়িত্বশীলের স্বাক্ষর</p>
             </div>
             <div className="signdiv">
              <p>প্রিন্সিপালের স্বাক্ষর</p>
             </div>
            </div>
           </div>
          </Paper>
         </>
        )}
       </Container>
      </div>
     </>
    )}
    {(!formQuery || show404) && FormErrorContainer}
   </Navbar>
  </>
 );
}
