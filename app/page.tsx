"use client";

import {
  type PointerEvent as ReactPointerEvent,
  useEffect,
} from "react";

type ProjectCardData = {
  id: string;
  name: string;
  status: string;
  category: string;
  description: string;
  stack: string[];
  href?: string;
};

const projectCards: ProjectCardData[] = [
  {
    id: "01",
    name: "Nerve Recon",
    status: "Featured",
    category: "featured",
    href: "https://github.com/sophhzero/nerve-recon",
    description:
      "A recon tool focused on bug bounty and CTF enumeration, built with Go and designed for speed, modularity, and ease of use.",
    stack: ["Recon", "CTF", "Bug Bounty"],
  },
];

type WriteupCardData = {
  source: string;
  title: string;
  description: string;
};

const writeups: WriteupCardData[] = [
  // {
  //   source: "Hack The Box",
  //   title: "Technical writeups and walkthroughs",
  //   description:
  //     "Clear documentation of enumeration, exploitation, and post-exploitation, with an emphasis on technical reasoning and methodology.",
  // },
  // {
  //   source: "TryHackMe",
  //   title: "Labs focused on fundamentals",
  //   description:
  //     "Summaries of completed challenges with a focus on Linux, networking, privilege escalation, and defensible practices.",
  // },
  // {
  //   source: "GitHub",
  //   title: "Projects and public notes",
  //   description:
  //     "A repository to centralize scripts, study notes, snippets, and projects related to information security.",
  // },
];

type ContactIconName =
  | "github"
  | "email"
  | "twitter"
  | "hackerone"
  | "intigriti"
  | "bugcrowd";

const contacts: {
  label: string;
  value: string;
  href: string;
  icon: ContactIconName;
}[] = [
  {
    label: "GitHub",
    value: "@sophhzero",
    href: "https://github.com/sophhzero",
    icon: "github",
  },
  {
    label: "E-mail",
    value: "zerosectech@gmail.com",
    href: "mailto:zerosectech@gmail.com",
    icon: "email",
  },
  {
    label: "Twitter",
    value: "@sophhzero",
    href: "https://x.com/sophhzero",
    icon: "twitter",
  },
  {
    label: "HackerOne",
    value: "@sophhzero",
    href: "https://hackerone.com/sophhzero",
    icon: "hackerone",
  },
  {
    label: "Intigriti",
    value: "@sophhzero",
    href: "https://app.intigriti.com/profile/sophhzero",
    icon: "intigriti",
  },
  {
    label: "Bugcrowd",
    value: "@sophhzero",
    href: "https://bugcrowd.com/sophhzero",
    icon: "bugcrowd",
  },
];

