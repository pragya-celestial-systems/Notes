import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import SideBar from "./SideBar";
import { useAuth0 } from "@auth0/auth0-react";

export default function Navbar() {
  const { loginWithRedirect, isAuthenticated, logout } = useAuth0();

  async function handleAuthentication(e: React.BaseSyntheticEvent) {
    if(e.target.textContent === "Login"){
      await loginWithRedirect();
    }else{
      const confirm = window.confirm("Are you sure you want to logout? You can login again any time.");;

      if(!confirm) return;

      logout({ logoutParams: { returnTo: window.location.origin } });
    }
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{ background: "#fff", boxShadow:"0 3px 15px lightgrey", color: "#000" }}
      >
        <Toolbar>
          <SideBar />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Notes
          </Typography>
          <Button color="inherit" onClick={handleAuthentication}>{isAuthenticated ? "Logout" : "Login"}</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
