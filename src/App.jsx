import { useEffect, useState } from "react";
import Header from "./components/Header";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import TaskStats from "./components/TaskStats";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");

    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [filter, setFilter] = useState("semua");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    const newTask = {
      id: Date.now(),
      ...task,
      completed: false,
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const toggleTask = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks((prevTasks) =>
      prevTasks.filter((task) => task.id !== id)
    );
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "selesai") {
      return task.completed;
    }

    if (filter === "belum") {
      return !task.completed;
    }

    return true;
  });

  return (
    <div className="app">
      <div className="container">
        <Header />

        <TaskStats tasks={tasks} />

        <TaskForm addTask={addTask} />

        <div className="filter-container">
          <button
            className={filter === "semua" ? "active" : ""}
            onClick={() => setFilter("semua")}
          >
            Semua
          </button>

          <button
            className={filter === "belum" ? "active" : ""}
            onClick={() => setFilter("belum")}
          >
            Belum Selesai
          </button>

          <button
            className={filter === "selesai" ? "active" : ""}
            onClick={() => setFilter("selesai")}
          >
            Selesai
          </button>
        </div>

        <TaskList
          tasks={filteredTasks}
          toggleTask={toggleTask}
          deleteTask={deleteTask}
        />
      </div>
    </div>
  );
}

export default App;