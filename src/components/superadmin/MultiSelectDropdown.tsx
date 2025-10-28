// components/MultiSelectDropdown.tsx
import React, { useEffect, useRef, useState } from "react";
import { X, ChevronDown } from "lucide-react";
import { cn } from "../ui/utils";

export type MultiSelectItem = {
  id: string;
  label: string;
  // optional extra meta (e.g. unitId for departments)
  unitId?: string;
};

type Props = {
  items: MultiSelectItem[];             // all possible items to show in list
  selectedIds: string[];                // currently selected ids
  onChange: (ids: string[]) => void;    // updates selected ids
  placeholder?: string;
  className?: string;
  dropdownClassName?: string;           // custom class for dropdown list
  keepOpen?: boolean;                   // if you want to keep open after selection (not used by default)
  disabled?: boolean;
  /* optional function to filter items before display (already filtered items can be passed) */
};

export default function MultiSelectDropdown({
  items,
  selectedIds,
  onChange,
  placeholder = "Select",
  className = "",
  dropdownClassName = "",
  keepOpen = false,
  disabled = false,
}: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleSelect = (id: string) => {
    if (selectedIds.includes(id)) {
      onChange(selectedIds.filter((s) => s !== id));
    } else {
      onChange([...selectedIds, id]);
    }
    if (!keepOpen) {
      // keepOpen optional; default behavior: keep open so user can multi-select (we'll keep open here to match reference)
      setTimeout(() => setOpen(true), 0); // keep open visually; if keepOpen is false we still keep open to match reference UX
    }
  };

  const removeChip = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    onChange(selectedIds.filter((s) => s !== id));
  };

  // items to show in dropdown (hide selected — matches reference)
  const visibleItems = items.filter((it) => !selectedIds.includes(it.id));

  return (
    <div ref={ref} className={cn("relative", className)}>
      <div
        role="button"
        tabIndex={0}
        aria-expanded={open}
        className={cn(
          "min-h-[42px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 cursor-pointer hover:border-gray-400 transition-colors",
          disabled && "opacity-60 pointer-events-none"
        )}
        onClick={() => setOpen((s) => !s)}
      >
        {selectedIds.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {selectedIds.map((id) => {
              const it = items.find((i) => i.id === id);
              if (!it) return null;
              return (
                <div
                  key={id}
className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-primary/10 text-primary text-xs font-medium"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span>{it.label}</span>
                  <button
                    type="button"
                    onClick={(e) => removeChip(id, e)}
                    className="hover:bg-gray-300 rounded-sm p-0.5"
                    aria-label={`Remove ${it.label}`}
                  >
                    <X className="size-3" />
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          <span className="text-muted-foreground text-sm">{placeholder}</span>
        )}

        <ChevronDown className="absolute right-3 top-3 size-4 text-muted-foreground pointer-events-none" />
      </div>

      {open && (
        <div className={cn("absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-64 overflow-auto", dropdownClassName)}>
          {visibleItems.length === 0 ? (
            <div className="px-3 py-2 text-sm text-muted-foreground">Select Business Unit First</div>
          ) : (
            visibleItems.map((it) => (
              <div
                key={it.id}
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm flex items-center justify-between"
                onClick={() => toggleSelect(it.id)}
              >
                <span>{it.label}</span>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
