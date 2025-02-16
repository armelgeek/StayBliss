"use client";

import { useState } from "react";
import { Minus, Plus } from 'lucide-react';

function Accordion({ label, children }: { label: string; children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <div>
        <button  onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <Plus/> : <Minus/>}
        </button>
        <p>{label}</p>
      </div>
      <div>{isOpen && children}</div>
    </div>
  );
}

export default Accordion;
