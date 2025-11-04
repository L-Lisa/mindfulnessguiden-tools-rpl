import { useState } from "react";
import { ChevronRight } from "lucide-react";

interface AccordionProps {
  trigger: string;
  children: React.ReactNode;
}

export function Accordion({ trigger, children }: AccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full p-4 text-left bg-secondary/30 rounded-lg hover-elevate active-elevate-2 transition-all duration-200"
        data-testid="button-accordion-toggle"
        aria-expanded={isOpen}
      >
        <span className="text-sm font-medium text-foreground">{trigger}</span>
        <ChevronRight 
          className={`w-5 h-5 text-foreground transition-transform duration-250 ${isOpen ? 'rotate-90' : ''}`}
          aria-hidden="true"
        />
      </button>
      
      <div
        className={`overflow-hidden transition-all duration-250 ease-in-out ${
          isOpen ? 'max-h-[600px] opacity-100 mt-4' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="space-y-4 overflow-y-auto max-h-[550px] pr-2">
          {children}
        </div>
      </div>
    </div>
  );
}
