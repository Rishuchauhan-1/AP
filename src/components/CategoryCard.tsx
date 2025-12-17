import { 
  Video, 
  Image, 
  MessageSquare, 
  FileText, 
  Music, 
  Code, 
  TrendingUp, 
  Palette, 
  Zap, 
  Box, 
  BarChart3, 
  Languages,
  Mic,
  Film,
  BookOpen,
  Heart,
  Scale,
  GraduationCap,
  DollarSign,
  Gamepad2,
  LucideIcon 
} from 'lucide-react';
import { Category } from '../types';

interface CategoryCardProps {
  category: Category;
  onClick: () => void;
}

const iconMap: Record<string, LucideIcon> = {
  Video,
  Image,
  MessageSquare,
  FileText,
  Music,
  Code,
  TrendingUp,
  Palette,
  Zap,
  Box,
  BarChart3,
  Languages,
  Mic,
  Film,
  BookOpen,
  Heart,
  Scale,
  GraduationCap,
  DollarSign,
  Gamepad2
};

// Color schemes for each category
const colorSchemes: Record<string, { from: string; to: string; iconColor: string; hoverFrom: string; hoverTo: string }> = {
  'video-editing': { from: 'from-purple-100', to: 'to-violet-100', iconColor: 'text-purple-600', hoverFrom: 'group-hover:from-purple-600', hoverTo: 'group-hover:to-violet-600' },
  'image-generation': { from: 'from-pink-100', to: 'to-rose-100', iconColor: 'text-pink-600', hoverFrom: 'group-hover:from-pink-600', hoverTo: 'group-hover:to-rose-600' },
  'chatbots': { from: 'from-blue-100', to: 'to-cyan-100', iconColor: 'text-blue-600', hoverFrom: 'group-hover:from-blue-600', hoverTo: 'group-hover:to-cyan-600' },
  'writing': { from: 'from-amber-100', to: 'to-orange-100', iconColor: 'text-amber-600', hoverFrom: 'group-hover:from-amber-600', hoverTo: 'group-hover:to-orange-600' },
  'audio': { from: 'from-indigo-100', to: 'to-purple-100', iconColor: 'text-indigo-600', hoverFrom: 'group-hover:from-indigo-600', hoverTo: 'group-hover:to-purple-600' },
  'code': { from: 'from-green-100', to: 'to-emerald-100', iconColor: 'text-green-600', hoverFrom: 'group-hover:from-green-600', hoverTo: 'group-hover:to-emerald-600' },
  'marketing': { from: 'from-red-100', to: 'to-pink-100', iconColor: 'text-red-600', hoverFrom: 'group-hover:from-red-600', hoverTo: 'group-hover:to-pink-600' },
  'design': { from: 'from-violet-100', to: 'to-purple-100', iconColor: 'text-violet-600', hoverFrom: 'group-hover:from-violet-600', hoverTo: 'group-hover:to-purple-600' },
  'productivity': { from: 'from-yellow-100', to: 'to-amber-100', iconColor: 'text-yellow-600', hoverFrom: 'group-hover:from-yellow-600', hoverTo: 'group-hover:to-amber-600' },
  '3d': { from: 'from-cyan-100', to: 'to-blue-100', iconColor: 'text-cyan-600', hoverFrom: 'group-hover:from-cyan-600', hoverTo: 'group-hover:to-blue-600' },
  'data': { from: 'from-teal-100', to: 'to-cyan-100', iconColor: 'text-teal-600', hoverFrom: 'group-hover:from-teal-600', hoverTo: 'group-hover:to-cyan-600' },
  'translation': { from: 'from-blue-100', to: 'to-indigo-100', iconColor: 'text-blue-600', hoverFrom: 'group-hover:from-blue-600', hoverTo: 'group-hover:to-indigo-600' },
  'voice': { from: 'from-fuchsia-100', to: 'to-pink-100', iconColor: 'text-fuchsia-600', hoverFrom: 'group-hover:from-fuchsia-600', hoverTo: 'group-hover:to-pink-600' },
  'video-generation': { from: 'from-rose-100', to: 'to-red-100', iconColor: 'text-rose-600', hoverFrom: 'group-hover:from-rose-600', hoverTo: 'group-hover:to-red-600' },
  'research': { from: 'from-sky-100', to: 'to-blue-100', iconColor: 'text-sky-600', hoverFrom: 'group-hover:from-sky-600', hoverTo: 'group-hover:to-blue-600' },
  'healthcare': { from: 'from-red-100', to: 'to-rose-100', iconColor: 'text-red-600', hoverFrom: 'group-hover:from-red-600', hoverTo: 'group-hover:to-rose-600' },
  'legal': { from: 'from-slate-100', to: 'to-gray-100', iconColor: 'text-slate-600', hoverFrom: 'group-hover:from-slate-600', hoverTo: 'group-hover:to-gray-600' },
  'education': { from: 'from-emerald-100', to: 'to-green-100', iconColor: 'text-emerald-600', hoverFrom: 'group-hover:from-emerald-600', hoverTo: 'group-hover:to-green-600' },
  'finance': { from: 'from-green-100', to: 'to-teal-100', iconColor: 'text-green-700', hoverFrom: 'group-hover:from-green-700', hoverTo: 'group-hover:to-teal-700' },
  'gaming': { from: 'from-purple-100', to: 'to-pink-100', iconColor: 'text-purple-600', hoverFrom: 'group-hover:from-purple-600', hoverTo: 'group-hover:to-pink-600' }
};

export function CategoryCard({ category, onClick }: CategoryCardProps) {
  const Icon = iconMap[category.icon] || Video;
  const colors = colorSchemes[category.id] || { 
    from: 'from-blue-100', 
    to: 'to-indigo-100', 
    iconColor: 'text-blue-600', 
    hoverFrom: 'group-hover:from-blue-600', 
    hoverTo: 'group-hover:to-indigo-600' 
  };
  
  return (
    <button
      onClick={onClick}
      className="p-8 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-2xl hover:shadow-2xl hover:border-blue-400 dark:hover:border-blue-500 transition-all text-left group transform hover:-translate-y-1"
    >
      <div className={`w-14 h-14 bg-gradient-to-br ${colors.from} ${colors.to} rounded-xl flex items-center justify-center mb-5 ${colors.hoverFrom} ${colors.hoverTo} transition-all shadow-lg`}>
        <Icon className={`w-7 h-7 ${colors.iconColor} group-hover:text-white transition-colors`} />
      </div>
      <h3 className="text-gray-900 dark:text-white mb-3">{category.name}</h3>
      <p className="text-gray-600 dark:text-gray-400">{category.description}</p>
    </button>
  );
}