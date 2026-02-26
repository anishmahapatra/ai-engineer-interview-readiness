"use client";

import { type FormEvent, useEffect, useState } from "react";
import { Cormorant_Garamond, IBM_Plex_Sans } from "next/font/google";

const headingFont = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-heading",
});

const bodyFont = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
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
const COPYRIGHT_YEAR = "2026";

function validateEmail(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return "Email is required.";
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmed)) return "Enter a valid email address.";
  return "";
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showFloatingCta, setShowFloatingCta] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [email, setEmail] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const emailError = emailTouched ? validateEmail(email) : "";
  const isEmailInvalid = emailTouched && Boolean(emailError);
  const isSubmitDisabled = Boolean(validateEmail(email)) || isSubmitting;

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

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const threshold = window.innerHeight * 0.4;
      setShowFloatingCta(window.scrollY > threshold);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleContactSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setEmailTouched(true);
    setSubmitSuccess(false);
    setSubmitError("");

    const validationError = validateEmail(email);
    if (validationError) {
      return;
    }

    const formData = new FormData(event.currentTarget);
    const payload = {
      name: String(formData.get("name") ?? ""),
      email: email.trim(),
      role: String(formData.get("role") ?? ""),
      message: String(formData.get("message") ?? ""),
    };

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = (await response.json()) as {
        success?: boolean;
        error?: string;
      };

      if (!response.ok || !data.success) {
        setSubmitError(data.error ?? "Unable to submit. Please try again.");
        return;
      }

      setSubmitSuccess(true);
      event.currentTarget.reset();
      setEmail("");
      setEmailTouched(false);
    } catch {
      setSubmitError("Unable to submit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className={`${bodyFont.variable} ${headingFont.variable} min-h-screen bg-[var(--bg)] text-[var(--ink)] antialiased`}
      style={{ fontFamily: "var(--font-body)" }}
    >
      <style jsx global>{`
        :root {
          --bg: #f7f2ea;
          --surface: #efebe4;
          --ink: #161d26;
          --accent: #183a73;
          --muted: #4f5b6a;
        }
      `}</style>

      <header className="sticky top-0 z-50 border-b border-[color:rgba(22,29,38,0.16)] bg-[color:rgba(247,242,234,0.94)] backdrop-blur-sm">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
          <a
            href="#"
            className={`${headingFont.className} text-lg font-semibold tracking-tight text-[var(--ink)] focus-visible:rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:rgba(24,58,115,0.35)] sm:text-xl`}
          >
            AI Engineer Interview Readiness
          </a>

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium tracking-wide text-[var(--muted)] transition-colors duration-200 hover:text-[var(--ink)] focus-visible:rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:rgba(24,58,115,0.35)]"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              className="rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-semibold tracking-wide text-[#f8f7f4] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(24,58,115,0.24)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:rgba(24,58,115,0.35)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]"
            >
              Get Early Access
            </a>
          </nav>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[color:rgba(22,29,38,0.3)] text-[var(--ink)] transition-colors duration-200 hover:bg-[var(--surface)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:rgba(24,58,115,0.35)] lg:hidden"
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
            className="border-t border-[color:rgba(22,29,38,0.16)] bg-[var(--bg)] px-5 py-5 lg:hidden"
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
                className="mt-2 inline-flex w-fit rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-semibold tracking-wide text-[#f8f7f4]"
                onClick={() => setMenuOpen(false)}
              >
                Get Early Access
              </a>
            </div>
          </nav>
        ) : null}
      </header>

      <main>
        <section
          className="bg-[#0f274a]"
        >
          <div className="mx-auto w-full max-w-6xl px-5 pb-14 pt-20 sm:px-8 sm:pt-24 lg:pb-24 lg:pt-36">
            <div
              className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start"
            >
              <div className="space-y-10">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#d5e1f5]">
                  AI Engineer Interview Readiness
                </p>
                <h1
                  className={`${headingFont.className} max-w-3xl text-5xl font-semibold leading-[0.92] tracking-tight text-[#f8fafd] sm:text-[5.2rem] lg:text-[6.6rem]`}
                >
                  Crack AI Engineer Interviews by Mastering Production-Grade AI System Design
                </h1>
                <p className="max-w-lg text-base leading-relaxed text-[#dce5f3] sm:text-lg">
                  Learn how to design, explain, and defend production AI systems in
                  interviews — including RAG architecture, deployment decisions, and
                  real hiring manager tradeoffs.
                </p>
                <ul className="grid gap-3 text-sm text-[#edf2fa] sm:text-base">
                  {heroBullets.map((item) => (
                    <li key={item.text} className="flex items-start gap-4">
                      <i
                        className={`fa-solid ${item.icon} mt-1 text-sm text-[#c6d8f8]`}
                        aria-hidden="true"
                      />
                      <span>{item.text}</span>
                    </li>
                  ))}
                </ul>
                <div className="space-y-3">
                  <a
                    href="#contact"
                    className="inline-flex rounded-full bg-[#f1f5ff] px-6 py-3.5 text-sm font-semibold tracking-wide text-[#0f274a] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_26px_rgba(9,22,43,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d5e1f5] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f274a]"
                  >
                    Get Early Access
                  </a>
                  <p className="text-sm text-[#d0dbef]">
                    Designed for working Data Scientists preparing for AI Engineer
                    roles.
                  </p>
                </div>
              </div>

              <aside
                className="rounded-2xl border border-[color:rgba(241,245,255,0.34)] bg-[color:rgba(241,245,255,0.1)] p-5 shadow-[0_24px_46px_rgba(9,22,43,0.28)] backdrop-blur-[2px] sm:p-7"
                aria-label="AI system architecture diagram placeholder"
              >
                <div className="mb-4 flex items-center justify-between border-b border-[color:rgba(241,245,255,0.24)] pb-3">
                  <h2
                    className={`${headingFont.className} text-2xl font-semibold tracking-tight text-[#f8fafd]`}
                  >
                    System Architecture
                  </h2>
                  <span className="flex items-center justify-center rounded-full border border-[color:rgba(241,245,255,0.34)] px-3 py-1 text-center text-[11px] font-semibold uppercase tracking-[0.22em] text-[#d8e3f8]">
                    Interview View
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {architectureFlow.map((step, index) => (
                    <div key={step} className="flex items-center gap-2">
                      <div className="flex min-h-10 items-center justify-center rounded-xl border border-[color:rgba(241,245,255,0.34)] bg-[color:rgba(9,22,43,0.35)] px-4 py-2 text-center text-xs font-semibold leading-tight tracking-wide text-[#f3f7ff] sm:min-h-12 sm:py-3 sm:text-sm">
                        {step}
                      </div>
                      {index < architectureFlow.length - 1 ? (
                        <i
                          className="fa-solid fa-arrow-right text-[10px] text-[#d8e3f8] sm:text-xs"
                          aria-hidden="true"
                        />
                      ) : null}
                    </div>
                  ))}
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section
          id="about"
          className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8 lg:py-20"
        >
          <div className="mb-8 max-w-3xl">
            <h2
              className={`${headingFont.className} text-3xl font-semibold tracking-tight sm:text-4xl`}
            >
              The Gap Between Model Builder and AI Engineer
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <article className="rounded-2xl border border-[color:rgba(22,29,38,0.22)] bg-[var(--surface)] p-6 shadow-[0_14px_30px_rgba(22,29,38,0.12)]">
              <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
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

            <article className="rounded-2xl border border-[color:rgba(22,29,38,0.22)] bg-[var(--surface)] p-6 shadow-[0_14px_30px_rgba(22,29,38,0.12)]">
              <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
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
            AI Engineer interviews evaluate your ability to design and defend
            production systems — not just train models.
          </p>
        </section>

        <section
          className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-8 lg:py-14"
        >
          <div className="grid gap-5 rounded-2xl border border-[color:rgba(22,29,38,0.2)] bg-[var(--surface)] p-6 shadow-[0_16px_30px_rgba(22,29,38,0.12)] md:grid-cols-2 md:gap-6 md:p-7">
            <article>
              <h2
                className={`${headingFont.className} text-3xl font-semibold tracking-tight sm:text-4xl`}
              >
                Who This Is For
              </h2>
              <ul className="mt-4 space-y-3 text-sm text-[var(--ink)] sm:text-base">
                <li>Data Scientists with 2–6 years experience.</li>
                <li>Preparing for AI Engineer interviews.</li>
                <li>Want structured system design depth.</li>
              </ul>
            </article>

            <article>
              <h3
                className={`${headingFont.className} text-3xl font-semibold tracking-tight sm:text-4xl`}
              >
                Who This Is Not For
              </h3>
              <ul className="mt-4 space-y-3 text-sm text-[var(--ink)] sm:text-base">
                <li>Absolute beginners.</li>
                <li>Pure ML theory focus.</li>
                <li>Bootcamp-style coding prep.</li>
              </ul>
            </article>
          </div>
        </section>

        <section
          id="master"
          className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8 lg:py-20"
        >
          <div className="mb-8 max-w-3xl">
            <h2
              className={`${headingFont.className} text-3xl font-semibold tracking-tight sm:text-4xl`}
            >
              What You Master
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[var(--muted)] sm:text-base">
              You will be able to design and clearly explain a production-grade AI
              system under real interview conditions.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3 md:gap-5">
            {masteryCards.map((card) => (
              <article
                key={card.title}
                className={`${card.className} rounded-2xl border border-[color:rgba(22,29,38,0.22)] bg-[var(--surface)] p-6 shadow-[0_14px_30px_rgba(22,29,38,0.12)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_34px_rgba(22,29,38,0.16)]`}
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
        </section>

        <section
          id="inside"
          className="mx-auto w-full max-w-6xl bg-[color:rgba(24,58,115,0.05)] px-5 py-14 sm:px-8 lg:py-20"
        >
          <div className="mx-auto w-full max-w-6xl">
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
                  className="rounded-2xl border border-[color:rgba(22,29,38,0.22)] bg-[var(--surface)] p-6 shadow-[0_14px_30px_rgba(22,29,38,0.12)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_34px_rgba(22,29,38,0.16)]"
                >
                  <div className="mb-5 flex items-center justify-between border-b border-[color:rgba(22,29,38,0.16)] pb-3">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
                      Module {idx + 1}
                    </span>
                    <i
                      className="fa-solid fa-file-lines text-sm text-[var(--accent)]"
                      aria-hidden="true"
                    />
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
          </div>
        </section>

        <section
          className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8 lg:py-20"
        >
          <div className="rounded-2xl border border-[color:rgba(24,58,115,0.26)] bg-[color:rgba(24,58,115,0.1)] p-8 shadow-[0_14px_30px_rgba(24,58,115,0.12)] sm:p-10 lg:p-12">
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
              className="mt-8 inline-flex rounded-full bg-[var(--accent)] px-6 py-3.5 text-sm font-semibold tracking-wide text-[#f8f7f4] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_26px_rgba(24,58,115,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:rgba(24,58,115,0.35)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]"
            >
              Get Early Access
            </a>
          </div>
        </section>

        <section
          id="contact"
          className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8 lg:py-20"
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

            <form
              className="space-y-5 rounded-2xl border border-[color:rgba(22,29,38,0.22)] bg-[var(--surface)] p-6 shadow-[0_14px_30px_rgba(22,29,38,0.12)] sm:p-7"
              onSubmit={handleContactSubmit}
              noValidate
            >
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-semibold text-[var(--ink)]">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  className="w-full rounded-xl border border-[color:rgba(22,29,38,0.26)] bg-[var(--bg)] px-4 py-3 text-sm text-[var(--ink)] outline-none transition-colors duration-200 placeholder:text-[color:rgba(79,91,106,0.8)] focus:border-[var(--accent)] focus:ring-2 focus:ring-[color:rgba(24,58,115,0.22)]"
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
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  onBlur={() => setEmailTouched(true)}
                  aria-invalid={isEmailInvalid}
                  aria-describedby={isEmailInvalid ? "email-error" : undefined}
                  className={`w-full rounded-xl border bg-[var(--bg)] px-4 py-3 text-sm text-[var(--ink)] outline-none transition-colors duration-200 placeholder:text-[color:rgba(79,91,106,0.8)] ${
                    isEmailInvalid
                      ? "border-red-600 focus:border-red-600 focus:ring-2 focus:ring-red-200"
                      : "border-[color:rgba(22,29,38,0.26)] focus:border-[var(--accent)] focus:ring-2 focus:ring-[color:rgba(24,58,115,0.22)]"
                  }`}
                  placeholder="you@company.com"
                />
                {isEmailInvalid ? (
                  <p id="email-error" className="text-sm text-red-700">
                    {emailError}
                  </p>
                ) : null}
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
                  className="w-full rounded-xl border border-[color:rgba(22,29,38,0.26)] bg-[var(--bg)] px-4 py-3 text-sm text-[var(--ink)] outline-none transition-colors duration-200 placeholder:text-[color:rgba(79,91,106,0.8)] focus:border-[var(--accent)] focus:ring-2 focus:ring-[color:rgba(24,58,115,0.22)]"
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
                  className="w-full resize-none rounded-xl border border-[color:rgba(22,29,38,0.26)] bg-[var(--bg)] px-4 py-3 text-sm text-[var(--ink)] outline-none transition-colors duration-200 placeholder:text-[color:rgba(79,91,106,0.8)] focus:border-[var(--accent)] focus:ring-2 focus:ring-[color:rgba(24,58,115,0.22)]"
                  placeholder="What part of AI engineer interviews feels hardest right now?"
                />
              </div>

              <div className="space-y-2">
                <button
                  type="submit"
                  disabled={isSubmitDisabled}
                  className="rounded-full bg-[var(--accent)] px-6 py-3.5 text-sm font-semibold tracking-wide text-[#f8f7f4] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_26px_rgba(24,58,115,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:rgba(24,58,115,0.35)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:shadow-none"
                >
                  {isSubmitting ? "Submitting..." : "Get Early Access"}
                </button>
                <p className="text-sm text-[var(--muted)]">
                  No spam. No generic newsletters. Just early access updates.
                </p>
                {submitSuccess ? (
                  <p className="text-sm text-[var(--accent)]">
                    Submitted successfully. We&apos;ll be in touch soon.
                  </p>
                ) : null}
                {submitError ? (
                  <p className="text-sm text-red-700">{submitError}</p>
                ) : null}
              </div>
            </form>
          </div>
        </section>
      </main>

      <footer className="border-t border-[color:rgba(22,29,38,0.16)]">
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
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
              Navigation
            </p>
            {navLinks.map((link) => (
              <a
                key={`footer-${link.label}`}
                href={link.href}
                className="block text-sm text-[var(--ink)] transition-colors duration-200 hover:text-[var(--accent)] focus-visible:rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:rgba(24,58,115,0.35)]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
              Contact
            </p>
            <a
              href="mailto:hello@anish.studio"
              className="block text-sm text-[var(--ink)] transition-colors duration-200 hover:text-[var(--accent)] focus-visible:rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:rgba(24,58,115,0.35)]"
            >
              hello@anish.studio
            </a>
            <p className="pt-3 text-xs text-[var(--muted)]">
              Copyright {COPYRIGHT_YEAR} AI Engineer Interview Readiness
            </p>
          </div>
        </div>
      </footer>

      {isMounted && showFloatingCta && (
        <div
          className="fixed bottom-4 right-4 z-[70]"
        >
          <a
            href="#contact"
            style={{
              WebkitTapHighlightColor: "transparent",
              outline: "none",
            }}
            className="inline-flex select-none rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-semibold tracking-wide text-[#f8f7f4] shadow-[0_12px_24px_rgba(24,58,115,0.3)] transition-all duration-300 active:scale-[0.98] focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0"
          >
            Get Early Access
          </a>
        </div>
      )}
    </div>
  );
}
