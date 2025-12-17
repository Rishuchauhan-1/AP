import { Sparkles, Menu, X, Moon, Sun, ArrowLeft, Home, HelpCircle, LogIn, UserCircle, LogOut } from 'lucide-react';
import { useState } from 'react';
import logoImage from 'figma:asset/4e64b30400e67e340dad0ebe1e00af41a307d606.png';
import { User } from '../utils/auth';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string, toolId?: string) => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onGoBack?: () => void;
  canGoBack?: boolean;
  onShowGuide?: () => void;
  user?: User | null;
  onAuthClick?: () => void;
  onLogout?: () => void;
}

export function Header({ currentPage, onNavigate, darkMode, onToggleDarkMode, onGoBack, canGoBack, onShowGuide, user, onAuthClick, onLogout }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'tools', label: 'AI Tools' },
    { id: 'about', label: 'About Us' },
    { id: 'contact', label: 'Contact Us' }
  ];

  const handleNavigation = (page: string) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 shadow-sm transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-3">
            {/* Back Button - Shows when not on home page */}
            {currentPage !== 'home' && (
              <button
                onClick={onGoBack || (() => handleNavigation('home'))}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 transition-all hover:scale-105 group"
                aria-label="Go back"
                title="Go back"
              >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
              </button>
            )}
            
            {/* Home Button - Quick access */}
            {currentPage !== 'home' && (
              <button
                onClick={() => handleNavigation('home')}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 transition-all hover:scale-105"
                aria-label="Go to home"
                title="Home"
              >
                <Home className="w-5 h-5" />
              </button>
            )}
            
            <button
              onClick={() => handleNavigation('home')}
              className="flex items-center gap-3 hover:opacity-90 transition-all group"
            >
              <div className="relative flex items-center justify-center group-hover:scale-105 transition-transform">
                {/* Aipedia Circular Logo */}
                <img 
                  src={logoImage} 
                  alt="Aipedia - AI Database & Insights" 
                  className="h-14 w-14 rounded-full object-cover shadow-lg border-2 border-gray-200 dark:border-gray-700 group-hover:shadow-xl group-hover:shadow-blue-500/20 dark:group-hover:shadow-cyan-500/20 transition-all"
                />
              </div>
              <div className="hidden sm:block">
                <div className="text-xl bg-gradient-to-r from-cyan-500 to-purple-500 bg-clip-text text-transparent">
                  AiPedia
                </div>
                <div className="text-[10px] text-gray-500 dark:text-gray-400 tracking-wider">
                  AI DATABASE & INSIGHTS
                </div>
              </div>
            </button>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <nav className="flex gap-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item.id)}
                  className={`relative text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group ${
                    currentPage === item.id ? 'text-blue-600 dark:text-blue-400' : ''
                  }`}
                >
                  {item.label}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-blue-600 dark:bg-blue-400 transition-all ${
                    currentPage === item.id ? 'w-full' : 'w-0 group-hover:w-full'
                  }`} />
                </button>
              ))}
            </nav>
            
            {/* Dark Mode Toggle - Desktop */}
            <button
              onClick={onToggleDarkMode}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all hover:scale-110"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            
            {/* User Menu */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 text-white hover:from-blue-700 hover:to-indigo-700 dark:hover:from-blue-600 dark:hover:to-indigo-600 transition-all"
                  aria-label="User menu"
                >
                  <UserCircle className="w-5 h-5" />
                  <span className="text-sm font-medium">{user.name}</span>
                </button>
                
                {/* User Menu Dropdown */}
                {showUserMenu && (
                  <>
                    <div 
                      className="fixed inset-0 z-40" 
                      onClick={() => setShowUserMenu(false)}
                    />
                    <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 z-50 overflow-hidden">
                      <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{user.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user.email}</p>
                      </div>
                      <button
                        onClick={() => {
                          onLogout?.();
                          setShowUserMenu(false);
                        }}
                        className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Log Out</span>
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <button
                onClick={onAuthClick}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 text-white hover:from-blue-700 hover:to-indigo-700 dark:hover:from-blue-600 dark:hover:to-indigo-600 transition-all shadow-lg hover:shadow-xl"
                aria-label="Login"
              >
                <LogIn className="w-5 h-5" />
                <span className="text-sm font-medium">Log In</span>
              </button>
            )}
          </div>

          {/* Mobile Menu and Dark Mode Toggle */}
          <div className="md:hidden flex items-center gap-2">
            {/* Dark Mode Toggle - Mobile */}
            <button
              onClick={onToggleDarkMode}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden pb-4 animate-in slide-in-from-top space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.id)}
                className={`block w-full text-left px-4 py-3 text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400 transition-colors rounded-lg ${
                  currentPage === item.id ? 'bg-blue-50 dark:bg-gray-800 text-blue-600 dark:text-blue-400' : ''
                }`}
              >
                {item.label}
              </button>
            ))}
            
            {/* Mobile Auth Buttons */}
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700 mt-2">
              {user ? (
                <>
                  <div className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400">
                    <p className="font-medium text-gray-900 dark:text-white">{user.name}</p>
                    <p className="text-xs truncate">{user.email}</p>
                  </div>
                  <button
                    onClick={() => {
                      onLogout?.();
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-2 w-full px-4 py-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors rounded-lg"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Log Out</span>
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    onAuthClick?.();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-2 w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 text-white hover:from-blue-700 hover:to-indigo-700 dark:hover:from-blue-600 dark:hover:to-indigo-600 transition-all rounded-lg shadow-lg"
                >
                  <LogIn className="w-5 h-5" />
                  <span>Log In / Sign Up</span>
                </button>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}