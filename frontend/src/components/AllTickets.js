import { useEffect, useState } from "react";
import { getAllTickets, updateTicketStatus } from "../api/ticketApi";

const statusColors = {
  OPEN: "#f0ad4e",
  IN_PROGRESS: "#5bc0de",
  RESOLVED: "#5cb85c",
};

const priorityColors = {
  LOW: "#5cb85c",
  MEDIUM: "#f0ad4e",
  HIGH: "#d9534f",
};

export default function AllTickets() {
  const [tickets, setTickets] = useState([]);
  const [message, setMessage] = useState(null);

  const fetchTickets = async () => {
    const res = await getAllTickets();
    setTickets(res.data);
  };

  useEffect(() => { fetchTickets(); }, []);

  const handleStatusChange = async (id, status) => {
    try {
      await updateTicketStatus(id, status);
      setMessage("Status updated!");
      fetchTickets();
      setTimeout(() => setMessage(null), 3000);
    } catch {
      setMessage("Failed to update status.");
    }
  };
  return (
    <div style={{ padding: 20 }}>
      <h2>All Tickets</h2>
      {message && <p style={{ color: message.startsWith("✅") ? "green" : "red", fontWeight: "bold" }}>{message}</p>}
      {tickets.length === 0 ? (
        <p>No tickets found.</p>
      ) : (
        tickets.map((t) => (
          <div key={t.id} style={styles.card}>
            <div style={styles.cardHeader}>
              <strong>{t.issueTitle}</strong>
              <span style={{ ...styles.badge, background: priorityColors[t.priority] }}>{t.priority}</span>
            </div>
            <p><b>Name:</b> {t.fullName} | <b>Email:</b> {t.email} | <b>Dept:</b> {t.department}</p>
            <p>{t.issueDescription}</p>
            <p><b>Submitted:</b> {new Date(t.createdAt).toLocaleString()}</p>
            <div style={styles.statusRow}>
              <span style={{ ...styles.badge, background: statusColors[t.status] }}>{t.status}</span>
              <select
                value={t.status}
                onChange={(e) => handleStatusChange(t.id, e.target.value)}
                style={styles.select}
              >
                <option value="OPEN">OPEN</option>
                <option value="IN_PROGRESS">IN_PROGRESS</option>
                <option value="RESOLVED">RESOLVED</option>
              </select>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

const styles = {
  card: { border: "1px solid #ddd", borderRadius: 8, padding: 16, marginBottom: 16, background: "#fff", boxShadow: "0 1px 4px rgba(0,0,0,0.08)" },
  cardHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 },
  badge: { padding: "3px 10px", borderRadius: 12, color: "#fff", fontSize: 12, fontWeight: "bold" },
  statusRow: { display: "flex", alignItems: "center", gap: 12, marginTop: 8 },
  select: { padding: "5px 10px", borderRadius: 6, border: "1px solid #ccc", cursor: "pointer" },
};