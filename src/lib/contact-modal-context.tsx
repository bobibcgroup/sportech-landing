"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

interface ContactModalCtx {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

const Ctx = createContext<ContactModalCtx>({
  isOpen: false,
  open: () => {},
  close: () => {},
});

export function ContactModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Ctx.Provider
      value={{
        isOpen,
        open: () => setIsOpen(true),
        close: () => setIsOpen(false),
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useContactModal() {
  return useContext(Ctx);
}
