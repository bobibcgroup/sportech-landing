const NAV_LINKS = [
  { label: "Platform", href: "#platform" },
  { label: "Revenue", href: "#revenue" },
  { label: "Sports", href: "#sports" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

const SOCIAL_LINKS = [
  { label: "X", href: "https://x.com/SportechHQ" },
  { label: "LinkedIn", href: "https://linkedin.com/company/sportechsa/" },
];

export function Footer() {
  return (
    <footer className="bg-canvas border-t border-hairline">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Col 1: Brand */}
          <div>
            <p className="text-on-dark font-bold text-lg tracking-widest uppercase">
              Sportech
            </p>
            <p className="text-muted text-sm mt-2 leading-relaxed">
              The fan engagement infrastructure for sports.
            </p>
          </div>

          {/* Col 2: Links */}
          <div>
            <p className="text-on-dark text-xs font-semibold tracking-widest uppercase mb-4">
              Platform
            </p>
            <ul className="space-y-3">
              {NAV_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-muted text-sm hover:text-on-dark transition-colors duration-200"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Contact */}
          <div>
            <p className="text-on-dark text-xs font-semibold tracking-widest uppercase mb-4">
              Contact
            </p>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:contact@sportech.com.sa"
                  className="text-muted text-sm hover:text-on-dark transition-colors duration-200"
                >
                  contact@sportech.com.sa
                </a>
              </li>
              <li>
                <a
                  href="tel:+966114222225"
                  className="text-muted text-sm hover:text-on-dark transition-colors duration-200"
                >
                  +966 11 422 2225
                </a>
              </li>
              <li>
                <span className="text-muted text-sm">Riyadh, Saudi Arabia</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Social */}
          <div>
            <p className="text-on-dark text-xs font-semibold tracking-widest uppercase mb-4">
              Follow
            </p>
            <ul className="space-y-3">
              {SOCIAL_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted text-sm hover:text-on-dark transition-colors duration-200"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-hairline mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-muted text-xs">
          <span>&copy; 2026 Sportech. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <a href="/privacy" className="hover:text-on-dark transition-colors duration-200">
              Privacy Policy
            </a>
            <span className="text-muted-soft" aria-hidden="true">·</span>
            <a href="/refund-policy" className="hover:text-on-dark transition-colors duration-200">
              Payment &amp; Refund Policy
            </a>
            <span className="text-muted-soft" aria-hidden="true">·</span>
            <a href="/terms" className="hover:text-on-dark transition-colors duration-200">
              Terms of Use
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
