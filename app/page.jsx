"use client";

import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["About", "Experience", "Projects", "Skills", "Contact"];

const EXPERIENCE = [
  {
    role: "Founding Engineer → CTO",
    company: "NovaChat AI",
    location: "Boulder, CO",
    period: "Aug 2025 – Present",
    color: "#7C3AED",
    accent: "#A78BFA",
    bullets: [
      "Rebuilt LLM job-execution layer on Redis queues + multi-threaded worker pool → 500K+ chats/month at 7,000+ msgs/hr peak",
      "Designed multi-agent system on LangGraph powering AI chat monetization; grew per-account MRR from $40 → $2,000 across 110 creator accounts (~$220K/month attributable revenue)",
      "Reduced LLM inference cost ~78% ($5,500 → $1,230/month) via Langfuse-driven agent tuning",
      "Cut API latency 58% with async refactors; rebuilt onboarding platform cutting onboarding time 75%",
    ],
  },
  {
    role: "Software Engineer – System Performance",
    company: "Boulder AI & Infra Lab",
    location: "Boulder, CO",
    period: "Sept 2025 – Jan 2026",
    color: "#0891B2",
    accent: "#67E8F9",
    bullets: [
      "Profiled a 3.5B-parameter VLA model using NVIDIA Nsight Systems and NVTX, analyzing 4,900+ kernel instances",
      "Identified CPU-bound bottleneck: 95% of frame time (117ms) lost to sync overhead despite GPU compute being only 7ms",
      "Architected parallelization strategy targeting 2x latency reduction (137ms → <70ms) by masking CPU sync costs",
    ],
  },
];

const PROJECTS = [
  {
    name: "DocChat",
    subtitle: "Distributed Document Retrieval System",
    stack: ["Python", "FastAPI", "Pinecone", "LangGraph", "GCP", "Neo4j", "VertexAI", "Docker"],
    color: "#7C3AED",
    accent: "#DDD6FE",
    year: "2026",
    bullets: [
      "Combined semantic search + graph-based reasoning → 3.4x improvement in multi-hop query accuracy across 150+ docs",
      "Confidence-aware validation + retry logic reduced error rates by 25%",
      "React Mind Map visualizing citation networks across 10K+ nodes",
    ],
  },
  {
    name: "NovaChat v4",
    subtitle: "Flagship Production System — Lead Architect",
    stack: ["LangGraph", "Redis", "Pinecone", "FastAPI", "GCP", "Supabase", "Langfuse"],
    color: "#059669",
    accent: "#A7F3D0",
    year: "2025–26",
    bullets: [
      "9-agent architecture across Discovery, Targeted, and Post-Event modes — designed end-to-end",
      "500K+ chats/month at peak; $220K/month in attributable revenue across 110 creator accounts",
      "Pinecone-backed fan memory with base + per-fan drift layers; Grok-4 for adult content reliability",
    ],
  },
  {
    name: "Observability Platform",
    subtitle: "Real-Time Monitoring & ETL System",
    stack: ["FastAPI", "PostgreSQL", "GCP", "Docker", "SQLAlchemy", "Grafana"],
    color: "#D97706",
    accent: "#FDE68A",
    year: "2025",
    bullets: [
      "Real-time ingestion service handling 3,000+ daily events with strict schema validation",
      "Containerized microservices on GCP Compute Engine; <100ms ingestion latency",
      "Batch ETL pipeline aggregating rolling performance metrics into summary tables",
    ],
  },
];

const SKILLS = [
  { category: "Languages", items: ["Python", "JavaScript", "SQL", "C"] },
  { category: "AI / ML", items: ["LangGraph", "Pinecone", "PyTorch", "LangFuse", "Neo4j", "VertexAI"] },
  { category: "Backend", items: ["FastAPI", "PostgreSQL", "Redis", "REST API", "SQLAlchemy"] },
  { category: "Infrastructure", items: ["GCP", "Docker", "Railway", "Vercel", "Linux", "Grafana"] },
];

