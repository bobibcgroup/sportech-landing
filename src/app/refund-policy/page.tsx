import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Payment Processing & Refund Policy",
  description:
    "How payments are processed through the SporTech platform, and when refunds apply.",
};

export default function PaymentRefundPolicyPage() {
  return (
    <main className="bg-canvas min-h-screen">
      <div className="max-w-3xl mx-auto px-6 py-24">
        <Link href="/" className="text-muted text-sm hover:text-on-dark transition-colors duration-200">
          ← Back to sportech.com.sa
        </Link>

        <h1 className="text-on-dark font-bold mt-8 mb-2" style={{ fontSize: "clamp(32px, 5vw, 48px)", letterSpacing: "-2px" }}>
          Payment Processing &amp; Refund Policy
        </h1>
        <p className="text-muted text-sm mb-12">Last updated: August 2026</p>

        <div className="space-y-10 text-body-text text-[15px] leading-relaxed">
          <section>
            <p>
              This Payment Processing &amp; Refund Policy applies to payments made through the SporTech
              platform, applications, and related digital services operated by SporTech Technologies
              (&ldquo;SporTech,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;).
            </p>
          </section>

          <section>
            <h2 className="text-on-dark font-semibold text-lg mb-3">1. Payment Processing</h2>
            <div className="space-y-4">
              <p>
                Payments made through SporTech are processed securely through authorized third-party
                payment service providers and supported payment networks.
              </p>
              <p>
                Depending on the user&rsquo;s country, device, and transaction type, available payment
                methods may include credit or debit cards, digital wallets, and other locally supported
                payment methods.
              </p>
              <p>
                A transaction is considered successfully completed only after SporTech receives
                confirmation of successful payment authorization or capture from the applicable payment
                provider.
              </p>
              <p>
                SporTech does not store complete payment card details where payment information is
                processed and securely handled by our authorized payment service providers.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-on-dark font-semibold text-lg mb-3">2. Prices, Currency &amp; Fees</h2>
            <div className="space-y-4">
              <p>
                All applicable prices, currencies, taxes, and customer-payable fees are displayed to the
                user before final payment confirmation.
              </p>
              <p>
                Where permitted by applicable law and payment network rules, a payment processing fee may
                apply depending on the selected payment method, transaction type, or country.
              </p>
              <p>
                Any applicable customer processing fee will be clearly disclosed before the user
                authorizes the payment.
              </p>
              <p>
                Banks, card issuers, payment networks, or other financial institutions may separately
                apply foreign exchange, international transaction, or other charges. Such third-party
                charges are outside SporTech&rsquo;s control.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-on-dark font-semibold text-lg mb-3">3. Digital Products &amp; SporTech Tokens</h2>
            <div className="space-y-4">
              <p>
                SporTech may offer digital products, including SporTech Tokens and other digital
                services.
              </p>
              <p>
                Purchased Tokens may be eligible for a refund only where they remain unused and have not
                been transferred, gifted, redeemed, exchanged, or otherwise consumed.
              </p>
              <p>
                Tokens that have been used, transferred, gifted, redeemed, or otherwise consumed are
                generally non-refundable, except where required by applicable law or where the
                transaction resulted from a verified technical error attributable to SporTech.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-on-dark font-semibold text-lg mb-3">4. Refund Eligibility</h2>
            <div className="space-y-4">
              <p>A full or partial refund may be approved where:</p>
              <ol className="list-decimal pl-6 space-y-2">
                <li>a customer has been charged more than once for the same transaction;</li>
                <li>
                  payment was successfully captured but the purchased product or service was not
                  delivered due to a verified technical failure;
                </li>
                <li>unused digital products qualify for refund under this Policy;</li>
                <li>
                  an event, product, or service is cancelled and its applicable terms provide for a
                  refund; or
                </li>
                <li>a refund is otherwise required under applicable consumer protection laws.</li>
              </ol>
              <p>
                Refund eligibility for tickets, memberships, subscriptions, merchandise, and other
                products or services may also be subject to the specific terms disclosed at the time of
                purchase.
              </p>
              <p>
                Change of mind alone does not guarantee eligibility for a refund where a digital product
                or service has already been delivered, activated, transferred, or consumed.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-on-dark font-semibold text-lg mb-3">5. Refund Amount &amp; Processing</h2>
            <div className="space-y-4">
              <p>
                Approved refunds will generally be returned to the original payment method used for the
                transaction.
              </p>
              <p>
                Where a duplicate charge or verified SporTech technical error has occurred, the customer
                will be refunded the applicable amount incorrectly charged.
              </p>
              <p>
                For other eligible refunds, the refundable amount will be determined according to the
                applicable product or service terms and any mandatory consumer protection requirements.
              </p>
              <p>
                SporTech will normally initiate an approved refund within 3&ndash;5 business days. The
                time required for the refunded amount to appear in the customer&rsquo;s account may vary
                depending on the payment provider, card network, bank, and country.
              </p>
              <p>
                Any processing fee or third-party charge that is legally non-refundable will be treated
                in accordance with the terms disclosed at the time of payment and applicable law.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-on-dark font-semibold text-lg mb-3">6. Failed, Declined &amp; Duplicate Transactions</h2>
            <div className="space-y-4">
              <p>
                If a payment is declined or fails before successful completion, SporTech will not
                intentionally deliver the associated paid product or service.
              </p>
              <p>
                In some cases, a bank may temporarily display a pending authorization even when a
                transaction has not been successfully completed. Release of such authorization is
                controlled by the issuing bank or payment provider.
              </p>
              <p>
                Verified duplicate charges will be investigated and, where confirmed, the duplicate
                amount will be refunded.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-on-dark font-semibold text-lg mb-3">7. Chargebacks &amp; Payment Disputes</h2>
            <div className="space-y-4">
              <p>
                Customers are encouraged to contact SporTech first regarding any payment issue so that we
                can investigate and resolve the matter promptly.
              </p>
              <p>
                A chargeback or payment dispute initiated through a bank or payment provider is handled
                separately from SporTech&rsquo;s standard refund process and may be subject to the rules
                and procedures of the applicable bank, payment network, or payment service provider.
              </p>
              <p>
                SporTech reserves the right to investigate suspected fraud, payment abuse, unauthorized
                transactions, or misuse of the refund or chargeback process.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-on-dark font-semibold text-lg mb-3">8. How to Request a Refund</h2>
            <div className="space-y-4">
              <p>
                Refund requests should be submitted through SporTech&rsquo;s official customer support
                channels and should include sufficient information to identify the transaction, including
                the relevant transaction or order reference where available.
              </p>
              <p>
                SporTech may request additional information reasonably necessary to verify the
                transaction and determine refund eligibility.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-on-dark font-semibold text-lg mb-3">9. Applicable Law</h2>
            <div className="space-y-4">
              <p>
                This Policy applies globally to SporTech services. Where mandatory consumer protection,
                payment, or refund laws in a customer&rsquo;s jurisdiction provide rights that cannot
                legally be excluded or restricted, those mandatory rights will apply.
              </p>
              <p>
                SporTech may update this Policy from time to time to reflect changes to its services,
                payment methods, regulatory requirements, or payment processing arrangements.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-on-dark font-semibold text-lg mb-3">Contact</h2>
            <p>
              SporTech Technologies, Riyadh, Saudi Arabia ·{" "}
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
