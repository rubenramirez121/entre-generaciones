import { useState, useRef, useEffect } from 'react'
import { ChevronLeft, Send, Phone, MapPin } from 'lucide-react'
import { USERS, MESSAGES } from '../data'

function ConversationList({ onOpen }) {
  const chatUsers = USERS.filter(u => MESSAGES[u.id])

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'transparent' }}>
      <div style={{ flex: 1, overflowY: 'auto', padding: '48px 20px 100px' }} className="screen-content">
        <h1 style={{ color: '#1C1712', fontSize: 30, fontWeight: 900, margin: '0 0 4px', display: 'inline-block', background: 'rgba(255,255,255,0.45)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', borderRadius: 14, padding: '4px 16px' }}><span style={{ opacity: 0.65 }}>💬 </span>Mensajes</h1>
        <p style={{ color: '#1C1712', fontSize: 20, fontWeight: 600, margin: '0 0 16px', display: 'inline-block', background: 'rgba(255,255,255,0.45)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', borderRadius: 12, padding: '3px 14px' }}>Coordina tus paseos</p>

        {/* Activos */}
        <div style={{ background: 'rgba(255,255,255,0.45)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', borderRadius: 20, padding: '14px 16px', marginBottom: 20 }}>
          <p style={{ color: '#1C1712', fontSize: 16, fontWeight: 800, margin: '0 0 12px' }}><span style={{ opacity: 0.65 }}>🟢 </span>Activos ahora</p>
          <div style={{ display: 'flex', gap: 16, overflowX: 'auto', paddingBottom: 4 }}>
            {USERS.filter(u => u.online).map(u => (
              <button key={u.id} onClick={() => onOpen(u)}
                style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, border: 'none', background: 'none', cursor: 'pointer', padding: 0 }}>
                <div style={{ position: 'relative' }}>
                  <img src={u.photo} alt={u.name}
                    style={{ width: 60, height: 60, borderRadius: 16, objectFit: 'cover', border: '2.5px solid #F08050' }} />
                  <span className="pulse-dot" style={{
                    position: 'absolute', bottom: -1, right: -1,
                    width: 13, height: 13, borderRadius: '50%', background: '#4ade80', border: '2px solid white',
                  }} />
                </div>
                <span style={{ color: '#1C1712', fontSize: 14, fontWeight: 700 }}>{u.name}</span>
              </button>
            ))}
          </div>
        </div>

        <p style={{ color: '#1C1712', fontSize: 16, fontWeight: 800, margin: '0 0 12px', display: 'inline-block', background: 'rgba(255,255,255,0.45)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', borderRadius: 12, padding: '3px 12px' }}>Conversaciones</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {chatUsers.map(user => {
            const msgs = MESSAGES[user.id]
            const last = msgs[msgs.length - 1]
            return (
              <button key={user.id} onClick={() => onOpen(user)} style={{
                display: 'flex', alignItems: 'center', gap: 14,
                background: 'white', borderRadius: 20, padding: '16px 18px',
                border: '1.5px solid #EAD8CC', cursor: 'pointer', textAlign: 'left',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)', width: '100%',
              }}>
                <div style={{ position: 'relative', flexShrink: 0 }}>
                  <img src={user.photo} alt={user.name}
                    style={{ width: 60, height: 60, borderRadius: 16, objectFit: 'cover' }} />
                  {user.online && <span style={{ position: 'absolute', bottom: -1, right: -1, width: 13, height: 13, borderRadius: '50%', background: '#4ade80', border: '2px solid white' }} />}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: '#1C1712', fontSize: 19, fontWeight: 900 }}>{user.name}</span>
                    <span style={{ color: '#6B4C3B', fontSize: 14, fontWeight: 600 }}>{last.time}</span>
                  </div>
                  <p style={{ color: '#6B4C3B', fontSize: 15, fontWeight: 600, margin: '4px 0 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {last.from === 'me' ? 'Tú: ' : ''}{last.text}
                  </p>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function getReply(text, user) {
  const t = text.toLowerCase()
  if (/(hola|buenos días|buenas|qué tal|como estás|cómo estás)/.test(t))
    return `¡Hola! Estoy muy bien, gracias. ¿Y tú? Hoy tengo pensado salir por ${user.route} a las ${user.time} 😊`
  if (/(mañana|pasado|este fin|la semana)/.test(t))
    return `Mañana me viene perfecto. Salgo hacia ${user.route} a las ${user.time}, ¿te apuntas?`
  if (/(hora|cuándo|cuando|a qué hora|qué hora)/.test(t))
    return `Suelo salir a las ${user.time}. ¿Te va bien esa hora?`
  if (/(dónde|donde|sitio|lugar|punto|quedamos)/.test(t))
    return `Podemos quedar en la entrada de ${user.route}, ¿te parece bien?`
  if (/(ruta|paseo|caminar|andar|parque|zona)/.test(t))
    return `¡Me encanta ${user.route}! Es tranquila y muy bonita esta época del año 🌿`
  if (/(sí|si,|claro|vale|perfecto|de acuerdo|bueno|genial|estupendo|me apunto)/.test(t))
    return `¡Genial! Entonces quedamos en ${user.route} a las ${user.time}. ¡Hasta luego! 👋`
  if (/(no |no,|tampoco|no puedo|imposible|otro día)/.test(t))
    return `No te preocupes, otro día será. ¡Que tengas un buen día!`
  if (/(gracias|te lo agradezco|muy amable)/.test(t))
    return `¡A ti! Es un placer pasear contigo 😊`
  if (/(adiós|adios|hasta luego|hasta pronto|nos vemos|chao|bye)/.test(t))
    return `¡Hasta pronto! Que descanses 😊`
  if (/(bien|muy bien|fenomenal|estupendo|excelente)/.test(t))
    return `Me alegra mucho. ¡Yo también estoy con ganas de salir hoy!`
  if (/(mal|cansad|dolor|no me encuentro)/.test(t))
    return `Vaya, lo siento. Descansa y si mañana te encuentras mejor, me dices y salimos.`
  if (/(tiempo|llueve|lluvia|sol|frío|calor|nublado)/.test(t))
    return `Sí, hay que ver cómo viene el tiempo. Si hace bueno salimos, si no lo dejamos para otro día.`
  return `Entendido. ¡Nos vemos pronto en el paseo por ${user.route}! 😊`
}

function ChatDetail({ user, onBack }) {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState(MESSAGES[user.id] || [])
  const [typing, setTyping] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  function send() {
    if (!input.trim()) return
    const text = input.trim()
    setMessages(prev => [...prev, { id: Date.now(), from: 'me', text, time: 'Ahora' }])
    setInput('')
    setTyping(true)
    setTimeout(() => {
      setTyping(false)
      setMessages(prev => [...prev, { id: Date.now(), from: 'them', text: getReply(text, user), time: 'Ahora' }])
    }, 1200 + Math.random() * 800)
  }

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'transparent' }}>
      {/* Header */}
      <div style={{ background: 'white', borderBottom: '1.5px solid #EAD8CC', padding: '44px 16px 16px', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={onBack} style={{
            background: '#FEF0E5', border: 'none', borderRadius: 14, padding: 10, cursor: 'pointer', display: 'flex',
          }}>
            <ChevronLeft size={24} color="#F08050" />
          </button>
          <div style={{ position: 'relative', flexShrink: 0 }}>
            <img src={user.photo} alt={user.name}
              style={{ width: 50, height: 50, borderRadius: 14, objectFit: 'cover' }} />
            {user.online && <span style={{ position: 'absolute', bottom: -1, right: -1, width: 12, height: 12, borderRadius: '50%', background: '#4ade80', border: '2px solid white' }} />}
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ color: '#1C1712', fontSize: 19, fontWeight: 900, margin: 0 }}>{user.name}</p>
            <p style={{ color: user.online ? '#16a34a' : '#6B4C3B', fontSize: 14, fontWeight: 700, margin: '2px 0 0' }}>
              {user.online ? 'En línea' : 'Desconectado/a'}
            </p>
          </div>
          <button style={{ background: '#F08050', border: 'none', borderRadius: 14, padding: 12, cursor: 'pointer', display: 'flex' }}>
            <Phone size={20} color="white" />
          </button>
        </div>
        {/* Banner cita */}
        <div style={{ marginTop: 12, background: '#FEF0E5', borderRadius: 14, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
          <MapPin size={18} color="#F08050" style={{ flexShrink: 0 }} />
          <div>
            <p style={{ color: '#1C1712', fontSize: 15, fontWeight: 800, margin: 0 }}>{user.route}</p>
            <p style={{ color: '#6B4C3B', fontSize: 13, fontWeight: 600, margin: '2px 0 0' }}>Mañana a las {user.time}</p>
          </div>
        </div>
      </div>

      {/* Mensajes */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: 12 }} className="screen-content">
        {messages.map(msg => (
          <div key={msg.id} style={{ display: 'flex', justifyContent: msg.from === 'me' ? 'flex-end' : 'flex-start' }}>
            {msg.from === 'them' && (
              <img src={user.photo} alt="" style={{ width: 34, height: 34, borderRadius: 10, objectFit: 'cover', marginRight: 8, alignSelf: 'flex-end', flexShrink: 0 }} />
            )}
            <div style={{
              maxWidth: '75%', borderRadius: 20, padding: '12px 16px',
              background: msg.from === 'me' ? '#F08050' : 'white',
              border: msg.from === 'me' ? 'none' : '1.5px solid #EAD8CC',
              borderBottomRightRadius: msg.from === 'me' ? 6 : 20,
              borderBottomLeftRadius: msg.from === 'them' ? 6 : 20,
            }}>
              <p style={{ color: msg.from === 'me' ? 'white' : '#1C1712', fontSize: 16, fontWeight: 600, margin: 0, lineHeight: 1.4 }}>{msg.text}</p>
              <p style={{ color: msg.from === 'me' ? 'rgba(255,255,255,0.6)' : '#6B4C3B', fontSize: 12, fontWeight: 600, margin: '6px 0 0' }}>{msg.time}</p>
            </div>
          </div>
        ))}
        {typing && (
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8 }}>
            <img src={user.photo} alt="" style={{ width: 34, height: 34, borderRadius: 10, objectFit: 'cover', flexShrink: 0 }} />
            <div style={{ background: 'white', border: '1.5px solid #EAD8CC', borderRadius: 20, borderBottomLeftRadius: 6, padding: '14px 18px', display: 'flex', gap: 5, alignItems: 'center' }}>
              {[0, 1, 2].map(i => (
                <span key={i} style={{
                  width: 8, height: 8, borderRadius: '50%', background: '#C4A898',
                  display: 'inline-block',
                  animation: 'typing-dot 1.2s ease-in-out infinite',
                  animationDelay: `${i * 0.2}s`,
                }} />
              ))}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div style={{ background: 'white', borderTop: '1.5px solid #EAD8CC', padding: '12px 16px', paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 100px)', display: 'flex', gap: 10, flexShrink: 0 }}>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && send()}
          placeholder="Escribe un mensaje..."
          style={{
            flex: 1, background: '#FAF6F1', border: '1.5px solid #EAD8CC',
            borderRadius: 18, padding: '14px 18px', fontSize: 17, fontWeight: 600,
            color: '#1C1712', fontFamily: 'inherit', outline: 'none',
          }}
        />
        <button onClick={send} style={{
          background: '#F08050', border: 'none', borderRadius: 16, padding: '14px 16px',
          cursor: 'pointer', display: 'flex', flexShrink: 0, boxShadow: '0 4px 12px rgba(240,128,80,0.35)',
        }}>
          <Send size={22} color="white" />
        </button>
      </div>
    </div>
  )
}

export default function ChatScreen({ activeUser }) {
  const [selected, setSelected] = useState(activeUser || null)
  if (selected) return <ChatDetail user={selected} onBack={() => setSelected(null)} />
  return <ConversationList onOpen={setSelected} />
}