export default function Home() {
  useEffect(() => {
    const root = document.documentElement;
    const trailDots = Array.from(document.querySelectorAll<HTMLElement>(".cursor-trail-dot"));
    const trail = trailDots.map(() => ({ x: window.innerWidth / 2, y: window.innerHeight / 2 }));
    let pointerX = window.innerWidth / 2;
    let pointerY = window.innerHeight / 2;
    let animationFrame = 0;

    const updatePointer = (event: PointerEvent) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      root.style.setProperty("--cursor-x", `${event.clientX}px`);
      root.style.setProperty("--cursor-y", `${event.clientY}px`);
    };

    const renderTrail = () => {
      trail.forEach((dot, index) => {
        const target = index === 0 ? { x: pointerX, y: pointerY } : trail[index - 1];

        dot.x += (target.x - dot.x) * 0.17;
        dot.y += (target.y - dot.y) * 0.17;
        trailDots[index]?.style.setProperty("--trail-x", `${dot.x}px`);
        trailDots[index]?.style.setProperty("--trail-y", `${dot.y}px`);
      });

      animationFrame = window.requestAnimationFrame(renderTrail);
    };

    const updateScroll = () => {
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
      root.style.setProperty("--scroll-progress", progress.toString());
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.18 },
    );

    document.querySelectorAll(".reveal").forEach((element) => {
      observer.observe(element);
    });

    updateScroll();
    renderTrail();
    window.addEventListener("pointermove", updatePointer);
    window.addEventListener("scroll", updateScroll, { passive: true });

    return () => {
      window.cancelAnimationFrame(animationFrame);
      observer.disconnect();
      window.removeEventListener("pointermove", updatePointer);
      window.removeEventListener("scroll", updateScroll);
    };
  }, []);

  const handleCardMove = (event: ReactPointerEvent<HTMLElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;
    const rotateY = ((x / bounds.width) - 0.5) * 10;
    const rotateX = ((y / bounds.height) - 0.5) * -10;

    event.currentTarget.style.setProperty("--tilt-x", `${rotateX}deg`);
    event.currentTarget.style.setProperty("--tilt-y", `${rotateY}deg`);
    event.currentTarget.style.setProperty("--spot-x", `${x}px`);
    event.currentTarget.style.setProperty("--spot-y", `${y}px`);
  };

  const resetCard = (event: ReactPointerEvent<HTMLElement>) => {
    event.currentTarget.style.setProperty("--tilt-x", "0deg");
    event.currentTarget.style.setProperty("--tilt-y", "0deg");
  };

  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--fg)]">
      <div className="cursor-aura" />
      <div className="cursor-trail" aria-hidden="true">
        <span className="cursor-trail-dot" />
        <span className="cursor-trail-dot" />
        <span className="cursor-trail-dot" />
        <span className="cursor-trail-dot" />
        <span className="cursor-trail-dot" />
        <span className="cursor-trail-dot" />
      </div>
      <div className="scanline" />
      <div className="scroll-progress" />
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(148,163,184,0.08),_transparent_24%)]" />

      <header className="sticky top-0 z-20 border-b border-white/10 bg-[rgba(6,8,12,0.82)] backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-8">
          <a className="font-mono text-sm text-white/75" href="#hero">
            <span className="text-[var(--accent)]">zero</span>
            <span className="text-white/35">@portfolio:~$</span>
          </a>

          <nav className="hidden gap-6 font-mono text-sm text-white/55 md:flex">
            {["about", "projects", "writeups", "contact"].map((item) => (
              <a className="nav-link" href={`#${item}`} key={item}>
                ./{item}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <div className="relative mx-auto flex max-w-6xl flex-col px-6 pb-16 md:px-8">
        <section
          className="flex min-h-[calc(100vh-73px)] items-center border-b border-white/10 py-24"
          id="hero"
        >
          <div className="max-w-3xl">
            <div className="reveal space-y-8">
              <div className="font-mono text-sm text-white/55">
                <span className="mr-3 text-[var(--accent)]">$</span>
                whoami
              </div>

              <div className="space-y-6">
                <div className="inline-flex items-end gap-3">
                  <h1 className="glitch-title text-5xl font-semibold text-white sm:text-7xl">
                    <span className="glitch-title-primary">zero</span>
                    <span className="glitch-title-alias" aria-hidden="true">
                      sophhzero
                    </span>
                  </h1>
                  <span className="cursor-block mb-2 hidden h-14 w-4 bg-[var(--accent)] shadow-[0_0_24px_rgba(255,255,255,0.35)] sm:block" />
                </div>

                <p className="max-w-2xl text-base leading-8 text-white/58">
                  cybersecurity researcher, web developer, and pentester.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="section-shell reveal" id="about">
          <SectionHeading index="01" title="about" command="cat about.md" />

          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-6 text-lg leading-8 text-white/68">
              <p>IT graduate, web developer, and aspiring infosec professional focused on red teaming and pentesting.</p>
              <p>I fix things by breaking things.</p>
            </div>

            <div
              className="terminal-panel interactive-panel grid gap-4 p-6"
              onPointerLeave={resetCard}
              onPointerMove={handleCardMove}
            >
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-white/35">
                  current focus
                </p>
                <p className="mt-3 text-white/75">
                  Studying and improving. Building and breaking. Learning and sharing. Always curious, always exploring.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <InfoStat label="Status" value="Open for pentesting/red teaming opportunities" />
                <InfoStat label="Education" value="Information Technology / Computer Science" />
                <InfoStat label="Interest" value="Red Team / Bug Bounty" />
                <InfoStat label="Core" value="Red Teaming / Pentesting" />
              </div>
            </div>
          </div>
        </section>

        <section className="section-shell reveal" id="projects">
          <SectionHeading
            index="02"
            title="projects"
            command="ls ./projects"
          />

          <div className="grid gap-6 lg:grid-cols-3">
            {projectCards.map((project) => (
              <ProjectCard
                key={`${project.id}-${project.name}`}
                onPointerLeave={resetCard}
                onPointerMove={handleCardMove}
                project={project}
              />
            ))}
          </div>
        </section>

        <section className="section-shell reveal" id="writeups">
          <SectionHeading
            index="03"
            title="writeups"
            command="ls ./writeups ./github"
          />

          <div className="grid gap-6 lg:grid-cols-3">
            {writeups.map((item) => (
              <article
                className="terminal-panel interactive-panel p-6"
                key={item.source}
                onPointerLeave={resetCard}
                onPointerMove={handleCardMove}
              >
                <p className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--accent)]">
                  {item.source}
                </p>
                <h3 className="mt-4 text-xl font-medium text-white">
                  {item.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-white/62">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="section-shell reveal border-b-0 pb-8" id="contact">
          <SectionHeading
            index="04"
            title="contact"
            command="ssh zero@portfolio"
          />

          <p className="max-w-3xl text-lg leading-8 text-white/65">
            Open for opportunities and networking. Feel free to reach out via e-mail, Twitter, or any of the platforms below.
          </p>

          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {contacts.map((contact) => (
              <a
                className="contact-card interactive-panel"
                href={contact.href}
                key={contact.label}
                onPointerLeave={resetCard}
                onPointerMove={handleCardMove}
                rel="noreferrer"
                target="_blank"
              >
                <div className="contact-content">
                  <ContactIcon name={contact.icon} />
                  <div>
                    <p className="font-mono text-xs uppercase tracking-[0.25em] text-white/35">
                      {contact.label}
                    </p>
                    <p className="mt-2 text-lg text-white">{contact.value}</p>
                  </div>
                </div>
                <span className="font-mono text-sm text-white/35">↗</span>
              </a>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

function SectionHeading({
  index,
  title,
  command,
}: {
  index: string;
  title: string;
  command: string;
}) {
  return (
    <div className="mb-14">
      <div className="flex items-center gap-4 font-mono text-xl text-white/72">
        <span className="text-[var(--accent)]">{index}</span>
        <span className="text-white/35">{"//"}</span>
        <h2 id={title}>{title}</h2>
      </div>
      <div className="mt-4 border-b border-white/10 pb-4 font-mono text-sm text-white/32">
        {command}
      </div>
    </div>
  );
}

function InfoStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="info-stat rounded-2xl border border-white/10 bg-white/[0.03] p-4">
      <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-white/30">
        {label}
      </p>
      <p className="mt-3 text-sm leading-6 text-white/75">{value}</p>
    </div>
  );
}

function ProjectCard({
  project,
  onPointerLeave,
  onPointerMove,
}: {
  project: ProjectCardData;
  onPointerLeave: (event: ReactPointerEvent<HTMLElement>) => void;
  onPointerMove: (event: ReactPointerEvent<HTMLElement>) => void;
}) {
  const content = (
    <>
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-xs text-[var(--accent)]">
            {project.id}
          </p>
          <h3 className="mt-3 text-2xl font-medium text-white">
            {project.name}
          </h3>
        </div>

        <span className="rounded-full border border-[var(--accent)]/25 bg-[var(--accent)]/8 px-3 py-1 font-mono text-xs text-[var(--accent)]">
          {project.status}
        </span>
      </div>

      <p className="mb-6 text-sm leading-7 text-white/62">
        {project.description}
      </p>

      <div className="mt-auto flex flex-wrap items-center gap-2">
        {project.stack.map((item) => (
          <span className="terminal-chip" key={item}>
            {item}
          </span>
        ))}
        {project.href ? (
          <span className="project-open-indicator">open ↗</span>
        ) : null}
      </div>
    </>
  );

  if (project.href) {
    return (
      <a
        className="project-card project-card-link interactive-panel"
        href={project.href}
        onPointerLeave={onPointerLeave}
        onPointerMove={onPointerMove}
        rel="noreferrer"
        target="_blank"
      >
        {content}
      </a>
    );
  }

  return (
    <article
      className="project-card interactive-panel"
      onPointerLeave={onPointerLeave}
      onPointerMove={onPointerMove}
    >
      {content}
    </article>
  );
}

function ContactIcon({
  name,
}: {
  name: ContactIconName;
}) {
  const commonProps = {
    "aria-hidden": true,
    className: "contact-icon",
    fill: "currentColor",
    viewBox: "0 0 24 24",
  };

  switch (name) {
    case "github":
      return (
        <svg {...commonProps}>
          <path d="M12 .9C5.8.9.8 5.9.8 12.1c0 4.9 3.2 9.1 7.6 10.6.6.1.8-.2.8-.6v-2.1c-3.1.7-3.8-1.3-3.8-1.3-.5-1.2-1.2-1.6-1.2-1.6-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1 1 .1.8 2.6 3.2 1.8.1-.7.4-1.2.7-1.5-2.5-.3-5.1-1.2-5.1-5.5 0-1.2.4-2.2 1.1-3-.1-.3-.5-1.5.1-3 0 0 .9-.3 3 1.1.9-.2 1.8-.4 2.7-.4s1.9.1 2.7.4c2.1-1.4 3-1.1 3-1.1.6 1.5.2 2.7.1 3 .7.8 1.1 1.8 1.1 3 0 4.2-2.6 5.2-5.1 5.5.4.4.8 1 .8 2v3c0 .4.2.7.8.6 4.4-1.5 7.6-5.7 7.6-10.6C23.2 5.9 18.2.9 12 .9Z" />
        </svg>
      );
    case "email":
      return (
        <svg {...commonProps}>
          <path d="M3.8 5.5h16.4c.9 0 1.6.7 1.6 1.6v9.8c0 .9-.7 1.6-1.6 1.6H3.8c-.9 0-1.6-.7-1.6-1.6V7.1c0-.9.7-1.6 1.6-1.6Zm.6 2.1 7.6 5.2 7.6-5.2H4.4Zm15.3 8.7V9.5l-7.2 4.9c-.3.2-.7.2-1 0L4.3 9.5v6.8h15.4Z" />
        </svg>
      );
    case "twitter":
      return (
        <svg {...commonProps}>
          <path d="M14.2 10.4 21.6 2h-1.8l-6.4 7.3L8.3 2H2.4l7.8 11.2L2.4 22h1.8l6.8-7.7 5.4 7.7h5.9l-8.1-11.6Zm-2.4 2.7-.8-1.1L4.8 3.3h2.7l5 7.1.8 1.1 6.5 9.3h-2.7l-5.3-7.7Z" />
        </svg>
      );
    case "hackerone":
      return (
        <svg {...commonProps}>
          <path d="M4.2 3.2h4.1v6.5h7.4V3.2h4.1v17.6h-4.1v-7.4H8.3v7.4H4.2V3.2Z" />
        </svg>
      );
    case "intigriti":
      return (
        <svg {...commonProps}>
          <path d="M6.2 3.2h4.2v13.3h3.2v4.3H6.2V3.2Zm8.2 6.5h3.4v11.1h-3.4V9.7Zm0-6.5h3.4V7h-3.4V3.2Z" />
        </svg>
      );
    case "bugcrowd":
      return (
        <svg {...commonProps}>
          <path d="M12 2.2 21.1 7v10L12 21.8 2.9 17V7L12 2.2Zm0 3.1L5.6 8.7v6.6l6.4 3.4 6.4-3.4V8.7L12 5.3Zm0 3.1 3.4 1.8v3.6L12 15.6l-3.4-1.8v-3.6L12 8.4Z" />
        </svg>
      );
  }
}
