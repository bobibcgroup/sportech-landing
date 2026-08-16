import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Sportech collects, uses, and protects your information.",
};

export default function PrivacyPage() {
  return (
    <main className="bg-canvas min-h-screen">
      <div className="max-w-3xl mx-auto px-6 py-24">
        <Link href="/" className="text-muted text-sm hover:text-on-dark transition-colors duration-200">
          ← Back to sportech.com.sa
        </Link>

        <h1 className="text-on-dark font-bold mt-8 mb-2" style={{ fontSize: "clamp(32px, 5vw, 48px)", letterSpacing: "-2px" }}>
          Privacy Policy
        </h1>
        <p className="text-muted text-sm mb-12">Last updated: July 2026</p>

        <div className="space-y-10 text-body-text text-[15px] leading-relaxed">
          <section>
            <h2 className="text-on-dark font-semibold text-lg mb-3">What we collect</h2>
            <p>
              When you contact us through this website, we collect the information you provide: your name,
              your club or organization, and your email address. We also collect standard technical data
              such as browser type and pages visited, used only to operate and improve the site.
            </p>
          </section>

          <section>
            <h2 className="text-on-dark font-semibold text-lg mb-3">How we use it</h2>
            <p>
              We use your contact details to respond to your inquiry and to discuss a potential partnership.
              We do not sell your data, and we do not share it with third parties except service providers
              who process it on our behalf to deliver these purposes.
            </p>
          </section>

          <section>
            <h2 className="text-on-dark font-semibold text-lg mb-3">Where it is stored</h2>
            <p>
              Data is stored in-region wherever regulation requires it, and protected with
              industry-standard technical and organizational measures.
            </p>
          </section>

          <section>
            <h2 className="text-on-dark font-semibold text-lg mb-3">Your rights</h2>
            <p>
              You may request access to, correction of, or deletion of your personal data at any time by
              emailing{" "}
              <a href="mailto:contact@sportech.com.sa" className="text-on-dark underline underline-offset-2">
                contact@sportech.com.sa
              </a>
              . We respond to all requests within 30 days.
            </p>
          </section>

          <section>
            <h2 className="text-on-dark font-semibold text-lg mb-3">Contact</h2>
            <p>
              Sportech, Riyadh, Saudi Arabia ·{" "}
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
