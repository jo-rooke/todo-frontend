import ToDo from "./ToDo";
import AddToDo from "./AddToDo";
import { useState, useEffect } from "react";
import { ToDoProps } from "../ToDoProps";

export default function ToDoList(): JSX.Element {
  const [todos, setTodos] = useState<ToDoProps[]>([]);

  useEffect(() => {
    const fetchToDos = async () => {
      const response = await fetch("http://localhost:5000/todos/");
      const jsonBody: ToDoProps[] = await response.json();
      setTodos(jsonBody);
    };
    fetchToDos();
  }, []);

  const episodeElements = todos.map((todo) => (
    <ToDo
      key={todo.id}
      id={todo.id}
      description={todo.description}
      creation_date={todo.creation_date}
      due_date={todo.due_date}
      completed_status={todo.completed_status}
    />
  ));
  return (
    <>
      <h1> To Do: </h1>
      <AddToDo />
      <table className="table table-hover">
        <tbody>{episodeElements}</tbody>
      </table>
    </>
  );
}
