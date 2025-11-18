import { useState, type JSX } from "react";

interface MultiSelectProps {
    label?: string;
    options: string[];
    selected: string[];
    onChange: (next: string[]) => void;
}

export default function MultiSelect({
    label = "Catégories",
    options,
    selected,
    onChange
}: MultiSelectProps): JSX.Element {
    const [open, setOpen] = useState<boolean>(false);
    const placeholder = `Sélectionner des ${label.toLowerCase()}`;

    function toggleOption(option: string): void {
        if (selected.includes(option)) {
            onChange(selected.filter((v) => v !== option));
        } else {
            onChange([...selected, option]);
        }
    }

    return (
        <div className="relative w-full">
            <label className="block text-sm font-medium mb-2">
                {label}
            </label>

            <button
                type="button"
                onClick={() => setOpen(!open)}
                className="input flex justify-between items-center cursor-pointer"
            >
                <span>
                    {selected.length > 0
                        ? `${selected.length} sélectionnée(s)`
                        : placeholder}
                </span>
                <span className="ml-2 text-gray-500">▾</span>
            </button>

            {open && (
                <div className="absolute z-20 mt-1 w-full rounded-xl border bg-white shadow-lg max-h-48 overflow-y-auto p-2">
                    {options.map((opt) => (
                        <label
                            key={opt}
                            className="flex items-center gap-3 px-2 py-1 text-sm hover:bg-gray-50 rounded cursor-pointer"
                        >
                            <input
                                type="checkbox"
                                className="h-4 w-4 accent-black"
                                checked={selected.includes(opt)}
                                onChange={() => toggleOption(opt)}
                            />
                            {opt}
                        </label>
                    ))}
                </div>
            )}

            {selected.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                    {selected.map((opt) => (
                        <span
                            key={opt}
                            className="px-3 py-1 bg-gray-200 rounded-full text-sm"
                        >
                            {opt}
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
}
