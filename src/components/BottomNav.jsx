import { Home, Star, Map, MessageCircle, User } from 'lucide-react'

const tabs = [
  { id: 'home',      icon: Home,          label: 'Inicio' },
  { id: 'favorites', icon: Star,          label: 'Contactos' },
  { id: 'map',       icon: Map,           label: 'Mapa' },
  { id: 'chat',      icon: MessageCircle, label: 'Chat' },
  { id: 'profile',   icon: User,          label: 'Perfil' },
]

export default function BottomNav({ active, onChange }) {
  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white border-t border-[#EAD8CC] z-50 flex shadow-[0_-4px_24px_rgba(0,0,0,0.08)]" style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}>
      {tabs.map(({ id, icon: Icon, label }) => {
        const on = active === id
        return (
          <button
            key={id}
            onClick={() => onChange(id)}
            className={`flex-1 flex flex-col items-center justify-center py-3 gap-1 transition-colors ${
              on ? 'text-[#F08050]' : 'text-[#6B4C3B]/60'
            }`}
          >
            <div className={`p-2 rounded-2xl transition-colors ${on ? 'bg-[#FEF0E5]' : ''}`}>
              <Icon size={26} strokeWidth={on ? 2.5 : 1.8} />
            </div>
            <span className={`text-xs leading-none ${on ? 'font-extrabold' : 'font-semibold'}`}>
              {label}
            </span>
          </button>
        )
      })}
    </nav>
  )
}
