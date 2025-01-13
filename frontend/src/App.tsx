import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import { NotesInterface, useNotes } from "./context/Notes";
import Trash from "./pages/Trash";
import { getOrSetData } from "./utility";
import { toast, ToastContainer } from "react-toastify";

function App() {
  const { setNotes }: NotesInterface = useNotes();

  async function getData() {
    try {
      const response = await getOrSetData("api", "GET");
      setNotes(response);
    } catch (error: unknown) {
      toast.error("Something went wrong. Couldn't fetch data.");
      console.log(error);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/trash" element={<Trash />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer closeOnClick={true} />
    </>
  );
}

export default App;
