import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header style={styles.header}>
      <h1 style={styles.title}>📦 Prisma Express App</h1>
      <nav style={styles.nav}>
        <Link to="/users" style={styles.link}>Users</Link>
        <Link to="/posts" style={styles.link}>Posts</Link>
      </nav>
    </header>
  );
}

const styles = {
  header: {
    background: "#282c34",
    padding: "15px 20px",
    color: "white",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    margin: 0,
    fontSize: "1.5rem",
  },
  nav: {
    display: "flex",
    gap: "15px",
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontWeight: "bold",
  },
};

export default Header;
