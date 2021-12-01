import { ToDoProps } from "../ToDoProps";

export default function AddToDo(): JSX.Element {
  return (
    <>
      <h2> Add a to-do item</h2>
      <form>
        <input type="text" />
        <button>Add</button>
      </form>
    </>
  );
}
