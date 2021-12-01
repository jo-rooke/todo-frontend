import { ToDoProps } from "../ToDoProps";

export default function ToDo(props: ToDoProps): JSX.Element {
  const sanitiseCTime = props.creation_date.replace("T00:00:00.000Z", "");
  const sanitiseDTime = props.due_date.replace("T00:00:00.000Z", "");
  let completedMessage = "";
  if (props.completed_status) {
    completedMessage = "Completed!";
  } else {
    completedMessage = "Still outstanding";
  }
  //       const handleDeleteTodo = async () => {
  //     await axios
  //       .delete(`${API_BASE}todos/${props.todo.id}`)
  //       .then((response) => {
  //         props.loadAllToDos();
  //         console.log(response);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   };

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
      <td>{props.description}</td>
      <td> Due: {sanitiseDTime}</td>
      <td> created: {sanitiseCTime}</td>

      <td>
        <button type="button" className="btn btn-success">
          Edit
        </button>
      </td>
      <td>
        <button type="button" className="btn btn-success">
          Delete
        </button>
      </td>
    </tr>
  );
}
