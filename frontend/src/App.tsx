import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Trash from "./pages/Trash";
import { useAuth0 } from "@auth0/auth0-react";
import NotAuthorised from "./pages/NotAuthorised";
import { Box, CircularProgress } from "@mui/material";

function App() {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <Box sx={{display: "flex", height: "90vh", width: "100svw", alignItems: "center", justifyContent: "center"}}>
      <CircularProgress />
    </Box>;
  }

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/trash"
            element={isAuthenticated ? <Trash /> : <Navigate to="/login" />}
          />
          <Route path="/login" element={<NotAuthorised />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
