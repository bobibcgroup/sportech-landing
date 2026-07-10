"use client";
import { LanguageProvider } from "@/lib/language-context";
import { ThemeProvider } from "@/lib/theme-context";
import { ContactModalProvider } from "@/lib/contact-modal-context";
import { ContactModal } from "@/components/ui/contact-modal";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <ContactModalProvider>
          {children}
          <ContactModal />
        </ContactModalProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
