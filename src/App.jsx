import React, { useState, useEffect, useRef } from 'react'

// ─── Neural network node background for hero ───────────────────────────────
function NeuralCanvas() {
  const canvasRef = useRef(null)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    const nodes = []
    const NODE_COUNT = 42

    function resize() {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    for (let i = 0; i < NODE_COUNT; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        r: Math.random() * 1.5 + 0.5,
      })
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      // Draw edges
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 130) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(245,166,35,${0.06 * (1 - dist / 130)})`
            ctx.lineWidth = 0.5
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.stroke()
          }
        }
      }
      // Draw nodes
      nodes.forEach(n => {
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(245,166,35,0.35)'
        ctx.fill()
        // Move
        n.x += n.vx
        n.y += n.vy
        if (n.x < 0 || n.x > canvas.width) n.vx *= -1
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1
      })
      animId = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize) }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute', inset: 0,
        width: '100%', height: '100%',
        opacity: 0.7, pointerEvents: 'none',
      }}
    />
  )
}

// ─── Logo SVG (text-based recreation using logo's dark style) ─────────────
function Logo({ size = 32 }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      {/* Eye icon */}
      <div style={{
        width: size, height: size,
        background: 'linear-gradient(135deg, #C8820A 0%, #F5A623 40%, #8B5E00 100%)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
      }}>
        <svg viewBox="0 0 24 24" width={size * 0.55} height={size * 0.55} fill="none">
          <ellipse cx="12" cy="12" rx="9" ry="6" stroke="rgba(0,0,0,0.6)" strokeWidth="1.2"/>
          <circle cx="12" cy="12" r="3" fill="rgba(0,0,0,0.5)"/>
          <circle cx="12" cy="12" r="1.2" fill="rgba(255,255,255,0.8)"/>
          {/* Compass cross */}
          <line x1="12" y1="7" x2="12" y2="17" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5"/>
          <line x1="7" y1="12" x2="17" y2="12" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5"/>
        </svg>
      </div>
      <span style={{
        fontFamily: 'Syne, sans-serif',
        fontWeight: 700,
        fontSize: size * 0.62,
        color: '#EDF0F5',
        letterSpacing: '0.02em',
        lineHeight: 1,
      }}>
        AI<span style={{ color: '#F5A623' }}>Vision</span> Labs
      </span>
    </div>
  )
}

// ─── Logo (light version, for export/email) ────────────────────────────────
function LogoLight({ size = 32 }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <div style={{
        width: size, height: size,
        background: 'linear-gradient(135deg, #C8820A 0%, #F5A623 40%, #8B5E00 100%)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
      }}>
        <svg viewBox="0 0 24 24" width={size * 0.55} height={size * 0.55} fill="none">
          <ellipse cx="12" cy="12" rx="9" ry="6" stroke="rgba(0,0,0,0.6)" strokeWidth="1.2"/>
          <circle cx="12" cy="12" r="3" fill="rgba(0,0,0,0.5)"/>
          <circle cx="12" cy="12" r="1.2" fill="rgba(255,255,255,0.8)"/>
          <line x1="12" y1="7" x2="12" y2="17" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5"/>
          <line x1="7" y1="12" x2="17" y2="12" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5"/>
        </svg>
      </div>
      <span style={{
        fontFamily: 'Syne, sans-serif',
        fontWeight: 700,
        fontSize: size * 0.62,
        color: '#111829',
        letterSpacing: '0.02em',
        lineHeight: 1,
      }}>
        AI<span style={{ color: '#C8820A' }}>Vision</span> Labs
      </span>
    </div>
  )
}

// ─── Nav ────────────────────────────────────────────────────────────────────
function Nav({ scrolled }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const links = ['Services', 'Work', 'About', 'Contact']

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0,
      height: 'var(--nav-h)',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 2.5rem',
      background: scrolled ? 'rgba(6,9,15,0.95)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
      transition: 'all 0.3s ease',
      zIndex: 200,
    }}>
      <a href="#top" style={{ textDecoration: 'none' }}><Logo size={28} /></a>

      {/* Desktop links */}
      <ul className="nav-links-desktop" style={{ display: 'flex', gap: '2.5rem', listStyle: 'none' }}>
        {links.map(l => (
          <li key={l}>
            <a href={`#${l.toLowerCase()}`} style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '11px', letterSpacing: '0.1em',
              color: 'var(--text-2)', textDecoration: 'none',
              transition: 'color 0.15s',
            }}
            onMouseEnter={e => e.target.style.color = 'var(--text)'}
            onMouseLeave={e => e.target.style.color = 'var(--text-2)'}
            >{l}</a>
          </li>
        ))}
      </ul>

      <a href="#contact" className="btn-primary" style={{ fontSize: '11px', padding: '0.6rem 1.4rem' }}>
        Start a Project →
      </a>
    </nav>
  )
}

