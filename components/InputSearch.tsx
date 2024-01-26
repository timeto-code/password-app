import React from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "./ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { cn } from "@/lib/utils";
import { ChevronsUpDown, Check } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const frameworks = [
  {
    value: "微软",
    label: "微软",
  },
  {
    value: "谷歌",
    label: "谷歌",
  },
  {
    value: "苹果",
    label: "苹果",
  },
  {
    value: "阿里巴巴",
    label: "阿里巴巴",
  },
  {
    value: "腾讯",
    label: "腾讯",
  },
  {
    value: "字节跳动",
    label: "字节跳动",
  },
  {
    value: "百度",
    label: "百度",
  },
  {
    value: "网易",
    label: "网易",
  },
  {
    value: "京东",
    label: "京东",
  },
  {
    value: "美团",
    label: "美团",
  },
  {
    value: "滴滴",
    label: "滴滴",
  },
  {
    value: "小米",
    label: "小米",
  },
  {
    value: "华为",
    label: "华为",
  },
  {
    value: "搜狐",
    label: "搜狐",
  },
  {
    value: "360",
    label: "360",
  },
];

const InputSearch = () => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger>
          <Input
            placeholder="Search framework..."
            onFocus={() => {
              setOpen(true);
            }}
          />
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search framework..." />
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {frameworks.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === framework.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {framework.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default InputSearch;
