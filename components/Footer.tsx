import Link from "next/link";

export function Footer() {
  return (
    <footer
      className="pt-32 pb-12"
      style={{ background: "var(--lef-forest)", color: "var(--lef-cream)" }}
    >
      <div className="lef-container">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
          <div className="md:col-span-6">
            <h2
              className="font-display"
              style={{
                fontSize: "var(--fs-64)",
                lineHeight: 1,
                letterSpacing: "-0.02em",
                fontWeight: 400,
              }}
            >
              Stay a while.
            </h2>
            <p
              className="mt-8 max-w-md"
              style={{ fontSize: "var(--fs-18)", color: "var(--lef-stone)", lineHeight: 1.6 }}
            >
              A converted cabin on a working farm — wood-fired, hand-finished,
              set against open fields and quiet skies.
            </p>
          </div>

          <div className="md:col-span-3">
            <p className="font-mono-eyebrow mb-6" style={{ color: "var(--lef-stone)" }}>
              Find us
            </p>
            <ul className="space-y-3" style={{ fontSize: "var(--fs-18)" }}>
              <li>Squirrels' Nest</li>
              <li style={{ color: "var(--lef-stone)" }}>The English countryside</li>
              <li className="pt-3">
                <a href="mailto:hello@squirrelsnest.co.uk" className="underline-offset-4 hover:underline">
                  hello@squirrelsnest.co.uk
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="font-mono-eyebrow mb-6" style={{ color: "var(--lef-stone)" }}>
              Visit
            </p>
            <ul className="space-y-3" style={{ fontSize: "var(--fs-18)" }}>
              <li>
                <Link href="/" className="underline-offset-4 hover:underline">Home</Link>
              </li>
              <li>
                <Link href="/contact" className="underline-offset-4 hover:underline">Contact</Link>
              </li>
              <li>
                <a
                  href="#book"
                  className="underline-offset-4 hover:underline"
                >
                  Book on Airbnb
                </a>
              </li>
              <li>
                <a href="#" className="underline-offset-4 hover:underline">Instagram</a>
              </li>
            </ul>
          </div>
        </div>

        <div
          className="mt-24 pt-8 flex flex-col md:flex-row gap-4 justify-between font-mono-eyebrow"
          style={{ borderTop: "1px solid color-mix(in srgb, var(--lef-stone) 30%, transparent)", color: "var(--lef-stone)" }}
        >
          <span>© {new Date().getFullYear()} Squirrels' Nest</span>
          <span>Built slowly, in the countryside</span>
        </div>
      </div>
    </footer>
  );
}
