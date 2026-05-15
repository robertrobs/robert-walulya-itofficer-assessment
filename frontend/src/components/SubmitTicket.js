import { useState } from "react";
import { createTicket } from "../api/ticketApi";

export default function SubmitTicket() {
  const [form, setForm] = useState({
    fullName: "", email: "", department: "",
    issueTitle: "", issueDescription: "", priority: "MEDIUM",
  });
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);
    try {
      await createTicket(form);
      setMessage("Ticket submitted successfully!");
      setForm({ fullName: "", email: "", department: "", issueTitle: "", issueDescription: "", priority: "MEDIUM" });
    } catch (err) {
      setError("Failed to submit ticket. Please check all fields.");
    }
  };

  return (
    <div style={styles.container}>
      <h2>Submit a Support Ticket</h2>

      {message && <p style={styles.success}>{message}</p>}
      {error && <p style={styles.error}>{error}</p>}

      <form onSubmit={handleSubmit} style={styles.form}>
        <input style={styles.input} name="fullName" placeholder="Full Name" value={form.fullName} onChange={handleChange} required />
        <input style={styles.input} name="email" placeholder="Email" type="email" value={form.email} onChange={handleChange} required />
        <input style={styles.input} name="department" placeholder="Department" value={form.department} onChange={handleChange} required />
        <input style={styles.input} name="issueTitle" placeholder="Issue Title" value={form.issueTitle} onChange={handleChange} required />
        <textarea style={styles.input} name="issueDescription" placeholder="Issue Description" value={form.issueDescription} onChange={handleChange} required rows={4} />
        <select style={styles.input} name="priority" value={form.priority} onChange={handleChange}>
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
        </select>
        <button style={styles.button} type="submit">Submit Ticket</button>
      </form>
    </div>
  );
}

const styles = {
  container: { maxWidth: 500, margin: "0 auto", padding: 20 },
  form: { display: "flex", flexDirection: "column", gap: 12 },
  input: { padding: 10, fontSize: 14, borderRadius: 6, border: "1px solid #ccc" },
  button: { padding: 10, background: "#050d79", color: "#fff", border: "none", borderRadius: 6, cursor: "pointer", fontSize: 15 },
  success: { color: "green", fontWeight: "bold" },
  error: { color: "red", fontWeight: "bold" },
};