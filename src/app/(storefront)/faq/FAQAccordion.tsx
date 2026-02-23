"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

export function FAQAccordion({ items }: { items: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="divide-y divide-stone/50 rounded-md border border-stone/50 bg-charcoal">
      {items.map((item, i) => {
        const isOpen = openIndex === i;

        return (
          <div key={i}>
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors duration-200 hover:bg-stone/20"
              aria-expanded={isOpen}
            >
              <span className="text-sm font-medium text-bone">{item.question}</span>
              <ChevronDown
                className={`h-4 w-4 flex-shrink-0 text-muted transition-transform duration-200 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            <div
              className={`overflow-hidden transition-all duration-200 ${
                isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <p className="px-5 pb-4 text-sm leading-relaxed text-muted">
                {item.answer}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
