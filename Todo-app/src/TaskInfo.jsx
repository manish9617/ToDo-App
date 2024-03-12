import axios from "axios";
import React, { useRef, useState } from "react";

const TaskInfo = ({ task, index, onEdit, onDelete }) => {
  const handleEdit = () => {};
  // const taskName = useRef(task.taskName);
  const [taskName, setName] = useState(task.taskName);
  const [taskDate, setDate] = useState(task.taskDate);
  return (
    <tr>
      <td>{index + 1}</td>
      <td>
        <input
          className="border-0"
          type="text"
          value={taskName}
          readOnly={true}
          onChange={(e) => {
            setName(e.target.value);
          }}
        ></input>
      </td>
      <td>{new Date(task.taskDate).toLocaleDateString()}</td>
      <td>
        <button className="btn btn-primary btn-sm" onClick={() => onEdit(task)}>
          Edit
        </button>
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
