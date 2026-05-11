import { useState, useRef, useEffect, useCallback } from 'react'
import { Phone } from 'lucide-react'
import { USERS } from '../data'

function CityMap({ onSelect }) {
  const [zoom, setZoom] = useState(1)
  const pinchRef = useRef(null)

  const svgRef = useRef(null)
  const clamp = (v, min, max) => Math.min(Math.max(v, min), max)
  const viewSize = 100 / zoom
  const viewOffset = (100 - viewSize) / 2
  const viewBox = `${viewOffset} ${viewOffset} ${viewSize} ${viewSize}`

  function handleTouchStart(e) {
    if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX
      const dy = e.touches[0].clientY - e.touches[1].clientY
      pinchRef.current = Math.hypot(dx, dy)
    }
  }
  const handleTouchMove = useCallback((e) => {
    if (e.touches.length === 2 && pinchRef.current) {
      e.preventDefault()
      const dx = e.touches[0].clientX - e.touches[1].clientX
      const dy = e.touches[0].clientY - e.touches[1].clientY
      const dist = Math.hypot(dx, dy)
      const delta = dist / pinchRef.current
      pinchRef.current = dist
      setZoom(z => clamp(z * delta, 1, 4))
    }
  }, [])
  function handleTouchEnd() { pinchRef.current = null }

  useEffect(() => {
    const el = svgRef.current
    if (!el) return
    el.addEventListener('touchmove', handleTouchMove, { passive: false })
    return () => el.removeEventListener('touchmove', handleTouchMove)
  }, [handleTouchMove])

  const pins = [
    { user: USERS[0], x: 62, y: 38 },
    { user: USERS[1], x: 48, y: 55 },
    { user: USERS[4], x: 72, y: 62 },
    { user: USERS[6], x: 35, y: 45 },
  ]
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <svg ref={svgRef} viewBox={viewBox} preserveAspectRatio="xMidYMid slice" style={{ width: '100%', height: '100%', display: 'block' }}
        onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
      {/* Fondo base */}
      <rect width="100" height="100" fill="#E8E0D8"/>

      {/* Manzanas / bloques de edificios */}
      {[
        [5,5,14,10],[22,5,16,8],[42,5,12,9],[57,5,10,8],[70,5,18,9],[91,5,6,10],
        [5,18,9,13],[17,18,12,10],[32,18,8,7],[85,18,12,11],
        [5,45,8,16],[88,42,9,14],
        [5,65,14,14],[22,67,12,12],[55,68,11,11],[70,65,14,14],[87,65,10,14],
        [5,82,14,13],[22,83,13,11],[57,82,10,12],[70,82,11,12],[84,82,13,13],
      ].map(([x,y,w,h],i) => (
        <rect key={i} x={x} y={y} width={w} height={h} rx="1.5"
          fill={['#CFC0B2','#C4B4A5','#BAA898','#D4C5B5'][i%4]}/>
      ))}

      {/* Calles principales horizontales */}
      <rect x="0" y="32" width="100" height="5" fill="#F0EBE4"/>
      <rect x="0" y="58" width="100" height="5" fill="#F0EBE4"/>
      <rect x="0" y="79" width="100" height="4" fill="#F0EBE4"/>

      {/* Calles principales verticales */}
      <rect x="17" y="0" width="5" height="100" fill="#F0EBE4"/>
      <rect x="44" y="0" width="4" height="100" fill="#F0EBE4"/>
      <rect x="68" y="0" width="5" height="100" fill="#F0EBE4"/>
      <rect x="86" y="0" width="4" height="100" fill="#F0EBE4"/>

      {/* Líneas centrales de calle */}
      {[34.5, 60.5, 81].map(y => (
        <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="#DDD5CC" strokeWidth="0.4" strokeDasharray="3,3"/>
      ))}
      {[19.5, 46, 70.5, 88].map(x => (
        <line key={x} x1={x} y1="0" x2={x} y2="100" stroke="#DDD5CC" strokeWidth="0.4" strokeDasharray="3,3"/>
      ))}

      {/* Parque central */}
      <rect x="22" y="37" width="20" height="19" rx="3" fill="#A8C878"/>
      <rect x="23" y="38" width="18" height="17" rx="2" fill="#B8D488"/>
      {/* Árboles en el parque */}
      {[[26,42],[30,42],[34,42],[38,42],[26,50],[30,50],[34,50],[38,50]].map(([x,y],i)=>(
        <circle key={i} cx={x} cy={y} r="2.5" fill="#7EAD58" opacity="0.85"/>
      ))}
      <text x="32" y="47" textAnchor="middle" dominantBaseline="middle" fontSize="2.8" fill="#5A8040" fontWeight="bold">PARQUE</text>

      {/* Pequeña zona verde 2 */}
      <rect x="48" y="37" width="18" height="19" rx="2" fill="#B4CC80" opacity="0.7"/>
      {[[52,42],[56,42],[60,42],[52,49],[56,49],[60,49]].map(([x,y],i)=>(
        <circle key={i} cx={x} cy={y} r="2" fill="#8AAD50" opacity="0.8"/>
      ))}

      {/* Sombras suaves bajo edificios altos */}
      {[[5,15,14,3],[22,13,16,3],[70,14,18,3]].map(([x,y,w,h],i)=>(
        <rect key={i} x={x} y={y} width={w} height={h} fill="rgba(0,0,0,0.04)"/>
      ))}

      {/* Pins de usuarios */}
      {pins.map(({ user, x, y }) => (
        <g key={user.id} style={{ cursor: 'pointer' }} onClick={() => onSelect(user)}>
          {/* Onda pulsante */}
          <circle cx={x} cy={y} r="5.5" fill="none" stroke="#F08050" strokeWidth="1">
            <animate attributeName="r" values="5.5;11;5.5" dur="2.5s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.6;0;0.6" dur="2.5s" repeatCount="indefinite"/>
          </circle>
          {/* Pin sombra */}
          <ellipse cx={x} cy={y+7} rx="3.5" ry="1.2" fill="rgba(0,0,0,0.15)"/>
          {/* Pin cuerpo */}
          <path d={`M${x},${y+6.5} C${x-4},${y+3} ${x-4},${y-4} ${x},${y-6} C${x+4},${y-4} ${x+4},${y+3} ${x},${y+6.5}Z`}
            fill="#F08050"/>
          <text x={x} y={y-2} textAnchor="middle" dominantBaseline="middle" fontSize="3" fill="white" fontWeight="bold">{user.name[0]}</text>
        </g>
      ))}

      {/* Pin del usuario actual */}
      <ellipse cx="50" cy="69" rx="3" ry="1" fill="rgba(0,0,0,0.2)"/>
      <path d="M50,68 C46,65 46,58 50,56 C54,58 54,65 50,68Z" fill="#1C1712"/>
      <circle cx="50" cy="61" r="1.2" fill="white"/>

      {/* Brújula */}
      <g transform="translate(92, 8)">
        <circle cx="0" cy="0" r="4.5" fill="white" opacity="0.9"/>
        <text x="0" y="-1.5" textAnchor="middle" dominantBaseline="middle" fontSize="3" fill="#F08050" fontWeight="bold">N</text>
        <line x1="0" y1="-4" x2="0" y2="4" stroke="#CCC" strokeWidth="0.4"/>
        <line x1="-4" y1="0" x2="4" y2="0" stroke="#CCC" strokeWidth="0.4"/>
      </g>
    </svg>
    {/* Botones zoom */}
    <div style={{ position: 'absolute', bottom: 10, right: 10, display: 'flex', flexDirection: 'column', gap: 6 }}>
      <button onClick={() => setZoom(z => clamp(z * 1.4, 1, 4))} style={{
        width: 36, height: 36, borderRadius: 10, border: 'none',
        background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(8px)',
        fontSize: 22, fontWeight: 900, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
      }}>+</button>
      <button onClick={() => setZoom(z => clamp(z / 1.4, 1, 4))} style={{
        width: 36, height: 36, borderRadius: 10, border: 'none',
        background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(8px)',
        fontSize: 22, fontWeight: 900, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
      }}>−</button>
    </div>
    </div>
  )
}

