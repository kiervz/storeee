"use client";

import React, { useState } from "react";
import { CheckIcon, ChevronsUpDown } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/components/ui/popover";
import {
  Command,
  CommandGroup,
  CommandItem,
} from "@/app/components/ui/command";
import { Button } from "@/app/components/ui/button";
import { cn } from "@/app/lib/utils";

interface OptionType {
  value: string;
  label: string;
}

interface ReactComboboxProps {
  options: OptionType[];
  handleSearchParams: (key: string, value: string) => void;
  initialValue?: string;
  placeholder?: string;
  placeholderItem?: string;
}

export const ReactCombobox: React.FC<ReactComboboxProps> = ({
  options,
  initialValue = "",
  placeholder,
  placeholderItem,
  handleSearchParams,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>(initialValue);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          type="button"
          className="flex items-center w-[200px] justify-between font-normal outline-none"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
        >
          {value && placeholderItem ? `${placeholderItem}: ` : ""}
          {value
            ? options.find((option) => option.value === value)?.label
            : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandGroup>
            {options.map((option) => (
              <CommandItem
                value={option.value}
                key={option.value}
                onSelect={(stateValue: React.SetStateAction<string>) => {
                  setValue(stateValue === value ? "" : stateValue);
                  handleSearchParams("orderBy", stateValue.toString());
                  setOpen(false);
                }}
              >
                {option.label}
                <CheckIcon
                  className={cn(
                    "ml-auto h-4 w-4",
                    value === option.value ? "opacity-100" : "opacity-0"
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
