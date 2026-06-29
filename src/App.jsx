import React, { useState, useEffect } from 'react'

/* ─────────────────────────────────────────────────────────────────────────────
   LOGO MARK — rendered in SVG so it scales perfectly
───────────────────────────────────────────────────────────────────────────── */
function LogoMark({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <rect width="28" height="28" rx="6"
        fill="url(#lm-grad)" />
      <ellipse cx="14" cy="14" rx="8.5" ry="5.5"
        stroke="rgba(0,0,0,0.45)" strokeWidth="1.1" fill="none" />
      <circle cx="14" cy="14" r="3" fill="rgba(0,0,0,0.38)" />
      <circle cx="14" cy="14" r="1.3" fill="rgba(255,255,255,0.72)" />
      <line x1="14" y1="9.5" x2="14" y2="18.5"
        stroke="rgba(255,255,255,0.22)" strokeWidth="0.6" />
      <line x1="9.5" y1="14" x2="18.5" y2="14"
        stroke="rgba(255,255,255,0.22)" strokeWidth="0.6" />
      <defs>
        <linearGradient id="lm-grad" x1="0" y1="0" x2="28" y2="28" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#C8720A" />
          <stop offset="100%" stopColor="#964A08" />
        </linearGradient>
      </defs>
    </svg>
  )
}

function Logo({ dark = false }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
      <LogoMark size={28} />
      <span style={{
        fontFamily: 'var(--f-sans)',
        fontWeight: 600,
        fontSize: 15,
        letterSpacing: '-0.01em',
        color: dark ? 'var(--d-text)' : 'var(--ink)',
        lineHeight: 1,
      }}>
        AI<span style={{ color: 'var(--clay)' }}>Vision</span> Labs
      </span>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   NAV
───────────────────────────────────────────────────────────────────────────── */
function Nav({ scrolled }) {
  const links = [
    { label: 'Services', href: '#services' },
    { label: 'Work',     href: '#work' },
    { label: 'About',    href: '#about' },
    { label: 'Contact',  href: '#contact' },
  ]

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0,
      height: 'var(--nav-h)',
      display: 'flex', alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 clamp(20px, 4vw, 48px)',
      background: scrolled ? 'rgba(247,244,239,0.92)' : 'transparent',
      backdropFilter: scrolled ? 'blur(18px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
      transition: 'background 0.3s ease, backdrop-filter 0.3s ease, border-color 0.3s ease',
      zIndex: 300,
    }}>
      <a href="#top" style={{ textDecoration: 'none' }}>
        <Logo />
      </a>

      <ul style={{
        display: 'flex', gap: 30, listStyle: 'none',
        margin: 0, padding: 0,
      }}>
        {links.map(l => (
          <li key={l.href} style={{ display: undefined }}>
            <a href={l.href} style={{
              fontFamily: 'var(--f-sans)',
              fontSize: 13.5, fontWeight: 400,
              color: 'var(--ink2)',
              textDecoration: 'none',
              transition: 'color 0.15s ease',
            }}
              onMouseEnter={e => e.target.style.color = 'var(--ink)'}
              onMouseLeave={e => e.target.style.color = 'var(--ink2)'}
            >{l.label}</a>
          </li>
        ))}
      </ul>

      <a href="#contact" className="btn-primary" style={{ fontSize: 12.5, padding: '9px 18px' }}>
        Start a project →
      </a>
    </nav>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   HERO
