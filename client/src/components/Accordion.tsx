import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccordionProps {
  trigger: string;
  children: React.ReactNode;
}

export function Accordion({ trigger, children }: AccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full">
      <button
        onClick={handleToggle}
        className="flex items-center justify-between w-full p-4 text-left bg-secondary/30 rounded-lg hover-elevate active-elevate-2 transition-all duration-200"
        data-testid="button-accordion-toggle"
        aria-expanded={isOpen}
      >
        <span className="text-sm font-medium text-foreground">{trigger}</span>
        <ChevronRight 
          className={cn(
            "w-5 h-5 text-foreground transition-transform duration-250",
            isOpen && "rotate-90"
          )}
          aria-hidden="true"
        />
      </button>
      
      <div
        data-testid="accordion-content-wrapper"
        style={{
          maxHeight: isOpen ? '600px' : '0',
          opacity: isOpen ? 1 : 0,
          marginTop: isOpen ? '1rem' : '0',
          transition: 'all 250ms ease-in-out'
        }}
        className="overflow-hidden"
      >
        <div className="space-y-4 overflow-y-auto max-h-[550px] pr-2">
          {children}
        </div>
      </div>
    </div>
  );
}
