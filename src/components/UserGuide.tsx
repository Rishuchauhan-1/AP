import { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Home, Search, MessageSquare, Palette, Sparkles, Filter, BookOpen } from 'lucide-react';

interface GuideStep {
  title: string;
  description: string;
  icon: any;
  tip?: string;
}

const guideSteps: GuideStep[] = [
  {
    title: '👋 Welcome to AiPedia!',
    description: 'Your comprehensive directory for discovering, learning, and mastering AI tools. Let us show you around in just a few steps!',
    icon: Sparkles,
    tip: 'You can skip this guide anytime and access it later from the menu.'
  },
  {
    title: '🏠 Home Page',
    description: 'Start here to explore featured AI tools, browse by categories, and see what\'s trending. Each category card is color-coded for easy navigation.',
    icon: Home,
    tip: 'Click on any category card to see all tools in that category!'
  },
  {
    title: '🤖 AI Tools Directory',
    description: 'Browse our collection of 500+ AI tools across 20 categories. Each tool includes detailed guides, pricing, tips, and honest limitations.',
    icon: BookOpen,
    tip: 'Use the "AI Tools" tab in navigation to see the complete directory.'
  },
  {
    title: '🔍 Search & Filter',
    description: 'Use the search bar to find specific tools, or filter by category to narrow down your options. Our smart search looks through tool names and descriptions.',
    icon: Search,
    tip: 'Try searching for "video", "writing", or any AI task you need help with!'
  },
  {
    title: '💬 AI Assistant Chatbot',
    description: 'Click the chat icon (bottom-right) to talk with our AI assistant! Ask about tools, get recommendations, or learn about specific features. It even supports voice input!',
    icon: MessageSquare,
    tip: 'Try asking: "What\'s the best tool for video editing?" or "Compare ChatGPT vs Claude"'
  },
  {
    title: '🎨 Dark/Light Mode',
    description: 'Toggle between dark and light themes using the sun/moon icon in the navigation. Your preference is saved automatically!',
    icon: Palette,
    tip: 'Dark mode is perfect for late-night AI tool research!'
  },
  {
    title: '📊 Tool Detail Pages',
    description: 'Click any tool to see comprehensive details including: step-by-step usage guides, expert tips, keyboard shortcuts, best use cases, and honest limitations.',
    icon: Filter,
    tip: 'Look for the RED pricing section - it\'s highlighted to help you make informed decisions!'
  },
  {
    title: '🚀 Ready to Explore!',
    description: 'You\'re all set! Start exploring AI tools, ask our chatbot questions, and discover the perfect AI solutions for your needs. Happy exploring!',
    icon: Sparkles,
    tip: 'Built by Ritesh Thakur & Rishu Kumar - Check out the About Us page to learn more!'
  }
];

interface UserGuideProps {
  onClose: () => void;
}

export function UserGuide({ onClose }: UserGuideProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Fade in animation
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  const handleNext = () => {
    if (currentStep < guideSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleClose();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      localStorage.setItem('aipedia_guide_completed', 'true');
      onClose();
    }, 300);
  };

  const currentGuideStep = guideSteps[currentStep];
  const IconComponent = currentGuideStep.icon;
  const progress = ((currentStep + 1) / guideSteps.length) * 100;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Guide Modal */}
      <div className={`relative bg-white dark:bg-gray-900 rounded-3xl shadow-2xl max-w-2xl w-full transform transition-all duration-300 ${isVisible ? 'scale-100' : 'scale-95'}`}>
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group z-10"
          aria-label="Close guide"
        >
          <X className="w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-200" />
        </button>

        {/* Progress Bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-700 rounded-t-3xl overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Content */}
        <div className="p-8 pt-12">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform">
              <IconComponent className="w-10 h-10 text-white" />
            </div>
          </div>

          {/* Step Counter */}
          <div className="text-center mb-4">
            <span className="inline-block px-4 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm">
              Step {currentStep + 1} of {guideSteps.length}
            </span>
          </div>

          {/* Title */}
          <h2 className="text-center text-gray-900 dark:text-white mb-4">
            {currentGuideStep.title}
          </h2>

          {/* Description */}
          <p className="text-center text-gray-600 dark:text-gray-300 mb-6 leading-relaxed px-4">
            {currentGuideStep.description}
          </p>

          {/* Tip Box */}
          {currentGuideStep.tip && (
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-2 border-yellow-300 dark:border-yellow-600 rounded-xl p-4 mb-6">
              <div className="flex items-start gap-3">
                <span className="text-2xl flex-shrink-0">💡</span>
                <div>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    <span className="font-bold text-yellow-700 dark:text-yellow-400">Pro Tip: </span>
                    {currentGuideStep.tip}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Step Indicators */}
          <div className="flex justify-center gap-2 mb-6">
            {guideSteps.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentStep(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentStep 
                    ? 'w-8 bg-blue-600 dark:bg-blue-500' 
                    : index < currentStep
                    ? 'bg-blue-400 dark:bg-blue-600'
                    : 'bg-gray-300 dark:bg-gray-600'
                }`}
                aria-label={`Go to step ${index + 1}`}
              />
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all ${
                currentStep === 0
                  ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
              Previous
            </button>

            {currentStep < guideSteps.length - 1 ? (
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
              >
                Next
                <ChevronRight className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={handleClose}
                className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
              >
                <Sparkles className="w-5 h-5" />
                Start Exploring!
              </button>
            )}
          </div>

          {/* Skip Button */}
          <div className="text-center mt-4">
            <button
              onClick={handleClose}
              className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 underline transition-colors"
            >
              Skip Guide
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Hook to check if guide should be shown
export function useUserGuide() {
  const [showGuide, setShowGuide] = useState(false);

  useEffect(() => {
    const hasCompletedGuide = localStorage.getItem('aipedia_guide_completed');
    if (!hasCompletedGuide) {
      // Show guide after a short delay for better UX
      setTimeout(() => setShowGuide(true), 1000);
    }
  }, []);

  return {
    showGuide,
    hideGuide: () => setShowGuide(false),
    resetGuide: () => {
      localStorage.removeItem('aipedia_guide_completed');
      setShowGuide(true);
    }
  };
}