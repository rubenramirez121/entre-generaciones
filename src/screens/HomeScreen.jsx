import { useState } from 'react'
import { Search, Plus, MapPin, Clock, ChevronRight, Users, X, Check, Trash2 } from 'lucide-react'
import { USERS, ROUTES, ME } from '../data'
import Logo from '../components/Logo'

const LUGARES = ['Parque de la Cañada', 'Paseo de la Chopera', 'Ruta del Río Jarama', 'Jardines de la Villa', 'Parque del Retiro', 'Paseo de la Castellana']
const HORAS   = ['08:00','08:30','09:00','09:30','10:00','10:30','11:00','11:30','12:00']

function CrearRutaModal({ onClose, onCrear }) {
  const [lugar, setLugar]     = useState('')
  const [hora, setHora]       = useState('')
  const [publicada, setPublicada] = useState(false)

  function publicar() {
    if (!lugar || !hora) return
    onCrear({ lugar, hora })
    setPublicada(true)
    setTimeout(onClose, 1800)
  }

  if (publicada) return (
    <div style={{ position: 'absolute', inset: 0, background: 'white', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ background: 'white', borderRadius: 28, padding: 40, textAlign: 'center', width: '100%', maxWidth: 360 }}>
        <div style={{ width: 72, height: 72, borderRadius: '50%', background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
          <Check size={36} color="#16a34a" strokeWidth={3} />
        </div>
        <h2 style={{ color: '#1C1712', fontSize: 26, fontWeight: 900, margin: '0 0 10px' }}>¡Ruta publicada!</h2>
        <p style={{ color: '#6B4C3B', fontSize: 17, fontWeight: 600, margin: 0 }}>Tu ruta por <strong>{lugar}</strong> a las <strong>{hora}</strong> ya es visible para todos.</p>
      </div>
    </div>
  )

  return (
    <div style={{ position: 'absolute', inset: 0, background: 'white', zIndex: 100, display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        {/* Cabecera fija */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '22px 20px 14px', flexShrink: 0 }}>
          <h2 style={{ color: '#1C1712', fontSize: 22, fontWeight: 900, margin: 0 }}>Nueva ruta</h2>
          <button onClick={onClose} style={{ background: '#F5F0EA', border: 'none', borderRadius: 12, padding: 8, cursor: 'pointer', display: 'flex' }}>
            <X size={20} color="#6B4C3B" />
          </button>
        </div>

        {/* Contenido con scroll */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '0 20px 16px' }}>
          {/* Lugar */}
          <p style={{ color: '#6B4C3B', fontSize: 13, fontWeight: 700, margin: '0 0 10px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            <MapPin size={13} style={{ marginRight: 5, verticalAlign: 'middle' }} />Lugar del paseo
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
            {LUGARES.map(l => (
              <button key={l} onClick={() => setLugar(l)} style={{
                background: lugar === l ? '#F08050' : '#FAF6F1',
                color: lugar === l ? 'white' : '#1C1712',
                border: lugar === l ? 'none' : '1.5px solid #EAD8CC',
                borderRadius: 14, padding: '13px 16px', fontSize: 17, fontWeight: 700,
                cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit',
              }}>{l}</button>
            ))}
          </div>

          {/* Hora */}
          <p style={{ color: '#6B4C3B', fontSize: 13, fontWeight: 700, margin: '0 0 10px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            <Clock size={13} style={{ marginRight: 5, verticalAlign: 'middle' }} />Hora de salida
          </p>
          <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }}>
            {HORAS.map(h => (
              <button key={h} onClick={() => setHora(h)} style={{
                flexShrink: 0,
                background: hora === h ? '#F08050' : '#FAF6F1',
                color: hora === h ? 'white' : '#1C1712',
                border: hora === h ? 'none' : '1.5px solid #EAD8CC',
                borderRadius: 12, padding: '12px 14px', fontSize: 16, fontWeight: 700,
                cursor: 'pointer', fontFamily: 'inherit',
              }}>{h}</button>
            ))}
          </div>
        </div>

        {/* Botón fuera del scroll, siempre visible */}
        <div style={{ flexShrink: 0, padding: '12px 20px', paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 90px)', background: 'white', borderTop: '1.5px solid #EAD8CC' }}>
          <button onClick={publicar} style={{
            width: '100%', background: lugar && hora ? '#F08050' : '#DDD0C4',
            color: 'white', border: 'none', borderRadius: 18,
            padding: '18px 0', fontSize: 19, fontWeight: 900,
            cursor: lugar && hora ? 'pointer' : 'default', fontFamily: 'inherit',
            boxShadow: lugar && hora ? '0 4px 16px rgba(240,128,80,0.35)' : 'none',
          }}>
            CREAR RUTA
          </button>
        </div>
      </div>
    </div>
  )
}

const ROUTE_COLORS = ['#4A7C59', '#2D6A8F', '#7B4F9E', '#8B5E3C']

function RouteCard({ route, color, onSelect }) {
  const going = USERS.filter(u => route.going.includes(u.id))
  return (
    <button
      onClick={() => going[0] && onSelect(going[0])}
      style={{
        flexShrink: 0, width: 180, borderRadius: 20, border: 'none',
        background: color, padding: 18, cursor: 'pointer', textAlign: 'left',
        display: 'flex', flexDirection: 'column', gap: 8, boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
      }}
    >
      <MapPin size={22} color="rgba(255,255,255,0.9)" />
      <p style={{ color: 'white', fontSize: 16, fontWeight: 800, margin: 0, lineHeight: 1.3 }}>{route.name}</p>
      <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 14, fontWeight: 600, margin: 0 }}>{route.distance} · {route.duration}</p>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <Users size={13} color="rgba(255,255,255,0.8)" />
        <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13, fontWeight: 700 }}>{going.length} personas</span>
      </div>
    </button>
  )
}

function ActivityRow({ user, onSelect }) {
  return (
    <button
      onClick={() => onSelect(user)}
      style={{
        width: '100%', display: 'flex', alignItems: 'center', gap: 16,
        background: 'white', borderRadius: 20, padding: '16px 18px',
        border: '1.5px solid #EAD8CC', cursor: 'pointer', textAlign: 'left',
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
      }}
    >
      <div style={{ position: 'relative', flexShrink: 0 }}>
        <img src={user.photo} alt={user.name}
          style={{ width: 60, height: 60, borderRadius: 16, objectFit: 'cover' }} />
        {user.online && (
          <span className="pulse-dot" style={{
            position: 'absolute', bottom: -2, right: -2,
            width: 14, height: 14, borderRadius: '50%',
            background: '#4ade80', border: '2px solid white',
          }} />
        )}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ color: '#1C1712', fontSize: 17, fontWeight: 800, margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {user.route}
        </p>
        <p style={{ color: '#6B4C3B', fontSize: 15, fontWeight: 600, margin: '3px 0 0' }}>
          {user.name}, {user.age} años
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 5 }}>
          <Clock size={14} color="#F08050" />
          <span style={{ color: '#F08050', fontSize: 15, fontWeight: 800 }}>Sale a las {user.time}</span>
        </div>
      </div>
      <ChevronRight size={20} color="#F08050" style={{ flexShrink: 0 }} />
    </button>
  )
}

