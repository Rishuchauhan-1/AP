import { Sparkles, Github, Twitter, Linkedin, Mail, Heart } from 'lucide-react';
import logoImage from 'figma:asset/4e64b30400e67e340dad0ebe1e00af41a307d606.png';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 dark:from-black dark:to-gray-900 text-gray-300 dark:text-gray-400 border-t border-gray-700 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-4 mb-4">
              <img 
                src={logoImage} 
                alt="Aipedia - AI Database & Insights" 
                className="h-16 w-16 rounded-full object-cover shadow-lg shadow-cyan-500/20 border-2 border-gray-700 dark:border-gray-600"
              />
              <div>
                <div className="text-xl text-white bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  AiPedia
                </div>
                <div className="text-xs text-gray-400 dark:text-gray-500 tracking-wider">
                  AI DATABASE & INSIGHTS
                </div>
              </div>
            </div>
            <p className="text-gray-400 dark:text-gray-500 mb-6 leading-relaxed">
              Comprehensive guides, expert tips, and honest reviews for the best AI tools. 
              Learn how to use AI efficiently with our detailed tutorials and shortcuts.
            </p>
            <div className="flex gap-3">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 dark:bg-gray-900 rounded-lg flex items-center justify-center hover:bg-blue-600 dark:hover:bg-blue-500 transition-colors border border-gray-700 dark:border-gray-800"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 dark:bg-gray-900 rounded-lg flex items-center justify-center hover:bg-blue-600 dark:hover:bg-blue-500 transition-colors border border-gray-700 dark:border-gray-800"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 dark:bg-gray-900 rounded-lg flex items-center justify-center hover:bg-blue-600 dark:hover:bg-blue-500 transition-colors border border-gray-700 dark:border-gray-800"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white mb-4">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-blue-400 dark:hover:text-blue-300 transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('tools')}
                  className="hover:text-blue-400 dark:hover:text-blue-300 transition-colors"
                >
                  AI Tools
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-blue-400 dark:hover:text-blue-300 transition-colors"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-blue-400 dark:hover:text-blue-300 transition-colors"
                >
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0 text-blue-400 dark:text-blue-300" />
                <a
                  href="mailto:ritesh_2503mc03@iitp.ac.in"
                  className="hover:text-blue-400 dark:hover:text-blue-300 transition-colors break-all"
                >
                  ritesh_2503mc03@iitp.ac.in
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0 text-purple-400 dark:text-purple-300" />
                <a
                  href="mailto:rishu_2503ct03@iitp.ac.in"
                  className="hover:text-blue-400 dark:hover:text-blue-300 transition-colors break-all"
                >
                  rishu_2503ct03@iitp.ac.in
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 dark:border-gray-800 pt-8 text-center">
          <p className="text-gray-400 dark:text-gray-500 text-sm mb-2">
            &copy; {new Date().getFullYear()} AiPedia. All rights reserved.
          </p>
          <p className="text-gray-500 dark:text-gray-600 text-sm flex items-center justify-center gap-2">
            Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> by 
            <span className="text-blue-400 dark:text-blue-300">Ritesh Thakur</span> and 
            <span className="text-purple-400 dark:text-purple-300">Rishu Kumar</span>
          </p>
          <p className="text-gray-600 dark:text-gray-700 text-xs mt-2">
            Indian Institute of Technology Patna
          </p>
        </div>
      </div>
    </footer>
  );
}