export default function MapScreen({ onChat, onOpenUser }) {
  const nearby = USERS.filter(u => u.online).slice(0, 3)

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'transparent' }}>

      {/* Header */}
      <div style={{ padding: '48px 20px 14px', flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 6 }}>
        <h1 style={{ color: '#1C1712', fontSize: 30, fontWeight: 900, margin: 0, display: 'inline-block', background: 'rgba(255,255,255,0.45)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', borderRadius: 14, padding: '4px 16px' }}><span style={{ opacity: 0.65 }}>🗺️ </span>Mapa</h1>
        <p style={{ color: '#1C1712', fontSize: 20, fontWeight: 600, margin: 0, display: 'inline-block', background: 'rgba(255,255,255,0.45)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', borderRadius: 12, padding: '3px 14px' }}>Personas cerca ahora</p>
      </div>

      {/* Mapa grande full-width */}
      <div style={{ margin: '0 12px', borderRadius: 22, overflow: 'hidden', flexShrink: 0, height: 320, boxShadow: '0 4px 20px rgba(0,0,0,0.18)' }}>
        <CityMap onSelect={onOpenUser} />
      </div>

      {/* Leyenda */}
      <div style={{ display: 'flex', gap: 20, padding: '10px 20px 0', flexShrink: 0, alignSelf: 'flex-start', marginLeft: 16, background: 'rgba(255,255,255,0.45)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', borderRadius: 12, padding: '6px 14px' }}>
        {[{ color: '#F08050', label: 'Acompañantes' }, { color: '#1C1712', label: 'Tú' }].map(({ color, label }) => (
          <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: color }} />
            <span style={{ color: '#1C1712', fontSize: 18, fontWeight: 600, textShadow: '0 1px 6px rgba(255,255,255,0.95)' }}>{label}</span>
          </div>
        ))}
      </div>

      {/* Lista usuarios */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '14px 16px 100px' }} className="screen-content">
        <h2 style={{ color: '#1C1712', fontSize: 26, fontWeight: 900, margin: '0 0 12px', display: 'inline-block', background: 'rgba(255,255,255,0.45)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', borderRadius: 14, padding: '4px 14px' }}><span style={{ opacity: 0.65 }}>📍 </span>En tu zona</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {nearby.map(user => (
            <div key={user.id} style={{ background: 'white', borderRadius: 20, border: '1.5px solid #EAD8CC', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
              <button onClick={() => onOpenUser(user)} style={{ border: 'none', background: 'none', cursor: 'pointer', position: 'relative', padding: 0, flexShrink: 0 }}>
                <img src={user.photo} alt={user.name} style={{ width: 56, height: 56, borderRadius: 14, objectFit: 'cover', display: 'block' }} />
                <span className="pulse-dot" style={{ position: 'absolute', bottom: -1, right: -1, width: 12, height: 12, borderRadius: '50%', background: '#4ade80', border: '2px solid white' }} />
              </button>
              <button onClick={() => onOpenUser(user)} style={{ flex: 1, textAlign: 'left', border: 'none', background: 'none', cursor: 'pointer', padding: 0, minWidth: 0 }}>
                <p style={{ color: '#1C1712', fontSize: 18, fontWeight: 900, margin: '0 0 2px' }}>{user.name}</p>
                <p style={{ color: '#6B4C3B', fontSize: 14, fontWeight: 600, margin: '0 0 3px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user.route}</p>
                <p style={{ color: '#F08050', fontSize: 14, fontWeight: 800, margin: 0 }}>Sale a las {user.time}</p>
              </button>
              <button onClick={() => onChat(user)} style={{ background: '#F08050', border: 'none', borderRadius: 13, padding: 11, cursor: 'pointer', display: 'flex', flexShrink: 0 }}>
                <Phone size={20} color="white" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
