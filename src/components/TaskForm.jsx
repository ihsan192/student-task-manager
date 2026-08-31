import { useState } from "react";

function TaskForm({ addTask }) {
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [deadline, setDeadline] = useState("");
  const [customSubject, setCustomSubject] = useState("");
  const [priority, setPriority] = useState("Sedang");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Jika memilih Lainnya, gunakan nama dari customSubject
    const finalSubject =
      subject === "Lainnya" ? customSubject : subject;

    if (!title || !finalSubject || !deadline) {
      alert("Semua data harus diisi!");
      return;
    }

    addTask({
      title,
      subject: finalSubject,
      deadline,
      priority,
    });

    setTitle("");
    setSubject("");
    setCustomSubject("");
    setDeadline("");
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h2>Tambah Tugas</h2>

      <div className="form-grid">
        <input
          type="text"
          placeholder="Nama tugas..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <select
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        >
          <option value="">Pilih pelajaran</option>
          <option value="Pemrograman">Pemrograman</option>
          <option value="Jaringan">Jaringan</option>
          <option value="IoT">IoT</option>
          <option value="Matematika">Matematika</option>
          <option value="Bahasa Inggris">Bahasa Inggris</option>
          <option value="Lainnya">Lainnya</option>
        </select>

        {subject === "Lainnya" && (
          <input
            type="text"
            placeholder="Tulis nama pelajaran..."
            value={customSubject}
            onChange={(e) => setCustomSubject(e.target.value)}
          />
        )}

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="Tinggi">🔴 Tinggi</option>
          <option value="Sedang">🟡 Sedang</option>
          <option value="Rendah">🟢 Rendah</option>
        </select>
        
        <input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />

        <button type="submit">
          + Tambah Tugas
        </button>
      </div>
    </form>
  );
}

export default TaskForm;