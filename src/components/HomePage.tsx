import { ArrowRight, Sparkles, Zap, Shield, TrendingUp } from 'lucide-react';
import { Category } from '../types';
import { CategoryCard } from './CategoryCard';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface HomePageProps {
  categories: Category[];
  onNavigate: (page: string, toolId?: string, categoryId?: string) => void;
}

export function HomePage({ categories, onNavigate }: HomePageProps) {
  return (
    <div className="dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 dark:from-blue-900 dark:via-indigo-900 dark:to-purple-900 py-24 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="w-7 h-7" />
                <span className="text-blue-100 dark:text-blue-200 text-lg">Discover the Power of AI</span>
              </div>
              <h1 className="text-white mb-3 text-5xl">
                AiPedia - Your Ultimate AI Tools Database
              </h1>
              <div className="mb-6 flex items-center justify-start gap-2">
                <div className="h-px w-12 bg-gradient-to-r from-transparent via-blue-300 to-blue-300" />
                <p className="text-sm text-blue-200 dark:text-blue-300 italic font-light tracking-wide whitespace-nowrap">
                  ✨ The world's best curated list of AI tools ✨
                </p>
                <div className="h-px w-12 bg-gradient-to-r from-blue-300 via-blue-300 to-transparent" />
              </div>
              <p className="text-blue-100 dark:text-blue-200 text-lg mb-8 leading-relaxed">
                Explore comprehensive guides, best practices, and limitations of the top AI tools. 
                Learn how to use each tool efficiently with expert tips and shortcuts.
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => onNavigate('tools')}
                  className="px-8 py-4 bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 rounded-xl hover:bg-blue-50 dark:hover:bg-gray-700 transition-all shadow-xl hover:shadow-2xl inline-flex items-center gap-2 transform hover:scale-105"
                >
                  Explore AI Tools
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button
                  onClick={() => onNavigate('about')}
                  className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white border-2 border-white/20 rounded-xl hover:bg-white/20 transition-all inline-flex items-center gap-2"
                >
                  Learn More
                </button>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-400 to-purple-400 rounded-2xl blur-3xl opacity-50" />
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1697577418970-95d99b5a55cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NjQ3MDM5ODF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="AI Technology"
                  className="relative rounded-2xl shadow-2xl w-full h-96 object-cover border-4 border-white/20"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-gray-900 dark:text-white mb-4">Why Choose Our Directory?</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
              We provide in-depth analysis and practical guides for every AI tool
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-100 dark:border-blue-800 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-blue-600 dark:bg-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-gray-900 dark:text-white mb-3">Honest Reviews</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Unbiased analysis of capabilities AND limitations for informed decisions
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-100 dark:border-purple-800 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-purple-600 dark:bg-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-gray-900 dark:text-white mb-3">Expert Tips</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Learn shortcuts, best practices, and pro tips to maximize productivity
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-100 dark:border-green-800 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-green-600 dark:bg-green-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-gray-900 dark:text-white mb-3">Always Updated</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Regular updates with the latest features, tools, and AI innovations
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-gray-900 dark:text-white mb-4">Explore by Category</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
              Browse our curated collection of AI tools organized by function and use case
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categories.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                onClick={() => onNavigate('tools', undefined, category.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl mb-2">500+</div>
              <div className="text-blue-100">AI Tools</div>
            </div>
            <div>
              <div className="text-5xl mb-2">20</div>
              <div className="text-blue-100">Categories</div>
            </div>
            <div>
              <div className="text-5xl mb-2">2000+</div>
              <div className="text-blue-100">Expert Tips</div>
            </div>
            <div>
              <div className="text-5xl mb-2">Daily</div>
              <div className="text-blue-100">Updates</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-gray-900 dark:text-white mb-6">Ready to Explore AI Tools?</h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg mb-8">
            Start discovering the best AI tools with comprehensive guides and expert insights
          </p>
          <button
            onClick={() => onNavigate('tools')}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 dark:hover:from-blue-600 dark:hover:to-indigo-600 transition-all shadow-lg hover:shadow-xl inline-flex items-center gap-2 text-lg"
          >
            Browse All Tools
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </section>
    </div>
  );
}