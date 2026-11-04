import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import type { Option } from "../types/car";

type DropdownProps<T extends Option> = {
  options: T[];
  selected: T;
  onChange: (option: T) => void;
}

function DropDown<T extends Option>({ options, selected, onChange }: DropdownProps<T>) {
  const [open, setOpen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function handleOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener('mousedown', handleOutside);

    return () => {
      document.removeEventListener('mousedown', handleOutside);
    }
  }, [open]);

  return (
    <div className="relative z-20" ref={containerRef}>
      <div
        className="flex justify-between w-44 px-4 py-3 border border-gray-600 rounded-xl bg-gray-700/60 cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <p>{selected?.label}</p>
        <ChevronDown
          className={`rotate-0 transition ${open ? "rotate-180" : "rotate-0"}`}
        />
      </div>
      {open && (
        <ul
          className={`absolute w-44 rounded-xl text-center mt-3 bg-gray-700 opacity-0 transition-all ${open ? "opacity-100" : "opacity-0"}`}
        >
          {options.map((option) => {
            return (
              <li
                className="py-2 cursor-pointer rounded-xl border-b border-gray-600"
                onClick={() => {
                  onChange(option);
                  setOpen(!open);
                }}
              >
                {option.label}
              </li>
            );
          })
          }
        </ul>
      )}
    </div>
  );
}

export default DropDown;
