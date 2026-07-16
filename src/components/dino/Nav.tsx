import { useEffect, useState } from "react";

import { Download, Menu, X } from "lucide-react";

const links = [
  { id: "base-camp", label: "Base Camp" },
  { id: "evolution", label: "Evolution" },
  { id: "dna", label: "DNA" },
  { id: "excavation", label: "Excavation Site" },
  { id: "expedition", label: "Expedition Log" },
  { id: "fossil-record", label: "Fossil Record" },
  { id: "courses", label: "Research Lab" },
  { id: "discovery", label: "Discovery Point" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "backdrop-blur-xl bg-background/70 border-b border-border/60" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-[1600px] items-center justify-between gap-5 px-6 py-4 xl:px-8">
        <a href="#base-camp" className="group flex shrink-0 items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-full border border-amber/40 text-amber font-mono text-xs tracking-wider">
            JHN
          </span>
          <span className="hidden sm:block font-display text-lg tracking-wide">
            Jarrar <span className="text-amber">Haider</span>
          </span>
        </a>

        <ul className="hidden min-w-0 items-center gap-0.5 xl:flex">
          {links.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                className="whitespace-nowrap rounded-full px-2.5 py-2 text-[12px] font-medium text-muted-foreground transition-colors hover:bg-secondary/60 hover:text-foreground 2xl:px-3.5 2xl:text-[13px]"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden shrink-0 items-center gap-2 xl:flex">
          <a
            href="/Jarrar-Haider-Nemati-CV.pdf"
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex whitespace-nowrap items-center gap-2 rounded-full border border-primary/45 bg-primary/10 px-4 py-2 text-[13px] font-semibold text-primary transition-all hover:bg-primary hover:text-primary-foreground"
          >
            <Download size={15} /> CV
          </a>
          <a
            href="#discovery"
            className="inline-flex whitespace-nowrap items-center gap-2 rounded-full border border-amber/50 bg-amber/10 px-4 py-2 text-[13px] font-medium text-amber transition-all hover:bg-amber hover:text-amber-foreground glow-amber"
          >
            Begin Expedition
          </a>
        </div>

        <button
          className="p-2 text-foreground xl:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
          aria-controls="mobile-museum-navigation"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div
          id="mobile-museum-navigation"
          className="border-t border-border/60 bg-background/95 backdrop-blur-xl xl:hidden"
        >
          <ul className="mx-auto max-w-7xl px-6 py-4 space-y-1">
            {links.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2.5 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="mt-3 border-t border-border/60 pt-3">
              <a
                href="/Jarrar-Haider-Nemati-CV.pdf"
                target="_blank"
                rel="noreferrer noopener"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground"
              >
                <Download size={16} /> View CV
              </a>
            </li>
            <li>
              <a
                href="#discovery"
                onClick={() => setOpen(false)}
                className="block rounded-full border border-amber/50 bg-amber/10 px-4 py-3 text-center text-sm font-semibold text-amber"
              >
                Begin Expedition
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
