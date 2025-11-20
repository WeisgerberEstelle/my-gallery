import { Listbox, Transition } from "@headlessui/react";
import { Fragment } from "react";
import type { Category } from "../types";

interface Props {
    label?: string;
    options: Category[];
    selected: Category[];
    onChange: (next: Category[]) => void;
}

export default function MultiSelect({ label = "Catégories", options, selected, onChange }: Props) {
    const placeholder = `Sélectionner des ${label.toLowerCase()}`;

    return (
        <div className="w-full">
            <label className="block text-sm font-medium mb-2">{label}</label>

            <Listbox value={selected} onChange={onChange} multiple>
                <div className="relative">
                    <Listbox.Button className="input flex justify-between items-center cursor-pointer">
                        {selected.length > 0 ? (
                            `${selected.length} sélectionnée(s)`
                        ) : (
                            <span className="text-gray-400">{placeholder}</span>
                        )}
                        <span className="ml-2 text-gray-500">▾</span>
                    </Listbox.Button>

                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Listbox.Options className="absolute z-20 mt-1 w-full rounded-xl border bg-white shadow-lg max-h-48 overflow-y-auto p-2">
                            {options.map((opt) => (
                                <Listbox.Option
                                    key={opt.id}
                                    value={opt}
                                    className={({ active }) =>
                                        `cursor-pointer select-none px-3 py-2 rounded ${
                                            active ? "bg-gray-100" : ""
                                        }`
                                    }
                                >
                                    {({ selected }) => (
                                        <div className="flex items-center gap-3">
                                            <input
                                                type="checkbox"
                                                className="h-4 w-4 accent-black"
                                                checked={selected}
                                                readOnly
                                            />
                                            {opt.name}
                                        </div>
                                    )}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Transition>
                </div>
            </Listbox>

            {selected.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                    {selected.map((opt) => (
                        <span key={opt.id} className="px-3 py-1 bg-gray-200 rounded-full text-sm">
                            {opt.name}
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
}
