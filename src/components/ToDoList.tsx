import ToDo from "./ToDo";
import AddToDo from "./AddToDo";
import { useState, useEffect } from "react";
import { ToDoProps } from "../ToDoProps";

export default function ToDoList(): JSX.Element {
  const [todos, setTodos] = useState<ToDoProps[]>([]);
  useEffect(() => {
    fetchToDos();
  }, []);

  const fetchToDos = async () => {
    const response = await fetch(
      "https://jr99-to-do-backend.herokuapp.com/todos/"
    );
    const jsonBody: ToDoProps[] = await response.json();
    setTodos(jsonBody);
  };

  const episodeElements = todos.map((todo) => (
    <ToDo
      key={todo.id}
      fetchToDos={fetchToDos}
      todoprops={todo} // todoprops describes the type of todo object
    />
  ));

  return (
    <>
      <h1> To Do: </h1>
      <AddToDo fetchToDos={fetchToDos} />
      <table className="table table-hover">
        <tbody>{episodeElements}</tbody>
      </table>
    </>
  );
}
