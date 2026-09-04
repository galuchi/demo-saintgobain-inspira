export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-100 shadow-sm">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Saint-Gobain Logo SVG */}
        <div className="flex items-center">
          <svg width="140" height="40" viewBox="0 0 280 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Skyline/bridge silhouette - gradient from teal to red */}
            <defs>
              <linearGradient id="sgGrad" x1="0" y1="0" x2="280" y2="0" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#3DBFB8" />
                <stop offset="40%" stopColor="#8B5CF6" />
                <stop offset="70%" stopColor="#E63329" />
                <stop offset="100%" stopColor="#F97316" />
              </linearGradient>
            </defs>
            {/* Silhouette cityscape line - left to right waves and buildings */}
            <path
              d="M10 38 C14 38 14 28 18 28 C22 28 22 38 26 38 C30 38 30 28 34 28 C38 28 38 38 42 38
                 L42 30 L46 30 L46 38
                 L50 38 L50 20 L54 20 L54 10 L58 10 L58 20 L62 20 L62 38
                 L66 38
                 L66 22 L70 22 L70 14 L74 14 L74 22 L78 22 L78 38
                 L82 38
                 L82 30 L86 30 L86 38
                 L90 38 C96 38 100 34 100 34"
              stroke="url(#sgGrad)"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            {/* SAINT-GOBAIN text */}
            <text x="10" y="62" fontFamily="'Arial Black', Arial, sans-serif" fontSize="20" fontWeight="900" fill="#0B2265" letterSpacing="1">
              SAINT-GOBAIN
            </text>
          </svg>
        </div>

        {/* Worker Avatar */}
        <div className="relative">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-md border-2 border-white overflow-hidden">
            {/* Hard hat + face avatar */}
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Background */}
              <circle cx="20" cy="20" r="20" fill="#1D4ED8" />
              {/* Head */}
              <circle cx="20" cy="22" r="8" fill="#FDE68A" />
              {/* Hard hat */}
              <ellipse cx="20" cy="16" rx="10" ry="5" fill="#F97316" />
              <rect x="10" y="16" width="20" height="3" rx="1.5" fill="#EA580C" />
              {/* Glasses */}
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