function TaskItem({ task, toggleTask, deleteTask }) {

  const getDeadlineStatus = () => {
    const today = new Date();
    const deadline = new Date(task.deadline);

    today.setHours(0, 0, 0, 0);
    deadline.setHours(0, 0, 0, 0);

    const difference =
      (deadline - today) / (1000 * 60 * 60 * 24);

    if (difference < 0) {
      return {
        text: "🔵 Deadline Terlewat",
        className: "deadline-late",
      };
    }

    if (difference === 0) {
      return {
        text: "🔴 Deadline Hari Ini",
        className: "deadline-today",
      };
    }

    if (difference === 1) {
      return {
        text: "🟡 Deadline Besok",
        className: "deadline-tomorrow",
      };
    }

    return {
      text: `📅 ${task.deadline}`,
      className: "deadline-normal",
    };
  };

  const deadlineStatus = getDeadlineStatus();

  return (
    <div className={`task-item ${task.completed ? "completed" : ""}`}>

      <div className="task-left">

        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleTask(task.id)}
        />

        <div>
          <h3>{task.title}</h3>

          <div className="task-info">

            <span>📚 {task.subject}</span>

            <span>🎯 {task.priority}</span>

            <span className={deadlineStatus.className}>
              {deadlineStatus.text}
            </span>

          </div>
        </div>

      </div>

      <button
        className="delete-btn"
        onClick={() => deleteTask(task.id)}
      >
        Hapus
      </button>

    </div>
  );
}

export default TaskItem;