export default function HomeScreen({ onOpenUser, onMap }) {
  const saliendo = USERS.filter(u => u.online)
  const [crearOpen, setCrearOpen]     = useState(false)
  const [misRutas, setMisRutas]       = useState([])
  const [deleteMode, setDeleteMode]   = useState(false)
  const [selected, setSelected]       = useState([])

  function handleCrear(ruta) {
    setMisRutas(prev => [{ id: Date.now(), ...ruta }, ...prev])
  }

  function toggleSelect(id) {
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  }

  function eliminarSeleccionadas() {
    setMisRutas(prev => prev.filter(r => !selected.includes(r.id)))
    setSelected([])
    setDeleteMode(false)
  }

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'transparent', position: 'relative' }}>
      {crearOpen && <CrearRutaModal onClose={() => setCrearOpen(false)} onCrear={handleCrear} />}

      {/* Header naranja compacto centrado */}
      <div style={{
        background: 'linear-gradient(135deg, #F08050 0%, #E8603A 50%, rgba(240,128,80,0.85) 100%)', padding: '14px 20px 12px',
        borderRadius: '0 0 18px 18px', flexShrink: 0,
        display: 'flex', alignItems: 'center', gap: 14,
      }}>
        <Logo size={42} />
        <div>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: 15, fontWeight: 600, margin: 0 }}>Buenos días,</p>
          <h1 style={{ color: 'white', fontSize: 26, fontWeight: 900, margin: 0, lineHeight: 1.2 }}><span style={{ opacity: 0.75 }}>👋 </span>{ME.name}</h1>
        </div>
      </div>

      {/* Scroll */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '20px 20px 100px' }} className="screen-content">

        {/* Botón buscar ruta */}
        <button onClick={onMap} style={{
          width: '100%', background: 'white', border: '1.5px solid #EAD8CC', borderRadius: 20,
          padding: '16px 20px', cursor: 'pointer', textAlign: 'left',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24,
        }}>
          <div style={{ background: '#FEF0E5', borderRadius: 14, padding: 10, display: 'flex', flexShrink: 0 }}>
            <Search size={24} color="#F08050" />
          </div>
          <div>
            <p style={{ color: '#1C1712', fontSize: 18, fontWeight: 900, margin: 0 }}>Buscar ruta</p>
            <p style={{ color: '#6B4C3B', fontSize: 14, fontWeight: 600, margin: '2px 0 0' }}>Ver el mapa interactivo</p>
          </div>
        </button>

        {/* Mis rutas */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
          <h2 style={{ color: '#1C1712', fontSize: 26, fontWeight: 900, margin: 0, background: 'rgba(255,255,255,0.45)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', borderRadius: 14, padding: '4px 14px' }}><span style={{ opacity: 0.65 }}>📍 </span>Mis rutas</h2>
          <div style={{ display: 'flex', gap: 8 }}>
            {!deleteMode ? <>
              <button onClick={() => setCrearOpen(true)} style={{
                background: '#F08050', border: 'none', borderRadius: 12,
                padding: '8px 14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5,
                boxShadow: '0 3px 10px rgba(240,128,80,0.35)',
              }}>
                <Plus size={16} color="white" />
                <span style={{ color: 'white', fontSize: 14, fontWeight: 800, fontFamily: 'inherit' }}>Nueva</span>
              </button>
              {misRutas.length > 0 &&
                <button onClick={() => { setDeleteMode(true); setSelected([]) }} style={{
                  background: 'white', border: '1.5px solid #EAD8CC', borderRadius: 12,
                  padding: '8px 14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5,
                }}>
                  <span style={{ color: '#6B4C3B', fontSize: 14, fontWeight: 800, fontFamily: 'inherit' }}>Eliminar</span>
                </button>
              }
            </> : <>
              <button onClick={() => { setDeleteMode(false); setSelected([]) }} style={{
                background: 'white', border: '1.5px solid #EAD8CC', borderRadius: 12,
                padding: '8px 14px', cursor: 'pointer', fontFamily: 'inherit',
                color: '#6B4C3B', fontSize: 14, fontWeight: 800,
              }}>Cancelar</button>
              <button onClick={eliminarSeleccionadas} disabled={selected.length === 0} style={{
                background: selected.length > 0 ? '#dc2626' : '#EAD8CC', border: 'none', borderRadius: 12,
                padding: '8px 14px', cursor: selected.length > 0 ? 'pointer' : 'default', fontFamily: 'inherit',
                color: 'white', fontSize: 14, fontWeight: 800,
              }}>Borrar {selected.length > 0 ? `(${selected.length})` : ''}</button>
            </>}
          </div>
        </div>

        {misRutas.length === 0 ? (
          <div style={{ background: 'white', borderRadius: 20, border: '1.5px dashed #EAD8CC', padding: '24px 20px', textAlign: 'center', marginBottom: 28 }}>
            <p style={{ color: '#6B4C3B', fontSize: 16, fontWeight: 600, margin: 0 }}>Aún no tienes rutas creadas</p>
            <p style={{ color: '#F08050', fontSize: 15, fontWeight: 700, margin: '6px 0 0' }}>Pulsa "Nueva" para empezar</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
            {misRutas.map(r => {
              const sel = selected.includes(r.id)
              return (
                <div key={r.id} onClick={() => deleteMode && toggleSelect(r.id)} style={{
                  background: sel ? '#FEF0E5' : 'white', borderRadius: 20,
                  border: sel ? '2px solid #F08050' : '1.5px solid #EAD8CC',
                  padding: '16px 18px', display: 'flex', alignItems: 'center', gap: 14,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.05)', cursor: deleteMode ? 'pointer' : 'default',
                }}>
                  {deleteMode && (
                    <div style={{
                      width: 24, height: 24, borderRadius: '50%', flexShrink: 0,
                      border: sel ? 'none' : '2px solid #EAD8CC',
                      background: sel ? '#F08050' : 'white',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      {sel && <Check size={14} color="white" strokeWidth={3} />}
                    </div>
                  )}
                  <div style={{ background: '#FEF0E5', borderRadius: 14, padding: 12, flexShrink: 0, display: 'flex' }}>
                    <MapPin size={22} color="#F08050" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ color: '#1C1712', fontSize: 17, fontWeight: 800, margin: '0 0 3px' }}>{r.lugar}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                      <Clock size={14} color="#F08050" />
                      <span style={{ color: '#F08050', fontSize: 14, fontWeight: 800 }}>Sale a las {r.hora}</span>
                    </div>
                  </div>
                  {!deleteMode && <span style={{ background: '#dcfce7', color: '#16a34a', fontSize: 13, fontWeight: 800, padding: '6px 12px', borderRadius: 50 }}>Publicada</span>}
                </div>
              )
            })}
          </div>
        )}

        {/* Rutas disponibles */}
        <h2 style={{ color: '#1C1712', fontSize: 26, fontWeight: 900, margin: '0 0 14px', display: 'inline-block', background: 'rgba(255,255,255,0.45)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', borderRadius: 14, padding: '4px 14px' }}><span style={{ opacity: 0.65 }}>🌅 </span>Rutas de hoy</h2>
        <div style={{ display: 'flex', gap: 14, overflowX: 'auto', paddingBottom: 4, marginBottom: 28 }}>
          {ROUTES.map((route, i) => (
            <RouteCard key={route.id} route={route} color={ROUTE_COLORS[i]} onSelect={onOpenUser} />
          ))}
        </div>

        {/* Saliendo ahora */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
          <h2 style={{ color: '#1C1712', fontSize: 26, fontWeight: 900, margin: 0, background: 'rgba(255,255,255,0.45)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', borderRadius: 14, padding: '4px 14px' }}><span style={{ opacity: 0.65 }}>🚶 </span>Saliendo hoy</h2>
          <span style={{ color: '#F08050', fontSize: 15, fontWeight: 800, textShadow: '0 1px 6px rgba(255,255,255,0.95)' }}>{saliendo.length} personas</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {saliendo.map(user => (
            <ActivityRow key={user.id} user={user} onSelect={onOpenUser} />
          ))}
        </div>
      </div>
    </div>
  )
}
