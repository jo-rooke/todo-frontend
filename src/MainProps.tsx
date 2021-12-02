import { ToDoProps } from "./ToDoProps";

export interface MainProps {
  fetchToDos: () => void;
  todoprops: ToDoProps;
}
