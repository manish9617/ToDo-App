import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import TaskInfo from "./TaskInfo";
import { AllFuntion } from "./store";
import { toast } from "react-toastify"; // Don't forget to import toast from react-toastify

const AllTask = () => {
  axios.defaults.withCredentials = true;
  const { auth, handleAuth } = useContext(AllFuntion);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("token") != null) {
      axios.get("http://localhost:3000/auth").then((res) => {
        if (res.data.Status === "Success") {
          handleAuth();
        } else {
          console.log(res.data.Error);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (auth) {
      axios.get("http://localhost:3000/data").then((res) => {
        setData(res.data.tasks);
      });
    }
  }, [auth]);

  const handleEdit = (task) => {
    // Handle editing task
    console.log("Editing task:", task);
  };

  const handleDelete = (taskId) => {
    axios
      .delete(`http://localhost:3000/delete/${taskId}`)
      .then((res) => {
        if (res.data.Status === "Success") {
          toast.success("Task deleted successfully");
          // Update data state to remove the deleted task
          setData(data.filter((task) => task.id !== taskId));
        } else {
          toast.error("Failed to delete task");
        }
      })
      .catch((err) => {
        console.error("Error deleting task:", err);
        toast.error("Failed to delete task");
      });
  };

  return (
    <div className="container mt-4">
      {!auth ? (
        <div className="text-center">First do login</div>
      ) : (
        <>
          {data != null && data.length > 0 ? (
            <table className="table">
              <thead>
                <tr>
                  <th>Serial Number</th>
                  <th>Task Name</th>
                  <th>Task Date</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {data.map((task, index) => (
                  <TaskInfo
                    key={task.id}
                    task={task}
                    index={index}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center">No tasks found. Add some tasks!</div>
          )}
        </>
      )}
    </div>
  );
};

export default AllTask;
