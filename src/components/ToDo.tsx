import { MainProps } from "../MainProps";
import axios from "axios";
import { useState } from "react";

export default function ToDo(props: MainProps): JSX.Element {
  const [editDescription, setEditDescription] = useState("");
  const [editingMode, setEditingMode] = useState(false);
  const sanitiseCTime = props.todoprops.creation_date.replace(
    "T00:00:00.000Z",
    ""
  );
  const sanitiseDTime = props.todoprops.due_date.replace("T00:00:00.000Z", "");

  async function handleDeleteTodo() {
    await axios
      .delete(
        `https://jr99-to-do-backend.herokuapp.com/todos/${props.todoprops.id}`
      )
      .then((response) => {
        props.fetchToDos();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function handleEditTodo() {
    await axios
      .put(
        `https://jr99-to-do-backend.herokuapp.com/todos/${props.todoprops.id}`,
        {
          description: editDescription,
        }
      )
      .then((response) => {
        props.fetchToDos();
        setEditingMode(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function handleCompletedTodo() {
    console.log(props.todoprops.completed_status);
    await axios
      .put(
        `https://jr99-to-do-backend.herokuapp.com/todos/completed/${props.todoprops.id}`,
        {
          completed_status: !props.todoprops.completed_status,
        }
      )
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
          onClick={handleCompletedTodo}
          defaultChecked={props.todoprops.completed_status}
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
        {editingMode === false ? (
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              setEditingMode(true);
            }}
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
