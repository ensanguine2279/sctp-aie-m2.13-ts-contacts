type ContactCardProps = {
  name: string;
  email: string | null;
  onRemove?: () => void;
};

export function ContactCard({ name, email, onRemove }: ContactCardProps) {
  const emailText = email ?? "Email not provided";

  return (
    <article className="contact-card">
      <h3>{name}</h3>
      <p>{emailText}</p>
      {onRemove && <button onClick={onRemove}>Remove</button>}
    </article>
  );
}

export default ContactCard;
