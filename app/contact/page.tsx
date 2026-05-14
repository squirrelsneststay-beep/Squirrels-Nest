import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { ScrollReveal } from "@/components/ScrollReveal";
import { PlaceholderImage } from "@/components/PlaceholderImage";

export const metadata: Metadata = {
  title: "Contact — Lane End Farm",
  description: "Get in touch with Lane End Farm — questions, longer stays, special requests.",
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
                  We're not far.
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
            <form
              className="md:col-span-7 space-y-8"
              action="mailto:hello@laneendfarm.co.uk"
              method="post"
              encType="text/plain"
            >
              <Field label="Your name" name="name" type="text" placeholder="Jane Doe" />
              <Field label="Email" name="email" type="email" placeholder="jane@email.com" />
              <Field label="Approximate dates" name="dates" type="text" placeholder="Late October, 2-3 nights" />

              <div>
                <label
                  htmlFor="message"
                  className="font-mono-eyebrow block mb-3"
                  style={{ color: "var(--lef-bark)" }}
                >
                  Your message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  placeholder="Tell us a little about your stay..."
                  className="w-full bg-transparent border-0 border-b pb-4 outline-none resize-none"
                  style={{
                    borderColor: "var(--lef-bark)",
                    fontFamily: "var(--font-geist)",
                    fontSize: "var(--fs-22)",
                    color: "var(--lef-forest)",
                  }}
                />
              </div>

              <div className="pt-6">
                <Button variant="forest">Send message</Button>
                <p
                  className="mt-6 font-mono-eyebrow"
                  style={{ color: "var(--lef-bark)" }}
                >
                  Replies usually arrive within a day.
                </p>
              </div>
            </form>

            <aside className="md:col-span-4 md:col-start-9 space-y-12">
              <PlaceholderImage label="The lane" tone="moss" aspect="4 / 5" />

              <div>
                <p className="font-mono-eyebrow mb-3" style={{ color: "var(--lef-bark)" }}>
                  Direct
                </p>
                <a
                  href="mailto:hello@laneendfarm.co.uk"
                  className="font-display block underline-offset-4 hover:underline"
                  style={{ fontSize: "var(--fs-28)", color: "var(--lef-forest)" }}
                >
                  hello@laneendfarm.co.uk
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
                  Lane End Farm,
                  <br />
                  The English countryside.
                </p>
              </div>

              <div>
                <p className="font-mono-eyebrow mb-3" style={{ color: "var(--lef-bark)" }}>
                  Booking
                </p>
                <a
                  href="#"
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

function Field({
  label,
  name,
  type,
  placeholder,
}: {
  label: string;
  name: string;
  type: string;
  placeholder: string;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="font-mono-eyebrow block mb-3"
        style={{ color: "var(--lef-bark)" }}
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        className="w-full bg-transparent border-0 border-b pb-4 outline-none"
        style={{
          borderColor: "var(--lef-bark)",
          fontFamily: "var(--font-geist)",
          fontSize: "var(--fs-22)",
          color: "var(--lef-forest)",
        }}
      />
    </div>
  );
}
