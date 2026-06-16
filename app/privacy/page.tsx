import type { Metadata } from "next";
import Link from "next/link";
import { BRAND, AIRBNB_URL, EXTERNAL_LINK_PROPS, emailComposeUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${BRAND.name} collects, uses, and protects your personal data under UK GDPR.`,
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

/**
 * Privacy-policy facts that only the owner can confirm. Fill these in before
 * launch. Lines whose value is null are hidden until provided, so the page is
 * shippable now and becomes complete as the details land.
 *
 * IMPORTANT (not legal advice): under UK GDPR a privacy notice must identify
 * the data controller and give an address for data-rights requests. Set
 * `controllerName` to the legal/trading identity that actually runs the
 * cabin (e.g. "Zoe <Surname>, trading as Squirrels' Nest", or a limited
 * company name + number). If the business is registered with the ICO and pays
 * the data-protection fee, add the registration number.
 */
const POLICY = {
  // Shown as "Last updated" and used for the document version line.
  lastUpdated: "16 June 2026",
  // TODO(owner): legal/trading name of the data controller.
  controllerName: BRAND.name,
  // TODO(owner): postal address for data-rights requests. null hides the line.
  controllerAddress: null as string | null,
  // TODO(owner): ICO data-protection fee registration number, if registered.
  icoRegistration: null as string | null,
  // The address guests use for any privacy request. Defaults to the brand inbox.
  contactEmail: BRAND.email,
} as const;

export default function PrivacyPage() {
  return (
    <article
      className="pt-44 pb-32"
      style={{
        fontFamily: "var(--font-geist)",
        color: "var(--lef-charcoal)",
        lineHeight: 1.65,
      }}
    >
      <div className="lef-container" style={{ maxWidth: "44rem" }}>
        <p
          className="font-mono-eyebrow"
          style={{ color: "var(--lef-bark)", marginBottom: "1.5rem" }}
        >
          Privacy Policy
        </p>
        <h1
          className="font-display"
          style={{
            fontSize: "var(--fs-64)",
            color: "var(--lef-forest)",
            lineHeight: 1,
            letterSpacing: "-0.02em",
            fontWeight: 400,
            marginBottom: "1.5rem",
          }}
        >
          Your privacy, in plain English.
        </h1>

        <p style={{ fontSize: "var(--fs-18)", marginBottom: "1rem", color: "var(--lef-bark)" }}>
          Last updated: {POLICY.lastUpdated}
        </p>

        <p style={{ fontSize: "var(--fs-18)", marginBottom: "1.5rem" }}>
          {BRAND.name} (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) is
          a small boutique cabin in {BRAND.location}, England. We take your
          privacy seriously and collect as little personal data as possible.
          This policy explains what we collect, why, how we protect it, and the
          rights you have under the UK General Data Protection Regulation (UK
          GDPR) and the Data Protection Act 2018. It applies to this website,{" "}
          <span style={{ whiteSpace: "nowrap" }}>squirrelsneststay.com</span>,
          and to enquiries you send us through it.
        </p>

        <p style={{ fontSize: "var(--fs-18)", marginBottom: "0.5rem" }}>
          Booking happens on Airbnb, not on this site. When you book or message
          us through{" "}
          <a href={AIRBNB_URL} {...EXTERNAL_LINK_PROPS} style={linkStyle}>
            Airbnb
          </a>
          , your data is handled under Airbnb&apos;s own privacy policy, and
          Airbnb is the data controller for that activity. This policy covers
          only what happens on our website.
        </p>

        <Section heading="Who is responsible for your data">
          <p>
            The data controller for personal data collected through this site is{" "}
            <strong>{POLICY.controllerName}</strong>.
          </p>
          <ul style={listStyle}>
            <li>
              By email:{" "}
              <a href={emailComposeUrl()} {...EXTERNAL_LINK_PROPS} style={linkStyle}>
                {POLICY.contactEmail}
              </a>
            </li>
            {POLICY.controllerAddress && <li>By post: {POLICY.controllerAddress}</li>}
            {POLICY.icoRegistration && (
              <li>ICO registration number: {POLICY.icoRegistration}</li>
            )}
          </ul>
          <p>
            If you have any question about this policy or how we handle your
            data, please contact us using the details above. We&apos;re a small
            operation, so it&apos;s usually Zoe who reads and answers.
          </p>
        </Section>

        <Section heading="The personal data we collect">
          <p style={subheadStyle}>Information you give us</p>
          <p>
            When you complete the form on our{" "}
            <Link href="/contact" style={linkStyle}>
              contact page
            </Link>{" "}
            (or email us directly), we collect:
          </p>
          <ul style={listStyle}>
            <li>your name;</li>
            <li>your email address;</li>
            <li>the dates you&apos;re interested in, if you choose to tell us;</li>
            <li>the content of your message.</li>
          </ul>
          <p>
            Please don&apos;t send us sensitive information (for example details
            of your health, race, religion, or anything classed as a
            &ldquo;special category&rdquo; under the UK GDPR). We don&apos;t ask
            for it and don&apos;t need it.
          </p>

          <p style={subheadStyle}>Information collected automatically</p>
          <p>
            Like virtually every website, our hosting provider records limited
            technical information when you visit, for security and reliability.
            This can include your IP address, the type and version of your
            browser and device, the page that referred you, and the date and
            time of your request. We also use your IP address momentarily to
            rate-limit the contact form so it can&apos;t be abused by bots. We
            do not use this technical data to identify you, build a profile, or
            track you across other websites.
          </p>
        </Section>

        <Section heading="How and why we use your data">
          <p>
            We only use your personal data for the purposes below, and we always
            rely on a lawful basis under Article 6 of the UK GDPR:
          </p>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Purpose</th>
                <th style={thStyle}>Data used</th>
                <th style={thStyle}>Lawful basis</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={tdStyle}>Reply to your enquiry and discuss a possible stay</td>
                <td style={tdStyle}>Name, email, dates, message</td>
                <td style={tdStyle}>
                  Legitimate interests (responding to a message you started); and,
                  where your enquiry is about a specific booking, steps taken at
                  your request before entering a contract
                </td>
              </tr>
              <tr>
                <td style={tdStyle}>Keep a record of our correspondence in case you write again</td>
                <td style={tdStyle}>Name, email, message history</td>
                <td style={tdStyle}>Legitimate interests (running the cabin properly)</td>
              </tr>
              <tr>
                <td style={tdStyle}>Keep the site secure and prevent spam and abuse</td>
                <td style={tdStyle}>IP address, technical data</td>
                <td style={tdStyle}>Legitimate interests (protecting our site and inbox)</td>
              </tr>
              <tr>
                <td style={tdStyle}>Comply with the law where we&apos;re required to</td>
                <td style={tdStyle}>As relevant to the obligation</td>
                <td style={tdStyle}>Legal obligation</td>
              </tr>
            </tbody>
          </table>
          <p>
            Where we rely on legitimate interests, we&apos;ve considered your
            rights and interests and don&apos;t believe our use of your data
            overrides them. You can object at any time (see{" "}
            <em>Your rights</em> below).
          </p>
          <p>
            We do not use your data for marketing, we do not sell or rent it to
            anyone, and we do not make any automated decisions about you.
          </p>
        </Section>

        <Section heading="Cookies, local storage and tracking">
          <p>
            We use <strong>no</strong> analytics, advertising pixels, or
            third-party tracking cookies. Nothing on this site follows you
            around the web.
          </p>
          <p>
            The site stores just two small, strictly necessary items in your own
            browser. Neither contains personal data, neither is shared with
            anyone, and under the Privacy and Electronic Communications
            Regulations (PECR) they don&apos;t require a consent banner because
            they only make the site work the way you&apos;d expect:
          </p>
          <ul style={listStyle}>
            <li>
              <strong>Theme preference</strong> — remembers whether you chose
              the light or dark version of the site, so it stays the way you
              left it.
            </li>
            <li>
              <strong>Intro flag</strong> — remembers that you&apos;ve already
              seen the opening animation during this visit, so it doesn&apos;t
              replay on every page.
            </li>
          </ul>
          <p>
            Our fonts are served from our own domain, not fetched from Google or
            any other third party, so visiting the site doesn&apos;t share your
            IP address with a font provider.
          </p>
        </Section>

        <Section heading="Who else handles your data">
          <p>
            We keep the list of companies that touch your data deliberately
            short. Each is a reputable provider bound by a data-processing
            agreement to use your data only on our instructions:
          </p>
          <ul style={listStyle}>
            <li>
              <strong>Vercel</strong> — hosts the website and serves it to you.
              It processes the technical and security data described above.
            </li>
            <li>
              <strong>Resend</strong> — delivers the email from our contact form
              to our inbox. It handles your message in transit and keeps only
              short-term delivery logs.
            </li>
            <li>
              <strong>Google (Gmail)</strong> — the mailbox where your enquiry
              arrives and is read. Once an email lands, it sits in our private
              inbox, protected by our account security.
            </li>
          </ul>
          <p>
            We may also disclose personal data if we&apos;re legally required to
            (for example, in response to a valid request from a public
            authority), or to establish, exercise, or defend legal claims.
          </p>
        </Section>

        <Section heading="Sending data outside the UK">
          <p>
            Some of our providers (including Vercel and Resend) are based in, or
            store data in, the United States. Where your personal data is
            transferred outside the UK, we rely on safeguards approved under UK
            data protection law — such as the UK International Data Transfer
            Agreement or the UK Addendum to the EU Standard Contractual Clauses,
            or transfers to a country the UK Government has deemed to provide
            adequate protection. The effect is that your data keeps an
            equivalent level of legal protection wherever it&apos;s processed.
          </p>
        </Section>

        <Section heading="How long we keep your data">
          <p>
            We don&apos;t keep your data any longer than we need to:
          </p>
          <ul style={listStyle}>
            <li>
              <strong>Enquiry emails</strong> — until your enquiry is resolved
              and our conversation is finished, or until we&apos;ve held a
              message for around 12 months without further contact, whichever
              comes first. Then we delete it.
            </li>
            <li>
              <strong>Technical and security logs</strong> — kept only for the
              short period our hosting provider retains them (typically a few
              weeks to a few months) before they&apos;re automatically deleted.
            </li>
            <li>
              <strong>Rate-limiting data</strong> — your IP address is held in
              memory only for a few minutes to spot abuse, then discarded. It is
              never written to a database.
            </li>
          </ul>
        </Section>

        <Section heading="How we protect your data">
          <p>
            Security is built into the site, not bolted on. Among other
            measures:
          </p>
          <ul style={listStyle}>
            <li>the whole site is served over an encrypted HTTPS connection;</li>
            <li>
              we apply strict security headers (including a Content Security
              Policy, HSTS, and clickjacking protection);
            </li>
            <li>
              the website itself stores none of your enquiry data — messages go
              straight to our inbox and nowhere else;
            </li>
            <li>access to that inbox is limited and password-protected;</li>
            <li>we use established, security-conscious providers.</li>
          </ul>
          <p>
            No method of transmitting data over the internet is ever 100%
            secure, but we take every reasonable step to protect yours and to
            deal quickly with any issue if one arises.
          </p>
        </Section>

        <Section heading="Your rights">
          <p>
            Under the UK GDPR you have the right to:
          </p>
          <ul style={listStyle}>
            <li><strong>Be informed</strong> about how we use your data — that&apos;s what this policy is for.</li>
            <li><strong>Access</strong> the personal data we hold about you.</li>
            <li><strong>Rectification</strong> — have inaccurate data corrected or incomplete data completed.</li>
            <li><strong>Erasure</strong> — ask us to delete your data (&ldquo;the right to be forgotten&rdquo;).</li>
            <li><strong>Restrict</strong> how we use your data in certain circumstances.</li>
            <li><strong>Object</strong> to our use of your data where we rely on legitimate interests.</li>
            <li><strong>Data portability</strong> — receive your data in a portable format.</li>
            <li><strong>Withdraw consent</strong> at any time, where we rely on consent.</li>
            <li>
              <strong>Not be subject to automated decision-making</strong> — we
              don&apos;t do any, so this never applies.
            </li>
          </ul>
          <p>
            To exercise any of these, just email{" "}
            <a href={emailComposeUrl()} {...EXTERNAL_LINK_PROPS} style={linkStyle}>
              {POLICY.contactEmail}
            </a>
            . It&apos;s free, and we&apos;ll respond within one month, as the
            law requires (and usually much sooner).
          </p>
        </Section>

        <Section heading="Complaints">
          <p>
            If you&apos;re unhappy with how we&apos;ve handled your data, please
            tell us first so we can put it right. You also have the right to
            complain to the UK&apos;s data protection regulator, the Information
            Commissioner&apos;s Office (ICO):
          </p>
          <ul style={listStyle}>
            <li>
              Online:{" "}
              <a href="https://ico.org.uk/make-a-complaint/" {...EXTERNAL_LINK_PROPS} style={linkStyle}>
                ico.org.uk/make-a-complaint
              </a>
            </li>
            <li>Helpline: 0303 123 1113</li>
            <li>
              By post: Information Commissioner&apos;s Office, Wycliffe House,
              Water Lane, Wilmslow, Cheshire, SK9 5AF
            </li>
          </ul>
        </Section>

        <Section heading="Children">
          <p>
            This site and our cabin are intended for adults. We don&apos;t
            knowingly collect personal data from children. If you believe a
            child has sent us their data, contact us and we&apos;ll delete it.
          </p>
        </Section>

        <Section heading="Links to other websites">
          <p>
            Our site links to places we don&apos;t control — most importantly
            our{" "}
            <a href={AIRBNB_URL} {...EXTERNAL_LINK_PROPS} style={linkStyle}>
              Airbnb listing
            </a>
            , and possibly social media. Once you follow a link off our site,
            this policy no longer applies; please read the privacy policy of
            wherever you land. We&apos;re not responsible for the practices of
            other websites.
          </p>
        </Section>

        <Section heading="Changes to this policy">
          <p>
            If we change how we handle your data — for example if we ever add
            analytics, an embedded booking calendar, or any third-party widget —
            we&apos;ll update this page and change the &ldquo;last updated&rdquo;
            date at the top. For significant changes we&apos;ll make the update
            clear. Please check back from time to time.
          </p>
        </Section>
      </div>
    </article>
  );
}

const linkStyle: React.CSSProperties = {
  color: "var(--lef-forest)",
  textDecoration: "underline",
  textUnderlineOffset: "2px",
};

const listStyle: React.CSSProperties = {
  margin: "0.75rem 0 1.25rem",
  paddingLeft: "1.25rem",
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
  listStyleType: "disc",
};

const subheadStyle: React.CSSProperties = {
  fontWeight: 600,
  marginTop: "1.5rem",
  marginBottom: "0.25rem",
};

const tableStyle: React.CSSProperties = {
  width: "100%",
  borderCollapse: "collapse",
  margin: "1rem 0 1.5rem",
  fontSize: "var(--fs-16, 0.95rem)",
};

const thStyle: React.CSSProperties = {
  textAlign: "left",
  verticalAlign: "top",
  padding: "0.6rem 0.75rem",
  borderBottom: "2px solid var(--lef-forest)",
  color: "var(--lef-forest)",
  fontWeight: 600,
};

const tdStyle: React.CSSProperties = {
  textAlign: "left",
  verticalAlign: "top",
  padding: "0.6rem 0.75rem",
  borderBottom: "1px solid var(--lef-line, #e5e1d7)",
};

function Section({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <section style={{ marginTop: "2.5rem" }}>
      <h2
        className="font-display"
        style={{
          fontSize: "var(--fs-28)",
          color: "var(--lef-forest)",
          lineHeight: 1.1,
          letterSpacing: "-0.015em",
          fontWeight: 400,
          marginBottom: "0.75rem",
        }}
      >
        {heading}
      </h2>
      <div style={{ fontSize: "var(--fs-18)" }}>{children}</div>
    </section>
  );
}