───────────────────────────────────────────────────────────────────────────── */
function Hero() {
  return (
    <section id="top" style={{
      minHeight: '100vh',
      display: 'flex', flexDirection: 'column', justifyContent: 'center',
      padding: 'calc(var(--nav-h) + 6rem) clamp(20px, 5vw, 72px) 6rem',
      background: 'var(--bg)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Subtle warm radial — very gentle, OpenAI-style restraint */}
      <div style={{
        position: 'absolute', top: '-20%', right: '-15%',
        width: 700, height: 700,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(168,82,42,0.055) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 680, position: 'relative', zIndex: 2 }}>
        {/* Eyebrow */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: 'var(--clay-light)',
          border: '1px solid var(--clay-border)',
          padding: '5px 13px', borderRadius: 20,
          fontFamily: 'var(--f-mono)',
          fontSize: 10, letterSpacing: '0.14em',
          color: 'var(--clay)', marginBottom: 36,
          opacity: 0, animation: 'fadeUp 0.7s 0.05s cubic-bezier(0.16,1,0.3,1) forwards',
        }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--clay)', flexShrink: 0 }} />
          MSME REGISTERED · UDYAM-TN-02-0483528
        </div>

        {/* Headline — Lora serif, calm & confident */}
        <h1 style={{
          fontFamily: 'var(--f-serif)',
          fontWeight: 500,
          fontSize: 'clamp(2.6rem, 7vw, 5.5rem)',
          lineHeight: 1.06,
          letterSpacing: '-0.025em',
          color: 'var(--ink)',
          marginBottom: 24,
          opacity: 0, animation: 'fadeUp 0.8s 0.15s cubic-bezier(0.16,1,0.3,1) forwards',
        }}>
          AI systems built<br />
          to <em style={{ fontStyle: 'italic', color: 'var(--clay)' }}>ship and hold</em>.
        </h1>

        {/* Subhead — short, plain, Anthropic-style honest */}
        <p style={{
          fontFamily: 'var(--f-sans)',
          fontSize: 'clamp(15px, 1.8vw, 18px)',
          fontWeight: 300,
          color: 'var(--ink2)',
          lineHeight: 1.8,
          maxWidth: 520,
          marginBottom: 40,
          opacity: 0, animation: 'fadeUp 0.7s 0.3s cubic-bezier(0.16,1,0.3,1) forwards',
        }}>
          AI Vision Labs builds production-grade LLM pipelines, agentic AI,
          and RAG architectures. We work with clients who need results,
          not prototypes.
        </p>

        <div style={{
          display: 'flex', gap: 12, flexWrap: 'wrap',
          opacity: 0, animation: 'fadeUp 0.7s 0.45s cubic-bezier(0.16,1,0.3,1) forwards',
        }}>
          <a href="#work" className="btn-primary">View our work →</a>
          <a href="#contact" className="btn-secondary">Get in touch</a>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   STATS BAR
───────────────────────────────────────────────────────────────────────────── */
const STATS = [
  { num: '1',      label: 'Live production\nclient' },
  { num: '1',      label: 'Patent filed\nApr 2026' },
  { num: '5-stage',label: 'Reasoning\npipeline' },
  { num: '2+',     label: 'Years independent\nAI engineering' },
]

function StatsBar() {
  return (
    <div style={{
      background: 'var(--ink)',
      padding: '0',
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        maxWidth: 900, margin: '0 auto',
      }}>
        {STATS.map((s, i) => (
          <div key={i} style={{
            padding: '32px 24px',
            borderRight: i < STATS.length - 1 ? '1px solid rgba(231,229,224,0.07)' : 'none',
            textAlign: 'center',
          }}>
            <div style={{
              fontFamily: 'var(--f-serif)',
              fontWeight: 400,
              fontSize: 'clamp(1.6rem, 3.5vw, 2.6rem)',
              letterSpacing: '-0.025em',
              color: '#fff', lineHeight: 1,
              marginBottom: 8,
            }}>
              {s.num.includes('stage') ? (
                <><span style={{ color: 'var(--clay-mid)' }}>5</span>‑stage</>
              ) : (
                <><span style={{ color: 'var(--clay-mid)' }}>{s.num}</span></>
              )}
            </div>
            <div style={{
              fontFamily: 'var(--f-mono)',
              fontSize: 10, letterSpacing: '0.09em',
              color: 'rgba(231,229,224,0.38)',
              lineHeight: 1.55,
              whiteSpace: 'pre-line',
            }}>{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   SERVICES — BENTO GRID
───────────────────────────────────────────────────────────────────────────── */
const SERVICES = [
  {
    id: 'llm',
    span: 'col2',          /* spans 2 columns */
    icon: '◈',
    title: 'LLM & Generative AI',
    desc: 'Language models that work reliably at production scale — not just in the notebook.',
    bullets: [
      'RAG pipelines with FAISS and Qdrant vector orchestration',
      'LLM fine-tuning with QLoRA/PEFT for domain adaptation',
      'Intelligent chatbots, AI assistants, document Q&A',
      'Multimodal AI — text, image, and document reasoning',
    ],
  },
  {
    id: 'agentic',
    span: 'row2',          /* spans 2 rows */
    icon: '◎',
    title: 'Agentic AI',
    desc: 'Autonomous systems that plan, act, and iterate.',
    bullets: [
      'Multi-agent orchestration with LangChain',
      'Spec-driven agents with tool-calling and memory',
      'Antahkarana — our 5-stage reasoning architecture',
      'Validated on 2,500+ multimodal samples',
    ],
    extra: {
      label: 'PATENT FILED',
      body: 'App No. 202641043947 · IEEE Paper Submitted',
    },
  },
  {
    id: 'aiml',
    span: 'normal',
    icon: '⬡',
    title: 'AI/ML Development',
    desc: 'Custom AI for classification, prediction, CV, and NLP — end-to-end.',
    bullets: [
      'Computer vision pipelines',
      'NLP & document intelligence',
      'End-to-end delivery to production API',
    ],
  },
  {
    id: 'aaas',
    span: 'normal',
    icon: '▣',
    title: 'Agent-as-a-Service',
    desc: 'Domain-specific agents deployed as managed services.',
    bullets: [
      'Healthcare intake & triage agents',
      'Customer support with RAG + escalation',
      'HR knowledge base automation',
    ],
  },
  {
    id: 'deploy',
    span: 'col2',
    icon: '◆',
    title: 'AI Deployment',
    desc: "We don't stop at the model — we ship it, monitor it, and keep it honest.",
    tags: ['Azure Container Apps', 'AWS SageMaker', 'GCP Vertex AI', 'FastAPI', 'Docker', 'GitHub Actions CI/CD', 'Hallucination checks', 'DPDP Act 2023'],
  },
]

function BentoCard({ svc }) {
  const isWide = svc.span === 'col2'
  const isTall = svc.span === 'row2'

  return (
    <div className="card" style={{
      gridColumn: isWide ? 'span 2' : 'span 1',
      gridRow: isTall ? 'span 2' : 'span 1',
      padding: 26,
      position: 'relative',
      overflow: 'hidden',
      cursor: 'default',
    }}>
      {/* Top accent line for featured cards */}
      {(isWide || isTall) && (
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0,
          height: 2,
          background: 'linear-gradient(90deg, var(--clay) 0%, transparent 80%)',
        }} />
      )}

      <div style={{
        width: 36, height: 36,
        background: 'var(--clay-light)',
        borderRadius: 8,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 15, color: 'var(--clay)',
        marginBottom: 14,
      }}>{svc.icon}</div>

      <h3 style={{
        fontFamily: 'var(--f-sans)', fontWeight: 600,
        fontSize: 14.5, color: 'var(--ink)',
        marginBottom: 6, letterSpacing: '-0.01em',
      }}>{svc.title}</h3>

      <p style={{
        fontFamily: 'var(--f-sans)', fontSize: 13, fontWeight: 300,
        color: 'var(--ink2)', lineHeight: 1.65, marginBottom: svc.bullets ? 14 : 0,
      }}>{svc.desc}</p>

      {svc.bullets && (
        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 5 }}>
          {svc.bullets.map((b, i) => (
            <li key={i} style={{
              fontFamily: 'var(--f-sans)', fontSize: 12.5, fontWeight: 300,
              color: 'var(--ink3)', lineHeight: 1.55,
              paddingLeft: 13, position: 'relative',
            }}>
              <span style={{ position: 'absolute', left: 0, color: 'var(--clay)', fontSize: 12 }}>›</span>
              {b}
            </li>
          ))}
        </ul>
      )}

      {svc.extra && (
        <div style={{
          marginTop: 18, padding: '11px 14px',
          background: 'var(--clay-light)',
          border: '1px solid var(--clay-border)',
          borderRadius: 8,
        }}>
          <div style={{
            fontFamily: 'var(--f-mono)', fontSize: 9.5,
            letterSpacing: '0.13em', color: 'var(--clay)',
            marginBottom: 3,
          }}>{svc.extra.label}</div>
          <div style={{
            fontFamily: 'var(--f-sans)', fontSize: 12, fontWeight: 300,
            color: 'var(--ink2)', lineHeight: 1.5,
          }}>{svc.extra.body}</div>
        </div>
      )}

      {svc.tags && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 14 }}>
          {svc.tags.map(t => <span key={t} className="tag">{t}</span>)}
        </div>
      )}
    </div>
  )
}

function Services() {
  return (
    <section id="services" style={{ padding: '80px clamp(20px, 5vw, 72px)', background: 'var(--bg2)' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div className="section-label">What we build</div>
        <h2 className="section-h2">Five capabilities,<br /><em>one delivery standard</em>.</h2>
        <p className="section-sub">
          We take on AI work where the bar is real-world outcomes — not model accuracy benchmarks.
        </p>

        {/* 3-column bento */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 10,
        }}>
          {SERVICES.map(svc => <BentoCard key={svc.id} svc={svc} />)}
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   FEATURED WORK
───────────────────────────────────────────────────────────────────────────── */
function Work() {
  return (
    <section id="work" style={{ padding: '80px clamp(20px, 5vw, 72px)', background: 'var(--bg)' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div className="section-label">Featured work</div>
        <h2 className="section-h2">Shipped, not <em>demoed</em>.</h2>
        <p className="section-sub">
          One live product serving real patients. One patent-filed reasoning framework
          powering it in production.
        </p>

        {/* Anbu Health AI — case study card */}
        <div className="card" style={{
          padding: 'clamp(24px, 4vw, 40px)',
          marginBottom: 12,
          display: 'grid',
          gridTemplateColumns: '1.15fr 1fr',
          gap: 40,
          alignItems: 'start',
        }}>
          <div>
            <div className="live-badge">
              <span className="live-dot" />
              LIVE IN PRODUCTION
            </div>
            <h3 style={{
              fontFamily: 'var(--f-serif)', fontWeight: 500,
              fontSize: 'clamp(1.4rem, 3vw, 2rem)',
              lineHeight: 1.15, letterSpacing: '-0.02em',
              color: 'var(--ink)', marginBottom: 14,
            }}>Anbu Health AI</h3>
            <p style={{
              fontFamily: 'var(--f-sans)', fontSize: 13.5, fontWeight: 300,
              color: 'var(--ink2)', lineHeight: 1.8, marginBottom: 20,
            }}>
              A bilingual (Tamil/English) medical AI assistant that analyses
              lab reports, diagnostic scans, and medicine photos — shipped to a
              paying client at anbuclinic.me with Firebase OTP auth and
              DPDP Act 2023-aligned data handling.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 22 }}>
              {['React', 'FastAPI', 'Azure Container Apps', 'Groq + GPT-4o Vision', 'Qdrant RAG'].map(t => (
                <span key={t} className="tag">{t}</span>
              ))}
            </div>
            <a
              href="https://anbuclinic.me"
              target="_blank" rel="noopener noreferrer"
              style={{
                fontFamily: 'var(--f-mono)', fontSize: 12,
                letterSpacing: '0.06em', color: 'var(--clay)',
                textDecoration: 'none', fontWeight: 500,
                display: 'inline-flex', alignItems: 'center', gap: 4,
                transition: 'opacity 0.15s',
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.7'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >
              anbuclinic.me →
            </a>
          </div>

          {/* Stat callouts */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { n: '5', label: 'Stage reasoning pipeline', sub: 'routing → RAG → LLM → scoring → check' },
              { n: '2',  label: 'Languages supported', sub: 'Tamil & English, bilingual throughout' },
              { n: '∞',  label: 'Full-stack delivery', sub: 'Frontend, backend, AI pipeline, cloud infra' },
            ].map((s, i) => (
              <div key={i} style={{
                background: 'var(--bg2)',
                border: '1px solid var(--border)',
                borderRadius: 10, padding: '16px 20px',
                display: 'flex', gap: 14, alignItems: 'center',
              }}>
                <div style={{
                  fontFamily: 'var(--f-serif)', fontWeight: 400,
                  fontSize: s.n === '∞' ? 26 : 30,
                  color: 'var(--ink)', lineHeight: 1, flexShrink: 0,
                  letterSpacing: '-0.02em', minWidth: 36,
                }}>{s.n}</div>
                <div>
                  <div style={{
                    fontFamily: 'var(--f-sans)', fontWeight: 500,
                    fontSize: 12.5, color: 'var(--ink)', marginBottom: 2,
                  }}>{s.label}</div>
                  <div style={{
                    fontFamily: 'var(--f-sans)', fontSize: 11.5,
                    fontWeight: 300, color: 'var(--ink3)', lineHeight: 1.5,
                  }}>{s.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Antahkarana — dark card */}
        <div style={{
          background: 'var(--ink)',
          borderRadius: 14, padding: 'clamp(24px, 4vw, 40px)',
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: 40, alignItems: 'start',
        }}>
          <div>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 7,
              background: 'rgba(196,105,62,0.16)',
              border: '1px solid rgba(196,105,62,0.3)',
              padding: '4px 11px', borderRadius: 20,
              fontFamily: 'var(--f-mono)', fontSize: 10,
              letterSpacing: '0.12em', color: 'var(--clay-mid)',
              marginBottom: 16,
            }}>
              PATENT FILED · IEEE SUBMITTED
            </div>
            <h3 style={{
              fontFamily: 'var(--f-serif)', fontStyle: 'italic',
              fontWeight: 400, fontSize: 'clamp(1.3rem, 2.5vw, 1.85rem)',
              lineHeight: 1.2, letterSpacing: '-0.02em',
              color: 'var(--d-text)', marginBottom: 14,
            }}>Antahkarana<br />Reasoning Framework</h3>
            <p style={{
              fontFamily: 'var(--f-sans)', fontSize: 13.5, fontWeight: 300,
              color: 'var(--d-text2)', lineHeight: 1.8, marginBottom: 18,
            }}>
              A cognitively-inspired 5-stage architecture for LLMs and VLMs,
              built on Vedantic cognitive theory. Validated on 2,500+ multimodal
              samples. Powers Anbu Health AI in production.
            </p>
            <div style={{
              fontFamily: 'var(--f-mono)', fontSize: 10,
              letterSpacing: '0.08em', color: 'var(--d-text3)',
              lineHeight: 1.8,
            }}>
              APP NO. 202641043947<br />
              APRIL 2026 · GOOGLE SCHOLAR INDEXED
            </div>
          </div>

          {/* 5 stages */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
            {[
              { name: 'Manas',    role: 'Perception & sensory input' },
              { name: 'Chitta',   role: 'Memory & retrieval (RAG)' },
              { name: 'Buddhi',   role: 'Discrimination & reasoning' },
              { name: 'Ahamkara', role: 'Integration & response synthesis' },
              { name: 'Sakshi',   role: 'Confidence & hallucination check' },
            ].map((s, i) => (
              <div key={i} style={{
                display: 'flex', gap: 14, alignItems: 'center',
                padding: '11px 14px',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid var(--d-border)',
                borderRadius: 8,
              }}>
                <span style={{
                  fontFamily: 'var(--f-mono)', fontSize: 11,
                  color: 'var(--clay-mid)', fontWeight: 500,
                  minWidth: 68, flexShrink: 0,
                }}>{s.name}</span>
                <span style={{
                  fontFamily: 'var(--f-sans)', fontSize: 12,
                  fontWeight: 300, color: 'var(--d-text2)', lineHeight: 1.4,
                }}>{s.role}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   DEV / TECH STACK — dark section (Vercel influence, contained here only)
───────────────────────────────────────────────────────────────────────────── */
function DevSection() {
  const stackItems = [
    'Azure Container Apps', 'AWS SageMaker', 'GCP Vertex AI',
    'FastAPI', 'Docker', 'GitHub Actions',
    'Groq + GPT-4o Vision', 'Qdrant', 'FAISS',
    'LangChain', 'HuggingFace', 'PyTorch',
  ]

  return (
    <section className="dark-section" style={{
      background: 'var(--bg-dark)',
      padding: '80px clamp(20px, 5vw, 72px)',
    }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: 56, alignItems: 'start',
        }}>
          {/* Left: text + stack grid */}
          <div>
            <div style={{
              fontFamily: 'var(--f-mono)', fontSize: 10.5,
              letterSpacing: '0.2em', color: 'var(--clay-mid)',
              textTransform: 'uppercase', marginBottom: 18,
              display: 'flex', alignItems: 'center', gap: 10,
            }}>
              <span style={{ display: 'block', width: 22, height: 1, background: 'var(--clay-mid)' }} />
              Infrastructure
            </div>
            <h2 style={{
              fontFamily: 'var(--f-serif)', fontWeight: 400,
              fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
              lineHeight: 1.12, letterSpacing: '-0.025em',
              color: 'var(--d-text)', marginBottom: 14,
            }}>
              Reliable,<br /><em style={{ fontStyle: 'italic', color: 'var(--clay-mid)' }}>cloud-native by default</em>.
            </h2>
            <p style={{
              fontFamily: 'var(--f-sans)', fontSize: 13.5,
              fontWeight: 300, color: 'var(--d-text2)',
              lineHeight: 1.8, marginBottom: 32, maxWidth: 380,
            }}>
              Every system is designed for real-world reliability — proper cloud infra,
              CI/CD pipelines, containerised deployments, and observability from day one.
            </p>

            {/* Stack grid */}
            <div style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr',
              gap: 7,
            }}>
              {stackItems.map(name => (
                <div key={name} style={{
                  display: 'flex', alignItems: 'center', gap: 9,
                  background: 'var(--bg-dark2)',
                  border: '1px solid var(--d-border)',
                  borderRadius: 7, padding: '9px 12px',
                }}>
                  <span style={{
                    width: 6, height: 6, borderRadius: '50%',
                    background: 'var(--clay-mid)', flexShrink: 0,
                  }} />
                  <span style={{
                    fontFamily: 'var(--f-mono)', fontSize: 11,
                    color: 'var(--d-text2)', fontWeight: 400,
                  }}>{name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: terminal code block */}
          <div style={{
            background: 'var(--bg-dark2)',
            border: '1px solid var(--d-border2)',
            borderRadius: 12,
            overflow: 'hidden',
          }}>
            {/* Terminal chrome */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 7,
              padding: '11px 16px',
              borderBottom: '1px solid var(--d-border)',
            }}>
              {['#E25655','#E3AA40','#57A65A'].map(c => (
                <span key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c, flexShrink: 0 }} />
              ))}
              <span style={{
                fontFamily: 'var(--f-mono)', fontSize: 10,
                color: 'var(--d-text3)', marginLeft: 8,
              }}>antahkarana/pipeline.py</span>
            </div>
            {/* Code */}
            <pre style={{
              fontFamily: 'var(--f-mono)', fontSize: 11.5,
              lineHeight: 1.85, color: 'var(--d-text2)',
              padding: '20px 22px', margin: 0,
              overflowX: 'auto',
            }}>
{[
  { t: 'c', v: '# 5-stage Antahkarana pipeline' },
  { t: 'k', v: 'from', a: ' antahkarana ' },
  { t: 'k', v: 'import', a: ' Pipeline' },
  null,
  { t: 'p', v: 'pipe = Pipeline(' },
  { t: 'i', v: '  manas',    s: '=PerceptionStage(),' },
  { t: 'i', v: '  chitta',   s: '=RAGStage(qdrant),' },
  { t: 'i', v: '  buddhi',   s: '=ReasoningStage(),' },
  { t: 'i', v: '  ahamkara', s: '=SynthesisStage(),' },
  { t: 'i', v: '  sakshi',   s: '=HallucinationCheck(),' },
  { t: 'p', v: ')' },
  null,
  { t: 'c', v: '# Deployed · Azure Container Apps' },
  { t: 'c', v: '# Live at anbuclinic.me' },
].map((line, idx) => {
  if (!line) return <span key={idx}>{'\n'}</span>
  if (line.t === 'c') return (
    <span key={idx} style={{ color: 'rgba(231,229,224,0.25)' }}>{line.v + '\n'}</span>
  )
  if (line.t === 'k') return (
    <span key={idx}>
      <span style={{ color: '#C392E0' }}>{line.v}</span>
      <span>{line.a + '\n'}</span>
    </span>
  )
  if (line.t === 'i') return (
    <span key={idx}>
      <span style={{ color: '#7EC8A0' }}>{line.v}</span>
      <span style={{ color: 'rgba(231,229,224,0.35)' }}>{line.s + '\n'}</span>
    </span>
  )
  return <span key={idx}>{line.v + '\n'}</span>
})}
            </pre>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   ABOUT
───────────────────────────────────────────────────────────────────────────── */
function About() {
  return (
    <section id="about" style={{ padding: '80px clamp(20px, 5vw, 72px)', background: 'var(--bg2)' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div className="section-label">About</div>
        <h2 className="section-h2">Built on <em>shipped work</em>.</h2>

        <div style={{
          display: 'grid', gridTemplateColumns: '1.4fr 1fr',
          gap: 56, alignItems: 'start',
        }}>
          <div>
            {[
              `AI Vision Labs was founded to close the gap between AI research and production
deployment. Too many organisations receive impressive demos that never reach real
users. We build things that ship — with proper infrastructure, compliance-ready
architecture, and hallucination controls built in from day one.`,
              `Founded in Chennai and registered as an MSME, we're available for select
engagements globally — AI/ML development contracts, LLM integration projects, and
agentic system builds. We take on work where the bar is real-world outcomes.`,
              `Our reasoning framework, Antahkarana, is an original R&D contribution — patent
filed, IEEE paper submitted — and serves as the cognitive backbone for complex,
multi-stage reasoning tasks requiring rigorous validation.`,
            ].map((para, i) => (
              <p key={i} style={{
                fontFamily: 'var(--f-sans)', fontSize: 14.5,
                fontWeight: 300, color: 'var(--ink2)',
                lineHeight: 1.85, marginBottom: 20,
              }}>{para.trim()}</p>
            ))}
          </div>

          {/* Team + registration */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {/* Team card */}
            <div className="card" style={{ overflow: 'hidden' }}>
              {[
                {
                  role: 'CHIEF EXECUTIVE OFFICER',
                  name: 'Prabhakaran',
                  bio: 'Leading AI Vision Labs\' strategic direction and client engagements.',
                },
                {
                  role: 'FOUNDER · AI/ML ENGINEER',
                  name: 'Rajaganapathy M',
                  bio: 'M.Tech AI, SRM (9.6 CGPA) · Patent filed · IEEE · AWS Certified · 2+ years independent AI engineering.',
                },
              ].map((p, i, arr) => (
                <div key={p.name} style={{
                  padding: '18px 20px',
                  borderBottom: i < arr.length - 1 ? '1px solid var(--border)' : 'none',
                }}>
                  <div style={{
                    fontFamily: 'var(--f-mono)', fontSize: 9.5,
                    letterSpacing: '0.12em', color: 'var(--clay)',
                    marginBottom: 4,
                  }}>{p.role}</div>
                  <div style={{
                    fontFamily: 'var(--f-sans)', fontWeight: 600,
                    fontSize: 14, color: 'var(--ink)', marginBottom: 5,
                  }}>{p.name}</div>
                  <div style={{
                    fontFamily: 'var(--f-sans)', fontSize: 12,
                    fontWeight: 300, color: 'var(--ink3)', lineHeight: 1.6,
                  }}>{p.bio}</div>
                </div>
              ))}
            </div>

            {/* MSME plate */}
            <div style={{
              background: 'var(--bg3)',
              border: '1px solid var(--border)',
              borderRadius: 10, padding: '14px 18px',
              fontFamily: 'var(--f-mono)', fontSize: 10,
              color: 'var(--ink3)', lineHeight: 2,
              letterSpacing: '0.04em',
            }}>
              MSME REGISTERED · INDIA<br />
              UDYAM-TN-02-0483528<br />
              CHENNAI, TAMIL NADU
            </div>

            {/* Credentials */}
            <div className="card" style={{ padding: '16px 20px' }}>
              <div style={{
                fontFamily: 'var(--f-mono)', fontSize: 10,
                letterSpacing: '0.14em', color: 'var(--ink3)',
                marginBottom: 12,
              }}>CREDENTIALS</div>
              {[
                'AWS Solutions Architect Associate',
                'M.Tech AI — SRM Institute (9.6/10 CGPA)',
                'IITM Pravartak AI/ML Program',
                'Kaggle AI Agents Intensive (Google)',
                'NPTEL Top 5% — IoT (86%, 50,282 candidates)',
                'Azure · GCP · Docker · CI/CD',
              ].map((c, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  fontFamily: 'var(--f-sans)', fontSize: 12,
                  color: 'var(--ink2)', fontWeight: 300,
                  marginBottom: 6, lineHeight: 1.4,
                }}>
                  <span style={{ color: 'var(--clay)', fontSize: 11, flexShrink: 0 }}>›</span>
                  {c}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   CONTACT
───────────────────────────────────────────────────────────────────────────── */
function Contact() {
  const [form, setForm] = useState({ name: '', company: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const handle = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const submit = e => {
    e.preventDefault()
    const sub = encodeURIComponent(`Project Inquiry — ${form.name}${form.company ? ` (${form.company})` : ''}`)
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\nCompany: ${form.company}\n\n${form.message}`)
    window.location.href = `mailto:rajaganaa@aivisionlabs.tech?subject=${sub}&body=${body}`
    setSent(true)
  }

  return (
    <section id="contact" style={{ padding: '80px clamp(20px, 5vw, 72px)', background: 'var(--bg)' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div className="section-label">Get in touch</div>
        <h2 className="section-h2" style={{ marginBottom: 14 }}>
          Available for select<br /><em>project engagements</em>.
        </h2>
        <p style={{
          fontFamily: 'var(--f-sans)', fontSize: 15, fontWeight: 300,
          color: 'var(--ink2)', lineHeight: 1.8, marginBottom: 48,
          maxWidth: 440,
        }}>
          Tell us about your project. We respond to all inquiries within 24 hours.
          Serious work only.
        </p>

        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: 48, alignItems: 'start',
        }}>
          {/* Form */}
          {sent ? (
            <div style={{
              padding: 28,
              background: 'var(--clay-light)',
              border: '1px solid var(--clay-border)',
              borderRadius: 12,
            }}>
              <div style={{
                fontFamily: 'var(--f-serif)', fontWeight: 500,
                fontSize: 18, color: 'var(--clay)', marginBottom: 8,
              }}>Your email client is open.</div>
              <div style={{
                fontFamily: 'var(--f-sans)', fontSize: 13, fontWeight: 300,
                color: 'var(--ink2)',
              }}>
                Send the drafted email to reach us at contact@aivisionlabs.tech.
                We'll respond within 24 hours.
              </div>
            </div>
          ) : (
            <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <div>
                  <label className="form-label">NAME</label>
                  <input className="form-input" type="text" name="name"
                    required value={form.name} onChange={handle} placeholder="Yours" />
                </div>
                <div>
                  <label className="form-label">COMPANY</label>
                  <input className="form-input" type="text" name="company"
                    value={form.company} onChange={handle} placeholder="Optional" />
                </div>
              </div>
              <div>
                <label className="form-label">EMAIL</label>
                <input className="form-input" type="email" name="email"
                  required value={form.email} onChange={handle} placeholder="you@company.com" />
              </div>
              <div>
                <label className="form-label">TELL US ABOUT YOUR PROJECT</label>
                <textarea className="form-input" name="message" required
                  rows={5} value={form.message} onChange={handle}
                  placeholder="What are you building? What problem needs AI to solve?"
                  style={{ resize: 'vertical', minHeight: 110 }} />
              </div>
              <button type="submit" className="btn-primary" style={{ justifyContent: 'center', marginTop: 4 }}>
                Send inquiry →
              </button>
            </form>
          )}

          {/* Direct contact */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
            <div>
              <div style={{
                fontFamily: 'var(--f-mono)', fontSize: 10,
                letterSpacing: '0.14em', color: 'var(--ink3)', marginBottom: 8,
              }}>DIRECT</div>
              <a href="mailto:contact@aivisionlabs.tech" style={{
                fontFamily: 'var(--f-serif)', fontWeight: 400,
                fontSize: 20, color: 'var(--ink)',
                textDecoration: 'none', display: 'block',
                letterSpacing: '-0.01em',
                transition: 'color 0.15s ease',
              }}
                onMouseEnter={e => e.target.style.color = 'var(--clay)'}
                onMouseLeave={e => e.target.style.color = 'var(--ink)'}
              >
                contact@aivisionlabs.tech
              </a>
            </div>

            <div>
              <div style={{
                fontFamily: 'var(--f-mono)', fontSize: 10,
                letterSpacing: '0.14em', color: 'var(--ink3)', marginBottom: 8,
              }}>RESEARCH & MODELS</div>
              <a href="https://huggingface.co/RajGana" target="_blank" rel="noopener noreferrer"
                style={{
                  fontFamily: 'var(--f-sans)', fontSize: 13.5, fontWeight: 400,
                  color: 'var(--ink2)', textDecoration: 'none',
                  transition: 'color 0.15s ease', display: 'block',
                }}
                onMouseEnter={e => e.target.style.color = 'var(--clay)'}
                onMouseLeave={e => e.target.style.color = 'var(--ink2)'}
              >
                huggingface.co/RajGana →
              </a>
              <div style={{
                fontFamily: 'var(--f-mono)', fontSize: 10,
                color: 'var(--ink3)', marginTop: 3,
                letterSpacing: '0.06em',
              }}>3 live fine-tuned models</div>
            </div>

            <div>
              <div style={{
                fontFamily: 'var(--f-mono)', fontSize: 10,
                letterSpacing: '0.14em', color: 'var(--ink3)', marginBottom: 8,
              }}>LINKEDIN</div>
              <a href="https://linkedin.com/in/raja-ganapathy-36b00658"
                target="_blank" rel="noopener noreferrer"
                style={{
                  fontFamily: 'var(--f-sans)', fontSize: 13.5,
                  color: 'var(--ink2)', textDecoration: 'none',
                  transition: 'color 0.15s ease',
                }}
                onMouseEnter={e => e.target.style.color = 'var(--clay)'}
                onMouseLeave={e => e.target.style.color = 'var(--ink2)'}
              >
                Rajaganapathy M →
              </a>
            </div>

            <div style={{
              background: 'var(--bg2)',
              border: '1px solid var(--border)',
              borderRadius: 10, padding: '16px 18px',
            }}>
              <div style={{
                fontFamily: 'var(--f-mono)', fontSize: 10,
                letterSpacing: '0.12em', color: 'var(--clay)',
                marginBottom: 6,
              }}>RESPONSE TIME</div>
              <div style={{
                fontFamily: 'var(--f-sans)', fontSize: 13,
                fontWeight: 300, color: 'var(--ink2)', lineHeight: 1.65,
              }}>
                All project inquiries answered within 24 hours. Serious work only.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   FOOTER
───────────────────────────────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer style={{
      background: 'var(--ink)',
      padding: '28px clamp(20px, 5vw, 72px)',
    }}>
      <div style={{
        maxWidth: 900, margin: '0 auto',
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', flexWrap: 'wrap', gap: 16,
      }}>
        <Logo dark />
        <div style={{
          fontFamily: 'var(--f-mono)', fontSize: 10,
          letterSpacing: '0.08em', color: 'var(--d-text3)',
        }}>
          © {new Date().getFullYear()} AI Vision Labs · UDYAM-TN-02-0483528 · Chennai, India
        </div>
        <div style={{ display: 'flex', gap: 22 }}>
          {['#services', '#work', '#about', '#contact'].map(href => (
            <a key={href} href={href} style={{
              fontFamily: 'var(--f-mono)', fontSize: 10,
              letterSpacing: '0.08em', color: 'var(--d-text3)',
              textDecoration: 'none', transition: 'color 0.15s ease',
            }}
              onMouseEnter={e => e.target.style.color = 'var(--d-text2)'}
              onMouseLeave={e => e.target.style.color = 'var(--d-text3)'}
            >{href.slice(1)}</a>
          ))}
        </div>
      </div>
    </footer>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   APP ROOT
───────────────────────────────────────────────────────────────────────────── */
export default function App() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 36)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <Nav scrolled={scrolled} />
      <main>
        <Hero />
        <StatsBar />
        <Services />
        <Work />
        <DevSection />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
