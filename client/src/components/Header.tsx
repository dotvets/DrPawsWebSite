import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '@assets/dr-paws-logo.svg';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '#about' },
  { name: 'Services', path: '#services' },
  { name: 'Blog', path: '/blog' },
  { name: 'Contact Us', path: '#contact' },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  const handleNavClick = (path: string) => {
    if (path.startsWith('#')) {
      const element = document.getElementById(path.substring(1));
      element?.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    } else {
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border/40 backdrop-blur-sm">
      <nav className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <Link href="/" data-testid="link-logo">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex items-center"
            >
              <img src={logo} alt="Dr. Paws Logo" className="h-12 md:h-14" data-testid="img-logo" />
            </motion.div>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              item.path.startsWith('#') ? (
                <motion.button
                  key={item.name}
                  onClick={() => handleNavClick(item.path)}
                  whileHover={{ y: -2 }}
                  className="text-foreground/80 hover:text-primary font-medium transition-colors relative group"
                  data-testid={`link-${item.name.toLowerCase().replace(' ', '-')}`}
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                </motion.button>
              ) : (
                <Link key={item.name} href={item.path}>
                  <motion.span
                    whileHover={{ y: -2 }}
                    className={`inline-block text-foreground/80 hover:text-primary font-medium transition-colors relative group ${
                      location === item.path ? 'text-primary' : ''
                    }`}
                    data-testid={`link-${item.name.toLowerCase().replace(' ', '-')}`}
                  >
                    {item.name}
                    <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ${
                      location === item.path ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}></span>
                  </motion.span>
                </Link>
              )
            ))}
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover-elevate active-elevate-2"
            data-testid="button-mobile-menu"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden"
            >
              <div className="py-4 space-y-2">
                {navItems.map((item) => (
                  item.path.startsWith('#') ? (
                    <motion.button
                      key={item.name}
                      onClick={() => handleNavClick(item.path)}
                      whileTap={{ scale: 0.98 }}
                      className="block w-full text-left px-4 py-3 text-foreground/80 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors font-medium"
                      data-testid={`mobile-link-${item.name.toLowerCase().replace(' ', '-')}`}
                    >
                      {item.name}
                    </motion.button>
                  ) : (
                    <Link key={item.name} href={item.path}>
                      <motion.span
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`block px-4 py-3 text-foreground/80 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors font-medium ${
                          location === item.path ? 'text-primary bg-primary/5' : ''
                        }`}
                        data-testid={`mobile-link-${item.name.toLowerCase().replace(' ', '-')}`}
                      >
                        {item.name}
                      </motion.span>
                    </Link>
                  )
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
