"use client";

import { useEffect, useState } from "react";

import { useRouter, useSearchParams } from "next/navigation";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";
import dayjs from "dayjs";

import { cn } from "@/app/lib/utils";
import { Button } from "@/app/components/ui/button";
import { Calendar } from "@/app/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/components/ui/popover";

const DateRangePicker = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlSearchParams = new URLSearchParams(searchParams?.toString());

  const isFromUndefinedOrNull =
    urlSearchParams.get("from") === "undefined" ||
    urlSearchParams.get("from") === null;

  const isToUndefinedOrNull =
    urlSearchParams.get("to") === "undefined" ||
    urlSearchParams.get("to") === null;

  const fromParam = isFromUndefinedOrNull
    ? dayjs(Date.now())
    : urlSearchParams.get("from");

  const toParam = isToUndefinedOrNull
    ? dayjs(Date.now())
    : urlSearchParams.get("to");

  const from = dayjs(fromParam).toDate();
  const to = dayjs(toParam).toDate();

  const [date, setDate] = useState<DateRange | undefined>({
    from,
    to,
  });

  useEffect(() => {
    router.push(
      `/?from=${date?.from?.toLocaleDateString()}&to=${date?.to?.toLocaleDateString()}`
    );
  }, [date, router]);

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </>
  );
};

export default DateRangePicker;
