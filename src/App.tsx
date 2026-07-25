// src/App.tsx
import type React from "react";

import { useState, useEffect } from "react";

import type { Contact } from "./types/Contact";

import { useAuth } from "./contexts/AuthContext";

import { SearchBar } from "./components/SearchBar";
import { ContactList } from "./components/ContactList";

import "./App.css";

const appTitle: string = "ts-contacts";

export default function App() {
  //const { user, login, logout } = useAuth();

  const [contacts, setContacts] = useState<Contact[]>([]);

  const [query, setQuery] = useState("");
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadContacts = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:3001/contacts");

        if (!response.ok) {
          throw new Error(`Request failed: ${response.status}`);
        }

        const data: Contact[] = await response.json();
        setContacts(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    loadContacts();
  }, []);

  const filtered = contacts.filter((c) =>
    c.name.toLowerCase().includes(query.toLowerCase()),
  );

  const addContact = (newContact: Contact) => {
    setContacts((prev) => [...prev, newContact]);
  };

  const removeContact = (id: number) => {
    setContacts((prev) => prev.filter((c) => c.id !== id));
  };

  const handleAdd = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newName || !newEmail) return;
    addContact({ id: Date.now(), name: newName, email: newEmail });
    setNewName("");
    setNewEmail("");
  };

  if (loading) return <p className="status-message">Loading...</p>;
  if (error) return <p className="status-message error">Error: {error}</p>;

  return (
    <div className="app">
      <h1>ts-contacts</h1>

      <SearchBar query={query} onQueryChange={setQuery} />

      <form onSubmit={handleAdd} className="add-contact-form">
        <input
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="Name"
        />
        <input
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          placeholder="Email"
        />
        <button type="submit">Add</button>
      </form>

      <ContactList
        contacts={filtered}
        title="Contacts"
        onRemove={removeContact}
      />
    </div>
  );
}
