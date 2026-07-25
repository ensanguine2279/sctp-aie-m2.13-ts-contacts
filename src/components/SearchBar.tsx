// src/components/SearchBar.tsx
type SearchBarProps = {
  query: string;
  onQueryChange: (value: string) => void;
};

export function SearchBar({ query, onQueryChange }: SearchBarProps) {
  return (
    <input
      className="search-input"
      value={query}
      onChange={(e) => onQueryChange(e.target.value)}
      placeholder="Search contacts..."
    />
  );
}
