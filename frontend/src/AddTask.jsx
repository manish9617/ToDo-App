import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
const AddTask = () => {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  const [formData, setFormData] = useState({
    task: "",
    date: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    axios.post("http://localhost:3000/addtask", formData).then((res) => {
      if (res.data.Status === "Success") {
        toast.success("Added successfully");
        navigate("/");
      } else {
        toast.error(res.data.Error);
      }
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="container mt-5">
      <div
        className="card p-4"
        style={{ maxWidth: "575px", margin: "0 auto", background: "#333" }}
      >
        <center>
          <h3 className="text-white mb-4">Add Task</h3>
        </center>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="task" className="form-label text-white">
              Task
            </label>
            <input
              type="text"
              className="form-control"
              id="task"
              name="task"
              placeholder="Enter task"
              required
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="date" className="form-label text-white">
              Task
            </label>
            <input
              type="date"
              className="form-control"
              id="date"
              name="date"
              required
              onChange={handleInputChange}
            />
          </div>

          <button type="submit" className="btn btn-primary w-100 mb-2">
            Add Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTask;
