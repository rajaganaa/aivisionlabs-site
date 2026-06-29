import React, { useState, useEffect, useRef, useCallback } from 'react'

/* ═══════════════════════════════════════════════════════════════════════════
   CONSTANTS & DATA
═══════════════════════════════════════════════════════════════════════════ */
const NAV_LINKS = [
  { label:'Services',    href:'#services' },
  { label:'Products',    href:'#products' },
  { label:'Work',        href:'#work' },
  { label:'Research',    href:'#research' },
  { label:'About',       href:'#about' },
  { label:'Contact',     href:'#contact' },
]

const SERVICES = [
  {
    icon:'◈', span:'col2',
    title:'LLM & Generative AI',
    desc:'Language models that work reliably at production scale.',
    bullets:['RAG pipelines with FAISS & Qdrant','LLM fine-tuning via QLoRA/PEFT','Bilingual AI assistants (Tamil/English)','Document Q&A and report analysis'],
  },
  {
    icon:'◎', span:'row2',
    title:'Agentic AI',
    desc:'Autonomous systems that plan, act, and iterate.',
    bullets:['Multi-agent orchestration','Spec-driven agents with memory','Tool-calling workflows','Antahkarana 5-stage reasoning'],
    badge:{ label:'PATENT FILED', body:'App No. 202641043947 · IEEE' },
  },
  {
    icon:'⬡', span:'normal',
    title:'AI/ML Development',
    desc:'Custom ML from data pipeline to production API.',
    bullets:['Computer vision pipelines','NLP & document intelligence'],
  },
  {
    icon:'▣', span:'normal',
    title:'Agent-as-a-Service',
    desc:'Domain agents deployed as managed services.',
    bullets:['Healthcare intake agents','HR knowledge automation'],
  },
  {
    icon:'◆', span:'col2',
    title:'AI Deployment & MLOps',
    desc:"We don't stop at the model — we ship, monitor, and maintain.",
    tags:['Azure','AWS SageMaker','GCP Vertex AI','FastAPI','Docker','CI/CD','DPDP 2023'],
  },
]

const INDUSTRIES = [
  { icon:'🏥', name:'Healthcare', desc:'Lab report analysis, triage agents, bilingual patient AI. Live: Anbu Health AI at anbuclinic.me.' },
  { icon:'🏦', name:'Finance',    desc:'Document intelligence, risk scoring pipelines, compliance-aware LLM workflows.' },
  { icon:'🏭', name:'Manufacturing', desc:'Predictive maintenance, visual inspection CV, IoT sensor analytics.' },
  { icon:'🎓', name:'Education', desc:'Adaptive tutoring agents, assessment generation, multilingual knowledge bases.' },
  { icon:'🛒', name:'Retail',    desc:'Customer support agents, product recommendation RAG, sentiment NLP.' },
  { icon:'🔬', name:'Research',  desc:'Literature synthesis agents, multimodal data analysis, experiment logging.' },
]

const AI_CAPS = [
  { abbr:'LLMs',   name:'Large Language Models', desc:'Fine-tuning, RAG, QLoRA, PEFT — production-grade.' },
  { abbr:'Agents', name:'Agentic Systems',       desc:'Multi-agent orchestration, tool-calling, memory.' },
  { abbr:'CV',     name:'Computer Vision',       desc:'BLIP-3, ViT, CLIP — image & scan analysis.' },
  { abbr:'NLP',    name:'Natural Language',      desc:'Classification, extraction, sentiment, spaCy.' },
  { abbr:'VLMs',   name:'Vision-Language',       desc:'Multimodal reasoning across text + image.' },
  { abbr:'MLOps',  name:'ML Operations',         desc:'SageMaker, Docker, GitHub Actions, monitoring.' },
]

const STACK = [
  'PyTorch','TensorFlow','LangChain','HuggingFace',
  'Qdrant','FAISS','FastAPI','React',
  'Azure Container Apps','AWS SageMaker','GCP Vertex AI',
  'Docker','GitHub Actions','Groq','GPT-4o Vision',
  'QLoRA / PEFT','BLIP-3','Qwen','CodeLlama',
  'Firebase','Supabase','PostgreSQL','MongoDB',
]

const PROCESS = [
  { n:'01', title:'Discovery',     desc:'We understand your domain, data, constraints, and the real problem — not the assumed one.' },
  { n:'02', title:'Architecture',  desc:'We design the pipeline before writing a line of code. RAG strategy, agent topology, infra plan.' },
  { n:'03', title:'Build & Tune',  desc:'Rapid iteration with domain validation at every step — not benchmark chasing.' },
  { n:'04', title:'Deploy',        desc:'Production on Azure / AWS / GCP — containerised, monitored, compliant from day one.' },
  { n:'05', title:'Maintain',      desc:'Ongoing reliability: confidence scoring, hallucination checks, retraining triggers.' },
]

const WHY_US = [
  { icon:'🚀', title:'Shipped, not demoed',    desc:'Every claim is backed by a live production deployment — Anbu Health AI is live today at anbuclinic.me.' },
  { icon:'🧠', title:'Original R&D',           desc:'Antahkarana is our own reasoning framework — patent filed, IEEE paper, not borrowed methodology.' },
  { icon:'🔒', title:'Compliance-first',        desc:'DPDP Act 2023, Firebase OTP, HIPAA-aware design — built into architecture, not bolted on.' },
  { icon:'🌐', title:'Multilingual by default', desc:'Tamil + English bilingual AI proven in production. Other Indic languages on request.' },
  { icon:'📦', title:'Full-stack delivery',     desc:'One team: frontend, backend, AI pipeline, cloud infra, monitoring. No hand-off gaps.' },
  { icon:'⚡', title:'Fast to production',      desc:'We\'ve gone from brief to live Azure deployment in weeks — not quarters.' },
]

const FAQS = [
  { q:'How quickly can we start?',           a:'We are an immediate joiner. Discovery calls can happen within 48 hours and first deliverables within weeks.' },
  { q:'Do you sign NDAs?',                   a:'Yes. We sign NDAs before any sensitive information is shared. IP stays with the client unless negotiated otherwise.' },
  { q:'What industries do you serve?',       a:'Healthcare, finance, manufacturing, education, retail, and research. See our Solutions by Industry section.' },
  { q:'Can you work with our existing data?',a:'Yes. We build pipelines around your existing databases, documents, and APIs — no requirement to migrate.' },
  { q:'What is the Antahkarana framework?',  a:'Our proprietary 5-stage LLM reasoning architecture inspired by Vedantic cognitive theory. Patent filed Apr 2026, IEEE paper submitted.' },
  { q:'Do you offer retainers?',            a:'Yes — ongoing model maintenance, RAG updates, monitoring, and feature additions are available as monthly retainers.' },
]

const TEAM = [
  {
    name:'Prabhakaran',
    role:'Chief Executive Officer',
    bio:'Leading AI Vision Labs\' strategic direction, client engagements, and business development.',
    initials:'P',
  },
  {
    name:'Rajaganapathy M',
    role:'Founder · AI/ML Engineer',
    bio:'M.Tech AI, SRM (9.6/10). 2+ years independent AI engineering. AWS Certified. Patent filed. IEEE paper. 3 live HuggingFace models.',
    initials:'R',
    links:{ hf:'https://huggingface.co/RajGana', gh:'https://github.com/rajaganaa', li:'https://linkedin.com/in/raja-ganapathy-36b00658' },
  },
]

const STATS = [
  { n:'1',      label:'Live production\nclient' },
  { n:'1',      label:'Patent filed\nApr 2026' },
  { n:'5-stage',label:'Antahkarana\nreasoning' },
  { n:'3',      label:'Live HuggingFace\nmodels' },
  { n:'2+',     label:'Years independent\nAI engineering' },
  { n:'9.6',    label:'CGPA — M.Tech AI\nSRM Institute' },
]

/* ═══════════════════════════════════════════════════════════════════════════
   SHARED COMPONENTS
═══════════════════════════════════════════════════════════════════════════ */
function LogoMark({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="lg" x1="0" y1="0" x2="28" y2="28" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#C8720A"/>
          <stop offset="100%" stopColor="#964A08"/>
        </linearGradient>
      </defs>
      <rect width="28" height="28" rx="6" fill="url(#lg)"/>
      <ellipse cx="14" cy="14" rx="8.5" ry="5.5" stroke="rgba(0,0,0,0.42)" strokeWidth="1.1" fill="none"/>
      <circle cx="14" cy="14" r="3" fill="rgba(0,0,0,0.38)"/>
      <circle cx="14" cy="14" r="1.3" fill="rgba(255,255,255,0.72)"/>
      <line x1="14" y1="9.5" x2="14" y2="18.5" stroke="rgba(255,255,255,0.22)" strokeWidth="0.6"/>
      <line x1="9.5" y1="14" x2="18.5" y2="14" stroke="rgba(255,255,255,0.22)" strokeWidth="0.6"/>
    </svg>
  )
}

