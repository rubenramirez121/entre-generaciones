import { ChevronLeft, Shield, MapPin, Clock, MessageCircle, Phone, Camera, Edit3, Check } from 'lucide-react'
import { ME, USERS, COMPLETED } from '../data'

function OtherProfile({ user, onBack, onChat }) {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'transparent' }}>
      {/* Foto cabecera */}
      <div style={{ position: 'relative', height: 280, flexShrink: 0 }}>
        <img src={user.photo} alt={user.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, transparent 40%, #FAF6F1 100%)' }} />
        <button onClick={onBack} style={{
          position: 'absolute', top: 48, left: 16,
          background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(8px)',
          border: 'none', borderRadius: 14, padding: 10, cursor: 'pointer', display: 'flex',
        }}>
          <ChevronLeft size={24} color="#1C1712" />
        </button>
        <div style={{
          position: 'absolute', top: 48, right: 16,
          background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(8px)',
          borderRadius: 14, padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 6,
        }}>
          <Shield size={15} color="#16a34a" />
          <span style={{ color: '#16a34a', fontSize: 14, fontWeight: 800 }}>Verificado</span>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '0 20px 100px', marginTop: -12 }} className="screen-content">
        {/* Nombre y datos */}
        <div style={{ background: 'white', borderRadius: 22, border: '1.5px solid #EAD8CC', padding: 22, marginBottom: 14, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <h1 style={{ color: '#1C1712', fontSize: 28, fontWeight: 900, margin: '0 0 12px' }}>{user.name}</h1>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {[
              { label: `${user.age} años` },
              { label: user.area, icon: <MapPin size={14} /> },
              user.online ? { label: 'En línea', color: '#16a34a', bg: '#f0fdf4' } : null,
            ].filter(Boolean).map(({ label, icon, color = '#F08050', bg = '#FEF0E5' }) => (
              <span key={label} style={{ background: bg, color, fontSize: 15, fontWeight: 800, padding: '8px 14px', borderRadius: 50, display: 'flex', alignItems: 'center', gap: 5 }}>
                {icon}{label}
              </span>
            ))}
          </div>
        </div>

        {/* Paseo de hoy */}
        <div style={{ background: '#F08050', borderRadius: 22, padding: 22, marginBottom: 14, boxShadow: '0 4px 16px rgba(240,128,80,0.3)' }}>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 14, fontWeight: 600, margin: '0 0 4px' }}>Paseo de hoy</p>
          <p style={{ color: 'white', fontSize: 26, fontWeight: 900, margin: '0 0 8px' }}>{user.route}</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Clock size={15} color="rgba(255,255,255,0.8)" />
            <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: 15, fontWeight: 700 }}>Sale a las {user.time}</span>
          </div>
        </div>

        {/* Sobre mí */}
        <div style={{ background: 'white', borderRadius: 22, border: '1.5px solid #EAD8CC', padding: 22, marginBottom: 14, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <p style={{ color: '#6B4C3B', fontSize: 13, fontWeight: 700, margin: '0 0 8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Sobre mí</p>
          <p style={{ color: '#1C1712', fontSize: 17, fontWeight: 600, margin: 0, lineHeight: 1.5 }}>{user.description}</p>
        </div>

        {/* Verificación */}
        <div style={{ background: 'white', borderRadius: 22, border: '1.5px solid #EAD8CC', padding: 22, marginBottom: 22, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <p style={{ color: '#6B4C3B', fontSize: 13, fontWeight: 700, margin: '0 0 14px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Seguridad</p>
          {['Identidad comprobada', 'Sin incidencias reportadas', 'Miembro activo'].map(item => (
            <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
              <div style={{ background: '#dcfce7', borderRadius: '50%', padding: 5, display: 'flex', flexShrink: 0 }}>
                <Check size={13} color="#16a34a" strokeWidth={3} />
              </div>
              <span style={{ color: '#1C1712', fontSize: 16, fontWeight: 600 }}>{item}</span>
            </div>
          ))}
        </div>

        {/* Acciones */}
        <div style={{ display: 'flex', gap: 12 }}>
          <button onClick={() => onChat(user)} style={{
            flex: 1, background: '#F08050', color: 'white', border: 'none',
            borderRadius: 20, padding: '20px 0', fontSize: 19, fontWeight: 900,
            cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
            boxShadow: '0 4px 16px rgba(240,128,80,0.35)',
          }}>
            <MessageCircle size={24} /> Escribir
          </button>
          <button style={{
            background: 'white', border: '1.5px solid #EAD8CC', borderRadius: 20,
            padding: '20px 20px', cursor: 'pointer', display: 'flex', alignItems: 'center',
          }}>
            <Phone size={24} color="#1C1712" />
          </button>
        </div>
      </div>
    </div>
  )
}

function MyProfile() {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'transparent' }}>
      <div style={{ padding: '48px 20px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
        <h1 style={{ color: '#1C1712', fontSize: 30, fontWeight: 900, margin: 0, display: 'inline-block', background: 'rgba(255,255,255,0.45)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', borderRadius: 14, padding: '4px 16px' }}>👤 Mi Perfil</h1>
        <button style={{ background: 'white', border: '1.5px solid #EAD8CC', borderRadius: 14, padding: 10, cursor: 'pointer', display: 'flex', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <Edit3 size={22} color="#F08050" />
        </button>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '0 20px 100px' }} className="screen-content">
        {/* Foto + datos */}
        <div style={{ background: 'white', borderRadius: 22, border: '1.5px solid #EAD8CC', padding: 22, display: 'flex', alignItems: 'center', gap: 18, marginBottom: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <div style={{ position: 'relative', flexShrink: 0 }}>
            <img src={ME.photo} alt={ME.name}
              style={{ width: 88, height: 88, borderRadius: 20, objectFit: 'cover' }} />
            <button style={{ position: 'absolute', bottom: -6, right: -6, background: '#F08050', border: 'none', borderRadius: 12, padding: 7, cursor: 'pointer', display: 'flex', boxShadow: '0 2px 8px rgba(240,128,80,0.4)' }}>
              <Camera size={15} color="white" />
            </button>
          </div>
          <div>
            <h2 style={{ color: '#1C1712', fontSize: 24, fontWeight: 900, margin: '0 0 6px' }}>{ME.name}</h2>
            <p style={{ color: '#6B4C3B', fontSize: 16, fontWeight: 600, margin: '0 0 6px' }}>{ME.age} años · {ME.area}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <Shield size={14} color="#16a34a" />
              <span style={{ color: '#16a34a', fontSize: 14, fontWeight: 700 }}>Verificado</span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 16 }}>
          {[{ label: 'Rutas', value: ME.routes }, { label: 'Contactos', value: ME.friends }].map(({ label, value }) => (
            <div key={label} style={{ background: 'white', borderRadius: 20, border: '1.5px solid #EAD8CC', padding: '18px 0', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
              <p style={{ color: '#F08050', fontSize: 36, fontWeight: 900, margin: '0 0 4px' }}>{value}</p>
              <p style={{ color: '#6B4C3B', fontSize: 15, fontWeight: 600, margin: 0 }}>{label}</p>
            </div>
          ))}
        </div>

        {/* Rutas completadas */}
        <h3 style={{ color: '#1C1712', fontSize: 26, fontWeight: 900, margin: '0 0 14px', display: 'inline-block', background: 'rgba(255,255,255,0.45)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', borderRadius: 14, padding: '4px 14px' }}>📸 Recuerdos</h3>
        <div style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 8, marginLeft: -20, paddingLeft: 20, marginRight: -20, paddingRight: 20 }}>
          {COMPLETED.map(item => {
            const partner = USERS.find(u => u.id === item.partnerId)
            return (
              <div key={item.id} style={{ position: 'relative', flexShrink: 0, width: 158, height: 220, borderRadius: 22, overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.18)' }}>
                <img
                  src={item.photo}
                  onError={e => { e.target.onerror = null; e.target.src = item.fallback }}
                  alt={item.routeName}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
                />
                {/* Gradiente inferior */}
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 45%, rgba(0,0,0,0.75) 100%)' }} />
                {/* Info */}
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '12px 12px 14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: -6, marginBottom: 8 }}>
                    <img src={ME.photo} alt={ME.name}
                      style={{ width: 32, height: 32, borderRadius: '50%', objectFit: 'cover', border: '2px solid white', zIndex: 2 }} />
                    {partner && (
                      <img src={partner.photo} alt={partner.name}
                        style={{ width: 32, height: 32, borderRadius: '50%', objectFit: 'cover', border: '2px solid white', marginLeft: -10, zIndex: 1 }} />
                    )}
                  </div>
                  <p style={{ color: 'white', fontSize: 13, fontWeight: 800, margin: '0 0 2px', lineHeight: 1.2 }}>{item.routeName}</p>
                  <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12, fontWeight: 600, margin: 0 }}>{item.date} · con {partner?.name}</p>
                </div>
                {/* Badge completada */}
                <div style={{ position: 'absolute', top: 10, right: 10, background: 'rgba(22,163,74,0.9)', backdropFilter: 'blur(4px)', borderRadius: 20, padding: '4px 9px', display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Check size={11} color="white" strokeWidth={3} />
                  <span style={{ color: 'white', fontSize: 11, fontWeight: 800 }}>Hecha</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default function ProfileScreen({ viewUser, onBack, onChat }) {
  if (viewUser) return <OtherProfile user={viewUser} onBack={onBack} onChat={onChat} />
  return <MyProfile />
}
