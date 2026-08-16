import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "What personal data SporTech collects, how it is used, the legal bases we rely on, and the privacy rights available to you.",
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
          <section className="space-y-4">
            <p>
              SporTech (&ldquo;SporTech&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) respects your
              privacy and is committed to protecting personal data processed through our websites, applications,
              services, club experiences, membership features, wallet services, commerce features, community features,
              media services, and other SporTech-powered products (collectively, the &ldquo;Services&rdquo;).
            </p>
            <p>
              This Privacy Policy explains what personal data we may collect, how we use it, the legal bases we may
              rely on, when information may be shared or transferred, and the privacy rights that may be available to
              you.
            </p>
          </section>

          <section>
            <h2 className="text-on-dark font-semibold text-lg mb-3">1. Scope</h2>
            <div className="space-y-4">
              <p>This Privacy Policy applies to personal data processed by SporTech in connection with the Services.</p>
              <p>Depending on the specific service and contractual arrangement, SporTech may act:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  as a <strong className="text-on-dark font-semibold">data controller</strong>, where SporTech
                  determines why and how personal data is processed; or
                </li>
                <li>
                  as a <strong className="text-on-dark font-semibold">data processor</strong>, where SporTech processes
                  personal data on behalf of a club, league, federation, or commercial partner.
                </li>
              </ul>
              <p>
                Where a club, league, federation, or other partner independently determines how your personal data is
                used, its own privacy notice may also apply.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-on-dark font-semibold text-lg mb-3">2. Our Privacy Principles</h2>
            <div className="space-y-4">
              <p>We aim to process personal data in accordance with the following principles:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong className="text-on-dark font-semibold">Lawfulness:</strong> personal data is processed only
                  where an appropriate legal basis exists.
                </li>
                <li>
                  <strong className="text-on-dark font-semibold">Transparency:</strong> users should understand what
                  data is collected, why it is used, who may receive it, and how it is handled.
                </li>
                <li>
                  <strong className="text-on-dark font-semibold">Purpose limitation:</strong> personal data is
                  collected for specific and legitimate purposes.
                </li>
                <li>
                  <strong className="text-on-dark font-semibold">Data minimisation:</strong> we seek to collect only
                  the personal data reasonably necessary for the relevant service.
                </li>
                <li>
                  <strong className="text-on-dark font-semibold">Accuracy:</strong> we take reasonable measures to keep
                  personal data accurate and current.
                </li>
                <li>
                  <strong className="text-on-dark font-semibold">Security:</strong> we use appropriate technical,
                  administrative, and organisational safeguards.
                </li>
                <li>
                  <strong className="text-on-dark font-semibold">Accountability:</strong> we remain responsible for
                  personal data under our control.
                </li>
              </ul>
              <p>
                We also apply privacy-by-design principles when developing products, features, integrations, and
                services.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-on-dark font-semibold text-lg mb-3">3. Personal Data We May Collect</h2>
            <div className="space-y-6">
              <p>
                The personal data we process depends on the SporTech service you use and the features made available by
                SporTech or a participating club, league, federation, or partner.
              </p>

              <div className="space-y-3">
                <h3 className="text-on-dark font-semibold">3.1 Identity Data</h3>
                <p>This may include:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>full name;</li>
                  <li>username;</li>
                  <li>user ID;</li>
                  <li>mobile number;</li>
                  <li>membership number;</li>
                  <li>club membership identifiers; and</li>
                  <li>other identifiers used to create, manage, or secure your account.</li>
                </ul>
                <p>
                  We may use this information for account creation, authentication, membership administration, support,
                  fraud prevention, and security monitoring.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-on-dark font-semibold">3.2 Contact Data</h3>
                <p>This may include:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>mobile number;</li>
                  <li>email address;</li>
                  <li>preferred language; and</li>
                  <li>communication preferences.</li>
                </ul>
                <p>
                  We may use this information for account communications, OTP delivery, notifications, customer
                  support, membership communications, and marketing communications where permitted.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-on-dark font-semibold">3.3 Identity Verification and KYC Data</h3>
                <p>
                  Where identity verification or compliance checks are required, we may process information such as:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>national identification information;</li>
                  <li>passport information;</li>
                  <li>date of birth;</li>
                  <li>nationality;</li>
                  <li>verification status; and</li>
                  <li>supporting identity-verification records.</li>
                </ul>
                <p>
                  This information may be used for identity verification, compliance, fraud prevention, account
                  protection, and applicable club or regulatory requirements.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-on-dark font-semibold">3.4 Membership Data</h3>
                <p>This may include:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>membership tier;</li>
                  <li>membership status;</li>
                  <li>membership history;</li>
                  <li>membership benefits;</li>
                  <li>club affiliation; and</li>
                  <li>related membership information.</li>
                </ul>
                <p>
                  We may use this information to administer memberships, manage loyalty or benefits, and support club
                  engagement.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-on-dark font-semibold">3.5 Wallet and Token Data</h3>
                <p>Where wallet or token-based features are available, we may process information such as:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>wallet ID;</li>
                  <li>wallet balance;</li>
                  <li>token balance;</li>
                  <li>token purchase history;</li>
                  <li>token usage history;</li>
                  <li>reward history; and</li>
                  <li>wallet activity records.</li>
                </ul>
                <p>
                  We may use this information to operate wallet services, administer rewards, support commerce
                  functionality, and enable participation in platform features.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-on-dark font-semibold">3.6 Payment and Commerce Data</h3>
                <p>This may include:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>purchase records;</li>
                  <li>transaction references;</li>
                  <li>billing records;</li>
                  <li>refund records;</li>
                  <li>membership purchases;</li>
                  <li>merchandise purchases;</li>
                  <li>ticket purchases; and</li>
                  <li>payment-related information provided through payment systems.</li>
                </ul>
                <p>
                  We may use this information for payment processing, financial reconciliation, customer support, tax
                  or regulatory compliance, and fraud prevention.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-on-dark font-semibold">3.7 Location Data</h3>
                <p>Depending on the service and your device settings, we may process:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>country;</li>
                  <li>city;</li>
                  <li>login country;</li>
                  <li>regional information; and</li>
                  <li>device location where enabled.</li>
                </ul>
                <p>
                  We may use location data for localisation, compliance controls, security monitoring, user experience,
                  and market analytics.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-on-dark font-semibold">3.8 Device and Technical Data</h3>
                <p>This may include:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>device type;</li>
                  <li>device model;</li>
                  <li>operating system;</li>
                  <li>application version;</li>
                  <li>IP address;</li>
                  <li>browser information; and</li>
                  <li>device identifiers.</li>
                </ul>
                <p>
                  We may use this information for security, fraud prevention, technical support, analytics, and
                  platform performance.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-on-dark font-semibold">3.9 Behavioural and Engagement Data</h3>
                <p>We may process information generated when you interact with the Services, including:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>content views;</li>
                  <li>fan activities;</li>
                  <li>poll participation;</li>
                  <li>voting activity;</li>
                  <li>prediction participation;</li>
                  <li>membership usage;</li>
                  <li>event participation; and</li>
                  <li>community activity.</li>
                </ul>
                <p>
                  We may use this information for personalisation, analytics, product improvement, engagement
                  optimisation, and club insights.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-on-dark font-semibold">3.10 Media and User-Generated Content</h3>
                <p>Where applicable, we may process:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>profile pictures;</li>
                  <li>uploaded images;</li>
                  <li>uploaded video;</li>
                  <li>audio content;</li>
                  <li>user-generated content;</li>
                  <li>community content;</li>
                  <li>live-streaming content; and</li>
                  <li>other media submitted or generated through the Services.</li>
                </ul>
                <p>
                  We may use this information to provide media services, community participation, content delivery, and
                  club engagement features.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-on-dark font-semibold">3.11 Analytics Data</h3>
                <p>We may process usage and performance information such as:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>user activity metrics;</li>
                  <li>membership metrics;</li>
                  <li>commerce metrics;</li>
                  <li>engagement analytics;</li>
                  <li>retention analytics; and</li>
                  <li>campaign analytics.</li>
                </ul>
                <p>
                  We may use this information for reporting, business intelligence, product optimisation, and
                  commercial insights.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-on-dark font-semibold">3.12 AI Processing Data</h3>
                <p>Where AI-enabled features are used, we may process information associated with:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>recommendation inputs and outputs;</li>
                  <li>moderation inputs and outputs;</li>
                  <li>AI decision logs; and</li>
                  <li>personalisation signals.</li>
                </ul>
                <p>We may use this information for recommendations, moderation, personalisation, and product enhancement.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-on-dark font-semibold text-lg mb-3">4. Sensitive and Higher-Risk Information</h2>
            <div className="space-y-4">
              <p>Certain categories of information may require enhanced protection, including:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>government-issued identifiers;</li>
                <li>identity-verification records;</li>
                <li>biometric-related information;</li>
                <li>information relating to minors; and</li>
                <li>information connected to high-risk or regulatory investigations.</li>
              </ul>
              <p>
                Where such information is processed, SporTech applies additional safeguards appropriate to the
                sensitivity of the data and applicable legal requirements.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-on-dark font-semibold text-lg mb-3">5. How We Obtain Personal Data</h2>
            <div className="space-y-4">
              <p>Depending on the service, personal data may come from:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>information you provide during registration or profile updates;</li>
                <li>membership onboarding;</li>
                <li>club onboarding;</li>
                <li>user submissions;</li>
                <li>your interactions with SporTech services;</li>
                <li>device or application activity;</li>
                <li>payment and commerce systems;</li>
                <li>club systems;</li>
                <li>analytics systems;</li>
                <li>identity-verification providers;</li>
                <li>reward, wallet, or prediction systems; and</li>
                <li>participating clubs, leagues, federations, or service providers where permitted.</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-on-dark font-semibold text-lg mb-3">6. Why We Use Personal Data</h2>
            <div className="space-y-4">
              <p>We may process personal data for purposes including:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>creating and managing user accounts;</li>
                <li>authentication and account security;</li>
                <li>providing membership services and benefits;</li>
                <li>operating wallet and reward features;</li>
                <li>processing purchases, payments, refunds, merchandise, tickets, or memberships;</li>
                <li>enabling polls, voting, predictions, fan engagement, and community features;</li>
                <li>providing customer support;</li>
                <li>preventing fraud, abuse, and misuse;</li>
                <li>maintaining platform security;</li>
                <li>improving products and services;</li>
                <li>analysing platform usage and performance;</li>
                <li>providing recommendations and personalisation;</li>
                <li>moderating content and community interactions;</li>
                <li>sending service communications and notifications;</li>
                <li>sending marketing communications where permitted;</li>
                <li>complying with legal, regulatory, tax, AML, KYC, or governmental obligations; and</li>
                <li>supporting lawful business operations and international services.</li>
              </ul>
              <p>
                We do not process personal data merely because it is technically possible to do so. Processing should
                be connected to a legitimate business purpose and an appropriate legal basis.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-on-dark font-semibold text-lg mb-3">7. Legal Bases for Processing</h2>
            <div className="space-y-6">
              <p>
                Depending on the service, jurisdiction, and type of processing, we may rely on one or more of the
                following legal bases.
              </p>

              <div className="space-y-3">
                <h3 className="text-on-dark font-semibold">7.1 Contractual Necessity</h3>
                <p>
                  We may process personal data where necessary to provide a service you requested or to perform
                  obligations arising from a contractual relationship.
                </p>
                <p>Examples may include:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>account registration and login;</li>
                  <li>membership administration;</li>
                  <li>wallet services;</li>
                  <li>reward management;</li>
                  <li>purchases;</li>
                  <li>ticketing;</li>
                  <li>merchandise;</li>
                  <li>customer support; and</li>
                  <li>other core service functions.</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h3 className="text-on-dark font-semibold">7.2 Consent</h3>
                <p>We may rely on consent for certain processing activities, including where applicable:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>marketing communications;</li>
                  <li>optional personalisation;</li>
                  <li>optional profile information;</li>
                  <li>surveys;</li>
                  <li>optional participation features; and</li>
                  <li>optional location services.</li>
                </ul>
                <p>
                  Where applicable, you may withdraw consent. Withdrawal does not affect processing that took place
                  before consent was withdrawn.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-on-dark font-semibold">7.3 Legitimate Interests</h3>
                <p>
                  Where permitted by law, we may process personal data where reasonably necessary for legitimate
                  business interests, while considering your rights and interests.
                </p>
                <p>Examples may include:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>fraud detection;</li>
                  <li>abuse prevention;</li>
                  <li>account protection;</li>
                  <li>security monitoring;</li>
                  <li>platform operations;</li>
                  <li>product improvement;</li>
                  <li>analytics;</li>
                  <li>performance analysis;</li>
                  <li>service optimisation;</li>
                  <li>business intelligence; and</li>
                  <li>strategic planning.</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h3 className="text-on-dark font-semibold">7.4 Legal and Regulatory Obligations</h3>
                <p>
                  We may process personal data where necessary to comply with applicable legal, regulatory, tax,
                  financial, AML, KYC, court, governmental, or law-enforcement obligations.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-on-dark font-semibold">7.5 Protection of Vital Interests</h3>
                <p>
                  In limited circumstances, we may process personal data where necessary to protect the life, health,
                  or safety of an individual, including in connection with serious security incidents, threat
                  investigations, or emergency situations.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-on-dark font-semibold">7.6 Public Interest</h3>
                <p>
                  Where applicable law permits or requires it, we may process personal data for public-interest
                  purposes, including regulatory cooperation, sporting-integrity matters, public-safety obligations,
                  and lawful governmental requests.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-on-dark font-semibold text-lg mb-3">8. Sharing Personal Data</h2>
            <div className="space-y-4">
              <p>
                We may share personal data where reasonably necessary with approved third parties that support the
                operation of the Services.
              </p>
              <p>These may include providers supporting:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>payment processing;</li>
                <li>identity verification and KYC;</li>
                <li>cloud hosting;</li>
                <li>security;</li>
                <li>customer support;</li>
                <li>analytics;</li>
                <li>communications; and</li>
                <li>AI-enabled services.</li>
              </ul>
              <p>
                We may also make relevant information available to participating clubs, leagues, federations, or
                commercial partners where necessary for membership administration, communications, fan engagement, club
                operations, or other agreed services.
              </p>
              <p>We seek to limit access to information reasonably necessary for the relevant activity.</p>
              <p>
                We may also disclose information where required by applicable law, court order, regulatory request,
                governmental requirement, or lawful law-enforcement process.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-on-dark font-semibold text-lg mb-3">9. International and Cross-Border Data Transfers</h2>
            <div className="space-y-4">
              <p>
                SporTech supports users, clubs, leagues, federations, and service providers across multiple
                jurisdictions. As a result, personal data may be processed, accessed, stored, or transferred
                internationally where appropriate.
              </p>
              <p>Cross-border processing may involve:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>user and contact information;</li>
                <li>membership information;</li>
                <li>wallet or transaction information;</li>
                <li>commerce information;</li>
                <li>identity-verification information;</li>
                <li>analytics information; and</li>
                <li>media or user-generated content.</li>
              </ul>
              <p>
                Where required by applicable law, SporTech may use appropriate transfer mechanisms, safeguards,
                regulatory approvals, consent mechanisms, or other lawful transfer arrangements.
              </p>
              <p>
                Certain jurisdictions may also require local storage, processing, retention, or additional regulatory
                controls. SporTech may implement jurisdiction-specific measures where required.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-on-dark font-semibold text-lg mb-3">10. Data Security</h2>
            <div className="space-y-4">
              <p>We use appropriate technical and organisational safeguards designed to protect personal data.</p>
              <p>These safeguards may include measures relating to:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>access control and authentication;</li>
                <li>encryption;</li>
                <li>monitoring;</li>
                <li>logging;</li>
                <li>incident response; and</li>
                <li>other security controls appropriate to the sensitivity of the information.</li>
              </ul>
              <p>
                No system can guarantee absolute security, but SporTech seeks to maintain safeguards appropriate to its
                services, users, and legal obligations.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-on-dark font-semibold text-lg mb-3">11. Data Retention</h2>
            <div className="space-y-4">
              <p>
                SporTech maintains and reviews data-retention requirements as part of its privacy governance practices.
              </p>
              <p>Retention may depend on factors such as:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>the type of data;</li>
                <li>the purpose for which it is processed;</li>
                <li>legal or regulatory obligations;</li>
                <li>contractual requirements;</li>
                <li>security requirements; and</li>
                <li>operational needs.</li>
              </ul>
              <p>Where jurisdiction-specific retention requirements apply, SporTech may implement additional controls.</p>
            </div>
          </section>

          <section>
            <h2 className="text-on-dark font-semibold text-lg mb-3">12. Your Privacy Rights</h2>
            <div className="space-y-6">
              <p>
                Depending on your location and applicable law, you may have privacy rights in relation to your personal
                data.
              </p>

              <div className="space-y-3">
                <h3 className="text-on-dark font-semibold">12.1 Right of Access</h3>
                <p>
                  You may request access to personal data processed by SporTech, subject to applicable law and relevant
                  limitations.
                </p>
                <p>Where applicable, this may include access to or information about:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>account information;</li>
                  <li>membership information;</li>
                  <li>wallet information;</li>
                  <li>transaction information;</li>
                  <li>contact information;</li>
                  <li>profile information; and</li>
                  <li>activity information.</li>
                </ul>
                <p>
                  Access may be restricted where disclosure would violate legal obligations, compromise security,
                  affect the rights of another person, or reveal confidential business information.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-on-dark font-semibold">12.2 Right of Correction</h3>
                <p>You may request correction of inaccurate or incomplete personal data.</p>
              </div>

              <div className="space-y-3">
                <h3 className="text-on-dark font-semibold">12.3 Other Applicable Rights</h3>
                <p>
                  Additional privacy rights may apply depending on your jurisdiction and the service you use.
                </p>
                <p>
                  SporTech may implement jurisdiction-specific rights, notices, disclosures, and consent mechanisms
                  where required by applicable law.
                </p>
                <p>
                  To exercise an applicable privacy right, please use the privacy or support request method made
                  available through the relevant SporTech service or website.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-on-dark font-semibold text-lg mb-3">13. Marketing Communications</h2>
            <div className="space-y-4">
              <p>
                Where permitted, SporTech may use contact information to send promotional communications, marketing
                messages, or partner offers.
              </p>
              <p>Where consent is required, marketing communications will be based on appropriate consent.</p>
              <p>
                You may withdraw applicable marketing consent or change your communication preferences through the
                mechanisms made available in the relevant service or communication.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-on-dark font-semibold text-lg mb-3">14. Clubs, Leagues, Federations, and Partners</h2>
            <div className="space-y-4">
              <p>
                Some SporTech services are provided in collaboration with clubs, leagues, federations, or commercial
                partners.
              </p>
              <p>These organisations may have their own privacy responsibilities for activities such as:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>club communications;</li>
                <li>campaigns;</li>
                <li>membership programmes;</li>
                <li>club-specific content; and</li>
                <li>other processing activities they independently control.</li>
              </ul>
              <p>
                Where applicable, you should also review the privacy information provided by the relevant organisation.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-on-dark font-semibold text-lg mb-3">15. Children and Minors</h2>
            <div className="space-y-4">
              <p>Certain services or activities may involve information relating to minors.</p>
              <p>
                Where minor-related information is processed, SporTech treats it as higher-risk information and applies
                enhanced governance and protection requirements in accordance with applicable law.
              </p>
              <p>
                Specific age requirements or consent mechanisms may vary depending on the relevant service and
                jurisdiction.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-on-dark font-semibold text-lg mb-3">16. Changes to This Privacy Policy</h2>
            <div className="space-y-4">
              <p>
                SporTech may update this Privacy Policy as its services, legal obligations, regulatory requirements,
                user base, and international operations evolve.
              </p>
              <p>
                Where appropriate, updated notices, disclosures, or consent mechanisms may be provided through the
                relevant website, application, or service.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-on-dark font-semibold text-lg mb-3">17. Regulatory Framework</h2>
            <div className="space-y-4">
              <p>
                SporTech&rsquo;s privacy framework is designed to support compliance with applicable privacy and
                data-protection requirements, including, where relevant:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>the Saudi Personal Data Protection Law (PDPL);</li>
                <li>the European Union General Data Protection Regulation (GDPR);</li>
                <li>the United Kingdom GDPR;</li>
                <li>Brazil&rsquo;s Lei Geral de Proteção de Dados (LGPD);</li>
                <li>the UAE Personal Data Protection Law; and</li>
                <li>other applicable privacy and data-protection laws.</li>
              </ul>
              <p>
                The specific rights, obligations, and legal bases applicable to you may vary depending on your
                jurisdiction.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-on-dark font-semibold text-lg mb-3">18. Contact and Privacy Requests</h2>
            <div className="space-y-4">
              <p>
                If you have a question about this Privacy Policy or wish to exercise an applicable privacy right,
                please use the privacy or support contact method made available through the relevant SporTech website,
                application, or service, or email{" "}
                <a href="mailto:contact@sportech.com.sa" className="text-on-dark underline underline-offset-2">
                  contact@sportech.com.sa
                </a>
                .
              </p>
              <p className="text-muted">© SporTech. All rights reserved.</p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
