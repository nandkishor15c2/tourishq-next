import { Home, Compass, Map, Phone, User } from 'lucide-react';
import Link from 'next/link';

export const BlurGlassHeader = () => {
  const navItems = [
    { label: "Home", href: "/", icon: <Home className="w-5 h-5" /> },
    { label: "Destinations", href: "/destinations", icon: <Map className="w-5 h-5" /> },
    { label: "Tours", href: "/products", icon: <Compass className="w-5 h-5" /> },
    { label: "B2B", href: "/admin", icon: <User className="w-5 h-5" /> },
    { label: "Contact", href: "/contact", icon: <Phone className="w-5 h-5" /> },
  ];

  return (
    <>
      {/* Desktop Floating Header */}
      <header className="hidden md:flex fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-black/40 backdrop-blur-md border border-white/10 rounded-full px-8 py-3 items-center justify-between shadow-2xl min-w-[600px]">
        <Link href="/" className="flex items-center gap-2 group">
          {/* Logo Placeholder */}
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-400 to-teal-500 shadow-[0_0_15px_rgba(52,211,153,0.5)] flex items-center justify-center text-white font-bold text-xl group-hover:rotate-12 transition-transform duration-300">T</div>
          <span className="text-white font-black text-lg tracking-wider">TOURISHQ</span>
        </Link>
        <nav className="flex gap-8">
          {navItems.map((item, idx) => (
            <Link 
              key={idx} 
              href={item.href}
              className="text-gray-300 hover:text-white flex items-center gap-2 font-medium text-sm transition-all duration-300 hover:scale-105"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </header>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 bg-black/60 backdrop-blur-xl border-t border-white/10 pb-safe">
        <div className="flex justify-around items-center px-2 py-3">
          {navItems.map((item, idx) => (
            <Link 
              key={idx} 
              href={item.href}
              className="flex flex-col items-center gap-1 text-gray-400 hover:text-emerald-400 active:scale-95 transition-all"
            >
              {item.icon}
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
};