function Logo({ dark = false, size = 28 }) {
  return (
    <a href="#top" style={{ display:'flex', alignItems:'center', gap:9, textDecoration:'none' }}>
      <LogoMark size={size}/>
      <span style={{
        fontFamily:'var(--f-sans)', fontWeight:600, fontSize:14.5,
        letterSpacing:'-.01em', lineHeight:1,
        color: dark ? 'var(--d-text)' : 'var(--ink)',
      }}>
        AI<span style={{ color:'var(--clay)' }}>Vision</span> Labs
      </span>
    </a>
  )
}

function SectionBadge({ children, dark = false }) {
  return <div className={dark ? 'eyebrow-dark' : 'eyebrow'}>{children}</div>
}

/* ═══════════════════════════════════════════════════════════════════════════
   NAV
═══════════════════════════════════════════════════════════════════════════ */
function Nav({ scrolled, darkMode, setDarkMode }) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      <nav style={{
        position:'fixed', top:0, left:0, right:0, height:'var(--nav-h)',
        display:'flex', alignItems:'center', justifyContent:'space-between',
        padding:'0 clamp(16px,4vw,48px)',
        background: scrolled ? (darkMode ? 'rgba(17,17,16,0.95)' : 'rgba(247,244,239,0.94)') : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        transition:'all .3s ease', zIndex:1000,
      }}>
        <Logo dark={darkMode}/>

        {/* Desktop links */}
        <ul className="nav-desktop" style={{ display:'flex', gap:26, listStyle:'none' }}>
          {NAV_LINKS.map(l => (
            <li key={l.href}>
              <a href={l.href} style={{
                fontFamily:'var(--f-sans)', fontSize:13, fontWeight:400,
                color:'var(--ink2)', textDecoration:'none', transition:'color .15s',
              }}
                onMouseEnter={e => e.target.style.color='var(--ink)'}
                onMouseLeave={e => e.target.style.color='var(--ink2)'}
              >{l.label}</a>
            </li>
          ))}
        </ul>

        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          {/* Dark mode toggle */}
          <button
            onClick={() => setDarkMode(d => !d)}
            aria-label="Toggle dark mode"
            style={{
              width:36, height:36, borderRadius:'50%', border:'1px solid var(--border-m)',
              background:'transparent', cursor:'pointer', display:'flex',
              alignItems:'center', justifyContent:'center', fontSize:15,
              color:'var(--ink2)', transition:'all .2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background='var(--bg3)'; e.currentTarget.style.color='var(--ink)' }}
            onMouseLeave={e => { e.currentTarget.style.background='transparent'; e.currentTarget.style.color='var(--ink2)' }}
          >
            {darkMode ? '☀' : '☾'}
          </button>

          <a href="#contact" className="btn btn-clay" style={{ fontSize:12, padding:'8px 16px' }}>
            Book a Demo →
          </a>

          {/* Mobile hamburger */}
          <button className="nav-mobile-menu-btn"
            onClick={() => setMobileOpen(o => !o)}
            style={{
              display:'none', width:36, height:36, border:'1px solid var(--border-m)',
              background:'transparent', borderRadius:7, cursor:'pointer',
              alignItems:'center', justifyContent:'center', fontSize:18, color:'var(--ink2)',
            }}
          >{mobileOpen ? '✕' : '☰'}</button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div style={{
          position:'fixed', top:'var(--nav-h)', left:0, right:0, bottom:0,
          background: darkMode ? 'var(--bg-dark)' : 'var(--bg)',
          zIndex:999, padding:'24px 24px',
          display:'flex', flexDirection:'column', gap:4,
        }}>
          {NAV_LINKS.map(l => (
            <a key={l.href} href={l.href}
              onClick={() => setMobileOpen(false)}
              style={{
                fontFamily:'var(--f-sans)', fontSize:18, fontWeight:500,
                color:'var(--ink)', textDecoration:'none', padding:'14px 0',
                borderBottom:'1px solid var(--border)',
              }}
            >{l.label}</a>
          ))}
          <a href="#contact" className="btn btn-clay" style={{ marginTop:24, justifyContent:'center' }}
            onClick={() => setMobileOpen(false)}>Book a Demo →</a>
        </div>
      )}
    </>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   HERO
