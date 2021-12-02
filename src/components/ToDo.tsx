import { MainProps } from "../MainProps";
import axios from "axios";
import { useState } from "react";

export default function ToDo(props: MainProps): JSX.Element {
  const [editDescription, setEditDescription] = useState("");
  const sanitiseCTime = props.todoprops.creation_date.replace(
    "T00:00:00.000Z",
    ""
  );
  const sanitiseDTime = props.todoprops.due_date.replace("T00:00:00.000Z", "");

  async function handleDeleteTodo() {
    await axios
      .delete(`http://localhost:5000/todos/${props.todoprops.id}`)
      .then((response) => {
        props.fetchToDos();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function handleEditTodo() {
    await axios
      .put(`http://localhost:5000/todos/${props.todoprops.id}`, {
        description: editDescription,
      })
      .then((response) => {
        props.fetchToDos();
        editMode = false;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  let editMode = false;

  function handleEditMode() {
    if (editMode === false) {
      editMode = true;
    } else {
      editMode = false;
    }
  }

  async function handleCompletedTodo() {
    await axios
      .put(`http://localhost:5000/todos/${props.todoprops.id}`, {
        completed_status: !props.todoprops.completed_status,
      })
      .then((response) => {
        props.fetchToDos();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <tr>
      <td>
        <input
          className="form-check-input"
          type="checkbox"
          value=""
          id="flexCheckDefault"
          checked={props.todoprops.completed_status}
          onChange={handleCompletedTodo}
        />
      </td>
      <td>{props.todoprops.description}</td>
      <td>
        {" "}
        <strong>Due: </strong>
        {sanitiseDTime}
      </td>
      <td>
        {" "}
        <strong>Created:</strong> {sanitiseCTime}
      </td>

      <td>
        {editMode === false ? (
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleEditMode}
          >
            Edit
          </button>
        ) : (
          <>
            <input
              type="text"
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
            />
            <button
              type="button"
              className="btn btn-success"
              onClick={handleEditTodo}
            >
              Confirm
            </button>
          </>
        )}
      </td>
      <td>
        <button
          type="button"
          className="btn btn-danger"
          onClick={handleDeleteTodo}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}
