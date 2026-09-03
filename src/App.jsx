import { useEffect, useState } from "react";
import Header from "./components/Header";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import TaskStats from "./components/TaskStats";
import "./App.css";

function App() {
  // =========================
  // STATE TASKS
  // =========================
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");

    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  // =========================
  // STATE FILTER
  // =========================
  const [filter, setFilter] = useState("semua");

  // =========================
  // STATE EDITING
  // =========================
  const [editingTask, setEditingTask] = useState(null);

  // =========================
  // STATE DARK MODE
  // =========================
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  // =========================
  // SIMPAN TASK KE LOCAL STORAGE
  // =========================
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // =========================
  // SIMPAN DARK MODE
  // =========================
  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  // =========================
  // TAMBAH TASK
  // =========================
  const addTask = (task) => {
    const newTask = {
      id: Date.now(),
      ...task,
      completed: false,
    };

    setTasks((prevTasks) => [
      ...prevTasks,
      newTask,
    ]);
  };

  // =========================
  // SELESAI / BELUM SELESAI
  // =========================
  const toggleTask = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed,
            }
          : task
      )
    );
  };

  // =========================
  // HAPUS TASK
  // =========================
  const deleteTask = (id) => {
    setTasks((prevTasks) =>
      prevTasks.filter(
        (task) => task.id !== id
      )
    );
  };

  // =========================
  // UPDATE TASK
  // =========================
  const updateTask = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === updatedTask.id
          ? updatedTask
          : task
      )
    );

    setEditingTask(null);
  };

  // =========================
  // FILTER TASK
  // =========================
  const filteredTasks = tasks.filter((task) => {
    if (filter === "selesai") {
      return task.completed;
    }

    if (filter === "belum") {
      return !task.completed;
    }

    return true;
  });

  // =========================
  // RETURN
  // =========================
  return (
    <div
      className={`app ${
        darkMode ? "dark" : ""
      }`}
    >
      <div className="container">

        {/* HEADER */}
        <Header />

        {/* DARK MODE */}
        <div className="theme-toggle">
          <button
            onClick={() =>
              setDarkMode(!darkMode)
            }
          >
            {darkMode
              ? "☀️ Light Mode"
              : "🌙 Dark Mode"}
          </button>
        </div>

        {/* STATISTIK */}
        <TaskStats tasks={tasks} />

        {/* FORM */}
        <TaskForm
          addTask={addTask}
          editingTask={editingTask}
          updateTask={updateTask}
        />

        {/* FILTER */}
        <div className="filter-container">

          <button
            className={
              filter === "semua"
                ? "active"
                : ""
            }
            onClick={() =>
              setFilter("semua")
            }
          >
            Semua
          </button>

          <button
            className={
              filter === "belum"
                ? "active"
                : ""
            }
            onClick={() =>
              setFilter("belum")
            }
          >
            Belum Selesai
          </button>

          <button
            className={
              filter === "selesai"
                ? "active"
                : ""
            }
            onClick={() =>
              setFilter("selesai")
            }
          >
            Selesai
          </button>

        </div>

        {/* LIST TASK */}
        <TaskList
          tasks={filteredTasks}
          toggleTask={toggleTask}
          deleteTask={deleteTask}
          setEditingTask={setEditingTask}
        />

      </div>
    </div>
  );
}

export default App; 