import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import SideBar from "./SideBar";

export default function Navbar() {
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
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
