import { createFileRoute } from '@tanstack/react-router'
import { useState, useRef, useCallback, useEffect } from 'react'

export const Route = createFileRoute('/')({
  component: XpertFurnishingLanding,
})

const PHONE = '9355655110'
const WHATSAPP = 'https://wa.me/919355655110'
const PHONE_HREF = `tel:${PHONE}`

const services = [
  {
    icon: '🪟',
    title: 'Custom Curtains',
    desc: 'Tailored curtains in premium fabrics — blackout, sheer, linen, and more. Perfect fit for every window.',
  },
  {
    icon: '🛋️',
    title: 'Sofa Upholstery & Repair',
    desc: 'Revamp your sofas with quality upholstery fabric. Expert repair and repadding for all sofa types.',
  },
  {
    icon: '🪞',
    title: 'Blinds Installation',
    desc: 'Roller blinds, Roman blinds, Venetian blinds — professionally installed for style and privacy.',
  },
  {
    icon: '🧵',
    title: 'Cushion & Fabric Work',
    desc: 'Custom cushion covers, table runners, and fabric accents crafted to match your interior palette.',
  },
  {
    icon: '🏠',
    title: 'Complete Home Furnishing',
    desc: 'End-to-end furnishing solutions from concept to installation — curtains, blinds, upholstery, and decor.',
  },
]

const whyUs = [
  { icon: '🏆', point: 'Expert Craftsmanship', detail: '20+ years of skilled artisans delivering flawless results.' },
  { icon: '✨', point: 'Premium Quality Materials', detail: 'Only top-grade fabrics and hardware for lasting beauty.' },
  { icon: '⚡', point: 'Fast & Reliable Service', detail: 'On-time delivery and professional installation every time.' },
  { icon: '📍', point: 'On-site Consultation', detail: 'Free home visit to understand your space and preferences.' },
  { icon: '💰', point: 'Best Prices in Gurgaon', detail: 'Luxury quality at honest, transparent pricing.' },
]

const defaultGallery = [
  {
    id: '1',
    src: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80',
    alt: 'Luxury custom curtains in modern living room',
  },
  {
    id: '2',
    src: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80',
    alt: 'Premium sofa upholstery service',
  },
  {
    id: '3',
    src: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&q=80',
    alt: 'Elegant home furnishing interior design',
  },
  {
    id: '4',
    src: 'https://images.unsplash.com/photo-1560448075-cbc16bb4af8e?w=600&q=80',
    alt: 'Custom Roman blinds installation',
  },
  {
    id: '5',
    src: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&q=80',
    alt: 'Modern curtain designs for bedroom',
  },
  {
    id: '6',
    src: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=600&q=80',
    alt: 'Contemporary home furnishing',
  },
]

const defaultHeroImage = 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1400&q=70'

const reviews = [
  {
    name: 'Priya Sharma',
    stars: 5,
    text: 'Absolutely stunning curtains! Xpert Furnishing transformed our living room completely. The fabric quality is exceptional and the team was very professional.',
    location: 'DLF Phase 4, Gurgaon',
  },
  {
    name: 'Rahul Verma',
    stars: 5,
    text: 'Got my sofa reupholstered — looks brand new! The craftsmanship is top-notch and the pricing was very reasonable. Highly recommended in Gurgaon.',
    location: 'Sushant Lok, Gurgaon',
  },
  {
    name: 'Anjali Mehta',
    stars: 5,
    text: 'They installed roller blinds across our entire apartment. Quick turnaround, clean work, and the blinds look premium. Will definitely call them again.',
    location: 'Sector 56, Gurgaon',
  },
  {
    name: 'Vikram Singh',
    stars: 5,
    text: "Best home furnishing service in Gurgaon. The on-site consultation was very helpful. They understood our vision and delivered beyond expectations.",
    location: 'Golf Course Road, Gurgaon',
  },
]

function Stars({ count }: { count: number }) {
  return (
    <div style={{ color: '#c9a84c', fontSize: '1.1rem' }} aria-label={`${count} out of 5 stars`}>
      {'★'.repeat(count)}{'☆'.repeat(5 - count)}
    </div>
  )
}