const STATS = [
  { value: "500K+", label: "chats/month" },
  { value: "$220K", label: "revenue/month" },
  { value: "78%", label: "cost reduction" },
  { value: "58%", label: "latency cut" },
];

function useIntersection(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function AnimatedText({ text, visible, delay = 0 }) {
  return (
    <span style={{ display: "inline-block", overflow: "hidden" }}>
      <span style={{
        display: "inline-block",
        transform: visible ? "translateY(0)" : "translateY(110%)",
        transition: `transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}>{text}</span>
    </span>
  );
}

function Cursor() {
  const pos = useRef({ x: 0, y: 0 });
  const dot = useRef(null);
  const ring = useRef(null);
  useEffect(() => {
    const move = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (dot.current) {
        dot.current.style.transform = `translate(${e.clientX - 4}px,${e.clientY - 4}px)`;
      }
      if (ring.current) {
        ring.current.style.transform = `translate(${e.clientX - 20}px,${e.clientY - 20}px)`;
      }
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return (
    <>
      <div ref={dot} style={{
        position: "fixed", top: 0, left: 0, width: 8, height: 8,
        borderRadius: "50%", background: "#7C3AED", pointerEvents: "none",
        zIndex: 9999, transition: "transform 0.05s linear",
      }} />
      <div ref={ring} style={{
        position: "fixed", top: 0, left: 0, width: 40, height: 40,
        borderRadius: "50%", border: "1.5px solid rgba(124,58,237,0.4)",
        pointerEvents: "none", zIndex: 9998,
        transition: "transform 0.18s cubic-bezier(0.16,1,0.3,1)",
      }} />
    </>
  );
}

function Noise() {
  return (
    <svg style={{ position: "fixed", inset: 0, width: "100%", height: "100%", opacity: 0.03, pointerEvents: "none", zIndex: 0 }}>
      <filter id="noise">
        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#noise)" />
    </svg>
  );
}

function Nav({ active }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      padding: "1.25rem 2.5rem",
      background: scrolled ? "rgba(8,8,12,0.85)" : "transparent",
      backdropFilter: scrolled ? "blur(20px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
      transition: "all 0.4s ease",
      display: "flex", alignItems: "center", justifyContent: "space-between",
    }}>
      <span style={{
        fontFamily: "'Space Mono', monospace", fontSize: 13,
        color: "#7C3AED", letterSpacing: "0.1em", fontWeight: 700,
      }}>YG_</span>
      <div style={{ display: "flex", gap: "2rem" }}>
        {NAV_LINKS.map(l => (
          <a key={l} href={`#${l.toLowerCase()}`} style={{
            fontFamily: "'Space Mono', monospace", fontSize: 12,
            color: active === l.toLowerCase() ? "#fff" : "rgba(255,255,255,0.4)",
            textDecoration: "none", letterSpacing: "0.08em",
            transition: "color 0.2s",
          }}>{l.toUpperCase()}</a>
        ))}
      </div>
    </nav>
  );
}

