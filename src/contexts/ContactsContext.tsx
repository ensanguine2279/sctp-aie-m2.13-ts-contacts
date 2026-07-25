import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

import type { Contact } from "../types/Contact";

type ContactsContextValue = {
  contacts: Contact[];
  setContacts: (contacts: Contact[]) => void;
  addContact: (newContact: Contact) => void;
  removeContact: (id: number) => void;
};

const ContactsContext = createContext<ContactsContextValue | null>(null);

export function ContactsProvider({ children }: { children: ReactNode }) {
  const [contacts, setContacts] = useState<Contact[]>([]);

  const addContact = (newContact: Contact) => {
    setContacts((prev) => [...prev, newContact]);
  };

  const removeContact = (id: number) => {
    setContacts((prev) => prev.filter((contact) => contact.id !== id));
  };

  return (
    <ContactsContext.Provider
      value={{ contacts, setContacts, addContact, removeContact }}
    >
      {children}
    </ContactsContext.Provider>
  );
}

export function useContacts(): ContactsContextValue {
  const context = useContext(ContactsContext);
  if (!context) {
    throw new Error("useContacts must be used within a ContactsProvider");
  }
  return context;
}
