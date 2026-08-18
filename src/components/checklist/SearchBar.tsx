interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative">
      <label htmlFor="checklist-search" className="sr-only">
        Find something in your bags
      </label>
      <input
        id="checklist-search"
        type="search"
        placeholder="Find something... e.g. maternity pads"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="field-input pl-10"
      />
      <span
        className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
        aria-hidden="true"
      >
        🔍
      </span>
    </div>
  );
}
