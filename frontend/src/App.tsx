import axios from "axios";
import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import { NotesInterface, useNotes } from "./context/Notes";
import Trash from "./pages/Trash";

function App() {
  const { setNotes }: NotesInterface = useNotes();
  const apiUrl: string =
    process.env.REACT_APP_BACKEND_API_URL || "http://localhost:3000/api";
  async function fetchData() {
    try {
      if (apiUrl) {
        const response = await axios.get("http://localhost:3000/api");
        setNotes(response.data);
      }
    } catch (error: unknown) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, [apiUrl]);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trash" element={<Trash />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
