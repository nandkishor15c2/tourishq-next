import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className="bg-black/90 text-gray-300 py-12 border-t border-white/10 mt-20 mb-16 md:mb-0">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-2xl font-black text-white mb-4">TOURISHQ</h2>
            <p className="text-sm text-gray-400 max-w-sm">
              Empowering Travel Businesses &amp; Enriching Traveler Experiences. 
              Your partner for seamless travel planning and scalable B2B solutions.
            </p>
          </div>
          
          <div>
            <h3 className="font-bold text-white mb-4">Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-emerald-400 transition-colors">About Us</Link></li>
              <li><Link href="/destinations" className="hover:text-emerald-400 transition-colors">Destinations</Link></li>
              <li><Link href="/products" className="hover:text-emerald-400 transition-colors">Tours &amp; Packages</Link></li>
              <li><Link href="/policy" className="hover:text-emerald-400 transition-colors">Policies</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-white mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Jaipur, Rajasthan, India</li>
              <li>LLPIN: ACL-6082</li>
              <li><a href="tel:+919116794500" className="hover:text-emerald-400 transition-colors">+91-91167-94500</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} Tourishq Travel Solutions LLP. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link href="/policy" className="hover:text-white">Privacy Policy</Link>
            <Link href="/policy" className="hover:text-white">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
