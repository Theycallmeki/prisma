import React, { useEffect, useState } from "react";

const API_BASE = "http://localhost:5000";

function PostList() {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ title: "", authorId: "" });
  const [status, setStatus] = useState("");

  const fetchData = async () => {
    try {
      const [postRes, userRes] = await Promise.all([
        fetch(`${API_BASE}/posts`),
        fetch(`${API_BASE}/users`),
      ]);
      setPosts(await postRes.json());
      setUsers(await userRes.json());
    } catch {
      setStatus("❌ Error loading posts");
    }
  };

  const createPost = async () => {
    if (!form.title) {
      setStatus("Title is required.");
      return;
    }
    try {
      await fetch(`${API_BASE}/posts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setForm({ title: "", authorId: "" });
      setStatus("✅ Post created");
      fetchData();
    } catch {
      setStatus("❌ Error creating post");
    }
  };

  const publishPost = async (id) => {
    try {
      await fetch(`${API_BASE}/posts/${id}/publish`, { method: "PUT" });
      setStatus("✅ Post published");
      fetchData();
    } catch {
      setStatus("❌ Error publishing post");
    }
  };

  const deletePost = async (id) => {
    try {
      await fetch(`${API_BASE}/posts/${id}`, { method: "DELETE" });
      setStatus("✅ Post deleted");
      fetchData();
    } catch {
      setStatus("❌ Error deleting post");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section className="card">
      <h2>Posts</h2>
      <div className="content">
        <div className="row">
          <div>
            <label>Title</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="My first post"
            />
          </div>
          <div>
            <label>Author</label>
            <select
              value={form.authorId}
              onChange={(e) => setForm({ ...form, authorId: e.target.value })}
            >
              <option value="">Select Author</option>
              {users.map((u) => (
                <option key={u.id} value={u.id}>
                  #{u.id} • {u.email}
                </option>
              ))}
            </select>
          </div>
          <button onClick={createPost}>Create Post</button>
        </div>
        <div>{status}</div>
        <div className="hr"></div>
        <table>
          <thead>
            <tr>
              <th>ID</th><th>Title</th><th>Author</th><th>Published</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.length === 0 ? (
              <tr><td colSpan="5">No posts yet. Create one above.</td></tr>
            ) : (
              posts.map((p) => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.title}</td>
                  <td>{p.author ? `#${p.author.id} • ${p.author.email}` : "(none)"}</td>
                  <td>{p.published ? "YES" : "NO"}</td>
                  <td>
                    <button
                      disabled={p.published}
                      onClick={() => publishPost(p.id)}
                    >
                      Publish
                    </button>
                    <button onClick={() => deletePost(p.id)}>Delete</button>
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

export default PostList;
