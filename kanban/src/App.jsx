import { useState, useContext, createContext, useEffect } from "react";
import Column from "./Column.jsx";

import "./styles.css";

// Declare context here 💖
export const BoardContext = createContext();

const TaskBoardProvider = function () {
  // Add useState here 💖
  const [tasks, setTasks] = useState([
    { id: 1, title: "Learn React", status: "todo" },
    { id: 2, title: "Feed Buddy", status: "todo" },
    { id: 3, title: "30 Nites of code", status: "todo" }
  ]);

  const moveTask = function (taskId, newStatus) {
    const updatedTasks = tasks.map(function (task) {
      if (task.id === taskId) {
        return { ...task, status: newStatus };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  // add useEffect here 💖
  useEffect(function() { 
    const doneTasks = document.querySelectorAll(".task[data-status='done']");
    doneTasks.forEach(function(taskElement) {
      taskElement.style.backgroundColor = "#dbf3c9";
    });
  }, [tasks]);

  return (
    <BoardContext.Provider value={{ tasks, moveTask }}>
      <Board />
    </BoardContext.Provider>
  );
};

const Board = function () {
  // add useContext here 💖
  const { tasks } = useContext(BoardContext);

  return (
    <div className="board">
      <Column
        title="To Do 🪄"
        tasks={tasks.filter(function (task) {
          return task.status === "todo";
        })}
      />
      <Column
        title="In Progress 🚀"
        tasks={tasks.filter(function (task) {
          return task.status === "inProgress";
        })}
      />
      <Column
        title="Done 🌟"
        tasks={tasks.filter(function (task) {
          return task.status === "done";
        })}
      />
    </div>
  );
};

export default function App() {
  return (
  <div className="App">
    <TaskBoardProvider />
  </div>
  )
}
