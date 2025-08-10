"use client";
import { useEffect, useState } from "react";
type Todo = { id: number; title: string; done: boolean };

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState("");

  const load = async () => {
    const res = await fetch("/api/todos", { cache: "no-store" });
    setTodos(await res.json());
  };
  useEffect(() => { load(); }, []);

  const add = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    await fetch("/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title })
    });
    setTitle("");
    await load();
  };
  const toggle = async (id: number) => { await fetch(`/api/todos/${id}/toggle`, { method: "POST" }); await load(); };
  const del = async (id: number) => { await fetch(`/api/todos/${id}`, { method: "DELETE" }); await load(); };

  return (
    <main style={{ maxWidth: 680, margin: "40px auto", padding: 16 }}>
      <h1>Todos</h1>
      <form onSubmit={add} style={{ display: "flex", gap: 8 }}>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Add a task..." style={{ flex: 1, padding: 8 }} />
        <button type="submit">Add</button>
      </form>
      <ul style={{ listStyle: "none", padding: 0, marginTop: 24 }}>
        {todos.map((t) => (
          <li key={t.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "8px 0", borderBottom: "1px solid #eee" }}>
            <input type="checkbox" checked={t.done} onChange={() => toggle(t.id)} />
            <span style={{ textDecoration: t.done ? "line-through" : "none", flex: 1 }}>{t.title}</span>
            <button onClick={() => del(t.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </main>
  );
}