// ─── Hero ────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section id="top" style={{
      minHeight: '100vh',
      padding: 'calc(var(--nav-h) + 7rem) 2.5rem 6rem',
      display: 'flex', flexDirection: 'column', justifyContent: 'center',
      position: 'relative', overflow: 'hidden',
      background: 'var(--bg)',
    }}>
      <NeuralCanvas />

      {/* Amber glow — top right */}
      <div style={{
        position: 'absolute', top: '-15%', right: '-10%',
        width: '700px', height: '700px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(245,166,35,0.07) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      {/* Grid lines — subtle, sparse */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `
          linear-gradient(rgba(245,166,35,0.025) 1px, transparent 1px),
          linear-gradient(90deg, rgba(245,166,35,0.025) 1px, transparent 1px)
        `,
        backgroundSize: '90px 90px',
        maskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, black 20%, transparent 100%)',
      }} />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: '900px' }}>
        <div className="section-label" style={{ marginBottom: '2.5rem', opacity: 0, animation: 'fadeUp 0.7s 0.05s forwards' }}>
          Registered MSME · UDYAM-TN-02-0483528 · Chennai, India
        </div>

        <h1 style={{
          fontFamily: 'Syne, sans-serif',
          fontWeight: 800,
          fontSize: 'clamp(3.2rem, 8vw, 7.5rem)',
          lineHeight: 0.92,
          letterSpacing: '-0.02em',
          color: 'var(--text)',
          marginBottom: '0.15em',
          opacity: 0, animation: 'fadeUp 0.8s 0.15s forwards',
        }}>
          Enterprise AI,<br />
          <span style={{ color: 'var(--amber)' }}>built for</span><br />
          production.
        </h1>

        <p style={{
          fontFamily: 'Inter, sans-serif',
          fontWeight: 300,
          fontSize: 'clamp(1rem, 1.8vw, 1.2rem)',
          color: 'var(--text-2)',
          maxWidth: '560px',
          lineHeight: 1.75,
          marginTop: '2.5rem',
          marginBottom: '3rem',
          opacity: 0, animation: 'fadeUp 0.7s 0.35s forwards',
        }}>
          AI Vision Labs designs and ships production-grade AI systems — LLM pipelines,
          Agentic AI, RAG architectures, and full-stack deployments — for clients who need
          results, not prototypes.
        </p>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', opacity: 0, animation: 'fadeUp 0.7s 0.5s forwards' }}>
          <a href="#work" className="btn-primary">View Our Work →</a>
          <a href="#contact" className="btn-secondary">Get in Touch</a>
        </div>

        {/* Stats bar */}
        <div style={{
          display: 'flex', gap: '3rem', flexWrap: 'wrap',
          marginTop: '5rem', paddingTop: '2.5rem',
          borderTop: '1px solid var(--border)',
          opacity: 0, animation: 'fadeUp 0.7s 0.65s forwards',
        }}>
          {[
            { n: '1', label: 'Live Production Product' },
            { n: '1', label: 'Patent Filed' },
            { n: '3', label: 'HuggingFace Models' },
            { n: '2+', label: 'Years Building AI' },
          ].map(s => (
            <div key={s.label}>
              <div style={{
                fontFamily: 'Syne, sans-serif', fontWeight: 700,
                fontSize: '2rem', color: 'var(--amber)', lineHeight: 1,
              }}>{s.n}</div>
              <div style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '10px', letterSpacing: '0.1em',
                color: 'var(--text-3)', marginTop: '0.3rem',
              }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Services ────────────────────────────────────────────────────────────────
const SERVICES = [
  {
    icon: '⬡',
    title: 'AI/ML Development',
    desc: 'Custom AI applications built for specific business problems.',
    items: ['Custom ML solutions for classification, prediction, anomaly detection', 'Computer vision pipelines — image/video analysis, object detection', 'NLP systems — sentiment, extraction, document intelligence', 'End-to-end delivery from data pipeline to production API'],
  },
  {
    icon: '◈',
    title: 'LLM & Generative AI',
    desc: 'Language models that work reliably at production scale.',
    items: ['RAG pipelines with FAISS, Qdrant, and vector database orchestration', 'LLM fine-tuning with QLoRA/PEFT for domain adaptation', 'Intelligent chatbots, AI assistants, document Q&A systems', 'Multimodal AI — text + image + document reasoning'],
  },
  {
    icon: '◎',
    title: 'Agentic AI',
    desc: 'Autonomous systems that plan, act, and iterate without hand-holding.',
    items: ['Multi-agent orchestration with LangChain and custom frameworks', 'Spec-driven agents with tool-calling and memory', 'Antahkarana — our proprietary 5-stage reasoning architecture', 'Validated on 2,500+ multimodal samples, patent filed'],
  },
  {
    icon: '▣',
    title: 'Agent-as-a-Service',
    desc: 'Domain-specific agents deployed as managed services.',
    items: ['Customer support agents with RAG + escalation logic', 'Healthcare intake, report analysis, triage agents', 'HR knowledge base and onboarding automation', 'Research synthesis agents for document-heavy workflows'],
  },
  {
    icon: '◆',
    title: 'AI Deployment',
    desc: 'We don\'t stop at the model. We ship it.',
    items: ['Azure Container Apps, AWS SageMaker, GCP Vertex AI', 'FastAPI backends, Docker containerization, GitHub Actions CI/CD', 'Production monitoring, confidence scoring, hallucination checks', 'DPDP Act 2023 and enterprise compliance-ready architecture'],
  },
]

function Services() {
  return (
    <section id="services" style={{ padding: '8rem 2.5rem', background: 'var(--bg2)' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ marginBottom: '4rem' }}>
          <div className="section-label" style={{ marginBottom: '1.5rem' }}>What We Build</div>
          <h2 style={{
            fontFamily: 'Syne, sans-serif', fontWeight: 700,
            fontSize: 'clamp(2rem, 4vw, 3.2rem)',
            lineHeight: 1.1, color: 'var(--text)',
            maxWidth: '520px',
          }}>
            Five capability areas.<br />One delivery standard.
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1px',
          background: 'var(--border)',
        }}>
          {SERVICES.map((s, i) => (
            <div key={i} className="card-hover" style={{
              background: 'var(--bg2)',
              padding: '2.5rem 2rem',
              borderBottom: i < SERVICES.length - 1 ? '1px solid var(--border)' : 'none',
              cursor: 'default',
            }}>
              <div style={{
                fontFamily: 'Syne, sans-serif',
                fontSize: '1.5rem', color: 'var(--amber)',
                marginBottom: '1rem',
              }}>{s.icon}</div>
              <h3 style={{
                fontFamily: 'Syne, sans-serif', fontWeight: 700,
                fontSize: '1.1rem', color: 'var(--text)',
                marginBottom: '0.5rem',
              }}>{s.title}</h3>
              <p style={{
                fontFamily: 'Inter, sans-serif', fontSize: '13px',
                color: 'var(--text-2)', marginBottom: '1.2rem', lineHeight: 1.6,
              }}>{s.desc}</p>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {s.items.map((item, j) => (
                  <li key={j} style={{
                    fontFamily: 'Inter, sans-serif', fontSize: '12.5px',
                    color: 'var(--text-3)', marginBottom: '0.4rem',
                    paddingLeft: '1rem', position: 'relative',
                    lineHeight: 1.5,
                  }}>
                    <span style={{
                      position: 'absolute', left: 0,
                      color: 'var(--amber)', fontSize: '10px', top: '3px',
                    }}>›</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Featured Work ────────────────────────────────────────────────────────────
function Work() {
  return (
    <section id="work" style={{ padding: '8rem 2.5rem', background: 'var(--bg)' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ marginBottom: '4rem' }}>
          <div className="section-label" style={{ marginBottom: '1.5rem' }}>Featured Work</div>
          <h2 style={{
            fontFamily: 'Syne, sans-serif', fontWeight: 700,
            fontSize: 'clamp(2rem, 4vw, 3.2rem)',
            lineHeight: 1.1, color: 'var(--text)',
          }}>
            Shipped, not demoed.
          </h2>
          <p style={{
            fontFamily: 'Inter, sans-serif', fontSize: '14px',
            color: 'var(--text-2)', maxWidth: '500px',
            lineHeight: 1.75, marginTop: '1rem',
          }}>
            Both of these are live in the real world — one serving real patients, one
            filed as a patent and submitted to IEEE.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.5rem' }}>
          {/* Flagship: Anbu Health AI */}
          <div style={{
            background: 'var(--bg2)',
            border: '1px solid var(--border)',
            padding: '2.5rem',
            position: 'relative',
            overflow: 'hidden',
          }}>
            {/* Amber accent line */}
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0,
              height: '2px',
              background: 'linear-gradient(90deg, var(--amber) 0%, transparent 100%)',
            }} />

            <div style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '10px', letterSpacing: '0.18em',
              color: 'var(--amber)', marginBottom: '1.5rem',
              display: 'flex', alignItems: 'center', gap: '0.75rem',
            }}>
              <span style={{
                background: 'rgba(245,166,35,0.15)',
                border: '1px solid rgba(245,166,35,0.3)',
                padding: '2px 8px', fontSize: '9px',
              }}>LIVE IN PRODUCTION</span>
              FLAGSHIP PROJECT
            </div>

            <h3 style={{
              fontFamily: 'Syne, sans-serif', fontWeight: 700,
              fontSize: '1.6rem', color: 'var(--text)',
              marginBottom: '1rem', lineHeight: 1.1,
            }}>Anbu Health AI</h3>

            <p style={{
              fontFamily: 'Inter, sans-serif', fontSize: '13.5px',
              color: 'var(--text-2)', lineHeight: 1.75, marginBottom: '1.5rem',
            }}>
              A bilingual (Tamil/English) medical AI assistant that analyzes lab reports,
              diagnostic scans, and medicine photos for real patients — deployed to a paying
              client at anbuclinic.me.
            </p>

            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '10px', letterSpacing: '0.12em',
                color: 'var(--text-3)', marginBottom: '0.6rem',
              }}>ARCHITECTURE</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {['React', 'FastAPI', 'Azure Container Apps', 'Groq + GPT-4o Vision', 'Qdrant RAG', 'Firebase OTP', 'DPDP Act 2023'].map(t => (
                  <span key={t} style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '10px', letterSpacing: '0.05em',
                    color: 'var(--text-3)',
                    background: 'var(--bg3)',
                    border: '1px solid var(--border)',
                    padding: '2px 8px',
                  }}>{t}</span>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <div style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '10px', letterSpacing: '0.12em',
                color: 'var(--text-3)', marginBottom: '0.6rem',
              }}>WHAT WE BUILT</div>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {[
                  '5-stage reasoning pipeline (routing → RAG → LLM → confidence → hallucination check)',
                  'Multimodal input — text, scan images, medicine photos',
                  'Full-stack: frontend, backend, AI pipeline, cloud infra',
                ].map((item, i) => (
                  <li key={i} style={{
                    fontFamily: 'Inter, sans-serif', fontSize: '12.5px',
                    color: 'var(--text-2)', marginBottom: '0.5rem',
                    paddingLeft: '1rem', position: 'relative', lineHeight: 1.5,
                  }}>
                    <span style={{ position: 'absolute', left: 0, color: 'var(--amber)', fontSize: '10px', top: '2px' }}>›</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <a href="https://anbuclinic.me" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
              View Live Product →
            </a>
          </div>

          {/* Antahkarana Framework */}
          <div style={{
            background: 'var(--bg2)',
            border: '1px solid var(--border)',
            padding: '2.5rem',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0,
              height: '2px',
              background: 'linear-gradient(90deg, rgba(245,166,35,0.4) 0%, transparent 100%)',
            }} />

            <div style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '10px', letterSpacing: '0.18em',
              color: 'var(--text-3)', marginBottom: '1.5rem',
              display: 'flex', alignItems: 'center', gap: '0.75rem',
            }}>
              <span style={{
                background: 'rgba(139,149,168,0.10)',
                border: '1px solid rgba(139,149,168,0.2)',
                padding: '2px 8px', fontSize: '9px', color: 'var(--text-2)',
              }}>PATENT FILED · IEEE SUBMITTED</span>
              R&amp;D / FRAMEWORK
            </div>

            <h3 style={{
              fontFamily: 'Syne, sans-serif', fontWeight: 700,
              fontSize: '1.6rem', color: 'var(--text)',
              marginBottom: '1rem', lineHeight: 1.1,
            }}>Antahkarana<br />Reasoning Framework</h3>

            <p style={{
              fontFamily: 'Inter, sans-serif', fontSize: '13.5px',
              color: 'var(--text-2)', lineHeight: 1.75, marginBottom: '1.5rem',
            }}>
              A cognitively-inspired 5-stage reasoning architecture for LLMs and VLMs —
              built on Vedantic cognitive theory, validated on 2,500+ multimodal samples,
              and powering Anbu Health AI in production.
            </p>

            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '10px', letterSpacing: '0.12em',
                color: 'var(--text-3)', marginBottom: '0.8rem',
              }}>THE 5 STAGES</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {[
                  { name: 'Manas', role: 'Perception & Sensory Input' },
                  { name: 'Chitta', role: 'Memory & Retrieval (RAG)' },
                  { name: 'Buddhi', role: 'Discrimination & Reasoning' },
                  { name: 'Ahamkara', role: 'Integration & Response Synthesis' },
                  { name: 'Sakshi', role: 'Confidence & Hallucination Check' },
                ].map((stage, i) => (
                  <div key={i} style={{
                    display: 'flex', gap: '0.75rem', alignItems: 'baseline',
                  }}>
                    <span style={{
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '10px', color: 'var(--amber)',
                      minWidth: '70px',
                    }}>{stage.name}</span>
                    <span style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '12px', color: 'var(--text-3)',
                    }}>{stage.role}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {['Transformers', 'BLIP-3', 'Qwen', 'LangChain', 'FAISS', 'Qdrant'].map(t => (
                  <span key={t} style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '10px',
                    color: 'var(--text-3)',
                    background: 'var(--bg3)',
                    border: '1px solid var(--border)',
                    padding: '2px 8px',
                  }}>{t}</span>
                ))}
              </div>
            </div>

            <div style={{
              background: 'var(--bg3)',
              border: '1px solid var(--border)',
              padding: '1rem',
              fontFamily: 'Inter, sans-serif',
              fontSize: '12.5px',
              color: 'var(--text-2)',
              lineHeight: 1.6,
            }}>
              <span style={{ color: 'var(--amber)', fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', letterSpacing: '0.1em' }}>
                APP NO. 202641043947
              </span>
              <br />Indian Patent Filed · Apr 2026 · IEEE Paper Google Scholar Indexed
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── About ───────────────────────────────────────────────────────────────────
function About() {
  return (
    <section id="about" style={{ padding: '8rem 2.5rem', background: 'var(--bg2)' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ marginBottom: '4rem' }}>
          <div className="section-label" style={{ marginBottom: '1.5rem' }}>About AI Vision Labs</div>
          <h2 style={{
            fontFamily: 'Syne, sans-serif', fontWeight: 700,
            fontSize: 'clamp(2rem, 4vw, 3.2rem)',
            lineHeight: 1.1, color: 'var(--text)',
            maxWidth: '600px',
          }}>
            An independent AI lab<br />built on shipped work.
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem' }}>
          {/* Story */}
          <div>
            <p style={{
              fontFamily: 'Inter, sans-serif', fontSize: '14.5px',
              color: 'var(--text-2)', lineHeight: 1.85, marginBottom: '1.5rem',
            }}>
              AI Vision Labs was founded to close the gap between AI research and production
              deployment. Too many organisations get impressive demos that never make it to real users.
              We build things that ship — with proper infra, compliance-ready architecture, and
              hallucination controls built in from day one.
            </p>
            <p style={{
              fontFamily: 'Inter, sans-serif', fontSize: '14.5px',
              color: 'var(--text-2)', lineHeight: 1.85, marginBottom: '1.5rem',
            }}>
              Founded in Chennai, we're available for select engagements globally — AI/ML
              development contracts, LLM integration projects, and agentic system builds.
              We take on work where the bar is real-world outcomes, not just model accuracy.
            </p>
            <p style={{
              fontFamily: 'Inter, sans-serif', fontSize: '14.5px',
              color: 'var(--text-2)', lineHeight: 1.85,
            }}>
              Our reasoning framework, Antahkarana, is an original R&amp;D contribution —
              patent filed, IEEE paper submitted — available as the cognitive backbone for
              complex reasoning tasks requiring multi-stage validation.
            </p>
          </div>

          {/* Right side: Team + Registration */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Registration */}
            <div style={{
              background: 'var(--bg3)',
              border: '1px solid var(--border)',
              padding: '1.5rem',
            }}>
              <div className="section-label" style={{ marginBottom: '1rem' }}>Company Registration</div>
              <div style={{
                fontFamily: 'Syne, sans-serif', fontWeight: 600,
                fontSize: '1rem', color: 'var(--text)', marginBottom: '0.4rem',
              }}>AI Vision Labs</div>
              <div style={{
                fontFamily: 'JetBrains Mono, monospace', fontSize: '11px',
                color: 'var(--text-3)', lineHeight: 1.8,
              }}>
                MSME Registered · India<br />
                Udyam Reg. No. UDYAM-TN-02-0483528<br />
                Chennai, Tamil Nadu
              </div>
            </div>

            {/* Team */}
            <div style={{
              background: 'var(--bg3)',
              border: '1px solid var(--border)',
              padding: '1.5rem',
            }}>
              <div className="section-label" style={{ marginBottom: '1.25rem' }}>Leadership</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {[
                  {
                    name: 'Prabhakaran',
                    role: 'Chief Executive Officer',
                    detail: 'Leading the company\'s strategic direction and client engagements.',
                  },
                  {
                    name: 'Rajaganapathy M',
                    role: 'Founder · AI/ML Engineer',
                    detail: 'M.Tech AI (SRM, 9.6 CGPA) · Patent filed · IEEE · 2+ years independent AI work · AWS Certified.',
                  },
                ].map(p => (
                  <div key={p.name} style={{
                    paddingBottom: '1.25rem',
                    borderBottom: '1px solid var(--border)',
                  }}>
                    <div style={{
                      fontFamily: 'Syne, sans-serif', fontWeight: 600,
                      fontSize: '1rem', color: 'var(--text)', marginBottom: '2px',
                    }}>{p.name}</div>
                    <div style={{
                      fontFamily: 'JetBrains Mono, monospace', fontSize: '10px',
                      letterSpacing: '0.1em', color: 'var(--amber)',
                      marginBottom: '0.4rem',
                    }}>{p.role}</div>
                    <div style={{
                      fontFamily: 'Inter, sans-serif', fontSize: '12.5px',
                      color: 'var(--text-3)', lineHeight: 1.6,
                    }}>{p.detail}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Credentials summary */}
            <div style={{
              background: 'var(--bg3)',
              border: '1px solid var(--border)',
              padding: '1.5rem',
            }}>
              <div className="section-label" style={{ marginBottom: '1rem' }}>Credentials</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {[
                  'AWS Solutions Architect Associate',
                  'Azure · GCP · Docker · CI/CD',
                  'M.Tech AI — SRM Institute (CGPA 9.6/10)',
                  'IITM Pravartak AI/ML Program',
                  'Kaggle AI Agents Intensive (Google)',
                  'NPTEL Top 5% — IoT (86%)',
                ].map((c, i) => (
                  <div key={i} style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '11px', color: 'var(--text-3)',
                    display: 'flex', alignItems: 'center', gap: '0.5rem',
                  }}>
                    <span style={{ color: 'var(--amber)', fontSize: '10px' }}>›</span>
                    {c}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Contact ──────────────────────────────────────────────────────────────────
function Contact() {
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' })
  const [status, setStatus] = useState(null) // null | 'sending' | 'sent' | 'error'

  function handleChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    // Mailto fallback — replace with Vercel serverless function for production
    const subject = encodeURIComponent(`Project Inquiry from ${form.name}${form.company ? ` (${form.company})` : ''}`)
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\nCompany: ${form.company}\n\n${form.message}`)
    window.location.href = `mailto:contact@aivisionlabs.tech?subject=${subject}&body=${body}`
    setStatus('sent')
  }

  return (
    <section id="contact" style={{ padding: '8rem 2.5rem', background: 'var(--bg)' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ marginBottom: '4rem' }}>
          <div className="section-label" style={{ marginBottom: '1.5rem' }}>Get in Touch</div>
          <h2 style={{
            fontFamily: 'Syne, sans-serif', fontWeight: 700,
            fontSize: 'clamp(2rem, 4vw, 3.2rem)',
            lineHeight: 1.1, color: 'var(--text)',
            maxWidth: '580px',
          }}>
            Available for select<br />
            <span style={{ color: 'var(--amber)' }}>project engagements.</span>
          </h2>
          <p style={{
            fontFamily: 'Inter, sans-serif', fontSize: '14px',
            color: 'var(--text-2)', maxWidth: '480px',
            lineHeight: 1.75, marginTop: '1.25rem',
          }}>
            If you have a real AI problem that needs a production solution,
            tell us about it. We respond within 24 hours.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem' }}>
          {/* Form */}
          <div>
            {status === 'sent' ? (
              <div style={{
                background: 'rgba(245,166,35,0.08)',
                border: '1px solid rgba(245,166,35,0.25)',
                padding: '2rem',
                textAlign: 'center',
              }}>
                <div style={{
                  fontFamily: 'Syne, sans-serif', fontWeight: 700,
                  fontSize: '1.2rem', color: 'var(--amber)', marginBottom: '0.5rem',
                }}>Your email client is open.</div>
                <div style={{
                  fontFamily: 'Inter, sans-serif', fontSize: '13px',
                  color: 'var(--text-2)',
                }}>Send the email to reach us at contact@aivisionlabs.tech</div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label className="form-label">NAME</label>
                    <input className="form-input" type="text" name="name" required
                      value={form.name} onChange={handleChange} placeholder="Yours" />
                  </div>
                  <div>
                    <label className="form-label">COMPANY</label>
                    <input className="form-input" type="text" name="company"
                      value={form.company} onChange={handleChange} placeholder="Optional" />
                  </div>
                </div>
                <div>
                  <label className="form-label">EMAIL</label>
                  <input className="form-input" type="email" name="email" required
                    value={form.email} onChange={handleChange} placeholder="you@company.com" />
                </div>
                <div>
                  <label className="form-label">TELL US ABOUT YOUR PROJECT</label>
                  <textarea className="form-input" name="message" required rows={5}
                    value={form.message} onChange={handleChange}
                    placeholder="What are you building? What's the problem AI needs to solve?"
                    style={{ resize: 'vertical', minHeight: '120px' }} />
                </div>
                <button type="submit" className="btn-primary" style={{ justifyContent: 'center' }}>
                  Send Inquiry →
                </button>
              </form>
            )}
          </div>

          {/* Direct contact */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', paddingTop: '0.5rem' }}>
            <div>
              <div className="section-label" style={{ marginBottom: '1rem' }}>Direct</div>
              <a href="mailto:contact@aivisionlabs.tech" style={{
                fontFamily: 'Syne, sans-serif', fontWeight: 600,
                fontSize: '1rem', color: 'var(--text)',
                textDecoration: 'none', display: 'block', marginBottom: '0.25rem',
                transition: 'color 0.15s',
              }}
              onMouseEnter={e => e.target.style.color = 'var(--amber)'}
              onMouseLeave={e => e.target.style.color = 'var(--text)'}
              >contact@aivisionlabs.tech</a>
              <div style={{
                fontFamily: 'JetBrains Mono, monospace', fontSize: '11px',
                color: 'var(--text-3)',
              }}>Business inquiries only</div>
            </div>

            <div>
              <div className="section-label" style={{ marginBottom: '1rem' }}>Connect</div>
              <a
                href="https://linkedin.com/in/raja-ganapathy-36b00658"
                target="_blank" rel="noopener noreferrer"
                style={{
                  fontFamily: 'Inter, sans-serif', fontSize: '13.5px',
                  color: 'var(--text-2)', textDecoration: 'none',
                  display: 'flex', alignItems: 'center', gap: '0.5rem',
                  transition: 'color 0.15s',
                }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--amber)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--text-2)'}
              >
                LinkedIn → AI Vision Labs / Rajaganapathy M
              </a>
            </div>

            <div>
              <div className="section-label" style={{ marginBottom: '1rem' }}>Models & Research</div>
              <a href="https://huggingface.co/RajGana" target="_blank" rel="noopener noreferrer"
                style={{
                  fontFamily: 'Inter, sans-serif', fontSize: '13.5px',
                  color: 'var(--text-2)', textDecoration: 'none', display: 'block',
                  transition: 'color 0.15s',
                }}
                onMouseEnter={e => e.target.style.color = 'var(--amber)'}
                onMouseLeave={e => e.target.style.color = 'var(--text-2)'}
              >
                huggingface.co/RajGana →
              </a>
              <div style={{
                fontFamily: 'JetBrains Mono, monospace', fontSize: '11px',
                color: 'var(--text-3)', marginTop: '0.25rem',
              }}>3 live fine-tuned models</div>
            </div>

            <div style={{
              background: 'var(--bg2)',
              border: '1px solid var(--border)',
              padding: '1.25rem',
            }}>
              <div style={{
                fontFamily: 'JetBrains Mono, monospace', fontSize: '10px',
                letterSpacing: '0.12em', color: 'var(--amber)', marginBottom: '0.5rem',
              }}>RESPONSE TIME</div>
              <div style={{
                fontFamily: 'Inter, sans-serif', fontSize: '13px', color: 'var(--text-2)',
              }}>We respond to all project inquiries within 24 hours. Serious work only.</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{
      padding: '3rem 2.5rem',
      background: 'var(--bg2)',
      borderTop: '1px solid var(--border)',
    }}>
      <div style={{
        maxWidth: '1100px', margin: '0 auto',
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem',
      }}>
        <Logo size={24} />
        <div style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '10px', letterSpacing: '0.1em',
          color: 'var(--text-3)',
        }}>
          © {new Date().getFullYear()} AI Vision Labs · UDYAM-TN-02-0483528 · Chennai, India
        </div>
        <div style={{ display: 'flex', gap: '2rem' }}>
          {['#services', '#work', '#about', '#contact'].map(href => (
            <a key={href} href={href} style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '10px', letterSpacing: '0.1em',
              color: 'var(--text-3)', textDecoration: 'none',
              transition: 'color 0.15s',
            }}
            onMouseEnter={e => e.target.style.color = 'var(--text-2)'}
            onMouseLeave={e => e.target.style.color = 'var(--text-3)'}
            >{href.replace('#', '')}</a>
          ))}
        </div>
      </div>
    </footer>
  )
}

// ─── App ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <Nav scrolled={scrolled} />
      <main>
        <Hero />
        <div className="divider" />
        <Services />
        <div className="divider" />
        <Work />
        <div className="divider" />
        <About />
        <div className="divider" />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
