import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms governing the use of the Sportech website.",
};

export default function TermsPage() {
  return (
    <main className="bg-canvas min-h-screen">
      <div className="max-w-3xl mx-auto px-6 py-24">
        <Link href="/" className="text-muted text-sm hover:text-on-dark transition-colors duration-200">
          ← Back to sportech.com.sa
        </Link>

        <h1 className="text-on-dark font-bold mt-8 mb-2" style={{ fontSize: "clamp(32px, 5vw, 48px)", letterSpacing: "-2px" }}>
          Terms of Use
        </h1>
        <p className="text-muted text-sm mb-12">Last updated: July 2026</p>

        <div className="space-y-10 text-body-text text-[15px] leading-relaxed">
          <section>
            <h2 className="text-on-dark font-semibold text-lg mb-3">About this website</h2>
            <p>
              This website is operated by Sportech, Riyadh, Saudi Arabia. It presents the Sportech fan
              engagement platform to prospective club and league partners. By using the site, you accept
              these terms.
            </p>
          </section>

          <section>
            <h2 className="text-on-dark font-semibold text-lg mb-3">Informational content</h2>
            <p>
              Figures shown on this site, including the revenue simulator, are illustrative estimates based
              on stated assumptions. They are not a guarantee of results, an offer, or investment advice.
              Commercial terms between Sportech and a partner club are defined exclusively in a signed
              partnership agreement.
            </p>
          </section>

          <section>
            <h2 className="text-on-dark font-semibold text-lg mb-3">Intellectual property</h2>
            <p>
              All content on this site, including the Sportech name, product designs, imagery, and the
              patented player camera technology it describes, belongs to Sportech or its licensors. You may
              not reproduce it without written permission.
            </p>
          </section>

          <section>
            <h2 className="text-on-dark font-semibold text-lg mb-3">Liability</h2>
            <p>
              The site is provided as-is. To the extent permitted by law, Sportech is not liable for
              decisions made in reliance on the informational content of this site.
            </p>
          </section>

          <section>
            <h2 className="text-on-dark font-semibold text-lg mb-3">Contact</h2>
            <p>
              Questions about these terms:{" "}
              <a href="mailto:contact@sportech.com.sa" className="text-on-dark underline underline-offset-2">
                contact@sportech.com.sa
              </a>
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