function useImageManager(defaultImages: typeof defaultGallery) {
  const [images, setImages] = useState(defaultImages)
  const [editMode, setEditMode] = useState(false)

  const addImage = useCallback((file: File) => {
    const url = URL.createObjectURL(file)
    const newImg = {
      id: Date.now().toString(),
      src: url,
      alt: 'Replace this image with your project photo',
    }
    setImages(prev => [...prev, newImg])
  }, [])

  const removeImage = useCallback((id: string) => {
    setImages(prev => prev.filter(img => img.id !== id))
  }, [])

  const replaceImage = useCallback((id: string, file: File) => {
    const url = URL.createObjectURL(file)
    setImages(prev => prev.map(img => img.id === id ? { ...img, src: url } : img))
  }, [])

  return { images, editMode, setEditMode, addImage, removeImage, replaceImage }
}

export default function XpertFurnishingLanding() {
  const gallery = useImageManager(defaultGallery)
  const [heroImage, setHeroImage] = useState(defaultHeroImage)
  const [heroEditMode, setHeroEditMode] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const galleryInputRef = useRef<HTMLInputElement>(null)
  const heroInputRef = useRef<HTMLInputElement>(null)
  const replaceInputRef = useRef<HTMLInputElement>(null)
  const [replacingId, setReplacingId] = useState<string | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleHeroReplace = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) setHeroImage(URL.createObjectURL(file))
    setHeroEditMode(false)
  }

  const handleGalleryAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) gallery.addImage(file)
  }

  const handleGalleryReplace = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && replacingId) {
      gallery.replaceImage(replacingId, file)
      setReplacingId(null)
    }
  }

  return (
    <div style={{ fontFamily: "'Poppins', 'Inter', sans-serif", color: '#1a1a1a', background: '#fff', margin: 0, padding: 0 }}>

      {/* Hidden file inputs */}
      <input type="file" ref={heroInputRef} accept="image/*" style={{ display: 'none' }} onChange={handleHeroReplace} />
      <input type="file" ref={galleryInputRef} accept="image/*" style={{ display: 'none' }} onChange={handleGalleryAdd} />
      <input type="file" ref={replaceInputRef} accept="image/*" style={{ display: 'none' }} onChange={handleGalleryReplace} />

      {/* HEADER */}
      <header
        className="site-header"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 10000,
          background: scrolled ? 'rgba(26,26,26,0.97)' : 'rgba(26,26,26,0.85)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: scrolled ? '1px solid rgba(201,168,76,0.3)' : '1px solid transparent',
          transition: 'all 0.3s ease',
          padding: scrolled ? '10px 24px' : '14px 24px',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Logo / Brand */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
            <div style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
              <span style={{ background: 'linear-gradient(90deg, #c9a84c, #e8c96e)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Xpert</span>{' '}
              Furnishing
            </div>
            <span className="header-subtitle" style={{ fontSize: '0.7rem', color: 'rgba(201,168,76,0.8)', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              Curtains & Home Decor Experts
            </span>
          </div>

          {/* CTA Buttons */}
          <div className="header-buttons" style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <a
              href={PHONE_HREF}
              className="header-btn-call"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: 'linear-gradient(135deg, #c9a84c, #e8c96e)',
                color: '#1a1a1a',
                padding: '10px 20px',
                borderRadius: '50px',
                fontWeight: 700,
                fontSize: '0.85rem',
                textDecoration: 'none',
                whiteSpace: 'nowrap',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
            >
              Call Now
            </a>
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="header-btn-wa"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: '#25D366',
                color: '#fff',
                padding: '10px 20px',
                borderRadius: '50px',
                fontWeight: 700,
                fontSize: '0.85rem',
                textDecoration: 'none',
                whiteSpace: 'nowrap',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
            >
              WhatsApp
            </a>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section
        style={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2012 60%, #3a2a0a 100%)',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
          paddingTop: '60px',
        }}
      >
        {/* Background image */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.22,
            transition: 'opacity 0.5s',
          }}
          aria-hidden="true"
        />
        {/* Dark gradient overlay for readability */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, rgba(26,26,26,0.82) 0%, rgba(26,26,26,0.5) 50%, rgba(201,168,76,0.12) 100%)',
          }}
          aria-hidden="true"
        />
        {/* Gold accent */}
        <div
          style={{
            position: 'absolute',
            right: '-120px',
            top: '-120px',
            width: '480px',
            height: '480px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(201,168,76,0.15) 0%, transparent 70%)',
          }}
          aria-hidden="true"
        />

        {/* Hero image edit control */}
        {heroEditMode && (
          <div style={{ position: 'absolute', top: '80px', right: '24px', zIndex: 5, background: 'rgba(0,0,0,0.85)', borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span style={{ color: '#e8c96e', fontSize: '0.8rem', fontWeight: 600 }}>Replace hero background image</span>
            <button
              onClick={() => heroInputRef.current?.click()}
              style={{ background: 'linear-gradient(135deg,#c9a84c,#e8c96e)', color: '#1a1a1a', border: 'none', padding: '8px 16px', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', fontSize: '0.85rem' }}
            >
              Upload New Image
            </button>
            <button
              onClick={() => { setHeroImage(defaultHeroImage); setHeroEditMode(false); }}
              style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontSize: '0.8rem' }}
            >
              Reset to Default
            </button>
            <button
              onClick={() => setHeroEditMode(false)}
              style={{ background: 'transparent', color: '#888', border: 'none', cursor: 'pointer', fontSize: '0.8rem', marginTop: '4px' }}
            >
              Cancel
            </button>
          </div>
        )}

        <button
          onClick={() => setHeroEditMode(!heroEditMode)}
          style={{
            position: 'absolute', top: '80px', right: '24px', zIndex: heroEditMode ? 1 : 5,
            background: 'rgba(201,168,76,0.2)', border: '1px solid rgba(201,168,76,0.5)',
            color: '#e8c96e', borderRadius: '8px', padding: '8px 14px',
            cursor: 'pointer', fontSize: '0.75rem', fontWeight: 600,
            display: heroEditMode ? 'none' : 'block',
            opacity: 0.7, transition: 'opacity 0.2s',
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = '1'; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = '0.7'; }}
        >
          Edit Hero Image
        </button>

        <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '900px', margin: '0 auto', padding: '80px 24px 100px' }}>
          {/* Badge */}
          <div className="animate-fade-in" style={{ display: 'inline-block', background: 'rgba(201,168,76,0.15)', border: '1px solid rgba(201,168,76,0.4)', borderRadius: '100px', padding: '6px 20px', marginBottom: '24px' }}>
            <span style={{ color: '#c9a84c', fontSize: '13px', fontWeight: 600, letterSpacing: '0.08em' }}>
              SECTOR 48, GURGAON &bull; 20+ YEARS OF EXCELLENCE
            </span>
          </div>

          <h1 className="animate-fade-in-up delay-100" style={{ fontSize: 'clamp(2.2rem, 5.5vw, 3.8rem)', fontWeight: 800, color: '#fff', lineHeight: 1.1, marginBottom: '20px' }}>
            Transform Your Home with{' '}
            <span style={{ background: 'linear-gradient(90deg, #c9a84c, #e8c96e)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Premium Curtains
            </span>
            {' '}in Gurgaon
          </h1>

          <p className="animate-fade-in-up delay-200" style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)', color: 'rgba(255,255,255,0.8)', maxWidth: '620px', lineHeight: 1.7, marginBottom: '40px' }}>
            Custom Curtains, Sofa Upholstery &amp; Stylish Home Decor — Crafted with Precision at Affordable Prices
          </p>

          <div className="animate-fade-in-up delay-300" style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
            <a
              href={PHONE_HREF}
              className="pulse-gold"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '10px',
                background: 'linear-gradient(135deg, #c9a84c, #e8c96e)',
                color: '#1a1a1a', padding: '16px 36px', borderRadius: '50px',
                fontWeight: 700, fontSize: '1.05rem', textDecoration: 'none',
                boxShadow: '0 8px 30px rgba(201,168,76,0.4)',
                transition: 'transform 0.2s',
              }}
            >
              Call Now: {PHONE}
            </a>
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '10px',
                background: '#25D366', color: '#fff',
                padding: '16px 36px', borderRadius: '50px',
                fontWeight: 700, fontSize: '1.05rem', textDecoration: 'none',
                boxShadow: '0 8px 30px rgba(37,211,102,0.35)',
                transition: 'transform 0.2s',
              }}
            >
              WhatsApp Now
            </a>
          </div>
        </div>
      </section>

      {/* TRUST BADGES */}
      <section style={{ background: '#1a1a1a', padding: '28px 24px', borderBottom: '2px solid rgba(201,168,76,0.2)' }}>
        <div className="trust-badges" style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px 36px' }}>
          {[
            { icon: '🕐', label: '20+ Years Experience' },
            { icon: '😊', label: '1000+ Happy Customers' },
            { icon: '💎', label: 'Affordable Pricing' },
            { icon: '✏️', label: 'Custom Design Experts' },
          ].map((b) => (
            <div key={b.label} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '6px 0' }}>
              <span style={{ fontSize: '22px' }}>{b.icon}</span>
              <span style={{ fontWeight: 600, fontSize: '0.9rem', color: '#e8c96e' }}>{b.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" style={{ background: '#faf9f6', padding: '72px 24px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <div className="section-divider" />
            <h2 style={{ fontSize: 'clamp(1.7rem, 3vw, 2.4rem)', fontWeight: 700, color: '#1a1a1a', margin: '0 0 12px' }}>
              Our Services
            </h2>
            <p style={{ color: '#666', maxWidth: '540px', margin: '0 auto', lineHeight: 1.7 }}>
              From custom curtains to complete home furnishing — we do it all with precision and care.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
            {services.map((s) => (
              <div
                key={s.title}
                className="service-card"
                style={{
                  background: '#fff', borderRadius: '16px', padding: '32px 24px',
                  boxShadow: '0 2px 20px rgba(0,0,0,0.06)',
                  borderTop: '4px solid #c9a84c',
                  transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-6px)'; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 12px 40px rgba(201,168,76,0.18)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.transform = 'none'; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 2px 20px rgba(0,0,0,0.06)'; }}
              >
                <div style={{ fontSize: '40px', marginBottom: '14px' }}>{s.icon}</div>
                <h3 style={{ fontWeight: 700, fontSize: '1.05rem', marginBottom: '10px', color: '#1a1a1a' }}>{s.title}</h3>
                <p style={{ color: '#666', fontSize: '0.88rem', lineHeight: 1.65, margin: 0 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section style={{ padding: '72px 24px', background: '#fff' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: '48px', alignItems: 'center' }}>
          <div style={{ flex: '1 1 320px', minWidth: '280px' }}>
            <div className="section-divider" style={{ margin: '0 0 1.5rem' }} />
            <h2 style={{ fontSize: 'clamp(1.7rem, 3vw, 2.4rem)', fontWeight: 700, marginBottom: '16px' }}>
              Why Choose Xpert Furnishing?
            </h2>
            <p style={{ color: '#666', lineHeight: 1.7, marginBottom: '28px' }}>
              Gurgaon's most trusted home furnishing experts — delivering luxury results without luxury price tags.
            </p>
            <a href={PHONE_HREF} style={{ display: 'inline-block', background: 'linear-gradient(135deg, #c9a84c, #e8c96e)', color: '#1a1a1a', padding: '14px 30px', borderRadius: '50px', fontWeight: 700, textDecoration: 'none', fontSize: '0.95rem', transition: 'transform 0.2s' }}>
              Book Free Consultation
            </a>
          </div>
          <div style={{ flex: '1 1 320px' }}>
            {whyUs.map((w) => (
              <div key={w.point} style={{ display: 'flex', gap: '16px', marginBottom: '18px', alignItems: 'flex-start' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'linear-gradient(135deg, rgba(201,168,76,0.12), rgba(201,168,76,0.25))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', flexShrink: 0 }}>
                  {w.icon}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.97rem', marginBottom: '3px' }}>{w.point}</div>
                  <div style={{ color: '#666', fontSize: '0.88rem', lineHeight: 1.6 }}>{w.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" style={{ background: '#faf9f6', padding: '72px 24px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div className="section-divider" />
            <h2 style={{ fontSize: 'clamp(1.7rem, 3vw, 2.4rem)', fontWeight: 700, margin: '0 0 12px' }}>Our Work</h2>
            <p style={{ color: '#666', margin: '0 0 20px' }}>A glimpse of the beautiful spaces we've transformed in Gurgaon.</p>
            <button
              onClick={() => gallery.setEditMode(!gallery.editMode)}
              style={{
                background: gallery.editMode ? '#c9a84c' : 'transparent',
                color: gallery.editMode ? '#1a1a1a' : '#c9a84c',
                border: '2px solid #c9a84c',
                padding: '8px 20px',
                borderRadius: '50px',
                fontWeight: 600,
                fontSize: '0.82rem',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {gallery.editMode ? 'Done Editing' : 'Manage Images'}
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            {gallery.images.map((img) => (
              <div
                key={img.id}
                className="gallery-item"
                style={{
                  borderRadius: '12px',
                  overflow: 'hidden',
                  aspectRatio: '4/3',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  position: 'relative',
                }}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
                  onMouseEnter={(e) => { if (!gallery.editMode) (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.06)'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLImageElement).style.transform = 'none'; }}
                />

                {/* Hover overlay */}
                {!gallery.editMode && (
                  <div className="gallery-overlay" style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 50%)',
                    opacity: 0, transition: 'opacity 0.3s',
                    display: 'flex', alignItems: 'flex-end', padding: '16px',
                    pointerEvents: 'none',
                  }}>
                    <span style={{ color: '#fff', fontSize: '0.85rem', fontWeight: 500 }}>{img.alt}</span>
                  </div>
                )}

                {/* Edit controls */}
                {gallery.editMode && (
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'rgba(0,0,0,0.6)',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '10px',
                  }}>
                    <span style={{ color: '#e8c96e', fontSize: '0.75rem', fontWeight: 500, textAlign: 'center', padding: '0 12px' }}>
                      Replace this image with your project photo
                    </span>
                    <button
                      onClick={() => { setReplacingId(img.id); setTimeout(() => replaceInputRef.current?.click(), 0); }}
                      style={{ background: 'linear-gradient(135deg,#c9a84c,#e8c96e)', color: '#1a1a1a', border: 'none', padding: '8px 20px', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', fontSize: '0.82rem' }}
                    >
                      Replace Image
                    </button>
                    <button
                      onClick={() => gallery.removeImage(img.id)}
                      style={{ background: 'rgba(255,60,60,0.8)', color: '#fff', border: 'none', padding: '8px 20px', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', fontSize: '0.82rem' }}
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
            ))}

            {/* Add new image card */}
            {gallery.editMode && (
              <div
                onClick={() => galleryInputRef.current?.click()}
                style={{
                  borderRadius: '12px',
                  aspectRatio: '4/3',
                  border: '3px dashed rgba(201,168,76,0.4)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '12px',
                  cursor: 'pointer',
                  background: 'rgba(201,168,76,0.04)',
                  transition: 'border-color 0.2s, background 0.2s',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = '#c9a84c'; (e.currentTarget as HTMLDivElement).style.background = 'rgba(201,168,76,0.08)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(201,168,76,0.4)'; (e.currentTarget as HTMLDivElement).style.background = 'rgba(201,168,76,0.04)'; }}
              >
                <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(201,168,76,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', color: '#c9a84c' }}>+</div>
                <span style={{ color: '#c9a84c', fontWeight: 600, fontSize: '0.9rem' }}>Add New Image</span>
                <span style={{ color: '#999', fontSize: '0.75rem' }}>Upload your project photo</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section style={{ padding: '72px 24px', background: '#fff' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div className="section-divider" />
            <h2 style={{ fontSize: 'clamp(1.7rem, 3vw, 2.4rem)', fontWeight: 700 }}>What Our Customers Say</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
            {reviews.map((r) => (
              <div
                key={r.name}
                className="review-card"
                style={{
                  background: '#faf9f6', borderRadius: '16px', padding: '28px',
                  boxShadow: '0 2px 16px rgba(0,0,0,0.05)',
                  borderBottom: '3px solid #c9a84c',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 30px rgba(0,0,0,0.1)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.transform = 'none'; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 2px 16px rgba(0,0,0,0.05)'; }}
              >
                <Stars count={r.stars} />
                <p style={{ color: '#444', lineHeight: 1.7, margin: '14px 0', fontSize: '0.92rem' }}>"{r.text}"</p>
                <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{r.name}</div>
                <div style={{ color: '#888', fontSize: '0.82rem' }}>{r.location}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STRONG CTA */}
      <section style={{ background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2012 100%)', padding: '72px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(1.9rem, 4vw, 3rem)', fontWeight: 800, color: '#fff', marginBottom: '16px' }}>
            Upgrade Your Home{' '}
            <span style={{ background: 'linear-gradient(90deg,#c9a84c,#e8c96e)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Today!</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '1.05rem', marginBottom: '32px', lineHeight: 1.6 }}>
            Get a free on-site consultation. No obligations. Just beautiful results.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center' }}>
            <a href={PHONE_HREF} className="pulse-gold" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'linear-gradient(135deg,#c9a84c,#e8c96e)', color: '#1a1a1a', padding: '16px 36px', borderRadius: '50px', fontWeight: 700, fontSize: '1.05rem', textDecoration: 'none', boxShadow: '0 8px 30px rgba(201,168,76,0.4)' }}>
              Call Now: {PHONE}
            </a>
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: '#25D366', color: '#fff', padding: '16px 36px', borderRadius: '50px', fontWeight: 700, fontSize: '1.05rem', textDecoration: 'none', boxShadow: '0 8px 30px rgba(37,211,102,0.35)' }}>
              WhatsApp Now
            </a>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" style={{ padding: '72px 24px', background: '#faf9f6' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto', textAlign: 'center' }}>
          <div className="section-divider" />
          <h2 style={{ fontSize: 'clamp(1.7rem, 3vw, 2.4rem)', fontWeight: 700, marginBottom: '20px' }}>About Xpert Furnishing</h2>
          <p style={{ color: '#555', lineHeight: 1.85, fontSize: '1.02rem', margin: 0 }}>
            <strong>Xpert Furnishing</strong> is a trusted name in Gurgaon for premium curtains, sofa upholstery, and home decor solutions. With <strong>20+ years of experience</strong>, we focus on quality craftsmanship, modern designs, and complete customer satisfaction. Serving Sector 48 and across Gurgaon, we bring luxury home furnishing to every budget.
          </p>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ padding: '72px 24px', background: '#fff' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: '40px', alignItems: 'flex-start' }}>
          <div style={{ flex: '1 1 280px' }}>
            <div className="section-divider" style={{ margin: '0 0 1.5rem' }} />
            <h2 style={{ fontSize: 'clamp(1.7rem, 3vw, 2.2rem)', fontWeight: 700, marginBottom: '24px' }}>Contact Us</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                <span style={{ fontSize: '24px' }}>🏢</span>
                <div>
                  <div style={{ fontWeight: 700, marginBottom: '4px' }}>Xpert Furnishing</div>
                  <div style={{ color: '#555', fontSize: '0.95rem' }}>Sector 48, Gurgaon, Haryana, India</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <span style={{ fontSize: '24px' }}>📞</span>
                <div>
                  <div style={{ fontWeight: 600, marginBottom: '2px', fontSize: '0.82rem', color: '#888' }}>Call / WhatsApp</div>
                  <a href={PHONE_HREF} style={{ color: '#c9a84c', fontWeight: 700, fontSize: '1.1rem', textDecoration: 'none' }}>{PHONE}</a>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <span style={{ fontSize: '24px' }}>💬</span>
                <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" style={{ background: '#25D366', color: '#fff', padding: '10px 24px', borderRadius: '50px', fontWeight: 600, textDecoration: 'none', fontSize: '0.95rem', transition: 'transform 0.2s' }}>
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>
          <div style={{ flex: '2 1 380px', minWidth: '280px', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 24px rgba(0,0,0,0.1)' }}>
            <iframe
              title="Xpert Furnishing location - Sector 48, Gurgaon"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3511.0489854765237!2d77.0424!3d28.4189!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d18f40a04ba3b%3A0x8e4c3e94a8e14e2b!2sSector%2048%2C%20Gurugram%2C%20Haryana!5e0!3m2!1sen!2sin!4v1700000000000"
              width="100%"
              height="320"
              style={{ border: 0, display: 'block' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: '#1a1a1a', color: 'rgba(255,255,255,0.6)', textAlign: 'center', padding: '28px 24px 80px', fontSize: '0.88rem' }}>
        <p style={{ margin: 0 }}>&copy; {new Date().getFullYear()} Xpert Furnishing, Sector 48, Gurgaon. All rights reserved.</p>
        <p style={{ margin: '6px 0 0', color: 'rgba(255,255,255,0.35)', fontSize: '0.78rem' }}>
          Keywords: Curtains in Gurgaon &middot; Sofa Repair Gurgaon &middot; Home Furnishing Gurgaon &middot; Custom Curtains Gurgaon
        </p>
      </footer>

      {/* STICKY MOBILE CALL BAR */}
      <div className="mobile-sticky-call" style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 9999, background: 'linear-gradient(135deg, #c9a84c, #e8c96e)', padding: '12px 20px', display: 'none' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
          <a href={PHONE_HREF} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: '#1a1a1a', fontWeight: 800, fontSize: '0.95rem', textDecoration: 'none' }}>
            Call: {PHONE}
          </a>
          <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" style={{ background: '#25D366', color: '#fff', padding: '8px 18px', borderRadius: '50px', fontWeight: 700, fontSize: '0.82rem', textDecoration: 'none', whiteSpace: 'nowrap' }}>
            WhatsApp
          </a>
        </div>
      </div>

      {/* FLOATING WHATSAPP */}
      <a
        href={WHATSAPP}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="floating-wa"
        style={{
          position: 'fixed', bottom: '80px', right: '20px', zIndex: 9999,
          width: '56px', height: '56px', borderRadius: '50%',
          background: '#25D366',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '26px', boxShadow: '0 4px 20px rgba(37,211,102,0.5)',
          textDecoration: 'none',
          transition: 'transform 0.2s',
        }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1.1)'; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.transform = 'none'; }}
      >
        💬
      </a>

      {/* RESPONSIVE STYLES */}
      <style>{`
        * { box-sizing: border-box; margin: 0; }
        html { scroll-behavior: smooth; }

        /* Header responsive */
        @media (max-width: 480px) {
          .header-subtitle { display: none; }
          .header-btn-call, .header-btn-wa { padding: 8px 14px !important; font-size: 0.78rem !important; }
        }

        /* Mobile sticky bar */
        @media (max-width: 768px) {
          .mobile-sticky-call { display: block !important; }
          .floating-wa { bottom: 70px !important; }
        }

        /* Gallery hover overlay */
        .gallery-item:hover .gallery-overlay {
          opacity: 1 !important;
        }

        /* Smooth hover for cards */
        .service-card:active, .review-card:active {
          transform: translateY(-2px) !important;
        }

        /* Header button hover */
        .header-btn-call:hover, .header-btn-wa:hover {
          transform: scale(1.05);
        }

        /* Trust badges mobile */
        @media (max-width: 600px) {
          .trust-badges { gap: 8px 20px !important; }
          .trust-badges > div > span:last-child { font-size: 0.8rem !important; }
        }

        /* No extra space above header */
        body { margin: 0; padding: 0; }
      `}</style>
    </div>
  )
}
