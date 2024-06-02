import React from "react";
import Header from "./Header";
import "bootstrap/dist/css/bootstrap.min.css";
import { Outlet } from "react-router-dom";
import DataProvider from "./store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
// axios.defaults.url = "http://localhost:3000";
function App() {
  return (
    <DataProvider>
      <Header></Header>
      <Outlet></Outlet>
      <ToastContainer />
    </DataProvider>
  );
}

export default App;
