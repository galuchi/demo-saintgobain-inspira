export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-100 shadow-sm">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Saint-Gobain Logo — imagem real de /public */}
        <img
          src="/logo_saintgobain.png"
          alt="Saint-Gobain"
          className="h-9 w-auto object-contain"
        />

        {/* Worker Avatar */}
        <div className="relative">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-md border-2 border-white overflow-hidden">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="20" cy="20" r="20" fill="#1D4ED8" />
              <circle cx="20" cy="22" r="8" fill="#FDE68A" />
              <ellipse cx="20" cy="16" rx="10" ry="5" fill="#F97316" />
              <rect x="10" y="16" width="20" height="3" rx="1.5" fill="#EA580C" />
              <rect x="14" y="21" width="5" height="3.5" rx="1.5" fill="none" stroke="#1E3A5F" strokeWidth="1.2" />
              <rect x="21" y="21" width="5" height="3.5" rx="1.5" fill="none" stroke="#1E3A5F" strokeWidth="1.2" />
              <line x1="19" y1="22.5" x2="21" y2="22.5" stroke="#1E3A5F" strokeWidth="1.2" />
            </svg>
          </div>
          <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></span>
        </div>
      </div>
    </header>
  )
}