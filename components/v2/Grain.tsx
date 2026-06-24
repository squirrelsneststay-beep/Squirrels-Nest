/**
 * Film-grain overlay — a fixed, non-interactive SVG noise layer over the page
 * content at very low opacity. Adds a handmade, analog texture that reads as
 * quiet luxury rather than flat digital. Static (no flicker) so it stays calm;
 * sits below the nav and Book pill so it never touches the controls.
 *
 * Server component: pure markup, the noise lives in globals.css (.sn-grain).
 */
export function Grain() {
  return <div aria-hidden className="sn-grain" />;
}
