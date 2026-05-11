export default function Logo({ size = 56 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="56" height="56" rx="14" fill="#E87545"/>
      {/* Banco */}
      <rect x="10" y="34" width="36" height="4" rx="2" fill="white"/>
      <rect x="14" y="38" width="3" height="7" rx="1.5" fill="white"/>
      <rect x="39" y="38" width="3" height="7" rx="1.5" fill="white"/>
      {/* Respaldo */}
      <rect x="10" y="28" width="36" height="3" rx="1.5" fill="white" opacity="0.7"/>
      {/* Persona mayor */}
      <circle cx="20" cy="20" r="4" fill="white"/>
      <path d="M16 34 Q17 27 20 27 Q23 27 24 34" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round"/>
      {/* Persona joven */}
      <circle cx="36" cy="19" r="4.5" fill="white"/>
      <path d="M31 34 Q33 27 36 27 Q39 27 41 34" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round"/>
      {/* Corazón de conexión */}
      <path d="M27 24 Q28 22 29 24 Q30 22 31 24 Q31 26 29 28 Q28 29 27 28 Q25 26 27 24Z" fill="#FEF1E8" opacity="0.9"/>
    </svg>
  )
}
