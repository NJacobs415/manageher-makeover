import { render } from "@testing-library/react";

// prerenderBoot reads the DOM once at module load, so each case sets up the
// document first and then imports fresh module instances.
async function load(markup: string) {
  vi.resetModules();
  document.body.innerHTML = markup;
  const boot = await import("@/lib/prerenderBoot");
  const { default: PageTransition } = await import("@/components/animations/PageTransition");
  return { ...boot, PageTransition };
}

const opacityOf = (el: ChildNode | null) => (el as HTMLElement | null)?.style.opacity;

describe("prerendered boot", () => {
  it("first route skips the page entrance; routes after the boot window animate", async () => {
    const { isPrerenderedBoot, endPrerenderedBoot, PageTransition } = await load(
      '<div id="root"><div id="tmh-boot" data-prerendered></div></div>',
    );
    expect(isPrerenderedBoot()).toBe(true);

    const first = render(<PageTransition>home</PageTransition>);
    expect(opacityOf(first.container.firstChild)).not.toBe("0");

    // What AnimatedRoutes does on the first pathname change.
    endPrerenderedBoot();
    expect(isPrerenderedBoot()).toBe(false);

    const next = render(<PageTransition>about</PageTransition>);
    expect(opacityOf(next.container.firstChild)).toBe("0");
  });

  it("plain shell (no prerendered marker) animates from the start", async () => {
    const { isPrerenderedBoot, PageTransition } = await load('<div id="root"><div id="tmh-boot"></div></div>');
    expect(isPrerenderedBoot()).toBe(false);
    const view = render(<PageTransition>page</PageTransition>);
    expect(opacityOf(view.container.firstChild)).toBe("0");
  });
});
