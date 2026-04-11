// ─── Combined Privacy Policy + Terms of Service Page ───
// src/pages/Legal.tsx
// Single /legal route with #privacy and #terms anchor sections.
// Footer links use /legal#privacy and /legal#terms for deep links.

import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import TextReveal from "@/components/animations/TextReveal";
import FadeIn from "@/components/animations/FadeIn";

const LAST_UPDATED = "April 2026";

const Legal = () => {
  const location = useLocation();

  // Smooth-scroll to hash target after mount (Router doesn't do this automatically)
  useEffect(() => {
    if (location.hash) {
      // Delay slightly to let the page render before scrolling
      const id = location.hash.slice(1);
      const tryScroll = () => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      };
      const t = setTimeout(tryScroll, 100);
      return () => clearTimeout(t);
    } else {
      window.scrollTo({ top: 0 });
    }
  }, [location]);

  return (
    <div className="overflow-x-hidden page-enter">
      <Navbar />

      {/* ═══════ HERO — Dark ═══════ */}
      <section
        className="relative pt-28 pb-16 md:pt-36 md:pb-24 px-6"
        style={{ background: "#0a0a0a" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 30%, rgba(201,169,110,0.05) 0%, transparent 50%)",
          }}
        />
        <div className="max-w-[900px] mx-auto relative z-10 text-center">
          <TextReveal>
            <p
              className="font-sans text-[10px] uppercase tracking-[0.3em] mb-4"
              style={{ color: "#c9a96e" }}
            >
              Legal
            </p>
          </TextReveal>
          <TextReveal delay={150}>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-[1.1] mb-6">
              Privacy & <em className="text-brand-pink italic">Terms</em>
            </h1>
          </TextReveal>
          <FadeIn delay={300} y={15}>
            <p className="font-sans text-[12px] uppercase tracking-[0.2em] text-muted-foreground">
              Last updated: {LAST_UPDATED}
            </p>
          </FadeIn>
          <FadeIn delay={400} y={15}>
            <div className="flex flex-wrap justify-center gap-6 mt-8">
              <a
                href="#privacy"
                className="font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-brand-pink hover:text-brand-pink/80 transition-colors"
              >
                Privacy Policy
              </a>
              <span style={{ color: "rgba(255,255,255,0.2)" }}>·</span>
              <a
                href="#terms"
                className="font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-brand-pink hover:text-brand-pink/80 transition-colors"
              >
                Terms of Service
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════ PRIVACY POLICY — Warm cream ═══════ */}
      <section
        id="privacy"
        className="py-20 md:py-28 px-6 scroll-mt-24"
        style={{ background: "#faf8f5" }}
      >
        <div className="max-w-[800px] mx-auto">
          <FadeIn y={20}>
            <p
              className="font-sans text-[10px] uppercase tracking-[0.3em] mb-3"
              style={{ color: "#c9a96e" }}
            >
              Section 1
            </p>
            <h2
              className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-8"
              style={{ color: "#1a1a1a" }}
            >
              Privacy <em className="text-brand-pink italic">Policy</em>
            </h2>
          </FadeIn>

          <div className="space-y-8" style={{ color: "#3a3a3a" }}>
            <FadeIn delay={100} y={20}>
              <p className="font-sans text-[15px] leading-[1.9]">
                Dream Life Media, LLC (doing business as The Manage Her®) ("we,"
                "us," or "our") operates{" "}
                <strong style={{ color: "#1a1a1a" }}>themanageher.com</strong>{" "}
                (the "Site"). This Privacy Policy explains what information we
                collect, how we use it, and the choices you have.
              </p>
            </FadeIn>

            <FadeIn delay={150} y={20}>
              <h3
                className="font-serif text-xl font-bold mt-10 mb-3"
                style={{ color: "#1a1a1a" }}
              >
                Information We Collect
              </h3>
              <p className="font-sans text-[15px] leading-[1.9] mb-3">
                We collect information you provide directly to us — for example,
                when you subscribe to our newsletter, fill out a contact or
                booking form, or email us. This may include your name, email
                address, phone number, and any message content you send.
              </p>
              <p className="font-sans text-[15px] leading-[1.9]">
                We also automatically collect limited technical information when
                you visit the Site: your IP address, browser type, device type,
                referring URL, pages viewed, and approximate location. This
                helps us understand how visitors use the Site and improve it
                over time.
              </p>
            </FadeIn>

            <FadeIn delay={200} y={20}>
              <h3
                className="font-serif text-xl font-bold mt-10 mb-3"
                style={{ color: "#1a1a1a" }}
              >
                Cookies & Tracking
              </h3>
              <p className="font-sans text-[15px] leading-[1.9]">
                We use cookies and similar technologies to remember your
                preferences, measure Site performance, and support analytics.
                Most browsers let you control cookies through settings — you can
                block or delete them, though some parts of the Site may not
                function as intended if you do.
              </p>
            </FadeIn>

            <FadeIn delay={250} y={20}>
              <h3
                className="font-serif text-xl font-bold mt-10 mb-3"
                style={{ color: "#1a1a1a" }}
              >
                Third-Party Services
              </h3>
              <p className="font-sans text-[15px] leading-[1.9] mb-3">
                We rely on trusted third parties to deliver features and
                measure engagement. These services may receive information
                about your visit according to their own privacy policies:
              </p>
              <ul
                className="font-sans text-[15px] leading-[1.9] list-disc pl-6 space-y-1"
                style={{ color: "#3a3a3a" }}
              >
                <li>
                  <strong style={{ color: "#1a1a1a" }}>Google Analytics</strong>{" "}
                  for anonymized traffic measurement
                </li>
                <li>
                  <strong style={{ color: "#1a1a1a" }}>YouTube</strong>{" "}
                  (embedded video player on blog posts and podcast pages)
                </li>
                <li>
                  <strong style={{ color: "#1a1a1a" }}>
                    Podcast platforms
                  </strong>{" "}
                  (Apple Podcasts, Spotify, Amazon Music) when you click a
                  listen link
                </li>
                <li>
                  <strong style={{ color: "#1a1a1a" }}>
                    Email service providers
                  </strong>{" "}
                  for newsletter delivery
                </li>
                <li>
                  <strong style={{ color: "#1a1a1a" }}>
                    Hosting & CDN providers
                  </strong>{" "}
                  used to serve the Site
                </li>
              </ul>
            </FadeIn>

            <FadeIn delay={300} y={20}>
              <h3
                className="font-serif text-xl font-bold mt-10 mb-3"
                style={{ color: "#1a1a1a" }}
              >
                Email Marketing
              </h3>
              <p className="font-sans text-[15px] leading-[1.9]">
                If you subscribe to our newsletter, we'll send you episode
                updates, new content, and occasional announcements. Every email
                includes an unsubscribe link — you can opt out at any time. We
                do not sell or rent email addresses to third parties.
              </p>
            </FadeIn>

            <FadeIn delay={350} y={20}>
              <h3
                className="font-serif text-xl font-bold mt-10 mb-3"
                style={{ color: "#1a1a1a" }}
              >
                Data Retention
              </h3>
              <p className="font-sans text-[15px] leading-[1.9]">
                We retain personal information for as long as it's needed to
                provide the services you've requested (for example, while
                you're subscribed to our newsletter) or as required to comply
                with our legal obligations. You can request deletion at any
                time using the contact information below.
              </p>
            </FadeIn>

            <FadeIn delay={400} y={20}>
              <h3
                className="font-serif text-xl font-bold mt-10 mb-3"
                style={{ color: "#1a1a1a" }}
              >
                Your California Privacy Rights (CCPA)
              </h3>
              <p className="font-sans text-[15px] leading-[1.9] mb-3">
                If you are a California resident, the California Consumer
                Privacy Act (CCPA) grants you specific rights regarding your
                personal information, including:
              </p>
              <ul
                className="font-sans text-[15px] leading-[1.9] list-disc pl-6 space-y-1"
                style={{ color: "#3a3a3a" }}
              >
                <li>
                  The right to know what personal information we collect, use,
                  and share
                </li>
                <li>
                  The right to request deletion of personal information we've
                  collected
                </li>
                <li>
                  The right to opt out of the sale of personal information — we
                  do not sell your personal information
                </li>
                <li>
                  The right to non-discrimination for exercising your CCPA
                  rights
                </li>
              </ul>
              <p className="font-sans text-[15px] leading-[1.9] mt-3">
                To exercise these rights, email us at{" "}
                <a
                  href="mailto:info@themanageher.com"
                  className="text-brand-pink hover:underline"
                >
                  info@themanageher.com
                </a>
                .
              </p>
            </FadeIn>

            <FadeIn delay={450} y={20}>
              <h3
                className="font-serif text-xl font-bold mt-10 mb-3"
                style={{ color: "#1a1a1a" }}
              >
                Children's Privacy
              </h3>
              <p className="font-sans text-[15px] leading-[1.9]">
                The Manage Her® is not directed to children under the age of
                13, and we do not knowingly collect personal information from
                children under 13. If you believe a child has provided us with
                personal information, please contact us and we will promptly
                delete it.
              </p>
            </FadeIn>

            <FadeIn delay={500} y={20}>
              <h3
                className="font-serif text-xl font-bold mt-10 mb-3"
                style={{ color: "#1a1a1a" }}
              >
                Changes to This Policy
              </h3>
              <p className="font-sans text-[15px] leading-[1.9]">
                We may update this Privacy Policy from time to time. When we
                do, we'll revise the "Last updated" date at the top of this
                page. Continued use of the Site after changes are posted
                constitutes acceptance of the updated policy.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══════ TERMS OF SERVICE — Warm cream (slightly different shade) ═══════ */}
      <section
        id="terms"
        className="py-20 md:py-28 px-6 scroll-mt-24"
        style={{ background: "#f5f0eb" }}
      >
        <div className="max-w-[800px] mx-auto">
          <FadeIn y={20}>
            <p
              className="font-sans text-[10px] uppercase tracking-[0.3em] mb-3"
              style={{ color: "#c9a96e" }}
            >
              Section 2
            </p>
            <h2
              className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-8"
              style={{ color: "#1a1a1a" }}
            >
              Terms of <em className="text-brand-pink italic">Service</em>
            </h2>
          </FadeIn>

          <div className="space-y-8" style={{ color: "#3a3a3a" }}>
            <FadeIn delay={100} y={20}>
              <p className="font-sans text-[15px] leading-[1.9]">
                These Terms of Service ("Terms") govern your access to and use
                of the websites, content, and services operated by Dream Life
                Media, LLC (doing business as The Manage Her®) ("we," "us," or
                "our"). By using{" "}
                <strong style={{ color: "#1a1a1a" }}>themanageher.com</strong>,
                you agree to these Terms. If you do not agree, please do not
                use the Site.
              </p>
            </FadeIn>

            <FadeIn delay={150} y={20}>
              <h3
                className="font-serif text-xl font-bold mt-10 mb-3"
                style={{ color: "#1a1a1a" }}
              >
                Intellectual Property
              </h3>
              <p className="font-sans text-[15px] leading-[1.9]">
                All content on the Site — including text, graphics, photos,
                logos, audio, video, podcast episodes, and the book{" "}
                <em>The Manage Her®: Unveiling Invisible Labor & Sparking a
                Leadership Revolution</em> — is owned by Dream Life Media, LLC
                or its licensors and is protected by United States and
                international copyright and trademark laws.{" "}
                <strong style={{ color: "#1a1a1a" }}>
                  The Manage Her® is a registered trademark
                </strong>{" "}
                of Dream Life Media, LLC. You may view and share content for
                personal, non-commercial use with attribution. Any other use —
                including reproduction, modification, distribution, or
                commercial use — requires our prior written consent.
              </p>
            </FadeIn>

            <FadeIn delay={200} y={20}>
              <h3
                className="font-serif text-xl font-bold mt-10 mb-3"
                style={{ color: "#1a1a1a" }}
              >
                User Conduct
              </h3>
              <p className="font-sans text-[15px] leading-[1.9] mb-3">
                When using the Site, you agree not to:
              </p>
              <ul
                className="font-sans text-[15px] leading-[1.9] list-disc pl-6 space-y-1"
                style={{ color: "#3a3a3a" }}
              >
                <li>Violate any applicable law or regulation</li>
                <li>
                  Infringe on the intellectual property rights of Dream Life
                  Media, LLC or any third party
                </li>
                <li>
                  Interfere with or disrupt the Site or servers connected to
                  the Site
                </li>
                <li>
                  Attempt to gain unauthorized access to any portion of the
                  Site
                </li>
                <li>
                  Use any automated means (bots, scrapers, crawlers) to harvest
                  content without permission
                </li>
                <li>
                  Impersonate any person or misrepresent your affiliation with
                  any person or entity
                </li>
              </ul>
            </FadeIn>

            <FadeIn delay={250} y={20}>
              <h3
                className="font-serif text-xl font-bold mt-10 mb-3"
                style={{ color: "#1a1a1a" }}
              >
                Disclaimer of Warranties
              </h3>
              <p className="font-sans text-[15px] leading-[1.9]">
                The Site and all content are provided "as is" and "as
                available" without warranties of any kind, either express or
                implied. The information shared on the podcast, the blog, and
                the book is for educational and informational purposes only —
                it is not professional financial, legal, medical, or career
                advice. You should consult qualified professionals before
                making decisions based on anything you read or hear here. We
                make no warranties that the Site will be uninterrupted,
                error-free, or free of viruses or other harmful components.
              </p>
            </FadeIn>

            <FadeIn delay={300} y={20}>
              <h3
                className="font-serif text-xl font-bold mt-10 mb-3"
                style={{ color: "#1a1a1a" }}
              >
                Limitation of Liability
              </h3>
              <p className="font-sans text-[15px] leading-[1.9]">
                To the fullest extent permitted by law, Dream Life Media, LLC,
                its owners, employees, and affiliates shall not be liable for
                any indirect, incidental, special, consequential, or punitive
                damages arising out of or related to your use of the Site or
                its content, even if advised of the possibility of such
                damages. Our total aggregate liability for any claim arising
                out of these Terms shall not exceed one hundred dollars
                ($100.00).
              </p>
            </FadeIn>

            <FadeIn delay={350} y={20}>
              <h3
                className="font-serif text-xl font-bold mt-10 mb-3"
                style={{ color: "#1a1a1a" }}
              >
                Governing Law
              </h3>
              <p className="font-sans text-[15px] leading-[1.9]">
                These Terms are governed by and construed in accordance with
                the laws of the{" "}
                <strong style={{ color: "#1a1a1a" }}>State of California</strong>
                , without regard to its conflict of laws principles. Any
                dispute arising out of or related to these Terms or your use of
                the Site shall be resolved exclusively in the state or federal
                courts located in Orange County, California, and you consent to
                the personal jurisdiction of those courts.
              </p>
            </FadeIn>

            <FadeIn delay={400} y={20}>
              <h3
                className="font-serif text-xl font-bold mt-10 mb-3"
                style={{ color: "#1a1a1a" }}
              >
                Changes to These Terms
              </h3>
              <p className="font-sans text-[15px] leading-[1.9]">
                We may update these Terms at any time. When we do, we'll revise
                the "Last updated" date at the top of this page. Your continued
                use of the Site after changes are posted means you accept the
                updated Terms.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══════ CONTACT — Dark closing section ═══════ */}
      <section
        className="py-20 md:py-28 px-6"
        style={{
          background: "#0a0a0a",
          borderTop: "1px solid rgba(201,169,110,0.1)",
        }}
      >
        <div className="max-w-[700px] mx-auto text-center">
          <FadeIn y={20}>
            <p
              className="font-sans text-[10px] uppercase tracking-[0.3em] mb-4"
              style={{ color: "#c9a96e" }}
            >
              Questions?
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground leading-tight mb-6">
              Get in <em className="text-brand-pink italic">touch</em>.
            </h2>
            <p className="font-sans text-[14px] text-muted-foreground leading-relaxed mb-8 max-w-md mx-auto">
              For privacy questions, data requests, or any legal matters,
              contact Dream Life Media, LLC:
            </p>
            <div className="space-y-3">
              <a
                href="mailto:info@themanageher.com"
                className="block font-sans text-sm text-foreground hover:text-brand-pink transition-colors"
              >
                info@themanageher.com
              </a>
              <a
                href="tel:+19498680444"
                className="block font-sans text-sm text-foreground hover:text-brand-pink transition-colors"
              >
                (949) 868-0444
              </a>
            </div>
            <div className="mt-10">
              <Link
                to="/"
                className="inline-flex items-center gap-2 font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-brand-pink hover:gap-3 transition-all"
              >
                Back to Home →
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Legal;
