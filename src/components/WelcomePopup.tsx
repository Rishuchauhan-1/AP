import { useState, useEffect } from 'react';
import { X, Sparkles, Heart } from 'lucide-react';

export function WelcomePopup() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show popup after a short delay every time the page loads
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] animate-fadeIn" />

      {/* Popup Window */}
      <div className="fixed inset-0 flex items-center justify-center z-[101] p-4">
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-md w-full transform animate-scaleIn relative overflow-hidden border-2 border-blue-500 dark:border-blue-400">
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 w-8 h-8 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-full flex items-center justify-center transition-all z-10 group"
            aria-label="Close welcome popup"
          >
            <X className="w-5 h-5 text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white" />
          </button>

          {/* Decorative Background */}
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 opacity-10 dark:opacity-20" />

          {/* Content */}
          <div className="relative p-8 pt-12">
            {/* Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 dark:from-blue-400 dark:to-indigo-500 rounded-full flex items-center justify-center shadow-xl animate-pulse">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
            </div>

            {/* Welcome Text */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
                Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">AiPedia</span>
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                An AI Encyclopedia You All Need
              </p>
            </div>

            {/* Features */}
            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                <span className="text-sm">500+ AI Tools Database</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                <div className="w-2 h-2 bg-indigo-500 rounded-full" />
                <span className="text-sm">20 Comprehensive Categories</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                <div className="w-2 h-2 bg-purple-500 rounded-full" />
                <span className="text-sm">AI Assistant Chatbot</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                <div className="w-2 h-2 bg-pink-500 rounded-full" />
                <span className="text-sm">Detailed Tool Guides & Tips</span>
              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={handleClose}
              className="w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 hover:from-blue-700 hover:to-indigo-700 dark:hover:from-blue-600 dark:hover:to-indigo-600 text-white rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Start Exploring
            </button>

            {/* Divider */}
            <div className="my-6 border-t border-gray-200 dark:border-gray-700" />

            {/* Creators */}
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-sm text-gray-500 dark:text-gray-400">Made with</span>
                <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" />
                <span className="text-sm text-gray-500 dark:text-gray-400">by</span>
              </div>
              <div className="flex items-center justify-center gap-3 flex-wrap">
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Rishu Kumar
                </span>
                <span className="text-gray-400 dark:text-gray-600">•</span>
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Ritesh Thakur
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Decorative Line */}
          <div className="h-2 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-scaleIn {
          animation: scaleIn 0.4s ease-out;
        }
      `}</style>
    </>
  );
}