import { useState } from "react";
import { getTicketsByEmail } from "../api/ticketApi";

const statusColors = { OPEN: "#f0ad4e", IN_PROGRESS: "#5bc0de", RESOLVED: "#5cb85c" };
const priorityColors = { LOW: "#5cb85c", MEDIUM: "#f0ad4e", HIGH: "#d9534f" };

export default function MyTickets() {
  const [email, setEmail] = useState("");
  const [tickets, setTickets] = useState([]);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const res = await getTicketsByEmail(email);
      setTickets(res.data);
      setSearched(true);
    } catch {
      setError("Could not fetch tickets. Try again.");
    }
  };
jknkdb
  return (
    <div style={{ padding: 20 }}>
      <h2>My Tickets</h2>
      <form onSubmit={handleSearch} style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ padding: 10, borderRadius: 6, border: "1px solid #ccc", flex: 1 }}
        />
        <button type="submit" style={{ padding: "10px 20px", background: "#050d79", color: "#fff", border: "none", borderRadius: 6, cursor: "pointer" }}>
          Search
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {searched && tickets.length === 0 && <p>No tickets found for this email.</p>}

      {tickets.map((t) => (
        <div key={t.id} style={styles.card}>
          <div style={styles.cardHeader}>
            <strong>{t.issueTitle}</strong>
            <span style={{ ...styles.badge, background: priorityColors[t.priority] }}>{t.priority}</span>
          </div>
          <p><b>Department:</b> {t.department}</p>
          <p>{t.issueDescription}</p>
          <p><b>Submitted:</b> {new Date(t.createdAt).toLocaleString()}</p>
          <span style={{ ...styles.badge, background: statusColors[t.status] }}>{t.status}</span>
        </div>
      ))}
    </div>
  );
}

const styles = {
  card: { border: "1px solid #ddd", borderRadius: 8, padding: 16, marginBottom: 16, background: "#fff", boxShadow: "0 1px 4px rgba(0,0,0,0.08)" },
  cardHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 },
  badge: { padding: "3px 10px", borderRadius: 12, color: "#fff", fontSize: 12, fontWeight: "bold" },
};