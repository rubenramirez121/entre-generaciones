import { useState, useEffect } from 'react'
import BottomNav       from './components/BottomNav'
import WelcomeScreen   from './screens/WelcomeScreen'
import HomeScreen      from './screens/HomeScreen'
import FavoritesScreen from './screens/FavoritesScreen'
import MapScreen       from './screens/MapScreen'
import ChatScreen      from './screens/ChatScreen'
import ProfileScreen   from './screens/ProfileScreen'

const INIT = { tab: 'home', viewUser: null, chatUser: null }

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [nav, setNav] = useState(INIT)
  const { tab, viewUser, chatUser } = nav

  useEffect(() => {
    const handler = (e) => { if (e.state) setNav(e.state) }
    window.addEventListener('popstate', handler)
    return () => window.removeEventListener('popstate', handler)
  }, [])

  function go(next) {
    const state = { ...nav, ...next }
    window.history.pushState(state, '')
    setNav(state)
  }

  function login() {
    window.history.replaceState(INIT, '')
    setLoggedIn(true)
  }

  if (!loggedIn) return <WelcomeScreen onEnter={login} />

  const screen = {
    home:      <HomeScreen      onOpenUser={u => go({ tab: 'profile', viewUser: u, chatUser: null })}
                                onMap={() => go({ tab: 'map', viewUser: null, chatUser: null })} />,
    favorites: <FavoritesScreen onOpenUser={u => go({ tab: 'profile', viewUser: u, chatUser: null })}
                                onChat={u => go({ tab: 'chat', chatUser: u, viewUser: null })} />,
    map:       <MapScreen       onOpenUser={u => go({ tab: 'profile', viewUser: u, chatUser: null })}
                                onChat={u => go({ tab: 'chat', chatUser: u, viewUser: null })} />,
    chat:      <ChatScreen      activeUser={chatUser} />,
    profile:   <ProfileScreen   viewUser={viewUser}
                                onBack={() => window.history.back()}
                                onChat={u => go({ tab: 'chat', chatUser: u, viewUser: null })} />,
  }

  return (
    <div style={{
      height: '100dvh', display: 'flex', flexDirection: 'column', overflow: 'hidden',
      backgroundImage: 'url(/bg.jpg)',
      backgroundSize: 'cover', backgroundPosition: 'center',
    }}>
      {/* Capa semitransparente para que el contenido sea legible */}
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(250,246,241,0.35)', zIndex: 0 }} />
      <div style={{ flex: 1, overflow: 'hidden', position: 'relative', zIndex: 1 }}
           className="screen-enter" key={tab + (viewUser?.id || '') + (chatUser?.id || '')}>
        {screen[tab] ?? screen.home}
      </div>
      <div style={{ position: 'relative', zIndex: 1 }}>
        <BottomNav active={tab} onChange={t => go({ tab: t, viewUser: null, chatUser: null })} />
      </div>
    </div>
  )
}
