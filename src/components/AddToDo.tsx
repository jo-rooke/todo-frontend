import { useState } from "react";
import axios from "axios";

interface AddProps {
  fetchToDos: () => void;
}

export default function AddToDo(props: AddProps): JSX.Element {
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  async function handleAddTodo() {
    await axios
      .post("http://localhost:5000/todos", {
        description: description,
        due_date: dueDate,
      })
      .then((response) => {
        props.fetchToDos();
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <>
      <h3> Add a to-do item</h3>
      <form>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <button className="btn btn-success" onClick={handleAddTodo}>
          Add
        </button>
      </form>
    </>
  );
}
