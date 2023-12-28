import * as React from "react";
import logo from "../assets/logo.png";

/* Components */
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import Avater from "@mui/material/Avatar";
import { CssBaseline } from "@mui/material";
import { Theme } from "../utils/theme";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import Modal from "./Modal";

/* Icons */
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import SettingsIcon from "@mui/icons-material/Settings";
import Home from "@mui/icons-material/Home";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import InfoIcon from "@mui/icons-material/Info";
import PostAdd from "@mui/icons-material/PostAdd";
import SchoolIcon from "@mui/icons-material/School";
import Checklist from "@mui/icons-material/Checklist";

/* Utils */
import { Link } from "react-router-dom";

export default function Navbar({ auth, children }) {
 const [openAlert, setOpenAlert] = React.useState(false);
 const [alertMessage, setAlertMessage] = React.useState("");
 const drawerTopLinks = [
  "/",
  "/admissions",
  "/notices",
  "/posts",
  "/academics",
  "/results",
 ];
 const drawerTopItems = [
  "Home",
  "Admissions",
  "Notices",
  "Posts",
  "Academics",
  "Results",
 ];
 const [profilePicture, setProfilePicture] = React.useState(null);
 const [profileName, setProfileName] = React.useState("Anonymous");
 const [profileEmail, setProfileEmail] = React.useState(
  "Unknown error occured!"
 );

 /*** MATERIAL UI ***/
 const [state, setState] = React.useState({
  left: false,
 });

 const toggleDrawer = (open) => (event) => {
  if (
   event.type === "keydown" &&
   (event.key === "Tab" || event.key === "Shift")
  ) {
   return;
  }
  setState({ left: open });
  if (open) {
   drawerWidth = 240;
  } else {
   drawerWidth = 0;
  }
 };

 let drawerWidth = 240;
 const Navprofile = ({ isDrawer }) => (
  <>
   {!isDrawer ? (
    <>
     <Box>
      <Button size="small" aria-label="profile" color="inherit">
       <Tooltip title={profileName || "Profile"}>
        <Avater
         src={profilePicture}
         style={{
          width: "30px",
          height: "30px",
         }}
        />
       </Tooltip>
      </Button>
     </Box>
    </>
   ) : (
    <>
     <Box
      sx={{
       padding: "1rem",
      }}
     >
      <Avater src={profilePicture} />
      <Typography
       variant="p"
       noWrap
       component="div"
       sx={{
        fontSize: "1rem",
        marginTop: "0.5rem",
       }}
      >
       {profileName || "Anonymous"}
      </Typography>
      <Typography
       variant="p"
       noWrap
       component="div"
       sx={{
        fontSize: "0.8rem",
       }}
      >
       {profileEmail || "Unknown error occured!"}
      </Typography>
      <Button
       variant="outlined"
       size="small"
       sx={{
        marginTop: "1rem",
       }}
       onClick={() => {
        
       }}
      >
       Logout
      </Button>
     </Box>
    </>
   )}
  </>
 );
 const Navhead = ({ isDrawer }) => {
  return (
   <Toolbar>
    <IconButton
     size="large"
     edge="start"
     color="inherit"
     aria-label="drawer"
     onClick={toggleDrawer(!state.left)}
     sx={{
      mr: 2,
      display: {
          xs: "block",
          sm: "none",
         },
     }}
    >
     <Tooltip title="Menu">
      <MenuIcon />
     </Tooltip>
    </IconButton>
    <Link
     to="/"
     style={{
      display: "flex",
      alignItems: "center",
      textDecoration: "none",
     }}
    >
     <img
      src={logo}
      alt="logo"
      style={{
       width: "30px",
       marginRight: "0.7rem",
       borderRadius: "100rem",
      }}
     />
     <Typography variant="h6" component="div" sx={{ mr: 2 }}>
      Admin
     </Typography>
    </Link>
    <Box sx={{ flexGrow: 1 }} />
    <Box
     sx={{
      display: isDrawer ? "none" : "flex",
     }}
    >
     <Navprofile isDrawer={false} />
    </Box>
   </Toolbar>
  );
 };
 const drawer = (
  <>
   <Navhead isDrawer={true} />
   <Box
    role="presentation"
    onClick={toggleDrawer(false)}
    onKeyDown={toggleDrawer(false)}
   >
    <List>
     {drawerTopItems.map((text, index) => (
      <Link role="button" to={drawerTopLinks[index]}>
       <ListItem
        key={text}
        disablePadding
        sx={{
         backgroundColor:
          window.location.pathname.split("/")[1] ===
          drawerTopLinks[index].split("/")[1]
           ? Theme.palette.action.selected
           : "transparent",
        }}
       >
        <ListItemButton>
         <ListItemIcon>
          {
           [
            <Home />,
            <ConfirmationNumberIcon />,
            <InfoIcon />,
            <PostAdd />,
            <SchoolIcon />,
            <Checklist />,
           ][index]
          }
         </ListItemIcon>
         <ListItemText primary={text} />
        </ListItemButton>
       </ListItem>
      </Link>
     ))}
    </List>
    <Divider />
    <List>
     {["Settings"].map((text, index) => (
      <ListItem key={text} disablePadding>
       <ListItemButton disabled>
        <ListItemIcon>
         {index % 2 === 0 ? <SettingsIcon /> : <MailIcon />}
        </ListItemIcon>
        <ListItemText primary={text} />
       </ListItemButton>
      </ListItem>
     ))}
    </List>
   </Box>
   <Box sx={{ flexGrow: 1 }} />
   <Navprofile isDrawer={true} />
  </>
 );

 return (
  <>
   <Modal
    isOpen={openAlert}
    title="Login"
    message={alertMessage}
    onCancel={() => {
     setOpenAlert(false);
     setAlertMessage("");
    }}
   />
   <Box
    sx={{
     display: "flex",
    }}
   >
    <CssBaseline />
    <AppBar
     position="fixed"
     sx={{
      width: { sm: !state.left ? `calc(100% - ${drawerWidth}px)` : "100%" },
      ml: { sm: `${drawerWidth}px` },
      display: { sm: "none" },
     }}
    >
     <Navhead isDrawer={false} />
    </AppBar>
    <Box
     component="nav"
     sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
     <Drawer
      variant="temporary"
      open={state.left}
      onClose={toggleDrawer(false)}
      ModalProps={{
       keepMounted: true,
      }}
      sx={{
       display: { xs: "block", sm: "none" },
       "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
      }}
     >
      {drawer}
     </Drawer>
     <Drawer
      variant="permanent"
      sx={{
       width: state.left ? drawerWidth : 0,
       display: { xs: "none", sm: "block" },
       "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
      }}
     >
      {drawer}
     </Drawer>
    </Box>
    {auth && (
     <Box
      component="main"
      sx={{
       width: { sm: `calc(100% - ${drawerWidth}px)` },
       overflow: "auto",
      }}
     >
      <Box
       sx={{
        display: { sm: "none" },
       }}
      >
       <Toolbar />
      </Box>
      {children}
     </Box>
    )}
   </Box>
  </>
 );
}
