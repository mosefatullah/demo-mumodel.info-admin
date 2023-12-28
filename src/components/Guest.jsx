import * as React from "react";

/* Components */
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Divider from "@mui/material/Divider";

/* Icons */
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import GoogleIcon from "../assets/google.png";


export default function Guest({ authTop }) {

 if (!authTop) {
  return (
   <>
    <Container component="main" maxWidth="xs">
     <CssBaseline />
     <Box
      sx={{
       marginTop: 8,
       display: "flex",
       flexDirection: "column",
       alignItems: "center",
      }}
     >
      <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
       <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
       Admin Panel
      </Typography>
      <Box component="form" sx={{ mt: 4 }}>
       <Button
        variant="contained"
        size="small"
        color="secondary"
        fullWidth
        sx={{ mb: 2.5, py: 1 }}
       >
        <img
         src={GoogleIcon}
         style={{ width: "25px", height: "25px", marginRight: 8 }}
        />{" "}
        Login With Google
       </Button>
       <Divider sx={{ mb: 2, mt: 1 }}>
        <Typography variant="body2" color="text.secondary" align="center">
         Or
        </Typography>
       </Divider>
       <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
       />
       <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
       />
       <FormControlLabel
        control={<Checkbox value="remember" color="primary" />}
        checked={true}
        label="Logging in as an admin"
       />
       <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 1.5, py: 1 }}
       >
        Sign In
       </Button>
       <Grid container>
        <Grid item xs>
         <Link
          href="#"
          variant="body2"
          onClick={() => {
           setErrorAlert(
            "Login with the google account with the same email. Or, contact us to reset your password. We will send you a new password."
           );
           setOpenAlert(true);
          }}
         >
          Forgot password?
         </Link>
        </Grid>
        <Grid item>
         <Link href="https://www.mumodel.info/" variant="body2">
          {"Trouble logging in? Contact us."}
         </Link>
        </Grid>
       </Grid>
      </Box>
     </Box>
     <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      sx={{ mt: 8, mb: 4 }}
     >
      {"Developed by "}
      <Link
       color="inherit"
       href="https://www.facebook.com/sefatullahpage"
       target="_blank"
      >
       Mohammad Sefatullah
      </Link>
     </Typography>
    </Container>
   </>
  );
 } else {
  return <></>;
 }
}
