import { ExternalLink, Star, CheckCircle, XCircle, Lightbulb, Keyboard, BookOpen, ArrowLeft } from 'lucide-react';
import { AITool } from '../types';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ToolDetailPageProps {
  tool: AITool;
  onNavigate: (page: string) => void;
}

export function ToolDetailPage({ tool, onNavigate }: ToolDetailPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Back Button */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => onNavigate('tools')}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to AI Tools
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="h-80 md:h-auto">
              <ImageWithFallback
                src={tool.image}
                alt={tool.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1.5 rounded-lg border border-yellow-200">
                  <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                  <span className="text-gray-900">{tool.rating}</span>
                </div>
                <span className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-sm border border-blue-200">
                  {tool.category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </span>
              </div>
              
              <h1 className="text-gray-900 mb-3">{tool.name}</h1>
              <p className="text-blue-600 mb-6 text-xl">{tool.tagline}</p>
              <p className="text-gray-700 mb-8">{tool.description}</p>
              
              <div className="flex flex-wrap gap-4">
                <a
                  href={tool.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
                >
                  Visit Website
                  <ExternalLink className="w-5 h-5" />
                </a>
                <div className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg border border-gray-200">
                  {tool.pricing.split(',')[0]}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* How to Use Section */}
            <section className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                </div>
                <h2 className="text-gray-900">How to Efficiently Use {tool.name}</h2>
              </div>
              
              <div className="space-y-6">
                {tool.howToUse.map((step) => (
                  <div key={step.step} className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-xl flex items-center justify-center shadow-lg">
                      {step.step}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-gray-900 mb-2">{step.title}</h3>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Tips & Best Practices */}
            <section className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                  <Lightbulb className="w-6 h-6 text-yellow-600" />
                </div>
                <h2 className="text-gray-900">Tips & Best Practices</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                {tool.tips.map((tip, index) => (
                  <div key={index} className="p-5 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl border border-yellow-200">
                    <h3 className="text-gray-900 mb-2">{tip.title}</h3>
                    <p className="text-gray-600 text-sm">{tip.description}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Shortcuts */}
            {tool.shortcuts && tool.shortcuts.length > 0 && (
              <section className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                    <Keyboard className="w-6 h-6 text-purple-600" />
                  </div>
                  <h2 className="text-gray-900">Keyboard Shortcuts</h2>
                </div>
                
                <div className="space-y-3">
                  {tool.shortcuts.map((shortcut, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-purple-300 transition-colors">
                      <span className="text-gray-700">{shortcut.description}</span>
                      <kbd className="px-3 py-1.5 bg-white border border-gray-300 rounded-lg text-sm shadow-sm">
                        {shortcut.keys}
                      </kbd>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Best For */}
            <section className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center gap-3 mb-5">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <h3 className="text-gray-900">Best For</h3>
              </div>
              
              <ul className="space-y-3">
                {tool.bestFor.map((use, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">{use}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Limitations */}
            <section className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center gap-3 mb-5">
                <XCircle className="w-6 h-6 text-red-600" />
                <h3 className="text-gray-900">Limitations</h3>
              </div>
              
              <ul className="space-y-3">
                {tool.limitations.map((limitation, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">{limitation}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Features */}
            <section className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl shadow-lg p-6 text-white">
              <h3 className="mb-5">Key Features</h3>
              
              <ul className="space-y-3">
                {tool.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Pricing */}
            <section className="bg-gradient-to-br from-red-50 to-white dark:from-red-900/20 dark:to-gray-900/20 rounded-2xl shadow-xl p-6 border-4 border-transparent bg-clip-padding relative overflow-hidden">
              {/* Animated sparkling border effect */}
              <div className="absolute inset-0 rounded-2xl border-4 border-red-500 dark:border-red-400 animate-pulse pointer-events-none"></div>
              <div className="absolute -inset-1 bg-gradient-to-r from-red-500 via-red-600 to-red-500 dark:from-red-400 dark:via-red-500 dark:to-red-400 rounded-2xl opacity-40 blur-sm animate-pulse pointer-events-none"></div>
              
              {/* Content */}
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl">💰</span>
                  <h3 className="text-gray-900 dark:text-white font-bold">Pricing</h3>
                  <span className="text-red-500 text-xl animate-pulse">✨</span>
                </div>
                <p className="text-gray-900 dark:text-gray-100 leading-relaxed font-bold">{tool.pricing}</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}