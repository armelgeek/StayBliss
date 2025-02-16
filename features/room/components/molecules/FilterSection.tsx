"use client";

function FilterSection() {
  return (
    <form>
      <select>
        <option value="default">Default Sorting</option>
        <option value="hight-price">From High to Low price</option>
        <option value="low-price">From Low to High price</option>
        <option value="min-guests">From Low to High guests</option>
        <option value="max-guests">From Min to Max guests</option>
      </select>
    </form>
  );
}

export default FilterSection;
