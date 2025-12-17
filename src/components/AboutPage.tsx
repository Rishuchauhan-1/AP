import { Target, Users, Zap, Heart } from 'lucide-react';

export function AboutPage() {
  return (
    <div className="py-12 bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h1 className="text-gray-900 mb-4">About Aipedia</h1>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Your comprehensive resource for discovering, learning, and mastering AI tools
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-12">
          <h2 className="text-gray-900 mb-6">Our Mission</h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            At Aipedia, we believe that artificial intelligence should be accessible and understandable to everyone. 
            Our mission is to create the most comprehensive and honest directory of AI tools, complete with detailed guides, 
            expert tips, and transparent information about both capabilities and limitations.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed">
            We don't just list tools – we help you master them. Each tool in our directory comes with step-by-step guides, 
            keyboard shortcuts, best practices, and real-world use cases to help you get the most out of AI technology.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center border-2 border-blue-100 hover:border-blue-400 transition-all">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Target className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-gray-900 mb-2">Comprehensive</h3>
            <p className="text-gray-600 text-sm">
              Detailed guides for every AI tool with tips and shortcuts
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 text-center border-2 border-purple-100 hover:border-purple-400 transition-all">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-gray-900 mb-2">User-Focused</h3>
            <p className="text-gray-600 text-sm">
              Designed to help you learn and succeed with AI
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 text-center border-2 border-green-100 hover:border-green-400 transition-all">
            <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-gray-900 mb-2">Always Updated</h3>
            <p className="text-gray-600 text-sm">
              Regular updates with the latest AI innovations
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 text-center border-2 border-red-100 hover:border-red-400 transition-all">
            <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-gray-900 mb-2">Honest Reviews</h3>
            <p className="text-gray-600 text-sm">
              Transparent about both strengths and limitations
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-12">
          <h2 className="text-gray-900 mb-6">What We Offer</h2>
          <div className="space-y-4 text-gray-700 text-lg">
            <div className="flex items-start gap-4">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
              <p><span className="text-gray-900">Detailed Tool Pages:</span> Every AI tool has a dedicated page with comprehensive information about features, use cases, and limitations.</p>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
              <p><span className="text-gray-900">Step-by-Step Guides:</span> Learn how to use each tool efficiently with our detailed how-to guides.</p>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
              <p><span className="text-gray-900">Expert Tips:</span> Discover pro tips and best practices to maximize your productivity.</p>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
              <p><span className="text-gray-900">Keyboard Shortcuts:</span> Master efficiency with curated keyboard shortcuts for each tool.</p>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
              <p><span className="text-gray-900">Honest Limitations:</span> We tell you what each tool can't do, not just what it can.</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl shadow-xl p-8 md:p-12 text-white mb-12">
          <h2 className="text-white mb-6">Our Story</h2>
          <p className="text-blue-100 text-lg leading-relaxed mb-6">
            Aipedia was created by a team of AI enthusiasts who recognized the need for honest, 
            comprehensive guidance in the rapidly evolving world of artificial intelligence. We saw people 
            struggling to navigate the overwhelming number of AI tools available, often without clear 
            information about how to use them effectively.
          </p>
          <p className="text-blue-100 text-lg leading-relaxed">
            What started as a personal project to document our own AI tool discoveries has grown into a 
            comprehensive resource serving thousands of users worldwide. We're passionate about making AI 
            accessible and helping everyone unlock the potential of these powerful technologies.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center">
          <h2 className="text-gray-900 mb-6">Made with ❤️ by</h2>
          <div className="flex flex-wrap justify-center gap-8 mb-6">
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-3 text-white shadow-lg">
                <span className="text-3xl">RT</span>
              </div>
              <h3 className="text-gray-900 mb-1">Ritesh Thakur</h3>
              <p className="text-gray-600 text-sm">Co-Founder & Developer</p>
            </div>
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-3 text-white shadow-lg">
                <span className="text-3xl">RK</span>
              </div>
              <h3 className="text-gray-900 mb-1">Rishu Kumar</h3>
              <p className="text-gray-600 text-sm">Co-Founder & Developer</p>
            </div>
          </div>
          <p className="text-gray-600 text-sm">
            Students passionate about AI and technology, dedicated to helping others discover and master AI tools
          </p>
        </div>
      </div>
    </div>
  );
}
