import { MainProps } from "../MainProps";
import axios from "axios";

export default function ToDo(props: MainProps): JSX.Element {
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
          description: //TBD
      } 

      )
      .then((response) => {
        props.fetchToDos();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //     const handleDeleteTodo = async () => {
  //   await axios
  //     .delete(`${API_BASE}todos/${props.todo.id}`)
  //     .then((response) => {
  //       props.loadAllToDos();
  //       console.log(response);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  //   const handleDoneChange = async () => {
  //     axios
  //       .patch(`${API_BASE}todos/${props.todo.id}`, {
  //         done: !props.todo.done,
  //       })
  //       .then((response) => {
  //         props.loadAllToDos();
  //         console.log(response);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   };

  return (
    <tr>
      <td>
        <input
          className="form-check-input"
          type="checkbox"
          value=""
          id="flexCheckDefault"
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
        <button type="button" className="btn btn-primary">
          Edit
        </button>
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
