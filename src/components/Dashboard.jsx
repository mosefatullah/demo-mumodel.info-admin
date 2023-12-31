import * as React from "react";

/* Components */
import Create from "./Create";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Modal from "./Modal";
import Alert from "./Alert";
import Edit from "./Edit";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { Autocomplete, Box, CircularProgress, TextField } from "@mui/material";

/* Icons */
import PostIcon from "@mui/icons-material/PostAdd";
import EventIcon from "@mui/icons-material/Event";
import Delete from "@mui/icons-material/Delete";
import {
 AdminPanelSettings,
 Edit as EditIcon,
 Group,
 Pending,
 SchoolSharp,
} from "@mui/icons-material";
import PersonIcon from "@mui/icons-material/Person";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

/* Utils */
import { Theme } from "../utils/theme";

export default function Dashboard({ branches }) {
 let getBranch = window.localStorage.getItem("admin.mumodel.info-branch");
 const [tabValue, setTabValue] = React.useState("1");
 const [isOpenCreateNew, setIsOpenCreateNew] = React.useState([false, ""]);

 const [posts, setPosts] = React.useState([]);
 const [notices, setNotices] = React.useState([]);
 const [admissionForms, setAdmissionForms] = React.useState([]);
 const [branch, setBranch] = React.useState(getBranch || "mumm");
 const [admins, setAdmins] = React.useState([
  ["a@gmail.com", "full"],
  ["b@gmail.com", ["mumm"]],
 ]);
 const [owners, setOwners] = React.useState(["a@gmail.com"]);
 const [myAccess, setMyAccess] = React.useState(false);
 const [roleOfAdmin, setRoleOfAdmin] = React.useState("full");
 const [listOfAdminBranches, setListOfAdminBranches] = React.useState([]);

 const [errorAlert, setErrorAlert] = React.useState("");
 const [openAlert, setOpenAlert] = React.useState(false);
 const [openAdminDelete, setOpenAdminDelete] = React.useState({
  flag: false,
  admin: null,
 });
 const [openDelete, setOpenDelete] = React.useState({
  flag: false,
  type: null,
  post: null,
 });
 const [snackbarAlert, setSnackbarAlert] = React.useState(false);
 const [openSnackbar, setOpenSnackbar] = React.useState(false);
 const [openEdit, setOpenEdit] = React.useState([false, null, null]);
 const [refresh, setRefresh] = React.useState({
  posts: 0,
  notices: 0,
  admissions: 0,
  admins: 0,
 });

 const [loadingAfterBranch, setLoadingAfterBranch] = React.useState(true);

 const InsightsComponent = () => (
  <Paper
   elevation={0}
   sx={{
    backgroundColor: "transparent",
   }}
  >
   <h4
    style={{
     paddingBottom: "0.2rem",
    }}
   >
    Basic Insights
   </h4>
   <Card
    elevation={0}
    sx={{
     marginTop: 2,
     padding: 2,
     display: "flex",
     justifyContent: "space-around",
     alignItems: "center",
     lineHeight: "2rem",
     minHeight: "260px",
     bgcolor:
      window.localStorage.getItem("theme") === "dark"
       ? "background.paper"
       : "background.default",
     border: "1px solid rgba(0,0,0,0.05)",
    }}
   >
    <div style={{ textAlign: "center" }}>
     <Chip label="Admission Forms" />
     <Typography variant="h5" display="block" mt={1.5}>
      {admissionForms ? admissionForms.length : <Pending color="disabled" />}
     </Typography>
    </div>
    <Divider orientation="vertical" variant="middle" flexItem />
    <div style={{ textAlign: "center" }}>
     <Chip label="Total Posts" />
     <Typography variant="h5" display="block" mt={1.5}>
      {posts ? posts.length : <Pending color="disabled" />}
     </Typography>
     <br />
     <Chip label="Total Notices" />
     <Typography variant="h5" display="block" mt={1.5}>
      {notices ? notices.length : <Pending color="disabled" />}
     </Typography>
    </div>
   </Card>
  </Paper>
 );
 const PostsButtons = ({ post, type = "posts" }) => (
  <>
   <IconButton
    aria-label="edit"
    sx={{ marginLeft: "auto", marginTop: -1 }}
    size="small"
    color="primary"
    onClick={() => {
     setOpenEdit([true, post, type.substring(0, type.length - 1)]);
    }}
   >
    <EditIcon />
   </IconButton>
   <IconButton
    aria-label="delete"
    sx={{ marginTop: -1 }}
    size="small"
    color="error"
    onClick={() => {
     setOpenDelete({
      flag: true,
      post,
      type,
     });
    }}
   >
    <Delete />
   </IconButton>
  </>
 );

 React.useEffect(() => {
  if (posts || notices || admissionForms) {
   setLoadingAfterBranch(false);
  }
 }, [, branch, posts, notices, admissionForms]);

 return (
  <>
   <div
    style={{
     width: "100%",
     height: "100%",
     position: "fixed",
     top: 0,
     left: 0,
     zIndex: 200,
     backgroundColor: Theme.palette.mode === "dark" ? "#000000cc" : "#ffffffcc",
     display: loadingAfterBranch ? "block" : "none",
    }}
   >
    <CircularProgress
     size={60}
     sx={{
      position: "absolute",
      top: "calc(50% - 30px)",
      left: "calc(50% - 30px)",
     }}
    />
   </div>
   <Modal
    title="Dashboard"
    body={errorAlert}
    isOpen={openAlert}
    onCancel={() => {
     setOpenAlert(false);
     setErrorAlert("");
    }}
   />
   <Modal
    title="Delete"
    body="Are you sure you want to remove this person?"
    submitButton="Remove"
    isOpen={openAdminDelete.flag}
    onCancel={() => {
     setOpenAdminDelete({ flag: false, admin: null });
    }}
    onSubmit={() => {
     setOpenSnackbar(true);
     setSnackbarAlert("Successfully deleted.");
     setOpenAdminDelete({ admin: null });
    }}
   />
   <Modal
    title="Delete"
    submitButton="Delete"
    body={`Are you sure you want to delete this ${
     openDelete.type && openDelete.type.substring(0, openDelete.type.length - 1)
    } ?`}
    isOpen={openDelete.flag}
    onCancel={() => {
     setOpenDelete({
      flag: false,
      post: null,
     });
    }}
    onSubmit={() => {
     setOpenSnackbar(true);
     setSnackbarAlert("Permanently deleted.");
     setOpenDelete({
      flag: false,
      post: null,
      type: null,
     });
     setRefresh((rf) => {
      return {
       posts: rf.posts + 1,
       notices: rf.notices + 1,
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
       posts: rf.posts + 1,
       notices: rf.notices + 1,
      };
     });
    }}
   />
   <Container maxWidth="xl" sx={{ marginTop: 3, marginBottom: 5 }}>
    <Grid container spacing={3}>
     <Grid item lg={8} xs={12}>
      <Paper
       sx={{
        marginBottom: 3,
        padding: {
         xs: 3,
         lg: 4,
        },
       }}
      >
       <h2
        style={{
         paddingBottom: "0.5rem",
         display: "flex",
         alignItems: "center",
        }}
       >
        Dashboard
        <Button
         sx={{ marginLeft: "auto" }}
         size="small"
         variant="outlined"
         onClick={() => {
          window.localStorage.setItem(
           "theme",
           window.localStorage.getItem("theme") === "dark" ? "light" : "dark"
          );
          window.location.reload();
         }}
        >
         {window.localStorage.getItem("theme") === "dark" ? "light" : "dark"}{" "}
         {window.localStorage.getItem("theme") === "dark" ? (
          <LightModeIcon
           sx={{
            width: "1rem",
            height: "1rem",
            ml: "0.5rem",
           }}
          />
         ) : (
          <DarkModeIcon
           sx={{
            width: "1rem",
            height: "1rem",
            ml: "0.5rem",
           }}
          />
         )}
        </Button>
        <Button
         sx={{ marginLeft: "0.5rem" }}
         size="small"
         variant="outlined"
         onClick={() => {
          setRefresh((rf) => {
           return {
            posts: rf.posts + 1,
            notices: rf.notices + 1,
            admissions: rf.admissions + 1,
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
           setPosts(false);
           setNotices(false);
           setAdmissionForms(false);
           setBranch(e.target.value);
           setTimeout(() => {
            setPosts([]);
            setNotices([]);
            setAdmissionForms([]);
           }, 2000);
           window.localStorage.setItem(
            "admin.mumodel.info-branch",
            e.target.value
           );
           setTabValue("1");
           setLoadingAfterBranch(true);
           setRefresh((rf) => {
            return {
             posts: rf.posts + 1,
             notices: rf.notices + 1,
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
      </Paper>
      <Paper
       sx={{
        paddingTop: {
         xs: 1,
         lg: 2,
        },
        paddingX: {
         xs: 2,
         lg: 4,
        },
        pb: 6,
       }}
      >
       <Tabs
        value={tabValue}
        variant="scrollable"
        scrollButtons="auto"
        allowScrollButtonsMobile
        onChange={(e, newValue) => {
         setTabValue(newValue);
        }}
        sx={{
         marginBottom: 1,
         marginTop: 1,
         borderBottom: 1,
         borderColor: "divider",
        }}
       >
        <Tab label="Actions" value="1" />
        <Tab label="Manage" value="2" />
        <Tab
         label="Insights"
         value="3"
         sx={{
          display: {
           xs: "inline-flex",
           lg: "none",
          },
         }}
        />
        <Tab label="Branches" value="4" />
       </Tabs>
       <div
        style={{
         padding: "0 0.5rem",
        }}
       >
        <br />
        {tabValue === "1" && (
         <>
          <Grid container spacing={3}>
           <Grid item xs={12} md={6}>
            <Button
             variant="contained"
             onClick={() => setIsOpenCreateNew([true, "notice"])}
             startIcon={<PostIcon />}
            >
             New Notice
            </Button>
            <br />
            <Button
             variant="contained"
             style={{ marginTop: "1rem" }}
             onClick={() => setIsOpenCreateNew([true, "post"])}
             startIcon={<EventIcon />}
            >
             New Post
            </Button>
           </Grid>
           <Grid item xs={12} md={6}>
            <Button
             variant="contained"
             color="error"
             startIcon={<Delete />}
             disabled
            >
             Delete All
            </Button>
            <br />
            <Button
             variant="contained"
             style={{ marginTop: "1rem" }}
             startIcon={<Delete />}
             disabled
            >
             Delete Accepted Forms
            </Button>
           </Grid>
          </Grid>
          <Create
           isOpen={isOpenCreateNew[0]}
           onCancel={() => {
            setIsOpenCreateNew([false, ""]);
           }}
           onCreated={() => {
            setIsOpenCreateNew([false, ""]);
            setRefresh((rf) => {
             return {
              posts: rf.posts + 1,
              notices: rf.notices + 1,
             };
            });
            setTimeout(() => {
             setOpenSnackbar(true);
             setSnackbarAlert(
              "The " +
               isOpenCreateNew[1].toLocaleLowerCase() +
               " has been successfully created."
             );
            }, 700);
           }}
           type={isOpenCreateNew[1]}
          />
         </>
        )}
        {tabValue === "2" && (
         <>
          <h4
           style={{
            paddingBottom: "1rem",
           }}
          >
           Manage Admins
          </h4>
          <div style={{ display: "flex", alignItems: "center" }}>
           <Grid container spacing={1}>
            <Grid item xs={12} md={"auto"}>
             <TextField
              type="email"
              label="Add Admin"
              variant="outlined"
              size="small"
              id="addEmailOfAdmin"
              placeholder="Email"
              fullWidth
              sx={{ marginRight: "1rem" }}
             />
            </Grid>
            <Grid
             item
             xs={12}
             md={"auto"}
             sx={{
              display: "flex",
              alignItems: "center",
             }}
            >
             <Select
              id="role-select"
              value={roleOfAdmin === "" ? "full" : roleOfAdmin}
              variant="outlined"
              size="small"
              sx={{
               marginRight: "1rem",
              }}
              onChange={(e) => {
               setRoleOfAdmin(e.target.value);
              }}
             >
              <MenuItem value={"full"}>Full Access</MenuItem>
              <MenuItem value={"limited"}>Limited Access</MenuItem>
             </Select>
             <Button
              variant="contained"
              onClick={() => {
               const i = document.getElementById("addEmailOfAdmin");
               let flag = true;
               if (i.value.match(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/)) {
                admins &&
                 admins.map((a) => {
                  if (a[0] === i.value) {
                   setOpenSnackbar(true);
                   setSnackbarAlert("This email is already an admin.");
                   flag = false;
                  }
                 });
                if (flag === true) {
                 if (
                  roleOfAdmin === "limited" &&
                  listOfAdminBranches.length === 0
                 )
                  return (
                   setOpenSnackbar(true),
                   setSnackbarAlert("Please select at least one branch.")
                  );
                 let listOfAdminBranchesId = [];
                 for (let i in listOfAdminBranches) {
                  for (let j in branches.branches) {
                   if (branches.branches[j].name === listOfAdminBranches[i]) {
                    listOfAdminBranchesId.push(j);
                   }
                  }
                 }
                }
               } else {
                i.focus();
               }
              }}
             >
              Add
             </Button>
            </Grid>
           </Grid>
          </div>
          <Autocomplete
           multiple
           id="brach-select-for-admin"
           options={Object.entries(branches.branches).map(([b, i]) => i.name)}
           freeSolo
           disableCloseOnSelect
           renderInput={(params) => (
            <TextField
             {...params}
             variant="standard"
             label="Choose Branches"
             placeholder="Which branches this admin can access?"
            />
           )}
           sx={{
            margin: "0.5rem 0",
            display: roleOfAdmin === "limited" ? "block" : "none",
           }}
           onChange={(e, v) => {
            setListOfAdminBranches(v);
           }}
          />
          <List
           dense
           sx={{
            width: "100%",
            maxWidth: 550,
            marginTop: "1rem",
           }}
          >
           {admins.length > 0 ? (
            admins.map((value) => {
             const labelId = `checkbox-list-secondary-label-${value[0]}`;
             return (
              <ListItem
               key={value[0]}
               secondaryAction={
                <Box sx={{ display: "flex", alignItems: "center" }}>
                 {Array.isArray(value[1]) ? (
                  <Chip
                   label={
                    value[1].length +
                    " Branch" +
                    (value[1].length > 1 ? "es" : "")
                   }
                   size="small"
                   sx={{
                    mr: 0.5,
                    ml: "auto",
                    display: {
                     xs: "none",
                     sm: "block",
                    },
                   }}
                  />
                 ) : (
                  <Chip
                   label={owners.includes(value[0]) ? "Owner" : "Full Access"}
                   size="small"
                   sx={{
                    mr: 0.5,
                    ml: "auto",
                    display: {
                     xs: "none",
                     sm: "block",
                    },
                   }}
                  />
                 )}
                 <Button
                  size="small"
                  color="error"
                  sx={{
                   ml: "auto",
                  }}
                  onClick={function () {
                   setOpenAdminDelete({ flag: true, admin: value });
                  }}
                 >
                  <Delete
                   sx={{
                    fontSize: "1.1rem",
                   }}
                  />
                 </Button>
                </Box>
               }
               disablePadding
              >
               <ListItemButton>
                <ListItemAvatar>
                 {owners.includes(value[0]) ? (
                  <Avatar
                   sx={{
                    bgcolor: "primary.main",
                   }}
                  >
                   <AdminPanelSettings />
                  </Avatar>
                 ) : (
                  <Avatar alt={`Avatar`}>
                   {value[1] == "full" ? <Group /> : <PersonIcon />}
                  </Avatar>
                 )}
                </ListItemAvatar>
                <ListItemText id={labelId} primary={`${value[0]}`} />
               </ListItemButton>
              </ListItem>
             );
            })
           ) : (
            <p
             style={{
              paddingTop: "1rem",
              color: "#666",
              fontSize: "0.9rem",
              display: "flex",
              alignItems: "center",
             }}
            >
             <PersonIcon color="disabled" />
             <Typography
              variant="p"
              sx={{
               ml: 1,
              }}
             >
              Loading ...
             </Typography>
            </p>
           )}
          </List>
         </>
        )}
        {tabValue === "3" && <InsightsComponent />}
        {tabValue === "4" && (
         <>
          <h4 style={{ paddingBottom: "0.7rem" }}>Branches</h4>
          <List
           dense
           sx={{
            width: "100%",
            maxWidth: 550,
           }}
          >
           {branches.branches.length !== 0 ? (
            Object.entries(branches.branches).map(([b, i]) => (
             <ListItem
              key={b}
              secondaryAction={
               <Box sx={{ display: "flex", alignItems: "center" }}>
                {/*<Button
                 size="small"
                 color="primary"
                 sx={{
                  ml: "auto",
                 }}
                >
                 <EditIcon />
                </Button>*/}
               </Box>
              }
              disablePadding
             >
              <ListItemButton>
               <ListItemAvatar>
                <Avatar alt={`Institute`}>
                 <SchoolSharp />
                </Avatar>
               </ListItemAvatar>
               <ListItemText
                id={b}
                primary={`${i.name}`}
                secondary={`${i.address}`}
               />
              </ListItemButton>
             </ListItem>
            ))
           ) : (
            <p
             style={{
              paddingTop: "1rem",
              color: "#666",
              fontSize: "0.9rem",
              display: "flex",
              alignItems: "center",
             }}
            >
             <PersonIcon color="disabled" />
             <Typography
              variant="p"
              sx={{
               ml: 1,
              }}
             >
              Loading ...
             </Typography>
            </p>
           )}
          </List>
         </>
        )}
       </div>
      </Paper>
      <Paper
       sx={{
        marginTop: 3,
        padding: {
         xs: 3,
         lg: 4,
        },
       }}
      >
       <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
         <Typography variant="h6">Notices</Typography>
         <Typography
          variant="p"
          style={{ paddingBottom: "0.2rem" }}
          color={"text.secondary"}
          sx={{
           fontSize: "0.8rem",
          }}
         >
          Latest notices only
         </Typography>
         <Card
          elevation={0}
          sx={{
           height: "360px",
           overflowY: "scroll",
           bgcolor:
            window.localStorage.getItem("theme") === "dark"
             ? "background.paper"
             : "background.default",
           padding: "0 1rem 2rem 1rem",
           marginTop: 2,
           border: "1px solid rgba(0,0,0,0.05)",
          }}
         >
          {!notices ? (
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
          ) : notices.length === 0 ? (
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
             No notice yet!
            </Typography>
           </p>
          ) : (
           notices
            .sort(
             ([k, a], [p, b]) =>
              new Date(b.publishedDate).getTime() -
              new Date(a.publishedDate).getTime()
            )
            .slice(0, 10)
            .map(([i, p]) => {
             return (
              p && (
               <Card sx={{ marginTop: 2, padding: 2 }} elevation={1}>
                <h4>{p.title}</h4>
                <p
                 style={{
                  color: "gray",
                  fontSize: "0.93rem",
                  padding: "0.66rem 0",
                 }}
                >
                 {p.body && p.body.substring(0, 200).replaceAll("\\n", " ")}
                </p>
                <p
                 style={{
                  fontSize: "0.8rem",
                  display: "flex",
                 }}
                >
                 <div
                  style={{
                   width: "70%",
                  }}
                 >
                  <Chip
                   label={new Date(p.publishedDate).toDateString()}
                   size="small"
                   sx={{ marginRight: "0.3rem" }}
                  />
                 </div>
                 <PostsButtons post={p} type="notices" />
                </p>
               </Card>
              )
             );
            })
          )}
         </Card>
        </Grid>
        <Grid item xs={12} md={6}>
         <Typography variant="h6">Posts</Typography>
         <Typography
          variant="p"
          style={{ paddingBottom: "0.2rem" }}
          color={"text.secondary"}
          sx={{
           fontSize: "0.8rem",
          }}
         >
          Latest posts only
         </Typography>
         <Card
          elevation={0}
          sx={{
           height: "360px",
           overflowY: "scroll",
           bgcolor:
            window.localStorage.getItem("theme") === "dark"
             ? "background.paper"
             : "background.default",
           padding: "0 1rem 2rem 1rem",
           marginTop: 2,
           border: "1px solid rgba(0,0,0,0.05)",
          }}
         >
          {!posts ? (
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
          ) : posts.length === 0 ? (
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
             No post yet!
            </Typography>
           </p>
          ) : (
           posts
            .sort(
             ([k, a], [p, b]) =>
              new Date(b.publishedDate).getTime() -
              new Date(a.publishedDate).getTime()
            )
            .slice(0, 10)
            .map(([i, p]) => {
             return (
              p && (
               <Card sx={{ marginTop: 2, padding: 2 }} elevation={1}>
                <h4>{p.title}</h4>
                <p
                 style={{
                  color: "gray",
                  fontSize: "0.93rem",
                  padding: "0.66rem 0",
                 }}
                >
                 {p.body && p.body.substring(0, 200).replaceAll("\\n", " ")}
                </p>
                <p
                 style={{
                  fontSize: "0.8rem",
                  display: "flex",
                 }}
                >
                 <div
                  style={{
                   width: "70%",
                  }}
                 >
                  <Chip
                   label={new Date(p.date).toDateString()}
                   size="small"
                   sx={{ marginRight: "0.3rem", mb: 0.5 }}
                  />
                  <Chip label={p.author} size="small" sx={{ mb: 0.5 }} />
                 </div>
                 <PostsButtons post={p} type="posts" />
                </p>
               </Card>
              )
             );
            })
          )}
         </Card>
        </Grid>
       </Grid>
      </Paper>
     </Grid>
     <Grid item lg={4} xs={12}>
      <Paper
       sx={{
        display: {
         xs: "none",
         lg: "block",
        },
        padding: {
         xs: 3,
         lg: 4,
        },
       }}
      >
       <InsightsComponent />
      </Paper>
      <Paper
       sx={{
        mt: {
         xs: 0,
         lg: 3,
        },
        padding: {
         xs: 3,
         lg: 4,
        },
       }}
      >
       <Typography variant="h6">Admission Forms</Typography>
       <Typography
        variant="p"
        style={{ paddingBottom: "0.2rem" }}
        color={"text.secondary"}
        sx={{
         fontSize: "0.8rem",
        }}
       >
        Latest forms only
       </Typography>
       <Card
        elevation={0}
        sx={{
         height: "360px",
         overflowY: "scroll",
         bgcolor:
          window.localStorage.getItem("theme") === "dark"
           ? "background.paper"
           : "background.default",
         padding: "0 1rem 2rem 1rem",
         marginTop: 2,
         border: "1px solid rgba(0,0,0,0.05)",
        }}
       >
        {!admissionForms ? (
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
           No form yet!
          </Typography>
         </p>
        ) : (
         admissionForms
          .sort(
           ([k, a], [p, b]) =>
            new Date(b.date).getTime() - new Date(a.date).getTime()
          )
          .slice(0, 10)
          .map(([p, i]) => {
           return (
            i && (
             <Card sx={{ marginTop: 2, padding: 2 }} elevation={1}>
              <h4>{p}</h4>
              <p style={{ color: "gray", fontSize: "0.93rem" }}>
               {i.apply_mobile}
              </p>
              <br />
              <div style={{ display: "flex", overflowX: "scroll" }}>
               <p
                style={{
                 fontSize: "0.8rem",
                 display: "flex",
                 overflowX: "scroll",
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
              </div>
             </Card>
            )
           );
          })
        )}
       </Card>
      </Paper>
     </Grid>
    </Grid>
   </Container>
  </>
 );
}
