"use client";

import { FormEvent, useEffect, useState } from "react";
import {
  createUser,
  getUsers,
  type User,
} from "@/lib/userService";

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadUsers() {
      try {
        setError("");

        const data = await getUsers();
        setUsers(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load users.");
      } finally {
        setLoading(false);
      }
    }

    loadUsers();
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    if (!trimmedName || !trimmedEmail) {
      return;
    }

    try {
      setSubmitting(true);
      setError("");

      const newUser = await createUser({
        name: trimmedName,
        email: trimmedEmail,
      });

      setUsers((currentUsers) => [...currentUsers, newUser]);

      setName("");
      setEmail("");
    } catch (err) {
      console.error(err);
      setError("Failed to create user.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="container">
      <section className="card">
        <h1>User Management</h1>

        <p className="subtitle">
          Next.js App Router + Spring Boot
        </p>

        <form onSubmit={handleSubmit} className="user-form">
          <div className="form-group">
            <label htmlFor="name">Name</label>

            <input
              id="name"
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              disabled={submitting}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>

            <input
              id="email"
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              disabled={submitting}
              required
            />
          </div>

          <button type="submit" disabled={submitting}>
            {submitting ? "Adding..." : "Add User"}
          </button>
        </form>

        {error && <p className="error">{error}</p>}

        <div className="users-section">
          <h2>Users ({users.length})</h2>

          {loading ? (
            <p className="status">Loading users...</p>
          ) : users.length === 0 ? (
            <p className="status">No users found.</p>
          ) : (
            <ul className="user-list">
              {users.map((user) => (
                <li key={user.id} className="user-item">
                  <div>
                    <strong>{user.name}</strong>
                    <span>{user.email}</span>
                  </div>

                  <span className="user-id">#{user.id}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </main>
  );
}