function Hero() {
  const [ready, setReady] = useState(false);
  useEffect(() => { setTimeout(() => setReady(true), 100); }, []);

  return (
    <section id="about" style={{
      minHeight: "100vh", display: "flex", flexDirection: "column",
      justifyContent: "flex-end", padding: "0 2.5rem 6rem",
      position: "relative", overflow: "hidden",
    }}>
      {/* Grid background */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 0,
        backgroundImage: `linear-gradient(rgba(124,58,237,0.06) 1px, transparent 1px),
          linear-gradient(90deg, rgba(124,58,237,0.06) 1px, transparent 1px)`,
        backgroundSize: "60px 60px",
      }} />
      {/* Glow orbs */}
      <div style={{
        position: "absolute", top: "10%", right: "5%", width: 600, height: 600,
        background: "radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)",
        borderRadius: "50%", zIndex: 0,
      }} />
      <div style={{
        position: "absolute", bottom: "5%", left: "-5%", width: 400, height: 400,
        background: "radial-gradient(circle, rgba(8,145,178,0.1) 0%, transparent 70%)",
        borderRadius: "50%", zIndex: 0,
      }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 1100 }}>
        <div style={{
          fontFamily: "'Space Mono', monospace", fontSize: 12,
          color: "#7C3AED", letterSpacing: "0.2em", marginBottom: "1.5rem",
          opacity: ready ? 1 : 0, transition: "opacity 0.6s ease 0.2s",
        }}>FOUNDING ENGINEER · CTO · BARISTA</div>

        <h1 style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "clamp(72px, 12vw, 160px)",
          lineHeight: 0.9, margin: "0 0 1rem",
          color: "#fff", letterSpacing: "-0.02em",
        }}>
          <div style={{ overflow: "hidden" }}>
            <AnimatedText text="YASHWANT" visible={ready} delay={0.1} />
          </div>
          <div style={{ overflow: "hidden" }}>
            <AnimatedText text="GANDHAM" visible={ready} delay={0.25} />
          </div>
        </h1>

        <div style={{
          display: "flex", alignItems: "center", gap: "2rem",
          marginTop: "2.5rem",
          opacity: ready ? 1 : 0, transition: "opacity 0.6s ease 0.7s",
          flexWrap: "wrap",
        }}>
          <p style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: 18,
            color: "rgba(255,255,255,0.55)", maxWidth: 520, lineHeight: 1.6, margin: 0,
          }}>
            Building LLM infrastructure at production scale @novachat ai. MS Data Science @ CU Boulder.
          </p>
          <div style={{ display: "flex", gap: "1rem" }}>
            <a href="mailto:yashwantgandham@gmail.com" style={btnStyle("#7C3AED")}>Get in touch</a>
            <a href="https://github.com/Yash-Yashwant" target="_blank" style={btnStyle("transparent", true)}>GitHub ↗</a>
            <a href="https://www.linkedin.com/in/g-yashwant/" target="_blank" style={btnStyle("transparent", true)}>LinkedIn ↗</a>
          </div>
        </div>

        {/* Stats row */}
        <div style={{
          display: "flex", gap: "3rem", marginTop: "4rem", flexWrap: "wrap",
          opacity: ready ? 1 : 0, transition: "opacity 0.6s ease 0.9s",
        }}>
          {STATS.map(s => (
            <div key={s.label}>
              <div style={{
                fontFamily: "'Bebas Neue', sans-serif", fontSize: 42,
                color: "#7C3AED", lineHeight: 1,
              }}>{s.value}</div>
              <div style={{
                fontFamily: "'Space Mono', monospace", fontSize: 11,
                color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em",
                marginTop: 4,
              }}>{s.label.toUpperCase()}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ExperienceSection() {
  const [ref, visible] = useIntersection();
  return (
    <section id="experience" ref={ref} style={{ padding: "8rem 2.5rem", maxWidth: 1100, margin: "0 auto" }}>
      <SectionLabel label="02 / EXPERIENCE" visible={visible} />
      <h2 style={sectionHeadStyle(visible)}>Where I've<br /><em style={{ color: "#7C3AED", fontStyle: "normal" }}>shipped</em></h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "2px", marginTop: "4rem" }}>
        {EXPERIENCE.map((exp, i) => (
          <ExpCard key={i} exp={exp} index={i} parentVisible={visible} />
        ))}
      </div>
    </section>
  );
}

function ExpCard({ exp, index, parentVisible }) {
  const [open, setOpen] = useState(index === 0);
  return (
    <div
      onClick={() => setOpen(o => !o)}
      style={{
        background: open ? "rgba(124,58,237,0.06)" : "transparent",
        border: `1px solid ${open ? "rgba(124,58,237,0.3)" : "rgba(255,255,255,0.07)"}`,
        borderRadius: 12, cursor: "pointer",
        transform: parentVisible ? "translateY(0)" : "translateY(30px)",
        opacity: parentVisible ? 1 : 0,
        transition: `all 0.6s cubic-bezier(0.16,1,0.3,1) ${index * 0.15}s`,
        overflow: "hidden",
      }}
    >
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "1.75rem 2rem",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
          <div style={{
            width: 10, height: 10, borderRadius: "50%",
            background: exp.color, flexShrink: 0,
            boxShadow: open ? `0 0 16px ${exp.color}` : "none",
            transition: "box-shadow 0.3s",
          }} />
          <div>
            <div style={{
              fontFamily: "'Bebas Neue', sans-serif", fontSize: 28,
              color: "#fff", letterSpacing: "0.02em",
            }}>{exp.role}</div>
            <div style={{
              fontFamily: "'Space Mono', monospace", fontSize: 12,
              color: exp.accent, marginTop: 2, letterSpacing: "0.05em",
            }}>{exp.company} · {exp.location}</div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
          <span style={{
            fontFamily: "'Space Mono', monospace", fontSize: 11,
            color: "rgba(255,255,255,0.3)", letterSpacing: "0.08em",
          }}>{exp.period}</span>
          <span style={{
            color: "rgba(255,255,255,0.4)", fontSize: 18,
            transform: open ? "rotate(45deg)" : "rotate(0deg)",
            transition: "transform 0.3s",
            display: "inline-block",
          }}>+</span>
        </div>
      </div>
      {open && (
        <div style={{ padding: "0 2rem 2rem 4.5rem" }}>
          {exp.bullets.map((b, i) => (
            <div key={i} style={{
              display: "flex", gap: "1rem", marginBottom: "0.75rem",
              fontFamily: "'DM Sans', sans-serif", fontSize: 15,
              color: "rgba(255,255,255,0.65)", lineHeight: 1.6,
            }}>
              <span style={{ color: exp.color, flexShrink: 0, marginTop: 2 }}>→</span>
              <span>{b}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ProjectsSection() {
  const [ref, visible] = useIntersection();
  return (
    <section id="projects" ref={ref} style={{ padding: "8rem 2.5rem", maxWidth: 1100, margin: "0 auto" }}>
      <SectionLabel label="03 / PROJECTS" visible={visible} />
      <h2 style={sectionHeadStyle(visible)}>Things I've<br /><em style={{ color: "#7C3AED", fontStyle: "normal" }}>built</em></h2>

      <div style={{
        display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
        gap: "1.5rem", marginTop: "4rem",
      }}>
        {PROJECTS.map((p, i) => (
          <ProjectCard key={i} project={p} index={i} visible={visible} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project: p, index, visible }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? `rgba(${hexToRgb(p.color)},0.08)` : "rgba(255,255,255,0.02)",
        border: `1px solid ${hovered ? p.color + "50" : "rgba(255,255,255,0.07)"}`,
        borderRadius: 16, padding: "2rem",
        transform: visible ? "translateY(0)" : "translateY(40px)",
        opacity: visible ? 1 : 0,
        transition: `all 0.6s cubic-bezier(0.16,1,0.3,1) ${index * 0.12}s`,
        cursor: "default",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.25rem" }}>
        <div style={{
          fontFamily: "'Space Mono', monospace", fontSize: 11,
          color: p.color, letterSpacing: "0.15em",
        }}>{p.year}</div>
        <div style={{
          width: 36, height: 36, borderRadius: 8,
          background: `${p.color}20`, display: "flex",
          alignItems: "center", justifyContent: "center",
        }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: p.color }} />
        </div>
      </div>

      <h3 style={{
        fontFamily: "'Bebas Neue', sans-serif", fontSize: 34,
        color: "#fff", margin: "0 0 0.25rem", letterSpacing: "0.02em",
      }}>{p.name}</h3>
      <p style={{
        fontFamily: "'DM Sans', sans-serif", fontSize: 13,
        color: "rgba(255,255,255,0.35)", margin: "0 0 1.25rem",
      }}>{p.subtitle}</p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1.5rem" }}>
        {p.stack.map(s => (
          <span key={s} style={{
            fontFamily: "'Space Mono', monospace", fontSize: 10,
            color: p.accent, background: `${p.color}18`,
            border: `1px solid ${p.color}30`,
            padding: "3px 8px", borderRadius: 4, letterSpacing: "0.05em",
          }}>{s}</span>
        ))}
      </div>

      {p.bullets.map((b, i) => (
        <div key={i} style={{
          display: "flex", gap: "0.75rem", marginBottom: "0.6rem",
          fontFamily: "'DM Sans', sans-serif", fontSize: 13,
          color: "rgba(255,255,255,0.55)", lineHeight: 1.55,
        }}>
          <span style={{ color: p.color, flexShrink: 0 }}>›</span>
          <span>{b}</span>
        </div>
      ))}
    </div>
  );
}

function SkillsSection() {
  const [ref, visible] = useIntersection();
  return (
    <section id="skills" ref={ref} style={{ padding: "8rem 2.5rem", maxWidth: 1100, margin: "0 auto" }}>
      <SectionLabel label="04 / SKILLS" visible={visible} />
      <h2 style={sectionHeadStyle(visible)}>My<br /><em style={{ color: "#7C3AED", fontStyle: "normal" }}>toolkit</em></h2>

      <div style={{
        display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
        gap: "1.5rem", marginTop: "4rem",
      }}>
        {SKILLS.map((group, i) => (
          <div key={i} style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 12, padding: "1.75rem",
            transform: visible ? "translateY(0)" : "translateY(30px)",
            opacity: visible ? 1 : 0,
            transition: `all 0.5s cubic-bezier(0.16,1,0.3,1) ${i * 0.1}s`,
          }}>
            <div style={{
              fontFamily: "'Space Mono', monospace", fontSize: 10,
              color: "#7C3AED", letterSpacing: "0.2em",
              marginBottom: "1.25rem",
            }}>{group.category.toUpperCase()}</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {group.items.map(item => (
                <SkillPill key={item} label={item} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function SkillPill({ label }) {
  const [hovered, setHovered] = useState(false);
  return (
    <span
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: "'DM Sans', sans-serif", fontSize: 14,
        color: hovered ? "#fff" : "rgba(255,255,255,0.6)",
        background: hovered ? "rgba(124,58,237,0.2)" : "rgba(255,255,255,0.04)",
        border: `1px solid ${hovered ? "rgba(124,58,237,0.5)" : "rgba(255,255,255,0.08)"}`,
        padding: "6px 14px", borderRadius: 6,
        transition: "all 0.2s ease", cursor: "default",
      }}
    >{label}</span>
  );
}

function ContactSection() {
  const [ref, visible] = useIntersection();
  return (
    <section id="contact" ref={ref} style={{
      padding: "8rem 2.5rem", maxWidth: 1100, margin: "0 auto",
      borderTop: "1px solid rgba(255,255,255,0.06)",
    }}>
      <SectionLabel label="05 / CONTACT" visible={visible} />
      <h2 style={{ ...sectionHeadStyle(visible), marginBottom: "1.5rem" }}>
        Let's<br /><em style={{ color: "#7C3AED", fontStyle: "normal" }}>build</em>
      </h2>

      <p style={{
        fontFamily: "'DM Sans', sans-serif", fontSize: 18,
        color: "rgba(255,255,255,0.45)", maxWidth: 480, lineHeight: 1.7,
        marginBottom: "3rem",
        opacity: visible ? 1 : 0, transition: "opacity 0.6s ease 0.3s",
      }}>
        Open to conversations about infrastructure, AI systems, and building things that scale.
      </p>

      <div style={{
        display: "flex", flexWrap: "wrap", gap: "1rem",
        opacity: visible ? 1 : 0, transition: "opacity 0.6s ease 0.5s",
      }}>
        {[
          { label: "yashwantgandham@gmail.com", href: "mailto:yashwantgandham@gmail.com" },
          { label: "+1 303-414-8260", href: "tel:+13034148260" },
          { label: "LinkedIn ↗", href: "https://www.linkedin.com/in/g-yashwant/" },
          { label: "GitHub ↗", href: "https://github.com/Yash-Yashwant" },
        ].map(link => (
          <a key={link.label} href={link.href} target="_blank" style={{
            fontFamily: "'Space Mono', monospace", fontSize: 12,
            color: "rgba(255,255,255,0.5)", textDecoration: "none",
            border: "1px solid rgba(255,255,255,0.1)",
            padding: "10px 20px", borderRadius: 8, letterSpacing: "0.05em",
            transition: "all 0.2s ease",
          }}
            onMouseEnter={e => {
              e.target.style.color = "#fff";
              e.target.style.borderColor = "rgba(124,58,237,0.5)";
              e.target.style.background = "rgba(124,58,237,0.1)";
            }}
            onMouseLeave={e => {
              e.target.style.color = "rgba(255,255,255,0.5)";
              e.target.style.borderColor = "rgba(255,255,255,0.1)";
              e.target.style.background = "transparent";
            }}
          >{link.label}</a>
        ))}
      </div>

      <div style={{
        marginTop: "6rem",
        fontFamily: "'Space Mono', monospace", fontSize: 11,
        color: "rgba(255,255,255,0.15)", letterSpacing: "0.1em",
      }}>
        MS DATA SCIENCE · CU BOULDER · 2026 &nbsp;·&nbsp; CTO @ NOVACHAT AI &nbsp;·&nbsp; BOULDER, CO
      </div>
    </section>
  );
}

// Helpers
function SectionLabel({ label, visible }) {
  return (
    <div style={{
      fontFamily: "'Space Mono', monospace", fontSize: 11,
      color: "#7C3AED", letterSpacing: "0.2em",
      marginBottom: "1.5rem",
      opacity: visible ? 1 : 0, transition: "opacity 0.5s ease",
    }}>{label}</div>
  );
}

function sectionHeadStyle(visible) {
  return {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: "clamp(52px, 7vw, 96px)",
    lineHeight: 0.95, color: "#fff",
    margin: 0, letterSpacing: "-0.01em",
    transform: visible ? "translateY(0)" : "translateY(24px)",
    opacity: visible ? 1 : 0,
    transition: "all 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s",
  };
}

function btnStyle(bg, outlined = false) {
  return {
    fontFamily: "'Space Mono', monospace", fontSize: 12,
    color: outlined ? "rgba(255,255,255,0.6)" : "#fff",
    background: outlined ? "transparent" : bg,
    border: `1px solid ${outlined ? "rgba(255,255,255,0.15)" : bg}`,
    padding: "12px 24px", borderRadius: 8,
    textDecoration: "none", letterSpacing: "0.08em",
    transition: "all 0.2s ease", display: "inline-block",
  };
}

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r},${g},${b}`;
}

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("about");

  useEffect(() => {
    const sections = NAV_LINKS.map(l => l.toLowerCase());
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id); });
    }, { threshold: 0.3 });
    sections.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Mono:wght@400;700&family=DM+Sans:wght@300;400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #08080C; color: #fff; cursor: none; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #08080C; }
        ::-webkit-scrollbar-thumb { background: #7C3AED; border-radius: 2px; }
        ::selection { background: rgba(124,58,237,0.3); }
      `}</style>
      <Noise />
      <Cursor />
      <Nav active={activeSection} />
      <main style={{ position: "relative", zIndex: 1 }}>
        <Hero />
        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />
        <ContactSection />
      </main>
    </>
  );
}
