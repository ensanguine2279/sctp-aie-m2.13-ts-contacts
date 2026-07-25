// src/components/ContactList.tsx
import type { Contact } from "../types/Contact";

import ContactCard from "./ContactCard";

type ContactListProps = {
  title?: string;
  contacts: Contact[];
  onRemove?: (id: number) => void;
};

export function ContactList({ title, contacts, onRemove }: ContactListProps) {
  return (
    <>
      {title && <h2>{title}</h2>}
      <ul className="contact-list">
        {contacts.map((c) => (
          <li key={c.id} className="contact-item">
            <ContactCard
              name={c.name}
              email={c.email}
              onRemove={onRemove ? () => onRemove(c.id) : undefined}
            />
          </li>
        ))}
      </ul>
    </>
  );
}
