import Logo from '../components/Logo'

export default function WelcomeScreen({ onEnter }) {
  return (
    <div style={{
      minHeight: '100dvh',
      background: '#F08050',
      display: 'flex',
      flexDirection: 'column',
      overflowY: 'auto',
      position: 'relative',
    }}>

      {/* ── FOTO con fade al naranja ── */}
      <div style={{ position: 'relative', height: '50dvh', flexShrink: 0 }}>
        <img
          src="/hero.jpg"
          alt="Acompañamiento intergeneracional"
          style={{
            width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'center 50%',
            display: 'block',
          }}
        />
        {/* Degradado: foto clara arriba → naranja puro abajo */}
        <div style={{
          position: 'absolute', inset: 0,
          background: `linear-gradient(
            to bottom,
            rgba(240,128,80,0)   0%,
            rgba(240,128,80,0)   30%,
            rgba(240,128,80,0.45) 58%,
            rgba(240,128,80,0.82) 78%,
            #F08050              100%
          )`,
        }} />
        {/* Suave blur en el borde de transición */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 80,
          backdropFilter: 'blur(6px)',
          WebkitBackdropFilter: 'blur(6px)',
          maskImage: 'linear-gradient(to bottom, transparent, black)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent, black)',
          background: 'rgba(240,128,80,0.3)',
        }} />
      </div>

      {/* ── ZONA NARANJA: logo + botones ── */}
      <div style={{
        flex: 1,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'space-between',
        padding: '12px 28px 40px',
      }}>

        {/* Logo + nombre */}
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <Logo size={60} />
          <div>
            <h1 style={{
              color: 'white', fontSize: 34, fontWeight: 900,
              lineHeight: 1.1, margin: 0, letterSpacing: '-0.5px',
            }}>
              Entre Generaciones
            </h1>
            <p style={{
              color: 'rgba(255,255,255,0.7)',
              fontSize: 15, fontWeight: 600, margin: '6px 0 0',
            }}>
              Paseos acompañados · Seguros · Locales
            </p>
          </div>
        </div>

        {/* Botones */}
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 14 }}>
          <button
            onClick={onEnter}
            style={{
              width: '100%', background: 'white', color: '#F08050',
              fontSize: 22, fontWeight: 900, padding: '18px 0',
              borderRadius: 22, border: 'none', cursor: 'pointer',
              fontFamily: 'inherit', letterSpacing: '0.5px',
              boxShadow: '0 6px 24px rgba(0,0,0,0.15)',
            }}
          >
            ENTRAR
          </button>

          <button
            onClick={onEnter}
            style={{
              width: '100%',
              background: 'rgba(255,255,255,0.18)',
              color: 'white',
              fontSize: 20, fontWeight: 700, padding: '18px 0',
              borderRadius: 22,
              border: '2px solid rgba(255,255,255,0.4)',
              cursor: 'pointer', fontFamily: 'inherit',
            }}
          >
            Crear cuenta
          </button>
        </div>
      </div>

    </div>
  )
}
