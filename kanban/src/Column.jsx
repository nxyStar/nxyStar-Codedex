import React from "react";
import Task from "./Task.jsx";

export default function Column({ title, tasks }) {
  //const { title, tasks }= this.props;
  return (
    <div className="column">
      <h2>{title}</h2>

      {tasks.map(function (task) {
        return <Task key={task.id} task={task} />;
      })}
    </div>
  );
}
