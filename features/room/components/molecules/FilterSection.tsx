"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { useState } from "react";
import { formatISO, formatRFC7231, isBefore, isValid } from "date-fns";
import { toast } from "sonner";

const options = [
  { value: "default", label: "Default Sorting" },
  { value: "high-price", label: "From High to Low price" },
  { value: "low-price", label: "From Low to High price" },
  { value: "max-guests", label: "From Max to Min guests" },
  { value: "min-guests", label: "From Min to Max guests" },
];

function FilterSection({ filters }: {
  filters: {
    filter: string
    range: {
      from: string
      to: string
    }
  }
}) {
  const range = { from: filters?.range.from, to: filters?.range.to };
  const [startDate, setStartDate] = useState(
    filters?.range && isValid(new Date(range.from)) ? formatRFC7231(new Date(range.from)) : ""
  );
  const [endDate, setEndDate] = useState(
    filters?.range && isValid(new Date(range.to)) ? formatRFC7231(new Date(range.to)) : ""
  );

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleSort(e) {
    const params = new URLSearchParams(searchParams);
    params.set("sort", e.target.value);
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  function handleSearch() {
    if (!startDate || !endDate) return;
    const arrival = formatISO(new Date(startDate), { representation: "date" });
    const departure = formatISO(new Date(endDate), { representation: "date" });

    if (!isBefore(arrival, departure)) {
      toast.error("Invalid date range!");
      return;
    }

    const params = new URLSearchParams(searchParams);
    const formatedRange = `${arrival}_${departure}`;
    params.set("range", formatedRange);
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <form className={`roomsForm`}>
      <div>
        <label htmlFor="">Sort Rooms</label>
        <select className={`select`} onChange={handleSort} defaultValue={filters?.filter}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Filter By Date</label>
        <div>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            placeholder="Arrival Date"
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            placeholder="Departure Date"
          />

          <button type="button" onClick={handleSearch}>
            <span>Search</span>
          </button>
        </div>
      </div>
    </form>
  );
}

export default FilterSection;
