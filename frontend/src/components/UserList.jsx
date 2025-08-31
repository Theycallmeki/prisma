import React, { useEffect, useState } from "react";

const API_BASE = "http://localhost:5000";

function UserList() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ email: "", name: "", role: "USER" });
  const [status, setStatus] = useState("");

  const fetchUsers = async () => {
    try {
      const res = await fetch(`${API_BASE}/users`);
      const data = await res.json();
      setUsers(data);
    } catch (e) {
      setStatus("❌ Error loading users");
    }
  };

  const createUser = async () => {
    if (!form.email) {
      setStatus("Email is required.");
      return;
    }
    try {
      await fetch(`${API_BASE}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setForm({ email: "", name: "", role: "USER" });
      setStatus("✅ User created");
      fetchUsers();
    } catch {
      setStatus("❌ Error creating user");
    }
  };

  const deleteUser = async (id) => {
    try {
      await fetch(`${API_BASE}/users/${id}`, { method: "DELETE" });
      setStatus("✅ User deleted");
      fetchUsers();
    } catch {
      setStatus("❌ Error deleting user");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <section className="card">
      <h2>Users</h2>
      <div className="content">
        <div className="row">
          <div>
            <label>Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="alice@example.com"
            />
          </div>
          <div>
            <label>Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Alice"
            />
          </div>
          <div>
            <label>Role</label>
            <select
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
            >
              <option value="USER">USER</option>
              <option value="ADMIN">ADMIN</option>
            </select>
          </div>
          <button onClick={createUser}>Create User</button>
        </div>
        <div>{status}</div>
        <div className="hr"></div>
        <table>
          <thead>
            <tr>
              <th>ID</th><th>Email</th><th>Name</th><th>Role</th><th>Posts</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr><td colSpan="6">No users yet. Create one above.</td></tr>
            ) : (
              users.map((u) => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.email}</td>
                  <td>{u.name || "—"}</td>
                  <td>{u.role}</td>
                  <td>{(u.posts || []).length}</td>
                  <td>
                    <button onClick={() => deleteUser(u.id)}>Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default UserList;
