"use client";

import { useEffect, useState } from "react";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { motion, type Variants } from "framer-motion";

const headingFont = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-heading",
});

const bodyFont = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
});

const navLinks = [
  { label: "About", href: "#about" },
  { label: "What You Master", href: "#master" },
  { label: "Inside", href: "#inside" },
  { label: "Contact", href: "#contact" },
];

const heroBullets = [
  {
    icon: "fa-sitemap",
    text: "End-to-end AI system design frameworks",
  },
  {
    icon: "fa-database",
    text: "RAG and LLM architecture breakdowns",
  },
  {
    icon: "fa-server",
    text: "Deployment and scaling reasoning",
  },
  {
    icon: "fa-scale-balanced",
    text: "Weak vs strong answer comparisons",
  },
];

const architectureFlow = [
  "Data Ingestion",
  "Embeddings",
  "Vector DB",
  "Retrieval",
  "LLM",
  "Evaluation",
  "Monitoring",
];

const dataScientistFocus = [
  "Model development",
  "Feature engineering",
  "Experimentation",
  "Metric optimization",
];

const aiEngineerExpectations = [
  "End-to-end system ownership",
  "Architecture decisions",
  "Production deployment",
  "Cost and latency tradeoffs",
  "Reliability and monitoring",
];

const masteryCards = [
  {
    icon: "fa-diagram-project",
    title: "AI System Design Framework",
    description:
      "Build structured answers that map problem framing, architecture choices, and production constraints into a coherent system narrative.",
    className: "md:col-span-2",
  },
  {
    icon: "fa-layer-group",
    title: "RAG Architecture Deep Dive",
    description:
      "Break down retrieval pipelines, indexing strategies, and context assembly decisions with interview-grade technical precision.",
    className: "md:col-span-1",
  },
  {
    icon: "fa-flask-vial",
    title: "LLM Evaluation & Tradeoffs",
    description:
      "Compare offline and online evaluation methods while reasoning about quality, latency, and model selection tradeoffs.",
    className: "md:col-span-1",
  },
  {
    icon: "fa-cloud-arrow-up",
    title: "Deployment Patterns",
    description:
      "Reason through serving architecture, observability baselines, rollback strategies, and cost-aware scaling patterns.",
    className: "md:col-span-2",
  },
  {
    icon: "fa-comments",
    title: "Mock Interview Scenarios",
    description:
      "Practice high-pressure design prompts and sharpen response quality through scenario-based system walkthroughs.",
    className: "md:col-span-1",
  },
  {
    icon: "fa-pen-ruler",
    title: "Answer Structuring Templates",
    description:
      "Use structured response templates that highlight architecture decisions, assumptions, and measurable outcomes.",
    className: "md:col-span-1",
  },
];

const playbookModules = [
  {
    title: "Architecture Diagram Preview",
    description:
      "Annotated blueprint of a production-grade LLM workflow with explicit handoffs across ingestion, retrieval, generation, and monitoring.",
  },
  {
    title: "Weak vs Strong Answer Comparison",
    description:
      "Side-by-side interview responses highlighting where shallow model-centric answers fail and system-first reasoning succeeds.",
  },
  {
    title: "14-Day Roadmap Timeline",
    description:
      "Focused progression plan that builds architecture depth, communication precision, and interview-ready system judgment.",
  },
];

const heroContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.16,
    },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const existing = document.getElementById("font-awesome-cdn");
    if (existing) return;

    const link = document.createElement("link");
    link.id = "font-awesome-cdn";
    link.rel = "stylesheet";
    link.href =
      "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css";
    link.integrity =
      "sha512-Evv84Mr4kqVGRNSgIGL/F/aIDqQb7xQ2vcrdIwxfjThSH8CSR7PBEakCr51Ck+w+/U6swU2Im1vVX0SVk9ABhg==";
    link.crossOrigin = "anonymous";
    link.referrerPolicy = "no-referrer";
    document.head.appendChild(link);
  }, []);

  return (
    <div
      className={`${bodyFont.variable} ${headingFont.variable} min-h-screen bg-[var(--bg)] text-[var(--ink)] antialiased`}
      style={{ fontFamily: "var(--font-body)" }}
    >
      <style jsx global>{`
        :root {
          --bg: #f5f3ef;
          --surface: #ece9e2;
          --ink: #1c222b;
          --accent: #183a73;
          --muted: #55606f;
        }
      `}</style>

      <header className="sticky top-0 z-50 border-b border-[color:rgba(28,34,43,0.14)] bg-[color:rgba(245,243,239,0.94)] backdrop-blur-sm">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
          <a
            href="#"
            className={`${headingFont.className} text-lg font-semibold tracking-tight text-[var(--ink)] sm:text-xl`}
          >
            AI Engineer Interview Readiness
          </a>

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium tracking-wide text-[var(--muted)] transition-colors duration-200 hover:text-[var(--ink)]"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              className="rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold tracking-wide text-[#f8f7f4] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(24,58,115,0.24)]"
            >
              Join Early Access
            </a>
          </nav>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[color:rgba(28,34,43,0.25)] text-[var(--ink)] transition-colors duration-200 hover:bg-[var(--surface)] lg:hidden"
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <i
              className={`fa-solid ${menuOpen ? "fa-xmark" : "fa-bars"} text-sm`}
              aria-hidden="true"
            />
          </button>
        </div>

        {menuOpen ? (
          <nav
            id="mobile-menu"
            className="border-t border-[color:rgba(28,34,43,0.14)] bg-[var(--bg)] px-5 py-5 lg:hidden"
            aria-label="Mobile navigation"
          >
            <div className="mx-auto flex max-w-6xl flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm font-medium tracking-wide text-[var(--ink)]"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                className="mt-2 inline-flex w-fit rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold tracking-wide text-[#f8f7f4]"
                onClick={() => setMenuOpen(false)}
              >
                Join Early Access
              </a>
            </div>
          </nav>
        ) : null}
      </header>

      <main>
        <section className="mx-auto w-full max-w-6xl px-5 pb-14 pt-12 sm:px-8 sm:pt-16 lg:pb-20 lg:pt-20">
          <motion.div
            variants={heroContainer}
            initial="hidden"
            animate="show"
            className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start"
          >
            <motion.div variants={fadeUp} className="space-y-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
                AI Engineer Interview Readiness
              </p>
              <h1
                className={`${headingFont.className} max-w-3xl text-4xl font-semibold leading-[1.04] tracking-tight text-[var(--ink)] sm:text-5xl lg:text-6xl`}
              >
                Crack AI Engineer Interviews — Designed for Data Scientists.
              </h1>
              <p className="max-w-2xl text-base leading-relaxed text-[var(--muted)] sm:text-lg">
                Master production-grade AI system design, LLM architecture, and the
                real-world tradeoffs hiring managers evaluate.
              </p>
              <ul className="grid gap-3 text-sm text-[var(--ink)] sm:text-base">
                {heroBullets.map((item) => (
                  <li key={item.text} className="flex items-start gap-3">
                    <i
                      className={`fa-solid ${item.icon} mt-1 text-sm text-[var(--accent)]`}
                      aria-hidden="true"
                    />
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className="inline-flex rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold tracking-wide text-[#f8f7f4] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_26px_rgba(24,58,115,0.25)]"
              >
                Join Early Access
              </a>
            </motion.div>

            <motion.aside
              variants={fadeUp}
              className="rounded-2xl border border-[color:rgba(28,34,43,0.16)] bg-[var(--surface)] p-5 shadow-[0_22px_42px_rgba(28,34,43,0.12)] sm:p-7"
              aria-label="AI system architecture diagram placeholder"
            >
              <div className="mb-4 flex items-center justify-between border-b border-[color:rgba(28,34,43,0.16)] pb-3">
                <h2
                  className={`${headingFont.className} text-2xl font-semibold tracking-tight`}
                >
                  System Architecture
                </h2>
                <span className="rounded-full border border-[color:rgba(28,34,43,0.2)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
                  Interview View
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {architectureFlow.map((step, index) => (
                  <div key={step} className="flex items-center gap-2">
                    <div className="rounded-xl border border-[color:rgba(28,34,43,0.18)] bg-[var(--bg)] px-3 py-2 text-xs font-semibold tracking-wide text-[var(--ink)] sm:px-4 sm:py-3 sm:text-sm">
                      {step}
                    </div>
                    {index < architectureFlow.length - 1 ? (
                      <i
                        className="fa-solid fa-arrow-right text-[10px] text-[var(--muted)] sm:text-xs"
                        aria-hidden="true"
                      />
                    ) : null}
                  </div>
                ))}
              </div>
            </motion.aside>
          </motion.div>
        </section>

        <motion.section
          id="about"
          className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8 lg:py-20"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="mb-8 max-w-3xl">
            <h2
              className={`${headingFont.className} text-3xl font-semibold tracking-tight sm:text-4xl`}
            >
              The Gap Between Model Builder and AI Engineer
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <article className="rounded-2xl border border-[color:rgba(28,34,43,0.16)] bg-[var(--surface)] p-6">
              <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
                Data Scientist Focus
              </h3>
              <ul className="mt-4 space-y-3 text-sm text-[var(--ink)] sm:text-base">
                {dataScientistFocus.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <i
                      className="fa-solid fa-circle-dot mt-1 text-[10px] text-[var(--accent)]"
                      aria-hidden="true"
                    />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </article>

            <article className="rounded-2xl border border-[color:rgba(28,34,43,0.16)] bg-[var(--surface)] p-6">
              <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
                AI Engineer Expectations
              </h3>
              <ul className="mt-4 space-y-3 text-sm text-[var(--ink)] sm:text-base">
                {aiEngineerExpectations.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <i
                      className="fa-solid fa-circle-dot mt-1 text-[10px] text-[var(--accent)]"
                      aria-hidden="true"
                    />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>

          <p className="mt-8 border-l-2 border-[var(--accent)] pl-4 text-base leading-relaxed text-[var(--ink)] sm:text-lg">
            AI Engineer interviews evaluate system thinking — not just modeling
            skill.
          </p>
        </motion.section>

        <motion.section
          id="master"
          className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8 lg:py-20"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="mb-8 max-w-2xl">
            <h2
              className={`${headingFont.className} text-3xl font-semibold tracking-tight sm:text-4xl`}
            >
              What You Master
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3 md:gap-5">
            {masteryCards.map((card) => (
              <article
                key={card.title}
                className={`${card.className} group rounded-2xl border border-[color:rgba(28,34,43,0.18)] bg-[var(--surface)] p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_30px_rgba(28,34,43,0.14)]`}
              >
                <i
                  className={`fa-solid ${card.icon} text-base text-[var(--accent)]`}
                  aria-hidden="true"
                />
                <h3
                  className={`${headingFont.className} mt-5 text-2xl font-semibold tracking-tight`}
                >
                  {card.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--muted)] sm:text-base">
                  {card.description}
                </p>
              </article>
            ))}
          </div>
        </motion.section>

        <motion.section
          id="inside"
          className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8 lg:py-20"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="mb-8 max-w-2xl">
            <h2
              className={`${headingFont.className} text-3xl font-semibold tracking-tight sm:text-4xl`}
            >
              Inside the Playbook
            </h2>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {playbookModules.map((module, idx) => (
              <article
                key={module.title}
                className="rounded-2xl border border-[color:rgba(28,34,43,0.18)] bg-[var(--surface)] p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_30px_rgba(28,34,43,0.14)]"
              >
                <div className="mb-5 flex items-center justify-between border-b border-[color:rgba(28,34,43,0.14)] pb-3">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
                    Module {idx + 1}
                  </span>
                  <i className="fa-solid fa-file-lines text-sm text-[var(--accent)]" aria-hidden="true" />
                </div>
                <h3
                  className={`${headingFont.className} text-2xl font-semibold tracking-tight`}
                >
                  {module.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--muted)] sm:text-base">
                  {module.description}
                </p>
              </article>
            ))}
          </div>
        </motion.section>

        <motion.section
          className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8 lg:py-20"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="rounded-2xl border border-[color:rgba(24,58,115,0.22)] bg-[color:rgba(24,58,115,0.08)] p-8 sm:p-10 lg:p-12">
            <h2
              className={`${headingFont.className} max-w-3xl text-3xl font-semibold tracking-tight text-[var(--ink)] sm:text-4xl`}
            >
              Ready to Transition from Data Scientist to AI Engineer?
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--muted)] sm:text-lg">
              Join early access and get first access to the AI Engineer Interview
              Playbook.
            </p>
            <a
              href="#contact"
              className="mt-8 inline-flex rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold tracking-wide text-[#f8f7f4] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_26px_rgba(24,58,115,0.25)]"
            >
              Join Early Access
            </a>
          </div>
        </motion.section>

        <motion.section
          id="contact"
          className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8 lg:py-20"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div>
              <h2
                className={`${headingFont.className} text-3xl font-semibold tracking-tight sm:text-4xl`}
              >
                Contact
              </h2>
              <p className="mt-4 max-w-md text-base leading-relaxed text-[var(--muted)]">
                Share your background and interview goals. We&apos;ll reach out when
                early access opens.
              </p>
            </div>

            <form className="space-y-5 rounded-2xl border border-[color:rgba(28,34,43,0.16)] bg-[var(--surface)] p-6 sm:p-7">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-semibold text-[var(--ink)]">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  className="w-full rounded-xl border border-[color:rgba(28,34,43,0.2)] bg-[var(--bg)] px-4 py-3 text-sm text-[var(--ink)] outline-none transition-colors duration-200 placeholder:text-[color:rgba(85,96,111,0.8)] focus:border-[var(--accent)] focus:ring-2 focus:ring-[color:rgba(24,58,115,0.18)]"
                  placeholder="Your full name"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-semibold text-[var(--ink)]">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="w-full rounded-xl border border-[color:rgba(28,34,43,0.2)] bg-[var(--bg)] px-4 py-3 text-sm text-[var(--ink)] outline-none transition-colors duration-200 placeholder:text-[color:rgba(85,96,111,0.8)] focus:border-[var(--accent)] focus:ring-2 focus:ring-[color:rgba(24,58,115,0.18)]"
                  placeholder="you@company.com"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="role"
                  className="text-sm font-semibold text-[var(--ink)]"
                >
                  Current Role
                </label>
                <input
                  id="role"
                  name="role"
                  type="text"
                  className="w-full rounded-xl border border-[color:rgba(28,34,43,0.2)] bg-[var(--bg)] px-4 py-3 text-sm text-[var(--ink)] outline-none transition-colors duration-200 placeholder:text-[color:rgba(85,96,111,0.8)] focus:border-[var(--accent)] focus:ring-2 focus:ring-[color:rgba(24,58,115,0.18)]"
                  placeholder="Mid-level Data Scientist"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="message"
                  className="text-sm font-semibold text-[var(--ink)]"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="w-full resize-none rounded-xl border border-[color:rgba(28,34,43,0.2)] bg-[var(--bg)] px-4 py-3 text-sm text-[var(--ink)] outline-none transition-colors duration-200 placeholder:text-[color:rgba(85,96,111,0.8)] focus:border-[var(--accent)] focus:ring-2 focus:ring-[color:rgba(24,58,115,0.18)]"
                  placeholder="What part of AI engineer interviews feels hardest right now?"
                />
              </div>

              <button
                type="submit"
                className="rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold tracking-wide text-[#f8f7f4] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_26px_rgba(24,58,115,0.25)]"
              >
                Join Early Access
              </button>
            </form>
          </div>
        </motion.section>
      </main>

      <footer className="border-t border-[color:rgba(28,34,43,0.14)]">
        <div className="mx-auto grid w-full max-w-6xl gap-8 px-5 py-10 sm:px-8 lg:grid-cols-[1.2fr_1fr_1fr] lg:items-start">
          <div>
            <p
              className={`${headingFont.className} text-2xl font-semibold tracking-tight text-[var(--ink)]`}
            >
              AI Engineer Interview Readiness
            </p>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-[var(--muted)]">
              Helping Data Scientists build real AI system depth.
            </p>
          </div>

          <nav className="space-y-2" aria-label="Footer navigation">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
              Navigation
            </p>
            {navLinks.map((link) => (
              <a
                key={`footer-${link.label}`}
                href={link.href}
                className="block text-sm text-[var(--ink)] transition-colors duration-200 hover:text-[var(--accent)]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
              Contact
            </p>
            <a
              href="mailto:hello@aiinterviewreadiness.com"
              className="block text-sm text-[var(--ink)] transition-colors duration-200 hover:text-[var(--accent)]"
            >
              hello@aiinterviewreadiness.com
            </a>
            <p className="pt-3 text-xs text-[var(--muted)]">
              Copyright {new Date().getFullYear()} AI Engineer Interview Readiness
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
