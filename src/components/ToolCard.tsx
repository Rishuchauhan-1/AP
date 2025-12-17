import { ExternalLink, Star, ArrowRight } from 'lucide-react';
import { AITool } from '../types';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ToolCardProps {
  tool: AITool;
  onClick: () => void;
}

export function ToolCard({ tool, onClick }: ToolCardProps) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border-2 border-gray-200 hover:shadow-2xl hover:border-blue-400 transition-all transform hover:-translate-y-2 cursor-pointer group">
      <div className="h-56 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 relative">
        <ImageWithFallback
          src={tool.image}
          alt={tool.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4 flex items-center gap-2 bg-white/95 backdrop-blur-sm px-3 py-2 rounded-lg shadow-lg">
          <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
          <span className="text-gray-900">{tool.rating}</span>
        </div>
      </div>
      
      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">{tool.name}</h3>
          <p className="text-blue-600 text-sm mb-3">{tool.tagline}</p>
          <p className="text-gray-600 text-sm line-clamp-2">{tool.description}</p>
        </div>
        
        <div className="mb-5">
          <div className="flex flex-wrap gap-2">
            {tool.features.slice(0, 3).map((feature, index) => (
              <span
                key={index}
                className="px-3 py-1.5 bg-blue-50 text-blue-700 text-xs rounded-lg border border-blue-200"
              >
                {feature}
              </span>
            ))}
            {tool.features.length > 3 && (
              <span className="px-3 py-1.5 bg-gray-100 text-gray-600 text-xs rounded-lg border border-gray-200">
                +{tool.features.length - 3} more
              </span>
            )}
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-5 border-t border-gray-100">
          <button
            onClick={onClick}
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 group-hover:gap-3 transition-all"
          >
            Learn More
            <ArrowRight className="w-4 h-4" />
          </button>
          <a
            href={tool.website}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1 text-gray-600 hover:text-blue-600 text-sm transition-colors"
          >
            Visit
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
