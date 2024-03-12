import React from "react";
import Header from "./Header";
import "bootstrap/dist/css/bootstrap.min.css";
import { Outlet } from "react-router-dom";
import DataProvider from "./store";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:3000";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
