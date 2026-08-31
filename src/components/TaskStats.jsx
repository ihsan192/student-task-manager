function TaskStats({ tasks }) {
  const total = tasks.length;

  const completed = tasks.filter(
    (task) => task.completed
  ).length;

  const remaining = total - completed;

  return (
    <div className="stats">
      <div className="stat-card">
        <span>📋</span>

        <div>
          <p>Total</p>
          <h2>{total}</h2>
        </div>
      </div>

      <div className="stat-card">
        <span>⏳</span>

        <div>
          <p>Belum Selesai</p>
          <h2>{remaining}</h2>
        </div>
      </div>

      <div className="stat-card">
        <span>✅</span>

        <div>
          <p>Selesai</p>
          <h2>{completed}</h2>
        </div>
      </div>
    </div>
  );
}

export default TaskStats;