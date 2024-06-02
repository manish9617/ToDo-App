// import axios from "axios";
import React, { useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
const TaskInfo = ({ task, index, onEdit, onDelete }) => {
  axios.defaults.withCredentials = true;
  const [isedit, setEdit] = useState(true);
  const handleEdit = () => {
    setEdit(false);
  };

  // const taskName = useRef(task.taskName);
  const [taskName, setName] = useState(task.taskName);
  // console.log(task);
  const handleEditSave = () => {
    axios
      .patch("http://localhost:3000/edit", {
        id: task.id,
        taskName: taskName,
      })
      .then((res) => {
        if (res.data.Status === "Success") {
          toast.update("Update sucessfully");
        } else {
          toast.error("Update failed");
        }
      });
    setEdit(true);
  };
  return (
    <tr>
      <td>{index + 1}</td>
      <td>
        <input
          className="border-0"
          type="text"
          value={taskName}
          readOnly={isedit}
          onChange={(e) => setName(e.target.value)}
        ></input>
      </td>
      <td>{new Date(task.taskDate).toLocaleDateString()}</td>
      <td>
        {isedit && (
          <button
            className="btn btn-primary btn-sm"
            onClick={() => handleEdit()}
          >
            Edit
          </button>
        )}
        {!isedit && (
          <button
            className="btn btn-danger btn-sm me-1"
            onClick={() => {
              setEdit(true);
              location.href = "/";
            }}
          >
            Cancel
          </button>
        )}
        {!isedit && (
          <button
            className="btn btn-success btn-sm ms-1"
            onClick={handleEditSave}
          >
            Save
          </button>
        )}
      </td>
      <td>
        <button
          className="btn btn-danger btn-sm"
          onClick={() => {
            onDelete(task.id);
          }} // Pass task.id to handleDelete function
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default TaskInfo;
