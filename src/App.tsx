import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { ToolsPage } from './components/ToolsPage';
import { ToolDetailPage } from './components/ToolDetailPage';
import { AboutPage } from './components/AboutPage';
import { ContactPage } from './components/ContactPage';
import { Footer } from './components/Footer';
import { Chatbot } from './components/Chatbot';
import { WelcomePopup } from './components/WelcomePopup';
import { UserGuide, useUserGuide } from './components/UserGuide';
import { AuthModal } from './components/AuthModal';
import { DesktopModePopup } from './components/DesktopModePopup';
import { categories, aiTools } from './data/tools';
import { removeDuplicateTools } from './utils/fixDuplicateTools';
import { getCurrentSession, logout, User } from './utils/auth';
import { getSupabaseClient } from './utils/supabase/client';

export default function App() {
  // Remove duplicate tools at runtime
  const tools = removeDuplicateTools(aiTools);
  
  // Log deduplication results once on app load
  useEffect(() => {
    if (aiTools.length !== tools.length) {
      console.log(`🔧 AiPedia: Filtered ${aiTools.length - tools.length} duplicate tools. Showing ${tools.length} unique tools.`);
    }
  }, []); // Empty dependency array - runs once on mount
  
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedToolId, setSelectedToolId] = useState<string | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [navigationHistory, setNavigationHistory] = useState<Array<{page: string, toolId?: string, categoryId?: string}>>([]);
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });
  const [user, setUser] = useState<User | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(false);

  // User guide hook
  const { showGuide, hideGuide } = useUserGuide();

  // Function to manually show guide
  const handleShowGuide = () => {
    localStorage.removeItem('aipedia_guide_completed');
    window.location.reload(); // Reload to trigger guide
  };

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Check for existing session on load
  useEffect(() => {
    const fetchSession = async () => {
      try {
        const session = await getCurrentSession();
        if (session) {
          setUser(session);
          // Store user in localStorage for persistence
          localStorage.setItem('aipedia_user', JSON.stringify(session));
        }
      } catch (error) {
        console.error('Error fetching session:', error);
      } finally {
        setIsLoadingAuth(false);
      }
    };
    fetchSession();

    // Listen for auth state changes (for OAuth callbacks)
    const supabase = getSupabaseClient();
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth event:', event);
      console.log('Session:', session);
      
      if (event === 'SIGNED_IN' && session) {
        const userData: User = {
          id: session.user.id,
          email: session.user.email!,
          name: session.user.user_metadata.name || session.user.user_metadata.full_name || 'User',
          accessToken: session.access_token,
        };
        
        setUser(userData);
        localStorage.setItem('aipedia_user', JSON.stringify(userData));
        setIsAuthModalOpen(false);
        
        // Show welcome message for new Google sign-ins
        if (event === 'SIGNED_IN') {
          setShowWelcomeMessage(true);
          setTimeout(() => setShowWelcomeMessage(false), 5000);
        }
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        localStorage.removeItem('aipedia_user');
      } else if (event === 'USER_UPDATED') {
        console.log('User updated:', session);
      }
    });

    // Cleanup subscription
    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const handleAuthSuccess = (userData: User) => {
    setUser(userData);
    // Store user in localStorage for persistence
    localStorage.setItem('aipedia_user', JSON.stringify(userData));
  };

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      localStorage.removeItem('aipedia_user');
    } catch (error: any) {
      console.error('Logout error:', error);
      alert('Failed to log out. Please try again.');
    }
  };

  const handleNavigate = (page: string, toolId?: string, categoryId?: string) => {
    // Add current page to history before navigating
    setNavigationHistory(prev => [...prev, { 
      page: currentPage, 
      toolId: selectedToolId || undefined,
      categoryId: selectedCategoryId || undefined
    }]);
    
    setCurrentPage(page);
    if (toolId) {
      setSelectedToolId(toolId);
    } else {
      setSelectedToolId(null);
    }
    if (categoryId) {
      setSelectedCategoryId(categoryId);
    } else {
      setSelectedCategoryId(null);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoBack = () => {
    if (navigationHistory.length > 0) {
      const previousPage = navigationHistory[navigationHistory.length - 1];
      setNavigationHistory(prev => prev.slice(0, -1));
      setCurrentPage(previousPage.page);
      setSelectedToolId(previousPage.toolId || null);
      setSelectedCategoryId(previousPage.categoryId || null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Fallback to home if no history
      setCurrentPage('home');
      setSelectedToolId(null);
      setSelectedCategoryId(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage categories={categories} onNavigate={handleNavigate} />;
      case 'tools':
        return <ToolsPage tools={tools} categories={categories} onNavigate={handleNavigate} initialCategory={selectedCategoryId || undefined} />;
      case 'tool-detail':
        const tool = tools.find(t => t.id === selectedToolId);
        if (tool) {
          return <ToolDetailPage tool={tool} onNavigate={handleNavigate} />;
        }
        return <ToolsPage tools={tools} categories={categories} onNavigate={handleNavigate} />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      default:
        return <HomePage categories={categories} onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 transition-colors duration-300">
      <Header 
        currentPage={currentPage} 
        onNavigate={handleNavigate} 
        darkMode={darkMode} 
        onToggleDarkMode={toggleDarkMode}
        onGoBack={handleGoBack}
        canGoBack={navigationHistory.length > 0}
        onShowGuide={handleShowGuide}
        user={user}
        onAuthClick={() => setIsAuthModalOpen(true)}
        onLogout={handleLogout}
      />
      <main className="flex-grow">
        {renderPage()}
      </main>
      <Footer onNavigate={handleNavigate} />
      <Chatbot tools={tools} categories={categories} onNavigate={handleNavigate} />
      <WelcomePopup />
      <DesktopModePopup />
      {showGuide && <UserGuide onClose={hideGuide} />}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        onSuccess={handleAuthSuccess}
      />
      
      {/* Welcome Message Toast */}
      {showWelcomeMessage && user && (
        <div className="fixed top-24 right-4 bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-500 dark:to-emerald-500 text-white px-6 py-4 rounded-xl shadow-2xl z-50 animate-in slide-in-from-right-4 duration-300 max-w-sm">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold mb-1">Welcome to AiPedia! 🎉</h3>
              <p className="text-sm text-green-100">
                You're successfully logged in as <span className="font-medium">{user.name}</span>
              </p>
            </div>
            <button
              onClick={() => setShowWelcomeMessage(false)}
              className="text-white/80 hover:text-white transition-colors"
              aria-label="Close"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}