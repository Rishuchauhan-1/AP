import { useState } from 'react';
import { Search, Filter, Sparkles, DollarSign, AlertCircle, CheckCircle } from 'lucide-react';
import { AITool, Category } from '../types';
import { ToolCard } from './ToolCard';

interface ToolsPageProps {
  tools: AITool[];
  categories: Category[];
  onNavigate: (page: string, toolId?: string) => void;
  initialCategory?: string;
}

export function ToolsPage({ tools, categories, onNavigate, initialCategory }: ToolsPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTools = tools.filter((tool) => {
    const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory;
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tool.tagline.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  
  // Get current category name for display
  const currentCategoryName = selectedCategory !== 'all' 
    ? categories.find(c => c.id === selectedCategory)?.name 
    : null;

  return (
    <div className="py-12 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Floating Info Banner */}
        <div className="mb-8 animate-fadeIn">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 dark:from-purple-700 dark:via-pink-700 dark:to-red-700 p-1 shadow-2xl animate-gradient">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center animate-bounce">
                    <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                    <span className="inline-block animate-pulse">💡</span>
                    <span>Quick Tip!</span>
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base">
                    <strong>Note:</strong> Click on any AI tool card below to explore detailed information including:
                  </p>
                  <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4">
                    <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 bg-green-50 dark:bg-green-900/20 px-3 py-2 rounded-lg">
                      <DollarSign className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0" />
                      <span><strong>Pricing</strong> Plans</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 bg-orange-50 dark:bg-orange-900/20 px-3 py-2 rounded-lg">
                      <AlertCircle className="w-4 h-4 text-orange-600 dark:text-orange-400 flex-shrink-0" />
                      <span><strong>Limitations</strong></span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 bg-blue-50 dark:bg-blue-900/20 px-3 py-2 rounded-lg">
                      <CheckCircle className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                      <span><strong>Key Features</strong></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-12 text-center">
          <h1 className="text-gray-900 dark:text-white mb-4">
            {currentCategoryName ? `${currentCategoryName} Tools` : 'AI Tools Directory'}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-3xl mx-auto">
            {currentCategoryName 
              ? `Explore AI tools in the ${currentCategoryName} category. Click on any tool to learn how to use it efficiently.`
              : 'Discover detailed guides, tips, and insights for the best AI tools. Click on any tool to learn how to use it efficiently.'
            }
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
            <input
              type="text"
              placeholder="Search AI tools by name or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-6 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent shadow-lg text-lg"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Filter className="w-5 h-5 text-gray-600" />
            <span className="text-gray-700">Filter by category:</span>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-6 py-3 rounded-xl transition-all shadow-md hover:shadow-lg ${
                selectedCategory === 'all'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200'
              }`}
            >
              All Tools ({tools.length})
            </button>
            {categories.map((category) => {
              const count = tools.filter(t => t.category === category.id).length;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-3 rounded-xl transition-all shadow-md hover:shadow-lg ${
                    selectedCategory === category.id
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200'
                  }`}
                >
                  {category.name} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTools.map((tool) => (
            <ToolCard
              key={tool.id}
              tool={tool}
              onClick={() => onNavigate('tool-detail', tool.id)}
            />
          ))}
        </div>

        {filteredTools.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
            <p className="text-gray-500 text-lg">No tools found matching your criteria.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="mt-4 text-blue-600 hover:text-blue-700"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}