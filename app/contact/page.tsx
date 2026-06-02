import type { Metadata } from "next";
import Image from "next/image";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ContactForm } from "./ContactForm";
import { BRAND, AIRBNB_URL, EXTERNAL_LINK_PROPS } from "@/lib/site";

export const metadata: Metadata = {
  title: `Contact — ${BRAND.name}`,
  description: `Get in touch with ${BRAND.name} — questions, longer stays, special requests.`,
};

export default function ContactPage() {
  return (
    <>
      <section className="pt-44 pb-24">
        <div className="lef-container">
          <ScrollReveal className="grid grid-cols-1 md:grid-cols-12 gap-y-8 md:gap-x-8" selector="[data-reveal]" stagger={0.1}>
            <p data-reveal className="md:col-span-3 font-mono-eyebrow pt-4" style={{ color: "var(--lef-bark)" }}>
              Get in touch
            </p>
            <div className="md:col-span-9">
              <h1
                data-reveal
                className="font-display"
                style={{
                  fontSize: "var(--fs-96)",
                  color: "var(--lef-forest)",
                  lineHeight: 1,
                  letterSpacing: "-0.02em",
                  fontWeight: 400,
                }}
              >
                Say hello.
                <span data-reveal className="italic block" style={{ color: "var(--lef-moss)" }}>
                  We&apos;re not far.
                </span>
              </h1>
              <p
                data-reveal
                className="mt-10 max-w-xl"
                style={{ fontSize: "var(--fs-18)", color: "var(--lef-charcoal)", lineHeight: 1.6 }}
              >
                For availability, the booking moment lives on Airbnb. For
                everything else — longer stays, group bookings, the farm itself,
                whether your dog will get on with our sheep — write to us here.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="pb-32">
        <div className="lef-container">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-x-8">
            <ContactForm />

            <aside className="md:col-span-4 md:col-start-9 space-y-12">
              <div
                className="relative w-full overflow-hidden"
                style={{ aspectRatio: "4 / 5", borderRadius: "3px", background: "var(--lef-line, #e5e1d7)" }}
              >
                <Image
                  src="/images/squirrels-nest/sq-08.jpg"
                  alt="The cabin at Squirrels' Nest, with its bistro table outside"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  style={{ objectFit: "cover" }}
                />
              </div>

              <div>
                <p className="font-mono-eyebrow mb-3" style={{ color: "var(--lef-bark)" }}>
                  Direct
                </p>
                <a
                  href={`mailto:${BRAND.email}`}
                  className="font-display block underline-offset-4 hover:underline"
                  style={{ fontSize: "var(--fs-28)", color: "var(--lef-forest)" }}
                >
                  {BRAND.email}
                </a>
              </div>

              <div>
                <p className="font-mono-eyebrow mb-3" style={{ color: "var(--lef-bark)" }}>
                  Where
                </p>
                <p
                  className="font-display"
                  style={{ fontSize: "var(--fs-22)", color: "var(--lef-forest)", lineHeight: 1.3 }}
                >
                  {BRAND.name},
                  <br />
                  {BRAND.location.charAt(0).toUpperCase() + BRAND.location.slice(1)}.
                </p>
              </div>

              <div>
                <p className="font-mono-eyebrow mb-3" style={{ color: "var(--lef-bark)" }}>
                  Booking
                </p>
                <a
                  href={AIRBNB_URL}
                  {...EXTERNAL_LINK_PROPS}
                  className="font-display block underline-offset-4 hover:underline"
                  style={{ fontSize: "var(--fs-22)", color: "var(--lef-forest)" }}
                >
                  Listing on Airbnb ↗
                </a>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
