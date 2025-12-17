import { useState, useEffect } from 'react';
import { Monitor, Smartphone, X } from 'lucide-react';

export function DesktopModePopup() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Always check if user is on mobile device (removed localStorage check)
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isSmallScreen = window.innerWidth < 768;

    // Show popup if on mobile - every time they visit
    if (isMobile || isSmallScreen) {
      // Delay showing popup by 1 second for better UX
      setTimeout(() => {
        setIsVisible(true);
      }, 1000);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    // Popup will show again on next visit
  };

  const handleRemindLater = () => {
    setIsVisible(false);
    // Popup will show again on next visit
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-sm flex items-center justify-center z-[100] p-4 animate-in fade-in duration-300">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-in zoom-in-95 duration-300">
        {/* Header with gradient */}
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-6 relative">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative flex items-start justify-between">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <Monitor className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">Desktop Mode</h2>
                <p className="text-blue-100 text-sm">For Better Experience</p>
              </div>
            </div>
            <button
              onClick={handleDismiss}
              className="text-white/80 hover:text-white transition-colors"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Icon comparison */}
          <div className="flex items-center justify-center gap-4">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-2">
                <Smartphone className="w-8 h-8 text-red-600 dark:text-red-400" />
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400">Mobile View</p>
            </div>
            
            <div className="text-2xl text-gray-400">→</div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-2">
                <Monitor className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400">Desktop View</p>
            </div>
          </div>

          {/* Message */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
            <p className="text-gray-700 dark:text-gray-300 text-center">
              <span className="font-semibold text-blue-900 dark:text-blue-100">AiPedia</span> works best in{' '}
              <span className="font-bold text-purple-900 dark:text-purple-100">Desktop Site Mode</span>!
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center mt-2">
              Unlock the full interactive experience with our chatbot, user guide, and all 500+ AI tools.
            </p>
          </div>

          {/* Instructions */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <span className="text-lg">📱</span>
              How to Enable Desktop Mode:
            </h3>
            
            {/* Chrome/Android */}
            <div className="mb-3">
              <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-1">Chrome (Android):</p>
              <ol className="text-xs text-gray-600 dark:text-gray-400 space-y-1 ml-4">
                <li>1. Tap the <strong>⋮</strong> (three dots) menu</li>
                <li>2. Check ✅ <strong>"Desktop site"</strong></li>
                <li>3. Page will reload in desktop mode!</li>
              </ol>
            </div>

            {/* Safari/iOS */}
            <div>
              <p className="text-sm font-medium text-purple-600 dark:text-purple-400 mb-1">Safari (iOS):</p>
              <ol className="text-xs text-gray-600 dark:text-gray-400 space-y-1 ml-4">
                <li>1. Tap the <strong>aA</strong> icon in address bar</li>
                <li>2. Select <strong>"Request Desktop Website"</strong></li>
                <li>3. Enjoy the full experience!</li>
              </ol>
            </div>
          </div>

          {/* Benefits */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-3">
            <h4 className="text-sm font-semibold text-green-900 dark:text-green-100 mb-2">
              ✨ What You'll Get:
            </h4>
            <ul className="space-y-1 text-xs text-green-800 dark:text-green-200">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-green-600 rounded-full"></span>
                Full-featured Foi chatbot with voice
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-green-600 rounded-full"></span>
                Interactive 8-step user guide
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-green-600 rounded-full"></span>
                Better navigation & layout
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-green-600 rounded-full"></span>
                Smooth animations & effects
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleRemindLater}
              className="flex-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 py-3 rounded-xl transition-all font-medium"
            >
              Remind Later
            </button>
            <button
              onClick={handleDismiss}
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-xl transition-all font-medium shadow-lg"
            >
              Got It!
            </button>
          </div>

          {/* Fine print */}
          <p className="text-xs text-center text-gray-500 dark:text-gray-500">
            You can continue using mobile view, but some features may be limited.
          </p>
        </div>
      </div>
    </div>
  );
}