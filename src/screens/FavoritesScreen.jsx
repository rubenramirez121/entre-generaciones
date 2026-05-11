import { Star, MessageCircle, Phone, Shield } from 'lucide-react'
import { USERS } from '../data'

function ContactCard({ user, onChat, onProfile }) {
  return (
    <div style={{ background: 'white', borderRadius: 22, border: '1.5px solid #EAD8CC', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '18px 18px 14px' }}>
        <button onClick={() => onProfile(user)} style={{ border: 'none', background: 'none', cursor: 'pointer', position: 'relative', flexShrink: 0, padding: 0 }}>
          <img src={user.photo} alt={user.name}
            style={{ width: 70, height: 70, borderRadius: 18, objectFit: 'cover', display: 'block' }} />
          {user.online && (
            <span className="pulse-dot" style={{
              position: 'absolute', bottom: -2, right: -2,
              width: 14, height: 14, borderRadius: '50%',
              background: '#4ade80', border: '2px solid white',
            }} />
          )}
        </button>
        <button onClick={() => onProfile(user)} style={{ flex: 1, textAlign: 'left', border: 'none', background: 'none', cursor: 'pointer', padding: 0, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ color: '#1C1712', fontSize: 26, fontWeight: 900 }}>{user.name}</span>
            <Star size={16} fill="#F08050" color="#F08050" />
          </div>
          <p style={{ color: '#6B4C3B', fontSize: 15, fontWeight: 600, margin: '3px 0 0' }}>{user.age} años · {user.area}</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 5 }}>
            <Shield size={13} color="#16a34a" />
            <span style={{ color: '#16a34a', fontSize: 13, fontWeight: 700 }}>Verificado</span>
          </div>
        </button>
      </div>

      <div style={{ margin: '0 18px 14px', background: '#FEF0E5', borderRadius: 14, padding: '10px 14px' }}>
        <p style={{ color: '#6B4C3B', fontSize: 13, fontWeight: 600, margin: '0 0 2px' }}>Ruta habitual</p>
        <p style={{ color: '#1C1712', fontSize: 16, fontWeight: 800, margin: 0 }}>{user.route} · {user.time}</p>
      </div>

      <div style={{ display: 'flex', gap: 10, padding: '0 18px 18px' }}>
        <button onClick={() => onChat(user)} style={{
          flex: 1, background: '#F08050', color: 'white', border: 'none',
          borderRadius: 16, padding: '16px 0', fontSize: 17, fontWeight: 800,
          cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        }}>
          <MessageCircle size={20} /> Mensaje
        </button>
        <button style={{
          background: '#FEF0E5', border: 'none', borderRadius: 16,
          padding: '16px 18px', cursor: 'pointer', display: 'flex', alignItems: 'center',
        }}>
          <Phone size={20} color="#F08050" />
        </button>
      </div>
    </div>
  )
}

export default function FavoritesScreen({ onChat, onOpenUser }) {
  const favorites = USERS.filter(u => u.favorite)

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'transparent' }}>
      <div style={{ padding: '48px 20px 20px', flexShrink: 0 }}>
        <h1 style={{ color: '#1C1712', fontSize: 30, fontWeight: 900, margin: '0 0 4px', display: 'inline-block', background: 'rgba(255,255,255,0.45)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', borderRadius: 14, padding: '4px 16px' }}><span style={{ opacity: 0.65 }}>⭐ </span>Mis Contactos</h1>
        <p style={{ color: '#1C1712', fontSize: 20, fontWeight: 600, margin: 0, display: 'inline-block', background: 'rgba(255,255,255,0.45)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', borderRadius: 12, padding: '3px 14px' }}>{favorites.length} personas</p>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '0 20px 100px' }} className="screen-content">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {favorites.map(user => (
            <ContactCard
              key={user.id}
              user={user}
              onChat={() => onChat(user)}
              onProfile={() => onOpenUser(user)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
