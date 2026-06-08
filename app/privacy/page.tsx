import type { Metadata } from "next";
import Link from "next/link";
import { BRAND, EXTERNAL_LINK_PROPS, emailComposeUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy",
  description: `How ${BRAND.name} handles the small amount of personal data the contact form collects.`,
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

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
      <div
        className="lef-container"
        style={{ maxWidth: "44rem" }}
      >
        <p
          className="font-mono-eyebrow"
          style={{ color: "var(--lef-bark)", marginBottom: "1.5rem" }}
        >
          Privacy
        </p>
        <h1
          className="font-display"
          style={{
            fontSize: "var(--fs-64)",
            color: "var(--lef-forest)",
            lineHeight: 1,
            letterSpacing: "-0.02em",
            fontWeight: 400,
            marginBottom: "2.5rem",
          }}
        >
          A short note on data.
        </h1>

        <p style={{ fontSize: "var(--fs-18)", marginBottom: "1.5rem" }}>
          {BRAND.name} is a small Airbnb cabin in {BRAND.location}. The site
          collects almost nothing about you. No analytics, no advertising
          cookies, no third-party trackers. The only personal data we handle
          is what you choose to send through the contact form.
        </p>

        <Section heading="What the contact form collects">
          <p>
            When you send a message via{" "}
            <Link href="/contact" style={{ color: "var(--lef-forest)", textDecoration: "underline", textUnderlineOffset: "2px" }}>
              /contact
            </Link>
            , we receive your name, email address, the dates you mentioned (if
            you supplied any), and the message itself. That&apos;s all.
          </p>
        </Section>

        <Section heading="Why we hold it">
          <p>
            We use it to reply to you and to keep a record of the conversation
            in case you write again. Lawful basis under UK GDPR: legitimate
            interest (responding to an enquiry you initiated).
          </p>
        </Section>

        <Section heading="Who else sees it">
          <p>
            We use{" "}
            <a
              href="https://resend.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--lef-forest)", textDecoration: "underline", textUnderlineOffset: "2px" }}
            >
              Resend
            </a>{" "}
            to deliver the email from the site to our inbox. Resend processes
            the message in transit only; we don&apos;t store it on their servers
            beyond their standard short-term delivery logs. Once the email
            arrives, it lives in our private mailbox, hosted by our email
            provider.
          </p>
        </Section>

        <Section heading="How long we keep it">
          <p>
            We delete enquiry emails when the conversation is finished or when
            we&apos;ve been holding onto one for more than a year without
            hearing back, whichever comes first.
          </p>
        </Section>

        <Section heading="Your rights">
          <p>
            You can ask to see, correct, or delete anything we have about you
            at any time. Email{" "}
            <a
              href={emailComposeUrl()}
              {...EXTERNAL_LINK_PROPS}
              style={{ color: "var(--lef-forest)", textDecoration: "underline", textUnderlineOffset: "2px" }}
            >
              {BRAND.email}
            </a>{" "}
            and we&apos;ll act on it within a week. If you&apos;re unhappy with
            how we handle a request, you can complain to the UK&apos;s
            Information Commissioner&apos;s Office at{" "}
            <a
              href="https://ico.org.uk"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--lef-forest)", textDecoration: "underline", textUnderlineOffset: "2px" }}
            >
              ico.org.uk
            </a>
            .
          </p>
        </Section>

        <Section heading="Cookies">
          <p>
            We don&apos;t set any. The site uses no analytics, no advertising
            pixels, and no behavioural tracking. The only things stored in
            your browser are the standard ones any website needs to render
            (fonts, images, the page itself).
          </p>
        </Section>

        <Section heading="Changes to this policy">
          <p>
            If we ever add anything — analytics, an iframe widget, an embedded
            booking calendar — we&apos;ll update this page and note the
            change. Last updated: 2 June 2026.
          </p>
        </Section>
      </div>
    </article>
  );
}

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
