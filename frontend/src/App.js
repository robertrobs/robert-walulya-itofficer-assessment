import { useState } from "react";
import SubmitTicket from "./components/SubmitTicket";
import AllTickets from "./components/AllTickets";
import MyTickets from "./components/MyTickets";

export default function App() {
  const [page, setPage] = useState("submit");

  return (
    <div style={{ fontFamily: "Arial, sans-serif", minHeight: "100vh", background: "#f4f6f9" }}>
      {/* Navbar */}
      <nav style={styles.nav}>
        <span style={styles.brand}>UIBFS Helpdesk</span>
        <div style={styles.navLinks}>
          <button style={{ ...styles.navBtn, ...(page === "submit" ? styles.active : {}) }} onClick={() => setPage("submit")}>Submit Ticket</button>
          <button style={{ ...styles.navBtn, ...(page === "all" ? styles.active : {}) }} onClick={() => setPage("all")}>All Tickets</button>
          <button style={{ ...styles.navBtn, ...(page === "my" ? styles.active : {}) }} onClick={() => setPage("my")}>My Tickets</button>
        </div>
      </nav>

      {/* Page Content */}
      <div style={styles.content}>
        {page === "submit" && <SubmitTicket />}
        {page === "all" && <AllTickets />}
        {page === "my" && <MyTickets />}
      </div>
    </div>
  );
}

const styles = {
  nav: { background: "#050d79", padding: "12px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" },
  brand: { color: "#fff", fontSize: 20, fontWeight: "bold" },
  navLinks: { display: "flex", gap: 10 },
  navBtn: { padding: "8px 16px", border: "none", borderRadius: 6, cursor: "pointer", background: "transparent", color: "#fff", fontSize: 14 },
  active: { background: "#fff", color: "#050d79", fontWeight: "bold" },
  content: { maxWidth: 900, margin: "30px auto", background: "#fff", borderRadius: 10, padding: 24, boxShadow: "0 2px 8px rgba(0,0,0,0.1)" },
};