═══════════════════════════════════════════════════════════════════════════ */
function Hero() {
  return (
    <section id="top" style={{
      minHeight:'100vh', display:'flex', flexDirection:'column', justifyContent:'center',
      padding:'calc(var(--nav-h) + 5rem) clamp(20px,5vw,60px) 5rem',
      background:'var(--bg)', position:'relative', overflow:'hidden',
    }}>
      {/* Warm glow */}
      <div style={{
        position:'absolute', top:'-10%', right:'-8%',
        width:600, height:600, borderRadius:'50%',
        background:'radial-gradient(circle, rgba(168,82,42,0.07) 0%, transparent 65%)',
        pointerEvents:'none',
      }}/>
      <div style={{
        position:'absolute', bottom:'-5%', left:'-5%',
        width:400, height:400, borderRadius:'50%',
        background:'radial-gradient(circle, rgba(168,82,42,0.04) 0%, transparent 65%)',
        pointerEvents:'none',
      }}/>

      <div style={{ maxWidth:720, position:'relative', zIndex:2 }}>
        {/* Eyebrow badge */}
        <div style={{
          display:'inline-flex', alignItems:'center', gap:8,
          background:'var(--clay-l)', border:'1px solid var(--clay-b)',
          padding:'5px 13px', borderRadius:20,
          fontFamily:'var(--f-mono)', fontSize:10, letterSpacing:'.14em', color:'var(--clay)',
          marginBottom:32,
          animation:'fadeUp .7s .05s cubic-bezier(.16,1,.3,1) both',
        }}>
          <span style={{ width:6,height:6,borderRadius:'50%',background:'var(--clay)',flexShrink:0 }}/>
          MSME REGISTERED · UDYAM-TN-02-0483528 · CHENNAI
        </div>

        {/* Headline */}
        <h1 style={{
          fontFamily:'var(--f-serif)', fontWeight:500,
          fontSize:'clamp(2.6rem,7.5vw,5.8rem)',
          lineHeight:1.04, letterSpacing:'-.028em', color:'var(--ink)',
          marginBottom:12,
          animation:'fadeUp .85s .14s cubic-bezier(.16,1,.3,1) both',
        }}>
          AI for Every Home.<br/>
          <em style={{ fontStyle:'italic', color:'var(--clay)' }}>Intelligence</em><br/>
          for Every Hand.
        </h1>

        {/* Sub */}
        <p style={{
          fontFamily:'var(--f-sans)', fontSize:'clamp(15px,1.8vw,18px)',
          fontWeight:300, color:'var(--ink2)', lineHeight:1.8,
          maxWidth:540, marginBottom:40,
          animation:'fadeUp .75s .28s cubic-bezier(.16,1,.3,1) both',
        }}>
          AI Vision Labs builds production-grade AI systems — LLM pipelines,
          agentic AI, and RAG architectures — for clients who need results,
          not prototypes. Democratising intelligence, one deployment at a time.
        </p>

        {/* CTAs */}
        <div style={{
          display:'flex', gap:12, flexWrap:'wrap',
          animation:'fadeUp .7s .42s cubic-bezier(.16,1,.3,1) both',
        }}>
          <a href="#work" className="btn btn-ink">See our work →</a>
          <a href="#contact" className="btn btn-clay">Book a free demo</a>
          <a href="#services" className="btn btn-ghost">Explore services</a>
        </div>

        {/* Quick trust bar */}
        <div style={{
          display:'flex', gap:'2rem', flexWrap:'wrap',
          marginTop:48, paddingTop:32, borderTop:'1px solid var(--border)',
          animation:'fadeUp .7s .55s cubic-bezier(.16,1,.3,1) both',
        }}>
          {[
            { n:'1', l:'Live production client' },
            { n:'1', l:'Patent filed' },
            { n:'3', l:'HuggingFace models' },
          ].map(s => (
            <div key={s.l}>
              <div style={{ fontFamily:'var(--f-serif)', fontWeight:400, fontSize:'2rem', color:'var(--clay)', lineHeight:1 }}>{s.n}</div>
              <div style={{ fontFamily:'var(--f-mono)', fontSize:'10px', letterSpacing:'.1em', color:'var(--ink3)', marginTop:3 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   MISSION / VISION
═══════════════════════════════════════════════════════════════════════════ */
function Mission() {
  return (
    <section style={{ padding:'72px clamp(20px,5vw,60px)', background:'var(--bg2)' }}>
      <div className="max-w" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:48 }}>
        <div>
          <SectionBadge>Our Mission</SectionBadge>
          <h2 className="h2" style={{ fontSize:'clamp(1.4rem,2.5vw,2rem)', marginBottom:16 }}>
            Democratise AI for<br/><em>every business, every home</em>.
          </h2>
          <p style={{ fontFamily:'var(--f-sans)', fontSize:14.5, fontWeight:300, color:'var(--ink2)', lineHeight:1.85 }}>
            We believe AI should not be the exclusive domain of billion-dollar corporations.
            Our mission is to make production-grade intelligence accessible — building
            systems that work for a village clinic as readily as a city hospital.
          </p>
        </div>
        <div>
          <SectionBadge>Our Vision</SectionBadge>
          <h2 className="h2" style={{ fontSize:'clamp(1.4rem,2.5vw,2rem)', marginBottom:16 }}>
            An AI layer beneath<br/><em>every meaningful workflow</em>.
          </h2>
          <p style={{ fontFamily:'var(--f-sans)', fontSize:14.5, fontWeight:300, color:'var(--ink2)', lineHeight:1.85 }}>
            By 2030, AI Vision Labs aims to have its reasoning frameworks and agentic
            pipelines embedded in healthcare, education, and civic systems across
            South and Southeast Asia — intelligently, responsibly, multilingually.
          </p>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   STATS BAR
═══════════════════════════════════════════════════════════════════════════ */
function Stats() {
  return (
    <div style={{ background:'var(--ink)' }}>
      <div style={{ maxWidth:'var(--max-w)', margin:'0 auto', display:'grid', gridTemplateColumns:'repeat(6,1fr)' }}>
        {STATS.map((s,i) => (
          <div key={i} style={{
            padding:'28px 16px', textAlign:'center',
            borderRight: i < STATS.length-1 ? '1px solid rgba(231,229,224,.07)' : 'none',
          }}>
            <div style={{
              fontFamily:'var(--f-serif)', fontWeight:400,
              fontSize:'clamp(1.3rem,2.5vw,2rem)', letterSpacing:'-.025em',
              color:'#fff', lineHeight:1, marginBottom:7,
            }}>
              {s.n.includes('stage')
                ? <><span style={{ color:'var(--clay-m)' }}>5</span>‑stage</>
                : <span style={{ color:'var(--clay-m)' }}>{s.n}</span>}
            </div>
            <div style={{
              fontFamily:'var(--f-mono)', fontSize:9, letterSpacing:'.09em',
              color:'rgba(231,229,224,.35)', lineHeight:1.55, whiteSpace:'pre-line',
            }}>{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   SERVICES — BENTO
═══════════════════════════════════════════════════════════════════════════ */
function Services() {
  return (
    <section id="services" className="section" style={{ background:'var(--bg2)' }}>
      <div className="max-w">
        <SectionBadge>Services</SectionBadge>
        <h2 className="h2">Five capabilities,<br/><em>one delivery standard</em>.</h2>
        <p className="lead">We build AI that ships to real users and holds under real conditions.</p>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:10 }}>
          {SERVICES.map((s,i) => (
            <div key={i} className="card" style={{
              gridColumn: s.span==='col2' ? 'span 2' : 'span 1',
              gridRow:    s.span==='row2' ? 'span 2' : 'span 1',
              padding:26, position:'relative', overflow:'hidden',
            }}>
              {(s.span==='col2'||s.span==='row2') && (
                <div style={{ position:'absolute',top:0,left:0,right:0,height:2,background:'linear-gradient(90deg,var(--clay) 0%,transparent 80%)' }}/>
              )}
              <div style={{ width:36,height:36,background:'var(--clay-l)',borderRadius:8,display:'flex',alignItems:'center',justifyContent:'center',fontSize:14,color:'var(--clay)',marginBottom:14 }}>{s.icon}</div>
              <h3 style={{ fontFamily:'var(--f-sans)',fontWeight:600,fontSize:14.5,color:'var(--ink)',marginBottom:6,letterSpacing:'-.01em' }}>{s.title}</h3>
              <p style={{ fontFamily:'var(--f-sans)',fontSize:13,fontWeight:300,color:'var(--ink2)',lineHeight:1.65,marginBottom:s.bullets?14:0 }}>{s.desc}</p>
              {s.bullets && (
                <ul style={{ listStyle:'none',padding:0,display:'flex',flexDirection:'column',gap:5 }}>
                  {s.bullets.map((b,j) => (
                    <li key={j} style={{ fontFamily:'var(--f-sans)',fontSize:12.5,fontWeight:300,color:'var(--ink3)',lineHeight:1.55,paddingLeft:13,position:'relative' }}>
                      <span style={{ position:'absolute',left:0,color:'var(--clay)',fontSize:12 }}>›</span>{b}
                    </li>
                  ))}
                </ul>
              )}
              {s.badge && (
                <div style={{ marginTop:18,padding:'11px 14px',background:'var(--clay-l)',border:'1px solid var(--clay-b)',borderRadius:8 }}>
                  <div style={{ fontFamily:'var(--f-mono)',fontSize:9.5,letterSpacing:'.13em',color:'var(--clay)',marginBottom:3 }}>{s.badge.label}</div>
                  <div style={{ fontFamily:'var(--f-sans)',fontSize:12,fontWeight:300,color:'var(--ink2)' }}>{s.badge.body}</div>
                </div>
              )}
              {s.tags && (
                <div style={{ display:'flex',flexWrap:'wrap',gap:6,marginTop:14 }}>
                  {s.tags.map(t => <span key={t} className="tag">{t}</span>)}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   PRODUCTS
═══════════════════════════════════════════════════════════════════════════ */
function Products() {
  return (
    <section id="products" className="section" style={{ background:'var(--bg)' }}>
      <div className="max-w">
        <SectionBadge>Products</SectionBadge>
        <h2 className="h2">What we've <em>built and shipped</em>.</h2>
        <p className="lead">Our products are live in production — not demo-ware.</p>

        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
          {/* Anbu Health AI */}
          <div className="card" style={{ padding:32, position:'relative', overflow:'hidden' }}>
            <div style={{ position:'absolute',top:0,left:0,right:0,height:2,background:'linear-gradient(90deg,var(--clay) 0%,transparent 80%)' }}/>
            <div className="live-badge" style={{ marginBottom:18 }}><span className="live-dot"/>LIVE IN PRODUCTION</div>
            <h3 style={{ fontFamily:'var(--f-serif)',fontWeight:500,fontSize:'1.5rem',lineHeight:1.15,letterSpacing:'-.02em',color:'var(--ink)',marginBottom:12 }}>Anbu Health AI</h3>
            <p style={{ fontFamily:'var(--f-sans)',fontSize:13.5,fontWeight:300,color:'var(--ink2)',lineHeight:1.8,marginBottom:18 }}>
              Bilingual (Tamil/English) medical AI assistant — lab reports, diagnostic scans, medicine photos.
              Deployed to a paying client at anbuclinic.me with Firebase OTP auth and DPDP Act 2023 compliance.
            </p>
            <div style={{ display:'flex',flexWrap:'wrap',gap:6,marginBottom:20 }}>
              {['React','FastAPI','Azure','Groq','GPT-4o Vision','Qdrant RAG'].map(t=><span key={t} className="tag">{t}</span>)}
            </div>
            <a href="https://anbuclinic.me" target="_blank" rel="noopener noreferrer"
              className="btn btn-clay" style={{ fontSize:12,padding:'9px 18px' }}>
              Visit anbuclinic.me →
            </a>
          </div>

          {/* Antahkarana */}
          <div style={{ background:'var(--ink)',borderRadius:'var(--r)',padding:32 }}>
            <div style={{
              display:'inline-flex',alignItems:'center',gap:7,
              background:'rgba(196,105,62,.16)',border:'1px solid rgba(196,105,62,.3)',
              padding:'4px 11px',borderRadius:20,
              fontFamily:'var(--f-mono)',fontSize:10,letterSpacing:'.12em',color:'var(--clay-m)',
              marginBottom:18,
            }}>PATENT FILED · IEEE SUBMITTED</div>
            <h3 style={{ fontFamily:'var(--f-serif)',fontStyle:'italic',fontWeight:400,fontSize:'1.5rem',lineHeight:1.15,letterSpacing:'-.02em',color:'var(--d-text)',marginBottom:12 }}>
              Antahkarana<br/>Reasoning Framework
            </h3>
            <p style={{ fontFamily:'var(--f-sans)',fontSize:13.5,fontWeight:300,color:'var(--d-text2)',lineHeight:1.8,marginBottom:18 }}>
              Cognitively-inspired 5-stage architecture for LLMs and VLMs. Validated on 2,500+ multimodal samples. Powers Anbu Health AI in production.
            </p>
            <div style={{ display:'flex',flexDirection:'column',gap:7 }}>
              {[['Manas','Perception & sensory input'],['Chitta','Memory & retrieval (RAG)'],['Buddhi','Discrimination & reasoning'],['Ahamkara','Integration & synthesis'],['Sakshi','Confidence & hallucination check']].map(([n,r]) => (
                <div key={n} style={{ display:'flex',gap:14,alignItems:'center',padding:'9px 14px',background:'rgba(255,255,255,.04)',border:'1px solid var(--d-border)',borderRadius:7 }}>
                  <span style={{ fontFamily:'var(--f-mono)',fontSize:11,color:'var(--clay-m)',minWidth:66,flexShrink:0 }}>{n}</span>
                  <span style={{ fontFamily:'var(--f-sans)',fontSize:12,fontWeight:300,color:'var(--d-text2)' }}>{r}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop:18,fontFamily:'var(--f-mono)',fontSize:10,letterSpacing:'.08em',color:'var(--d-text3)' }}>APP NO. 202641043947 · APR 2026</div>
          </div>

          {/* HuggingFace Models card */}
          <div className="card" style={{ padding:28, gridColumn:'span 2' }}>
            <div style={{ display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:20 }}>
              <div>
                <div style={{ fontFamily:'var(--f-mono)',fontSize:10,letterSpacing:'.16em',color:'var(--clay)',marginBottom:6 }}>HUGGINGFACE — LIVE MODELS</div>
                <h3 style={{ fontFamily:'var(--f-sans)',fontWeight:600,fontSize:15,color:'var(--ink)' }}>3 Fine-tuned Models in Production</h3>
              </div>
              <a href="https://huggingface.co/RajGana" target="_blank" rel="noopener noreferrer"
                className="btn btn-ghost" style={{ fontSize:12,padding:'8px 16px',flexShrink:0 }}>
                View on HuggingFace →
              </a>
            </div>
            <div style={{ display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:10 }}>
              {[
                { name:'TinyLLaMA Fine-tune',  stack:'QLoRA · PEFT',      desc:'Domain-adapted small LLM for edge deployment' },
                { name:'MiniVLM',              stack:'BLIP-3 · ViT',      desc:'Vision-language model for image+text tasks' },
                { name:'CodeLlama-7B QLoRA',   stack:'CodeAlpaca-20K',    desc:'60% GPU reduction, deployed on HF Spaces via Groq' },
              ].map(m => (
                <div key={m.name} style={{ background:'var(--bg2)',borderRadius:10,padding:'16px 18px',border:'1px solid var(--border)' }}>
                  <div style={{ fontFamily:'var(--f-sans)',fontWeight:600,fontSize:13,color:'var(--ink)',marginBottom:4 }}>{m.name}</div>
                  <div style={{ fontFamily:'var(--f-mono)',fontSize:10,color:'var(--clay)',marginBottom:6 }}>{m.stack}</div>
                  <div style={{ fontFamily:'var(--f-sans)',fontSize:12,fontWeight:300,color:'var(--ink3)',lineHeight:1.5 }}>{m.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   SOLUTIONS BY INDUSTRY
═══════════════════════════════════════════════════════════════════════════ */
function Industries() {
  return (
    <section style={{ padding:'80px clamp(20px,5vw,60px)', background:'var(--bg2)' }}>
      <div className="max-w">
        <SectionBadge>Solutions by Industry</SectionBadge>
        <h2 className="h2">Built for the domain,<br/><em>not just the data</em>.</h2>
        <p className="lead">Deep domain awareness is what separates production AI from proof-of-concepts.</p>
        <div style={{ display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:10 }}>
          {INDUSTRIES.map(ind => (
            <div key={ind.name} className="card" style={{ padding:24 }}>
              <div style={{ fontSize:28,marginBottom:12 }}>{ind.icon}</div>
              <h3 style={{ fontFamily:'var(--f-sans)',fontWeight:600,fontSize:14.5,color:'var(--ink)',marginBottom:8 }}>{ind.name}</h3>
              <p style={{ fontFamily:'var(--f-sans)',fontSize:13,fontWeight:300,color:'var(--ink2)',lineHeight:1.65 }}>{ind.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   CASE STUDIES / FEATURED WORK
═══════════════════════════════════════════════════════════════════════════ */
function Work() {
  return (
    <section id="work" className="section" style={{ background:'var(--bg)' }}>
      <div className="max-w">
        <SectionBadge>Case Studies</SectionBadge>
        <h2 className="h2">Shipped, not <em>demoed</em>.</h2>
        <p className="lead">One live product in production. One patent-filed framework behind it.</p>

        {/* Case study: Anbu Health */}
        <div className="card" style={{ padding:36, marginBottom:12, display:'grid', gridTemplateColumns:'1.15fr 1fr', gap:40, alignItems:'start' }}>
          <div>
            <div className="live-badge" style={{ marginBottom:16 }}><span className="live-dot"/>LIVE IN PRODUCTION — anbuclinic.me</div>
            <h3 style={{ fontFamily:'var(--f-serif)',fontWeight:500,fontSize:'clamp(1.4rem,3vw,2rem)',lineHeight:1.15,letterSpacing:'-.02em',color:'var(--ink)',marginBottom:14 }}>
              Anbu Health AI
            </h3>
            <p style={{ fontFamily:'var(--f-sans)',fontSize:13.5,fontWeight:300,color:'var(--ink2)',lineHeight:1.8,marginBottom:16 }}>
              <strong style={{ fontWeight:500,color:'var(--ink)' }}>The problem:</strong> A Chennai clinic needed an AI layer that could help Tamil-speaking patients
              understand their own lab reports — without requiring English literacy or a doctor's appointment for every query.
            </p>
            <p style={{ fontFamily:'var(--f-sans)',fontSize:13.5,fontWeight:300,color:'var(--ink2)',lineHeight:1.8,marginBottom:16 }}>
              <strong style={{ fontWeight:500,color:'var(--ink)' }}>What we built:</strong> A bilingual (Tamil/English) AI assistant that processes lab report images,
              diagnostic scan photos, and medicine labels — returning patient-friendly explanations with a 5-stage hallucination
              check pipeline ensuring clinical safety.
            </p>
            <p style={{ fontFamily:'var(--f-sans)',fontSize:13.5,fontWeight:300,color:'var(--ink2)',lineHeight:1.8,marginBottom:20 }}>
              <strong style={{ fontWeight:500,color:'var(--ink)' }}>Delivered:</strong> React frontend + FastAPI backend + Azure Container Apps deployment + DPDP Act 2023 compliance + Firebase OTP auth — end to end.
            </p>
            <div style={{ display:'flex',flexWrap:'wrap',gap:6,marginBottom:24 }}>
              {['React','FastAPI','Azure Container Apps','Groq','GPT-4o Vision','Qdrant RAG','Firebase OTP'].map(t=><span key={t} className="tag">{t}</span>)}
            </div>
            <a href="https://anbuclinic.me" target="_blank" rel="noopener noreferrer" className="btn btn-clay">Visit anbuclinic.me →</a>
          </div>
          <div style={{ display:'flex',flexDirection:'column',gap:10 }}>
            {[
              { n:'5', l:'Stage reasoning pipeline', s:'routing → RAG → LLM → scoring → hallucination check' },
              { n:'2', l:'Languages supported',       s:'Tamil & English, bilingual throughout the full UX' },
              { n:'1', l:'Paying client, live',        s:'Real patients, real clinic, real stakes — not a demo' },
            ].map((s,i) => (
              <div key={i} style={{ background:'var(--bg2)',border:'1px solid var(--border)',borderRadius:10,padding:'16px 20px',display:'flex',gap:14,alignItems:'center' }}>
                <div style={{ fontFamily:'var(--f-serif)',fontWeight:400,fontSize:30,color:'var(--ink)',lineHeight:1,flexShrink:0,letterSpacing:'-.02em',minWidth:32 }}>{s.n}</div>
                <div>
                  <div style={{ fontFamily:'var(--f-sans)',fontWeight:500,fontSize:12.5,color:'var(--ink)',marginBottom:2 }}>{s.l}</div>
                  <div style={{ fontFamily:'var(--f-sans)',fontSize:11.5,fontWeight:300,color:'var(--ink3)',lineHeight:1.5 }}>{s.s}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   RESEARCH & INNOVATION
═══════════════════════════════════════════════════════════════════════════ */
function Research() {
  return (
    <section id="research" style={{ padding:'80px clamp(20px,5vw,60px)', background:'var(--bg-dark)' }}>
      <div className="max-w">
        <div className="eyebrow-dark">Research & Innovation</div>
        <h2 className="h2-dark">Original R&D,<br/><em>not borrowed methodology</em>.</h2>
        <p className="lead-dark">Our reasoning framework is our own — filed, peer-reviewed, and running in production.</p>

        <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginBottom:24 }}>
          {/* Patent */}
          <div className="card-dark" style={{ padding:28 }}>
            <div style={{ fontFamily:'var(--f-mono)',fontSize:10,letterSpacing:'.16em',color:'var(--clay-m)',marginBottom:12 }}>PATENT FILED — APR 2026</div>
            <h3 style={{ fontFamily:'var(--f-serif)',fontStyle:'italic',fontWeight:400,fontSize:'1.3rem',color:'var(--d-text)',marginBottom:10 }}>Antahkarana Reasoning Framework</h3>
            <p style={{ fontFamily:'var(--f-sans)',fontSize:13,fontWeight:300,color:'var(--d-text2)',lineHeight:1.75,marginBottom:14 }}>
              A cognitively-inspired 5-stage LLM/VLM reasoning architecture validated on 2,500+ multimodal samples.
              Filed with the Indian Patent Office.
            </p>
            <div style={{ fontFamily:'var(--f-mono)',fontSize:10,color:'var(--d-text3)',letterSpacing:'.07em' }}>APP NO. 202641043947</div>
          </div>

          {/* IEEE */}
          <div className="card-dark" style={{ padding:28 }}>
            <div style={{ fontFamily:'var(--f-mono)',fontSize:10,letterSpacing:'.16em',color:'var(--clay-m)',marginBottom:12 }}>IEEE PAPER — GOOGLE SCHOLAR INDEXED</div>
            <h3 style={{ fontFamily:'var(--f-serif)',fontStyle:'italic',fontWeight:400,fontSize:'1.3rem',color:'var(--d-text)',marginBottom:10 }}>Multimodal Reasoning in Clinical AI</h3>
            <p style={{ fontFamily:'var(--f-sans)',fontSize:13,fontWeight:300,color:'var(--d-text2)',lineHeight:1.75,marginBottom:14 }}>
              IEEE paper submitted on the Antahkarana framework's application to healthcare AI. Indexed on Google Scholar.
            </p>
            <div style={{ fontFamily:'var(--f-mono)',fontSize:10,color:'var(--d-text3)',letterSpacing:'.07em' }}>SUBMITTED · GOOGLE SCHOLAR INDEXED</div>
          </div>
        </div>

        {/* HuggingFace */}
        <div className="card-dark" style={{ padding:28 }}>
          <div style={{ fontFamily:'var(--f-mono)',fontSize:10,letterSpacing:'.16em',color:'var(--clay-m)',marginBottom:16 }}>HUGGINGFACE — OPEN MODELS</div>
          <div style={{ display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:12 }}>
            {[
              { name:'TinyLLaMA Fine-tune', detail:'QLoRA · PEFT · domain adaptation' },
              { name:'MiniVLM',            detail:'BLIP-3 · ViT · vision-language' },
              { name:'CodeLlama-7B QLoRA', detail:'CodeAlpaca-20K · 60% GPU reduction · Groq inference' },
            ].map(m => (
              <div key={m.name} style={{ padding:'14px 16px',background:'rgba(255,255,255,.04)',border:'1px solid var(--d-border)',borderRadius:8 }}>
                <div style={{ fontFamily:'var(--f-sans)',fontWeight:600,fontSize:13,color:'var(--d-text)',marginBottom:5 }}>{m.name}</div>
                <div style={{ fontFamily:'var(--f-mono)',fontSize:10,color:'var(--d-text3)',lineHeight:1.6 }}>{m.detail}</div>
              </div>
            ))}
          </div>
          <a href="https://huggingface.co/RajGana" target="_blank" rel="noopener noreferrer"
            className="btn btn-ghost-dark" style={{ marginTop:18,fontSize:12,padding:'8px 16px' }}>
            huggingface.co/RajGana →
          </a>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   TECH STACK — DARK SECTION
═══════════════════════════════════════════════════════════════════════════ */
function TechStack() {
  return (
    <section style={{ padding:'80px clamp(20px,5vw,60px)', background:'var(--bg-dark2)' }}>
      <div className="max-w">
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:56, alignItems:'start' }}>
          <div>
            <div className="eyebrow-dark">Technology Stack</div>
            <h2 className="h2-dark">Infrastructure that<br/><em>holds in production</em>.</h2>
            <p className="lead-dark">Every layer chosen for reliability, not familiarity. Cloud-native, containerised, monitored from day one.</p>
            <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:7 }}>
              {STACK.map(name => (
                <div key={name} style={{ display:'flex',alignItems:'center',gap:9,background:'var(--bg-dark3)',border:'1px solid var(--d-border)',borderRadius:7,padding:'9px 12px' }}>
                  <span style={{ width:6,height:6,borderRadius:'50%',background:'var(--clay-m)',flexShrink:0 }}/>
                  <span style={{ fontFamily:'var(--f-mono)',fontSize:11,color:'var(--d-text2)' }}>{name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Terminal */}
          <div style={{ background:'var(--bg-dark3)',border:'1px solid var(--d-border2)',borderRadius:12,overflow:'hidden' }}>
            <div style={{ display:'flex',alignItems:'center',gap:7,padding:'11px 16px',borderBottom:'1px solid var(--d-border)' }}>
              {['#E25655','#E3AA40','#57A65A'].map(c=><span key={c} style={{ width:10,height:10,borderRadius:'50%',background:c }}/>)}
              <span style={{ fontFamily:'var(--f-mono)',fontSize:10,color:'var(--d-text3)',marginLeft:8 }}>antahkarana/pipeline.py</span>
            </div>
            <pre style={{ fontFamily:'var(--f-mono)',fontSize:11.5,lineHeight:1.85,color:'var(--d-text2)',padding:'20px 22px',margin:0,overflowX:'auto' }}>
{`\x1b`}
              <span style={{ color:'rgba(231,229,224,.25)' }}># Antahkarana 5-stage pipeline{'\n'}</span>
              <span style={{ color:'#C392E0' }}>from</span>{' antahkarana '}
              <span style={{ color:'#C392E0' }}>import</span>{' Pipeline\n\n'}
              {'pipe = Pipeline(\n'}
              {'  '}<span style={{ color:'#7EC8A0' }}>manas</span>
              <span style={{ color:'rgba(231,229,224,.35)' }}>    = PerceptionStage(),{'\n'}</span>
              {'  '}<span style={{ color:'#7EC8A0' }}>chitta</span>
              <span style={{ color:'rgba(231,229,224,.35)' }}>   = RAGStage(qdrant),{'\n'}</span>
              {'  '}<span style={{ color:'#7EC8A0' }}>buddhi</span>
              <span style={{ color:'rgba(231,229,224,.35)' }}>   = ReasoningStage(),{'\n'}</span>
              {'  '}<span style={{ color:'#7EC8A0' }}>ahamkara</span>
              <span style={{ color:'rgba(231,229,224,.35)' }}> = SynthesisStage(),{'\n'}</span>
              {'  '}<span style={{ color:'#7EC8A0' }}>sakshi</span>
              <span style={{ color:'rgba(231,229,224,.35)' }}>   = HallucinationCheck(),{'\n'}</span>
              {')\n\n'}
              <span style={{ color:'rgba(231,229,224,.25)' }}># Azure Container Apps · anbuclinic.me{'\n'}</span>
              <span style={{ color:'rgba(231,229,224,.25)' }}># DPDP Act 2023 compliant</span>
            </pre>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   AI CAPABILITIES
═══════════════════════════════════════════════════════════════════════════ */
function AICaps() {
  return (
    <section style={{ padding:'80px clamp(20px,5vw,60px)', background:'var(--bg2)' }}>
      <div className="max-w">
        <SectionBadge>AI Capabilities</SectionBadge>
        <h2 className="h2">What intelligence we can<br/><em>embed in your product</em>.</h2>
        <div style={{ display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:10,marginTop:40 }}>
          {AI_CAPS.map(c => (
            <div key={c.abbr} className="card" style={{ padding:24 }}>
              <div style={{ fontFamily:'var(--f-mono)',fontWeight:500,fontSize:18,color:'var(--clay)',marginBottom:8 }}>{c.abbr}</div>
              <div style={{ fontFamily:'var(--f-sans)',fontWeight:600,fontSize:14,color:'var(--ink)',marginBottom:7 }}>{c.name}</div>
              <div style={{ fontFamily:'var(--f-sans)',fontSize:13,fontWeight:300,color:'var(--ink2)',lineHeight:1.65 }}>{c.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   HOW WE WORK
═══════════════════════════════════════════════════════════════════════════ */
function Process() {
  return (
    <section style={{ padding:'80px clamp(20px,5vw,60px)', background:'var(--bg)' }}>
      <div className="max-w">
        <SectionBadge>How We Work</SectionBadge>
        <h2 className="h2">From brief to<br/><em>live deployment</em>.</h2>
        <p className="lead">A disciplined process that's been proven end-to-end — from first call to paying client.</p>
        <div style={{ display:'flex',flexDirection:'column',gap:0 }}>
          {PROCESS.map((p,i) => (
            <div key={i} style={{
              display:'grid',gridTemplateColumns:'80px 1fr',gap:24,
              padding:'28px 0',
              borderBottom: i < PROCESS.length-1 ? '1px solid var(--border)' : 'none',
              alignItems:'start',
            }}>
              <div style={{ fontFamily:'var(--f-mono)',fontSize:11,letterSpacing:'.12em',color:'var(--clay)',paddingTop:3 }}>{p.n}</div>
              <div>
                <div style={{ fontFamily:'var(--f-sans)',fontWeight:600,fontSize:15,color:'var(--ink)',marginBottom:6 }}>{p.title}</div>
                <div style={{ fontFamily:'var(--f-sans)',fontSize:13.5,fontWeight:300,color:'var(--ink2)',lineHeight:1.75 }}>{p.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   WHY CHOOSE US
═══════════════════════════════════════════════════════════════════════════ */
function WhyUs() {
  return (
    <section style={{ padding:'80px clamp(20px,5vw,60px)', background:'var(--bg2)' }}>
      <div className="max-w">
        <SectionBadge>Why Choose Us</SectionBadge>
        <h2 className="h2">Not just another AI studio.<br/><em>Here's the difference</em>.</h2>
        <div style={{ display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:10,marginTop:40 }}>
          {WHY_US.map(w => (
            <div key={w.title} className="card" style={{ padding:24 }}>
              <div style={{ fontSize:26,marginBottom:12 }}>{w.icon}</div>
              <h3 style={{ fontFamily:'var(--f-sans)',fontWeight:600,fontSize:14.5,color:'var(--ink)',marginBottom:8 }}>{w.title}</h3>
              <p style={{ fontFamily:'var(--f-sans)',fontSize:13,fontWeight:300,color:'var(--ink2)',lineHeight:1.65 }}>{w.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   ABOUT
═══════════════════════════════════════════════════════════════════════════ */
function About() {
  return (
    <section id="about" className="section" style={{ background:'var(--bg)' }}>
      <div className="max-w">
        <SectionBadge>About AI Vision Labs</SectionBadge>
        <h2 className="h2">Built on shipped work.<br/><em>Grounded in real deployment</em>.</h2>
        <div style={{ display:'grid',gridTemplateColumns:'1.4fr 1fr',gap:56,alignItems:'start' }}>
          <div>
            <p style={{ fontFamily:'var(--f-sans)',fontSize:14.5,fontWeight:300,color:'var(--ink2)',lineHeight:1.85,marginBottom:20 }}>
              AI Vision Labs was founded to close the gap between AI research and production
              deployment. Too many organisations receive impressive demos that never reach real
              users. We build things that ship — with proper infrastructure, compliance-ready
              architecture, and hallucination controls built in from day one.
            </p>
            <p style={{ fontFamily:'var(--f-sans)',fontSize:14.5,fontWeight:300,color:'var(--ink2)',lineHeight:1.85,marginBottom:20 }}>
              Founded in Chennai and registered as an MSME, we're available for select
              engagements globally. Our reasoning framework, Antahkarana, represents genuine
              original R&D — not adapted open-source methodology.
            </p>
            <p style={{ fontFamily:'var(--f-sans)',fontSize:14.5,fontWeight:300,color:'var(--ink2)',lineHeight:1.85 }}>
              We believe "AI for Every Home, Intelligence for Every Hand" is not a tagline —
              it's a deployment target. Every system we build should be accessible to the person
              who needs it most, not just the organisation that can afford the most compute.
            </p>
          </div>

          <div style={{ display:'flex',flexDirection:'column',gap:12 }}>
            {/* Team */}
            <div className="card" style={{ overflow:'hidden' }}>
              {TEAM.map((p,i) => (
                <div key={p.name} style={{ padding:'18px 20px',borderBottom: i < TEAM.length-1 ? '1px solid var(--border)' : 'none' }}>
                  <div style={{ display:'flex',alignItems:'center',gap:12,marginBottom:8 }}>
                    <div style={{
                      width:36,height:36,borderRadius:'50%',
                      background:'var(--clay-l)',border:'1px solid var(--clay-b)',
                      display:'flex',alignItems:'center',justifyContent:'center',
                      fontFamily:'var(--f-serif)',fontWeight:500,fontSize:14,color:'var(--clay)',
                      flexShrink:0,
                    }}>{p.initials}</div>
                    <div>
                      <div style={{ fontFamily:'var(--f-mono)',fontSize:9.5,letterSpacing:'.12em',color:'var(--clay)' }}>{p.role}</div>
                      <div style={{ fontFamily:'var(--f-sans)',fontWeight:600,fontSize:14,color:'var(--ink)' }}>{p.name}</div>
                    </div>
                  </div>
                  <div style={{ fontFamily:'var(--f-sans)',fontSize:12,fontWeight:300,color:'var(--ink3)',lineHeight:1.6 }}>{p.bio}</div>
                  {p.links && (
                    <div style={{ display:'flex',gap:10,marginTop:10 }}>
                      {[['HF',p.links.hf],['GH',p.links.gh],['LI',p.links.li]].map(([l,u]) => (
                        <a key={l} href={u} target="_blank" rel="noopener noreferrer"
                          style={{ fontFamily:'var(--f-mono)',fontSize:10,color:'var(--clay)',textDecoration:'none',letterSpacing:'.08em',
                                   padding:'2px 8px',border:'1px solid var(--clay-b)',borderRadius:4,
                                   transition:'background .15s',
                          }}
                          onMouseEnter={e => e.target.style.background='var(--clay-l)'}
                          onMouseLeave={e => e.target.style.background='transparent'}
                        >{l}</a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* MSME */}
            <div style={{ background:'var(--bg3)',border:'1px solid var(--border)',borderRadius:'var(--r)',padding:'14px 18px',fontFamily:'var(--f-mono)',fontSize:10,color:'var(--ink3)',lineHeight:2,letterSpacing:'.04em' }}>
              MSME REGISTERED · INDIA<br/>
              UDYAM-TN-02-0483528<br/>
              CHENNAI, TAMIL NADU<br/>
              rajaganaa@aivisionlabs.tech
            </div>

            {/* Credentials */}
            <div className="card" style={{ padding:'16px 20px' }}>
              <div style={{ fontFamily:'var(--f-mono)',fontSize:10,letterSpacing:'.14em',color:'var(--ink3)',marginBottom:12 }}>CREDENTIALS</div>
              {['AWS Solutions Architect Associate','M.Tech AI — SRM Institute (9.6/10)','IITM Pravartak AI/ML Program (IIT Madras)','Kaggle AI Agents Intensive (Google)','NPTEL Top 5% IoT (86% · 50,282 candidates)','Hackathon 6th place / 195 — SRM Dec 2024'].map((c,i) => (
                <div key={i} style={{ display:'flex',alignItems:'flex-start',gap:8,fontFamily:'var(--f-sans)',fontSize:12,color:'var(--ink2)',fontWeight:300,marginBottom:6,lineHeight:1.4 }}>
                  <span style={{ color:'var(--clay)',fontSize:11,flexShrink:0,marginTop:1 }}>›</span>{c}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   TESTIMONIALS — skipped (no real quotes yet), replaced with trust signals
═══════════════════════════════════════════════════════════════════════════ */

/* ═══════════════════════════════════════════════════════════════════════════
   FAQS
═══════════════════════════════════════════════════════════════════════════ */
function FAQs() {
  const [open, setOpen] = useState(null)
  return (
    <section style={{ padding:'80px clamp(20px,5vw,60px)', background:'var(--bg2)' }}>
      <div className="max-w" style={{ maxWidth:720 }}>
        <SectionBadge>FAQs</SectionBadge>
        <h2 className="h2">Common questions,<br/><em>honest answers</em>.</h2>
        <div style={{ display:'flex',flexDirection:'column',gap:0,marginTop:36 }}>
          {FAQS.map((f,i) => (
            <div key={i} style={{ borderBottom:'1px solid var(--border)' }}>
              <button
                onClick={() => setOpen(open===i ? null : i)}
                style={{
                  width:'100%',display:'flex',justifyContent:'space-between',alignItems:'center',
                  padding:'20px 0',background:'transparent',border:'none',cursor:'pointer',
                  textAlign:'left',
                }}
              >
                <span style={{ fontFamily:'var(--f-sans)',fontWeight:500,fontSize:15,color:'var(--ink)' }}>{f.q}</span>
                <span style={{ fontFamily:'var(--f-mono)',fontSize:18,color:'var(--clay)',flexShrink:0,marginLeft:16,transition:'transform .2s',
                               transform: open===i ? 'rotate(45deg)' : 'rotate(0)' }}>+</span>
              </button>
              {open===i && (
                <div style={{ paddingBottom:20,fontFamily:'var(--f-sans)',fontSize:13.5,fontWeight:300,color:'var(--ink2)',lineHeight:1.8 }}>
                  {f.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   BLOG TEASER
═══════════════════════════════════════════════════════════════════════════ */
function Blog() {
  const posts = [
    { tag:'LLM Engineering', title:'Why RAG alone isn\'t enough — and what the Antahkarana framework adds', date:'Jun 2025' },
    { tag:'Production AI',   title:'Deploying bilingual medical AI on Azure: what we learned shipping Anbu Health AI', date:'May 2025' },
    { tag:'Fine-tuning',     title:'QLoRA in practice: achieving 60% GPU reduction on CodeLlama-7B without sacrificing quality', date:'Apr 2025' },
  ]
  return (
    <section style={{ padding:'80px clamp(20px,5vw,60px)', background:'var(--bg)' }}>
      <div className="max-w">
        <SectionBadge>Blog & Insights</SectionBadge>
        <h2 className="h2">What we're <em>learning and sharing</em>.</h2>
        <p className="lead">Practical writing from production AI work — not thought leadership fluff.</p>
        <div style={{ display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:10 }}>
          {posts.map((p,i) => (
            <div key={i} className="card" style={{ padding:24,cursor:'pointer' }}>
              <span className="tag-clay" style={{ marginBottom:14,display:'inline-block' }}>{p.tag}</span>
              <h3 style={{ fontFamily:'var(--f-serif)',fontWeight:500,fontSize:'1rem',lineHeight:1.45,color:'var(--ink)',marginBottom:12,letterSpacing:'-.01em' }}>{p.title}</h3>
              <div style={{ fontFamily:'var(--f-mono)',fontSize:10,color:'var(--ink3)',letterSpacing:'.1em' }}>{p.date} · Coming soon</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop:24,textAlign:'center' }}>
          <span style={{ fontFamily:'var(--f-sans)',fontSize:13,color:'var(--ink3)' }}>Blog launching soon — subscribe below to be notified.</span>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   CAREERS
═══════════════════════════════════════════════════════════════════════════ */
function Careers() {
  return (
    <section style={{ padding:'80px clamp(20px,5vw,60px)', background:'var(--bg2)' }}>
      <div className="max-w" style={{ maxWidth:680,textAlign:'center' }}>
        <SectionBadge>Careers</SectionBadge>
        <h2 className="h2" style={{ marginBottom:16 }}>Build AI that matters.<br/><em>Join the team</em>.</h2>
        <p style={{ fontFamily:'var(--f-sans)',fontSize:14.5,fontWeight:300,color:'var(--ink2)',lineHeight:1.85,marginBottom:32,maxWidth:520,margin:'0 auto 32px' }}>
          We're a small team doing serious work. If you're an AI/ML engineer, full-stack developer, or
          domain expert in healthcare, education, or manufacturing who wants to ship real systems — not
          notebook experiments — we want to hear from you.
        </p>
        <div style={{ display:'flex',justifyContent:'center',gap:12,flexWrap:'wrap' }}>
          <a href="mailto:rajaganaa@aivisionlabs.tech?subject=Career Enquiry" className="btn btn-clay">Send your profile →</a>
          <a href="#contact" className="btn btn-ghost">Talk to us first</a>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   NEWSLETTER
═══════════════════════════════════════════════════════════════════════════ */
function Newsletter() {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)
  const submit = e => {
    e.preventDefault()
    if (email) { setDone(true) }
  }
  return (
    <div style={{ background:'var(--clay)',padding:'48px clamp(20px,5vw,60px)' }}>
      <div className="max-w" style={{ display:'flex',justifyContent:'space-between',alignItems:'center',gap:32,flexWrap:'wrap' }}>
        <div>
          <div style={{ fontFamily:'var(--f-serif)',fontWeight:500,fontSize:'1.4rem',color:'#fff',marginBottom:6 }}>
            Stay ahead of production AI.
          </div>
          <div style={{ fontFamily:'var(--f-sans)',fontSize:13.5,fontWeight:300,color:'rgba(255,255,255,.75)' }}>
            Practical insights on LLMs, agentic systems, and deployment — from our team.
          </div>
        </div>
        {done ? (
          <div style={{ fontFamily:'var(--f-sans)',fontSize:14,color:'rgba(255,255,255,.85)',fontWeight:400 }}>
            ✓ You're on the list. We'll be in touch.
          </div>
        ) : (
          <form onSubmit={submit} style={{ display:'flex',gap:8,flexShrink:0 }}>
            <input
              type="email" required value={email} onChange={e=>setEmail(e.target.value)}
              placeholder="your@email.com"
              style={{
                fontFamily:'var(--f-sans)',fontSize:13.5,padding:'10px 14px',
                border:'1px solid rgba(255,255,255,.3)',borderRadius:8,
                background:'rgba(255,255,255,.12)',color:'#fff',outline:'none',
                width:220,
              }}
            />
            <button type="submit" style={{
              fontFamily:'var(--f-sans)',fontWeight:500,fontSize:13,
              padding:'10px 18px',background:'#fff',color:'var(--clay)',
              border:'none',borderRadius:8,cursor:'pointer',whiteSpace:'nowrap',
              transition:'opacity .2s',
            }}
              onMouseEnter={e=>e.target.style.opacity='.88'}
              onMouseLeave={e=>e.target.style.opacity='1'}
            >Subscribe →</button>
          </form>
        )}
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   CONTACT
═══════════════════════════════════════════════════════════════════════════ */
function Contact() {
  const [form, setForm] = useState({ name:'', company:'', email:'', service:'', message:'' })
  const [sent, setSent] = useState(false)
  const handle = e => setForm(f => ({ ...f, [e.target.name]:e.target.value }))
  const submit = e => {
    e.preventDefault()
    const sub = encodeURIComponent(`Project Inquiry — ${form.name}${form.company ? ` (${form.company})` : ''}`)
    const body = encodeURIComponent(`Name: ${form.name}\nCompany: ${form.company}\nEmail: ${form.email}\nService: ${form.service}\n\n${form.message}`)
    window.location.href = `mailto:rajaganaa@aivisionlabs.tech?subject=${sub}&body=${body}`
    setSent(true)
  }

  return (
    <section id="contact" className="section" style={{ background:'var(--bg)' }}>
      <div className="max-w">
        <SectionBadge>Contact & Book a Demo</SectionBadge>
        <h2 className="h2" style={{ marginBottom:14 }}>Available for select<br/><em>project engagements</em>.</h2>
        <p style={{ fontFamily:'var(--f-sans)',fontSize:15,fontWeight:300,color:'var(--ink2)',lineHeight:1.8,marginBottom:48,maxWidth:440 }}>
          Tell us what you're building. We respond within 24 hours. Serious work only.
        </p>

        <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:48,alignItems:'start' }}>
          {sent ? (
            <div style={{ padding:28,background:'var(--clay-l)',border:'1px solid var(--clay-b)',borderRadius:'var(--r)' }}>
              <div style={{ fontFamily:'var(--f-serif)',fontWeight:500,fontSize:18,color:'var(--clay)',marginBottom:8 }}>Email client is open.</div>
              <div style={{ fontFamily:'var(--f-sans)',fontSize:13,fontWeight:300,color:'var(--ink2)' }}>
                Send the drafted message to rajaganaa@aivisionlabs.tech. We'll reply within 24 hours.
              </div>
            </div>
          ) : (
            <form onSubmit={submit} style={{ display:'flex',flexDirection:'column',gap:12 }}>
              <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:10 }}>
                <div><label className="form-label">NAME</label><input className="form-input" type="text" name="name" required value={form.name} onChange={handle} placeholder="Your name"/></div>
                <div><label className="form-label">COMPANY</label><input className="form-input" type="text" name="company" value={form.company} onChange={handle} placeholder="Optional"/></div>
              </div>
              <div><label className="form-label">EMAIL</label><input className="form-input" type="email" name="email" required value={form.email} onChange={handle} placeholder="you@company.com"/></div>
              <div>
                <label className="form-label">SERVICE NEEDED</label>
                <select className="form-input" name="service" value={form.service} onChange={handle} style={{ cursor:'pointer' }}>
                  <option value="">Select a service...</option>
                  <option>LLM & Generative AI</option>
                  <option>Agentic AI</option>
                  <option>AI/ML Development</option>
                  <option>Agent-as-a-Service</option>
                  <option>AI Deployment / MLOps</option>
                  <option>Not sure — let's talk</option>
                </select>
              </div>
              <div><label className="form-label">TELL US ABOUT YOUR PROJECT</label>
                <textarea className="form-input" name="message" required rows={5} value={form.message} onChange={handle}
                  placeholder="What are you building? What problem does AI need to solve?" style={{ resize:'vertical',minHeight:110 }}/>
              </div>
              <button type="submit" className="btn btn-clay" style={{ justifyContent:'center',marginTop:4 }}>Send inquiry →</button>
            </form>
          )}

          <div style={{ display:'flex',flexDirection:'column',gap:28 }}>
            <div>
              <div style={{ fontFamily:'var(--f-mono)',fontSize:10,letterSpacing:'.14em',color:'var(--ink3)',marginBottom:8 }}>BUSINESS EMAIL</div>
              <a href="mailto:rajaganaa@aivisionlabs.tech" style={{ fontFamily:'var(--f-serif)',fontWeight:400,fontSize:18,color:'var(--ink)',textDecoration:'none',display:'block',transition:'color .15s' }}
                onMouseEnter={e=>e.target.style.color='var(--clay)'}
                onMouseLeave={e=>e.target.style.color='var(--ink)'}
              >rajaganaa@aivisionlabs.tech</a>
            </div>
            <div>
              <div style={{ fontFamily:'var(--f-mono)',fontSize:10,letterSpacing:'.14em',color:'var(--ink3)',marginBottom:8 }}>LINKEDIN</div>
              <a href="https://linkedin.com/in/raja-ganapathy-36b00658" target="_blank" rel="noopener noreferrer"
                style={{ fontFamily:'var(--f-sans)',fontSize:13.5,color:'var(--ink2)',textDecoration:'none',transition:'color .15s' }}
                onMouseEnter={e=>e.target.style.color='var(--clay)'}
                onMouseLeave={e=>e.target.style.color='var(--ink2)'}
              >Rajaganapathy M →</a>
            </div>
            <div>
              <div style={{ fontFamily:'var(--f-mono)',fontSize:10,letterSpacing:'.14em',color:'var(--ink3)',marginBottom:8 }}>GITHUB / HUGGINGFACE</div>
              {[['github.com/rajaganaa','https://github.com/rajaganaa'],['huggingface.co/RajGana','https://huggingface.co/RajGana']].map(([l,u]) => (
                <a key={l} href={u} target="_blank" rel="noopener noreferrer"
                  style={{ fontFamily:'var(--f-sans)',fontSize:13,color:'var(--ink2)',textDecoration:'none',display:'block',marginBottom:4,transition:'color .15s' }}
                  onMouseEnter={e=>e.target.style.color='var(--clay)'}
                  onMouseLeave={e=>e.target.style.color='var(--ink2)'}
                >{l} →</a>
              ))}
            </div>
            <div style={{ background:'var(--bg2)',border:'1px solid var(--border)',borderRadius:'var(--r)',padding:'16px 18px' }}>
              <div style={{ fontFamily:'var(--f-mono)',fontSize:10,letterSpacing:'.12em',color:'var(--clay)',marginBottom:6 }}>RESPONSE TIME</div>
              <div style={{ fontFamily:'var(--f-sans)',fontSize:13,fontWeight:300,color:'var(--ink2)',lineHeight:1.65 }}>
                All inquiries answered within 24 hours. Discovery calls can be scheduled within 48 hours.
              </div>
            </div>
            <div style={{ background:'var(--clay-l)',border:'1px solid var(--clay-b)',borderRadius:'var(--r)',padding:'16px 18px' }}>
              <div style={{ fontFamily:'var(--f-mono)',fontSize:10,letterSpacing:'.12em',color:'var(--clay)',marginBottom:6 }}>LOCATION</div>
              <div style={{ fontFamily:'var(--f-sans)',fontSize:13,fontWeight:300,color:'var(--ink2)',lineHeight:1.65 }}>
                Chennai, India · Available remote globally · Immediate start
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   FOOTER
═══════════════════════════════════════════════════════════════════════════ */
function Footer() {
  const cols = [
    { title:'Services', links:[['LLM & Generative AI','#services'],['Agentic AI','#services'],['AI/ML Development','#services'],['Agent-as-a-Service','#services'],['AI Deployment','#services']] },
    { title:'Company',  links:[['About','#about'],['Research','#research'],['Blog','#blog'],['Careers','#careers'],['Contact','#contact']] },
    { title:'Work',     links:[['Anbu Health AI','https://anbuclinic.me'],['Antahkarana','#research'],['HuggingFace Models','https://huggingface.co/RajGana'],['GitHub','https://github.com/rajaganaa']] },
    { title:'Legal',    links:[['Privacy Policy','#privacy'],['Terms of Service','#terms'],['Cookie Policy','#cookies']] },
  ]
  return (
    <footer style={{ background:'var(--ink)',padding:'48px clamp(20px,5vw,60px) 32px' }}>
      <div className="max-w">
        <div style={{ display:'grid',gridTemplateColumns:'1.5fr repeat(4,1fr)',gap:32,marginBottom:48 }}>
          {/* Brand */}
          <div>
            <Logo dark size={26}/>
            <p style={{ fontFamily:'var(--f-sans)',fontSize:13,fontWeight:300,color:'var(--d-text3)',lineHeight:1.75,marginTop:16,maxWidth:200 }}>
              AI for Every Home.<br/>Intelligence for Every Hand.
            </p>
            <div style={{ marginTop:16,fontFamily:'var(--f-mono)',fontSize:10,color:'rgba(231,229,224,.2)',lineHeight:1.9 }}>
              UDYAM-TN-02-0483528<br/>
              Chennai, Tamil Nadu
            </div>
            {/* Social */}
            <div style={{ display:'flex',gap:10,marginTop:18 }}>
              {[
                ['in','https://linkedin.com/in/raja-ganapathy-36b00658'],
                ['gh','https://github.com/rajaganaa'],
                ['hf','https://huggingface.co/RajGana'],
              ].map(([l,u]) => (
                <a key={l} href={u} target="_blank" rel="noopener noreferrer" style={{
                  width:30,height:30,borderRadius:6,border:'1px solid rgba(231,229,224,.1)',
                  background:'transparent',display:'flex',alignItems:'center',justifyContent:'center',
                  fontFamily:'var(--f-mono)',fontSize:10,color:'rgba(231,229,224,.35)',textDecoration:'none',
                  transition:'all .15s',
                }}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor='rgba(196,105,62,.4)';e.currentTarget.style.color='var(--clay-m)'}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(231,229,224,.1)';e.currentTarget.style.color='rgba(231,229,224,.35)'}}
                >{l}</a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {cols.map(col => (
            <div key={col.title}>
              <div style={{ fontFamily:'var(--f-mono)',fontSize:10,letterSpacing:'.14em',color:'rgba(231,229,224,.28)',marginBottom:16 }}>{col.title.toUpperCase()}</div>
              {col.links.map(([l,u]) => (
                <a key={l} href={u}
                  target={u.startsWith('http') ? '_blank' : undefined}
                  rel={u.startsWith('http') ? 'noopener noreferrer' : undefined}
                  style={{ display:'block',fontFamily:'var(--f-sans)',fontSize:13,fontWeight:300,color:'rgba(231,229,224,.45)',textDecoration:'none',marginBottom:10,transition:'color .15s' }}
                  onMouseEnter={e=>e.target.style.color='rgba(231,229,224,.8)'}
                  onMouseLeave={e=>e.target.style.color='rgba(231,229,224,.45)'}
                >{l}</a>
              ))}
            </div>
          ))}
        </div>

        <div style={{ borderTop:'1px solid rgba(231,229,224,.07)',paddingTop:24,display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:12 }}>
          <div style={{ fontFamily:'var(--f-mono)',fontSize:10,color:'rgba(231,229,224,.2)',letterSpacing:'.06em' }}>
            © {new Date().getFullYear()} AI Vision Labs · All rights reserved
          </div>
          <div style={{ fontFamily:'var(--f-mono)',fontSize:10,color:'rgba(231,229,224,.2)',letterSpacing:'.06em' }}>
            rajaganaa@aivisionlabs.tech
          </div>
        </div>
      </div>
    </footer>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   APP ROOT
═══════════════════════════════════════════════════════════════════════════ */
export default function App() {
  const [scrolled, setScrolled] = useState(false)
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 36)
    window.addEventListener('scroll', onScroll, { passive:true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (darkMode) { document.body.classList.add('dark') }
    else { document.body.classList.remove('dark') }
  }, [darkMode])

  return (
    <>
      <Nav scrolled={scrolled} darkMode={darkMode} setDarkMode={setDarkMode}/>
      <main>
        <Hero/>
        <Mission/>
        <Stats/>
        <Services/>
        <Products/>
        <Industries/>
        <Work/>
        <Research/>
        <TechStack/>
        <AICaps/>
        <Process/>
        <WhyUs/>
        <About/>
        <FAQs/>
        <Blog/>
        <Careers/>
        <Newsletter/>
        <Contact/>
      </main>
      <Footer/>
    </>
  )
}
