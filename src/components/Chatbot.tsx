import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Sparkles, Mic, Volume2, VolumeX, MicOff } from 'lucide-react';
import { AITool, Category } from '../types';

interface ChatbotProps {
  tools: AITool[];
  categories: Category[];
  onNavigate: (page: string, toolId?: string, categoryId?: string) => void;
}

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  toolSuggestions?: AITool[];
}

interface ConversationContext {
  lastCategory?: string;
  lastTool?: AITool;
  userPreferences: string[];
  questionCount: number;
  topics: string[];
}

export function Chatbot({ tools, categories, onNavigate }: ChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "👋 Hi! I'm Foi, your friendly AI Tools Assistant. I can help you find the perfect AI tool for your needs. Ask me anything like:\n\n• \"What's the best tool for video editing?\"\n• \"Show me image generation tools\"\n• \"Which tool should I use for coding?\"\n• \"Tell me about ChatGPT\"",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [context, setContext] = useState<ConversationContext>({
    userPreferences: [],
    questionCount: 0,
    topics: []
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  // Initialize speech synthesis
  useEffect(() => {
    synthRef.current = window.speechSynthesis;
    
    return () => {
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, []);

  // Show notification after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNotification(true);
    }, 2000); // Show after 2 seconds

    return () => clearTimeout(timer);
  }, []);

  // Hide notification after some time
  useEffect(() => {
    if (showNotification) {
      const timer = setTimeout(() => {
        setShowNotification(false);
      }, 8000); // Hide after 8 seconds

      return () => clearTimeout(timer);
    }
  }, [showNotification]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const findRelevantTools = (query: string): AITool[] => {
    const lowerQuery = query.toLowerCase();
    
    // Find tools by name match
    const nameMatches = tools.filter(tool => 
      tool.name.toLowerCase().includes(lowerQuery)
    );
    
    if (nameMatches.length > 0) return nameMatches.slice(0, 3);
    
    // Find tools by category
    const categoryMatch = categories.find(cat => 
      lowerQuery.includes(cat.name.toLowerCase()) ||
      lowerQuery.includes(cat.id.toLowerCase())
    );
    
    if (categoryMatch) {
      return tools.filter(tool => tool.category === categoryMatch.id).slice(0, 3);
    }
    
    // Find tools by description/features match
    const descriptionMatches = tools.filter(tool => 
      tool.description.toLowerCase().includes(lowerQuery) ||
      tool.tagline.toLowerCase().includes(lowerQuery) ||
      tool.features.some(f => f.toLowerCase().includes(lowerQuery)) ||
      tool.bestFor?.some(b => b.toLowerCase().includes(lowerQuery))
    );
    
    return descriptionMatches.slice(0, 3);
  };

  const generateResponse = (query: string): { text: string; suggestions?: AITool[] } => {
    const lowerQuery = query.toLowerCase();
    
    // Update context
    setContext(prev => ({
      ...prev,
      questionCount: prev.questionCount + 1,
      topics: [...prev.topics, query].slice(-5)
    }));
    
    // Advanced typo correction and fuzzy matching
    const correctTypos = (text: string): string => {
      const corrections: { [key: string]: string } = {
        'vidio': 'video', 'vedio': 'video', 'imag': 'image', 'codding': 'coding',
        'writting': 'writing', 'desing': 'design', 'chatgpt': 'chatgpt',
        'cluade': 'claude', 'claude': 'claude', 'midjourny': 'midjourney',
        'dall-e': 'dall-e', 'dallE': 'dall-e', 'copilot': 'copilot',
        'editng': 'editing', 'generaation': 'generation', 'beste': 'best',
        'recomend': 'recommend', 'recommand': 'recommend'
      };
      let corrected = text;
      Object.entries(corrections).forEach(([wrong, right]) => {
        corrected = corrected.replace(new RegExp(wrong, 'gi'), right);
      });
      return corrected;
    };
    
    const correctedQuery = correctTypos(lowerQuery);
    
    // Contextual follow-up detection
    const isFollowUp = (query: string): boolean => {
      const followUpIndicators = [
        'more', 'also', 'another', 'else', 'what about', 'how about',
        'show me', 'tell me', 'any other', 'what else', 'similar',
        'like that', 'alternatives', 'instead', 'better', 'cheaper',
        'free version', 'paid', 'more details', 'explain'
      ];
      return followUpIndicators.some(indicator => query.includes(indicator));
    };
    
    // Multi-intent detection
    const detectIntents = (query: string): string[] => {
      const intents: string[] = [];
      
      if (query.match(/best|top|recommend|suggest|should i use/)) intents.push('recommendation');
      if (query.match(/what is|tell me about|explain|describe/)) intents.push('information');
      if (query.match(/how to|how do i|guide|tutorial|tips/)) intents.push('tutorial');
      if (query.match(/vs|versus|compare|difference|better than/)) intents.push('comparison');
      if (query.match(/free|cheap|affordable|pricing|cost|price/)) intents.push('pricing');
      if (query.match(/limitation|problem|issue|disadvantage|con|downside/)) intents.push('limitations');
      if (query.match(/feature|capability|can it|does it/)) intents.push('features');
      if (query.match(/alternative|similar|like|replacement for/)) intents.push('alternatives');
      
      return intents;
    };
    
    const intents = detectIntents(correctedQuery);
    
    // Advanced greeting with personalization
    if (correctedQuery.match(/^(hi|hello|hey|good morning|good afternoon|good evening|greetings|howdy|yo)/)) {
      const greetings = [
        `Hello! 👋 I'm Foi, your AI Tools expert. ${context.questionCount > 0 ? "Great to see you again!" : "What brings you here today?"}`,
        `Hi there! ✨ Ready to discover some amazing AI tools? I'm here to help!`,
        `Hey! 🤖 I'm Foi, and I know everything about the ${tools.length}+ AI tools in AiPedia. What can I find for you?`
      ];
      return {
        text: greetings[context.questionCount % greetings.length]
      };
    }
    
    // Name inquiry with personality
    if (correctedQuery.includes('your name') || correctedQuery.includes('who are you') || 
        correctedQuery.includes('what are you called') || correctedQuery.includes('what is your name') ||
        correctedQuery.includes("what's your name")) {
      return {
        text: `I'm Foi! 🤖 Think of me as your personal AI tools curator and expert advisor.\n\nI've been trained on ${tools.length}+ AI tools across ${categories.length} categories. Whether you're looking for something specific or just exploring, I'm here to guide you to the perfect tool!\n\nI can help you with recommendations, comparisons, tutorials, and even hidden tips that most people don't know about. What would you like to explore?`
      };
    }
    
    // Owner/Creator inquiry with context
    if (correctedQuery.includes('owner') || correctedQuery.includes('creator') || 
        correctedQuery.includes('made you') || correctedQuery.includes('created you') ||
        correctedQuery.includes('developed you') || correctedQuery.includes('built you') ||
        correctedQuery.includes('who made') || correctedQuery.includes('your creator') ||
        correctedQuery.includes('your owner') || correctedQuery.includes('your developer') ||
        correctedQuery.includes('founded') || correctedQuery.includes('team behind')) {
      return {
        text: `I was originated by brilliant minds at **IIT Patna**! 🎓✨\n\n**The Creators:**\n\n👨‍💻 **Ritesh Thakur**\n📧 ritesh_2503mc03@iitp.ac.in\n🎯 Co-founder & Lead Developer\n\n👨‍💻 **Rishu Kumar**\n📧 rishu_2503ct03@iitp.ac.in\n🎯 Co-founder & Lead Developer\n\nThey built AiPedia to solve a real problem: finding the *right* AI tool for your specific needs. With ${tools.length}+ tools curated and analyzed, this is now the world's best curated list of AI tools!\n\nNow, let's find the perfect AI tool for you! What are you working on?`
      };
    }
    
    // Capabilities inquiry
    if (correctedQuery.match(/what can you do|your capabilities|help me|how to use|features|abilities/)) {
      return {
        text: `I'm an advanced AI assistant specialized in AI tools! Here's what makes me special:\n\n🎯 **Smart Recommendations**\nI analyze your needs and suggest the perfect tools\n\n🔍 **Deep Knowledge**\n${tools.length}+ tools across ${categories.length} categories with detailed insights\n\n⚖️ **Honest Comparisons**\nI'll tell you pros, cons, and what others won't\n\n💡 **Pro Tips & Shortcuts**\nLearn tricks that power users know\n\n🧠 **Context Understanding**\nI remember our conversation and learn your preferences\n\n🎤 **Voice Interaction**\nSpeak naturally - I understand you!\n\n**Try asking:**\n• "What's the best free AI for beginners?"\n• "Compare ChatGPT vs Claude for coding"\n• "Show me video editing tools under $20"\n• "I need an AI that can... [describe your need]"\n\nWhat would you like to explore?`
      };
    }
    
    // Pricing-focused queries
    if (intents.includes('pricing')) {
      const freeTools = tools.filter(t => t.pricing.toLowerCase().includes('free')).slice(0, 5);
      if (freeTools.length > 0) {
        return {
          text: `Looking for budget-friendly options? Smart choice! Here are the **top-rated FREE AI tools**:\n\n${freeTools.map((t, i) => `${i + 1}. **${t.name}** ⭐ ${t.rating}/5\n   💰 ${t.pricing}\n   🎯 ${t.tagline}\n   ✨ Best for: ${t.bestFor?.[0] || 'various tasks'}`).join('\n\n')}\n\n💡 **Pro Tip:** Many "free" tools have premium features. I can help you find which free tier works best for your needs!\n\nWant to know more about any of these?`,
          suggestions: freeTools
        };
      }
    }
    
    // Limitations-focused queries
    if (intents.includes('limitations')) {
      const toolMatch = tools.find(t => correctedQuery.includes(t.name.toLowerCase()));
      if (toolMatch && toolMatch.limitations && toolMatch.limitations.length > 0) {
        return {
          text: `Great question! Let me give you the **honest truth about ${toolMatch.name}**:\n\n⚠️ **Limitations:**\n${toolMatch.limitations.map(l => `• ${l}`).join('\n')}\n\n✅ **But it's still great for:**\n${toolMatch.bestFor?.map(b => `• ${b}`).join('\n')}\n\n💡 **My Take:** ${toolMatch.rating >= 4.5 ? 'Despite these limitations, it\'s still one of the best in its category!' : 'These are important considerations. Depending on your use case, you might want to explore alternatives.'}\n\nWant to see alternative tools that might better fit your needs?`,
          suggestions: [toolMatch]
        };
      }
    }
    
    // Comparison queries with advanced analysis
    if (intents.includes('comparison') || correctedQuery.includes('vs') || correctedQuery.includes('compare')) {
      const toolNames = correctedQuery.split(/vs|versus|compare|or|and/).map(s => s.trim());
      const comparedTools = toolNames.map(name => 
        tools.find(t => name.includes(t.name.toLowerCase()) || t.name.toLowerCase().includes(name))
      ).filter(Boolean) as AITool[];
      
      if (comparedTools.length >= 2) {
        const tool1 = comparedTools[0];
        const tool2 = comparedTools[1];
        
        // Determine winner by category
        const ratingWinner = tool1.rating > tool2.rating ? tool1.name : tool2.name;
        const pricingAnalysis = tool1.pricing.toLowerCase().includes('free') && !tool2.pricing.toLowerCase().includes('free') 
          ? `${tool1.name} wins on price` 
          : tool2.pricing.toLowerCase().includes('free') && !tool1.pricing.toLowerCase().includes('free')
          ? `${tool2.name} wins on price`
          : 'Similar pricing';
        
        return {
          text: `Excellent question! Let me break down **${tool1.name} vs ${tool2.name}**:\n\n**📊 ${tool1.name}**\n⭐ Rating: ${tool1.rating}/5 ${tool1.rating === Math.max(tool1.rating, tool2.rating) ? '👑' : ''}\n💰 Pricing: ${tool1.pricing}\n✅ Best for: ${tool1.bestFor?.[0]}\n${tool1.limitations ? `⚠️ Watch out: ${tool1.limitations[0]}` : ''}\n\n**📊 ${tool2.name}**\n⭐ Rating: ${tool2.rating}/5 ${tool2.rating === Math.max(tool1.rating, tool2.rating) ? '👑' : ''}\n💰 Pricing: ${tool2.pricing}\n✅ Best for: ${tool2.bestFor?.[0]}\n${tool2.limitations ? `⚠️ Watch out: ${tool2.limitations[0]}` : ''}\n\n**🎯 My Recommendation:**\n${Math.abs(tool1.rating - tool2.rating) < 0.3 
  ? `These are both excellent choices! ${tool1.name} if you prioritize ${tool1.bestFor?.[0]}, ${tool2.name} if ${tool2.bestFor?.[0]} is more important.`
  : `${ratingWinner} has a clear edge with its higher rating and user satisfaction.`}\n\n💰 Budget: ${pricingAnalysis}\n\nClick below to see full details!`,
          suggestions: comparedTools
        };
      }
    }
    
    // Alternative/Similar tool queries
    if (intents.includes('alternatives') || correctedQuery.match(/alternative|similar|like|replacement|instead of/)) {
      const toolMatch = tools.find(t => correctedQuery.includes(t.name.toLowerCase()));
      if (toolMatch) {
        const alternatives = tools
          .filter(t => t.category === toolMatch.category && t.id !== toolMatch.id)
          .sort((a, b) => b.rating - a.rating)
          .slice(0, 3);
        
        if (alternatives.length > 0) {
          return {
            text: `Looking for alternatives to **${toolMatch.name}**? Smart move - always good to know your options!\n\nHere are the **best alternatives** in the same category:\n\n${alternatives.map((t, i) => `${i + 1}. **${t.name}** ⭐ ${t.rating}/5\n   💰 ${t.pricing}\n   ✨ ${t.tagline}\n   ${t.rating > toolMatch.rating ? '🔥 Higher rated!' : t.pricing.toLowerCase().includes('free') && !toolMatch.pricing.toLowerCase().includes('free') ? '💎 Free option!' : ''}`).join('\n\n')}\n\n💡 **Why consider alternatives?**\n• Different pricing models\n• Unique features for specific use cases\n• Better fit for your workflow\n\nWant detailed comparison with ${toolMatch.name}?`,
            suggestions: alternatives
          };
        }
      }
    }
    
    // Best/Recommendation queries with advanced filtering
    if (intents.includes('recommendation') || correctedQuery.includes('best') || correctedQuery.includes('recommend')) {
      const relevantTools = findRelevantTools(correctedQuery);
      
      if (relevantTools.length > 0) {
        const category = categories.find(c => relevantTools[0].category === c.id);
        const topRated = relevantTools.sort((a, b) => b.rating - a.rating);
        
        return {
          text: `Based on my analysis of **${category?.name || 'these tools'}**, here are my top recommendations:\n\n${topRated.map((t, i) => `${i === 0 ? '🏆' : i + 1 + '.'} **${t.name}** ${i === 0 ? '(My top pick!)' : ''}\n   ⭐ ${t.rating}/5 • 💰 ${t.pricing}\n   ✨ ${t.tagline}\n   🎯 Perfect for: ${t.bestFor?.[0]}\n   ${i === 0 && t.tips ? `💡 Pro tip: ${t.tips[0]}` : ''}`).join('\n\n')}\n\n**Why ${topRated[0].name}?**\n${topRated[0].rating >= 4.5 ? '• Highest user satisfaction rating' : ''}\n• ${topRated[0].bestFor?.[0]}\n• ${topRated[0].pricing}\n\nClick below to see detailed guides, shortcuts, and pro tips!`,
          suggestions: topRated
        };
      }
    }
    
    // Specific tool inquiry with enhanced details
    const specificTool = tools.find(t => 
      correctedQuery.includes(t.name.toLowerCase()) ||
      t.name.toLowerCase().includes(correctedQuery.split(' ').find(word => word.length > 3) || '')
    );
    
    if (specificTool) {
      const category = categories.find(c => c.id === specificTool.category);
      const categoryTools = tools.filter(t => t.category === specificTool.category);
      const rank = categoryTools
        .sort((a, b) => b.rating - a.rating)
        .findIndex(t => t.id === specificTool.id) + 1;
      
      setContext(prev => ({ ...prev, lastTool: specificTool }));
      
      return {
        text: `**${specificTool.name}** ${specificTool.rating >= 4.5 ? '🌟' : ''}\n\n${specificTool.description}\n\n**📊 Quick Stats:**\n⭐ Rating: ${specificTool.rating}/5 (${rank}${rank === 1 ? 'st - Top ranked' : rank === 2 ? 'nd' : rank === 3 ? 'rd' : 'th'} in ${category?.name})\n💰 Pricing: ${specificTool.pricing}\n📂 Category: ${category?.name}\n\n**🎯 Best Use Cases:**\n${specificTool.bestFor?.slice(0, 3).map(b => `• ${b}`).join('\n')}\n\n**✨ Key Features:**\n${specificTool.features.slice(0, 3).map(f => `• ${f}`).join('\n')}\n\n${specificTool.limitations && specificTool.limitations.length > 0 ? `**⚠️ Important to Know:**\n${specificTool.limitations.slice(0, 2).map(l => `• ${l}`).join('\n')}\n\n` : ''}${specificTool.tips && specificTool.tips.length > 0 ? `**💡 Pro Tip:**\n${specificTool.tips[0]}\n\n` : ''}Click below for the complete guide with shortcuts, workflows, and expert tips!`,
        suggestions: [specificTool]
      };
    }
    
    // Category-based queries with enhanced insights
    const categoryMatch = categories.find(cat => 
      correctedQuery.includes(cat.name.toLowerCase()) ||
      correctedQuery.includes(cat.id.toLowerCase()) ||
      cat.description.toLowerCase().includes(correctedQuery) ||
      correctedQuery.includes(cat.description.toLowerCase())
    );
    
    if (categoryMatch) {
      const categoryTools = tools.filter(t => t.category === categoryMatch.id);
      const topTools = categoryTools.sort((a, b) => b.rating - a.rating).slice(0, 3);
      const avgRating = (categoryTools.reduce((sum, t) => sum + t.rating, 0) / categoryTools.length).toFixed(1);
      
      setContext(prev => ({ ...prev, lastCategory: categoryMatch.id }));
      
      return {
        text: `**${categoryMatch.name}** ${categoryMatch.icon}\n\n${categoryMatch.description}\n\n**📊 Category Insights:**\n🔢 ${categoryTools.length} tools available\n⭐ Average rating: ${avgRating}/5\n💎 ${categoryTools.filter(t => t.pricing.toLowerCase().includes('free')).length} free options\n\n**🏆 Top Picks:**\n\n${topTools.map((t, i) => `${i + 1}. **${t.name}** ${i === 0 ? '👑' : ''}⭐ ${t.rating}/5\n   ${t.tagline}\n   💰 ${t.pricing}\n   ${i === 0 ? `\n   💡 Why it's #1: ${t.bestFor?.[0]}` : ''}`).join('\n\n')}\n\n**🎯 Need help choosing?**\nTell me more about your specific use case, and I'll narrow it down to the perfect tool for you!\n\nClick any tool below to explore features, limitations, and pro tips!`,
        suggestions: topTools
      };
    }
    
    // Use case patterns with intelligent matching
    const useCaseKeywords: { [key: string]: string[] } = {
      'video-editing': ['video', 'edit video', 'video editor', 'clip', 'movie', 'film'],
      'video-generation': ['create video', 'generate video', 'make video', 'video from text'],
      'image-generation': ['image', 'picture', 'art', 'draw', 'generate image', 'create image', 'illustration'],
      'code': ['code', 'coding', 'programming', 'develop', 'developer', 'software', 'debug'],
      'writing': ['write', 'writing', 'content', 'blog', 'article', 'copywriting', 'essay'],
      'chatbots': ['chat', 'chatbot', 'conversation', 'assistant', 'talk', 'ai chat'],
      'voice': ['voice', 'speech', 'text to speech', 'tts', 'narration'],
      'audio': ['audio', 'music', 'sound', 'podcast'],
      'design': ['design', 'graphic', 'ui', 'ux', 'logo'],
      'marketing': ['marketing', 'seo', 'ads', 'campaign', 'social media'],
      '3d': ['3d', 'three d', 'model', '3d model'],
      'data': ['data', 'analytics', 'analysis', 'statistics', 'insights'],
    };
    
    for (const [categoryId, keywords] of Object.entries(useCaseKeywords)) {
      if (keywords.some(keyword => correctedQuery.includes(keyword))) {
        const category = categories.find(c => c.id === categoryId);
        if (category) {
          const categoryTools = tools.filter(t => t.category === categoryId).sort((a, b) => b.rating - a.rating).slice(0, 3);
          
          return {
            text: `Perfect! For **${keywords[0]}-related tasks**, I've analyzed all our ${category.name} tools.\n\n**🎯 My Top 3 Recommendations:**\n\n${categoryTools.map((t, i) => `${i === 0 ? '🏆 **Top Choice:** ' : `${i + 1}. `}**${t.name}**\n   ⭐ ${t.rating}/5 • 💰 ${t.pricing}\n   ✨ ${t.tagline}\n   ${i === 0 ? `\n   **Why #1?** ${t.bestFor?.[0]}\n   ${t.tips ? `💡 ${t.tips[0]}` : ''}` : `✅ ${t.bestFor?.[0]}`}`).join('\n\n')}\n\n**💬 Need more specific advice?**\nTell me:\n• Your skill level (beginner/pro)\n• Your budget\n• Specific features you need\n\nClick below to explore each tool in depth!`,
            suggestions: categoryTools
          };
        }
      }
    }
    
    // Thank you responses
    if (correctedQuery.match(/thank|thanks|appreciate|helpful|great|awesome|perfect/)) {
      return {
        text: `You're very welcome! 😊 I'm so glad I could help!\n\n${context.questionCount > 3 ? "I can see you're really exploring our tools - that's awesome! " : ""}Feel free to ask me anything else about AI tools. I'm here to help you find exactly what you need.\n\n**Quick suggestions:**\n• Want to compare any tools?\n• Need tips for using a specific tool?\n• Looking for free alternatives?\n\nWhat else can I help you discover?`
      };
    }
    
    // Irrelevant/Off-topic with smart redirection
    const irrelevantKeywords = [
      'weather', 'news', 'joke', 'story', 'recipe', 'sports', 'movie', 
      'restaurant', 'travel', 'book', 'game', 'music', 'song', 
      'calculate', 'math', 'translate', 'date', 'time', 'love', 'relationship',
      'what is', 'who is', 'where is', 'when is', 'how old', 'capital of',
      'meaning of', 'definition of', 'history of'
    ];
    
    const isToolRelated = tools.some(t => correctedQuery.includes(t.name.toLowerCase())) ||
                         categories.some(c => correctedQuery.includes(c.name.toLowerCase())) ||
                         correctedQuery.includes('tool') || correctedQuery.includes('ai') ||
                         correctedQuery.includes('chatbot') || correctedQuery.includes('aipedia');
    
    const hasIrrelevantKeyword = irrelevantKeywords.some(keyword => 
      correctedQuery.includes(keyword) && !correctedQuery.includes('tool') && !correctedQuery.includes('ai')
    );
    
    if (hasIrrelevantKeyword && !isToolRelated && correctedQuery.length > 5) {
      // Try to be helpful even with off-topic questions
      const suggestedCategory = correctedQuery.includes('weather') ? 'data' :
                                correctedQuery.includes('translate') ? 'writing' :
                                correctedQuery.includes('music') || correctedQuery.includes('song') ? 'audio' :
                                null;
      
      const suggestion = suggestedCategory ? 
        `\n\nThough if you're interested in ${correctedQuery.includes('weather') ? 'weather data analysis' : correctedQuery.includes('translate') ? 'translation tools' : correctedQuery.includes('music') ? 'music creation'  : 'related AI tools'}, I can help with that!` : '';
      
      return {
        text: `I appreciate the question! 🤖 However, I'm Foi, a specialized AI tools expert. I focus specifically on helping you discover and master AI tools.\n\n**🎯 What I'm great at:**\n✨ Finding the perfect AI tool for any task\n🔍 Comparing ${tools.length}+ AI tools across ${categories.length} categories\n💡 Sharing pro tips, shortcuts, and hidden features\n⚖️ Giving honest assessments (pros & cons)\n🎓 Teaching you how to use tools effectively${suggestion}\n\n**Try asking me:**\n• "What's the best free AI for [your task]?"\n• "Compare [Tool A] vs [Tool B]"\n• "Show me tools for [your use case]"\n• "How do I use [tool name] effectively?"\n\nHow can I help you with AI tools today?`
      };
    }
    
    // Advanced default response with intelligent suggestions
    const queryWords = correctedQuery.split(' ').filter(w => w.length > 3);
    const smartMatches = tools.filter(t => 
      queryWords.some(word => 
        t.name.toLowerCase().includes(word) ||
        t.description.toLowerCase().includes(word) ||
        t.tagline.toLowerCase().includes(word) ||
        t.features.some(f => f.toLowerCase().includes(word))
      )
    ).sort((a, b) => b.rating - a.rating).slice(0, 3);
    
    if (smartMatches.length > 0) {
      return {
        text: `I found some relevant tools based on your query! Here's what might help:\n\n${smartMatches.map((t, i) => `${i + 1}. **${t.name}** ⭐ ${t.rating}/5\n   ${t.tagline}\n   💰 ${t.pricing}\n   🎯 ${t.bestFor?.[0]}`).join('\n\n')}\n\n**💡 Want better results?**\nTry being more specific:\n• "Best tool for [specific task]"\n• "Free AI for [your need]"\n• "Compare [Tool A] vs [Tool B]"\n\nClick any tool below to learn more!`,
        suggestions: smartMatches
      };
    }
    
    // Ultimate fallback with category suggestions
    const randomCategories = [...categories].sort(() => 0.5 - Math.random()).slice(0, 3);
    return {
      text: `Hmm, I'm not quite sure what you're looking for, but I'm here to help! 🤖\n\n**🎯 Popular categories you might be interested in:**\n\n${randomCategories.map((c, i) => `${c.icon} **${c.name}**\n${c.description}\n${tools.filter(t => t.category === c.id).length} tools available`).join('\n\n')}\n\n**💬 Or try asking:**\n• "Show me video editing tools"\n• "What's the best AI for beginners?"\n• "Free image generation tools"\n• "Compare ChatGPT vs Claude"\n\nI'm smart, but I need a bit more context! What are you trying to accomplish?`
    };
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // Stop any ongoing speech when user sends a new message
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsSpeaking(false);
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const response = generateResponse(inputValue);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response.text,
        sender: 'bot',
        timestamp: new Date(),
        toolSuggestions: response.suggestions
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);

      // Speak the response if voice is enabled
      if (voiceEnabled && synthRef.current) {
        // Replace "Foi" with "Foy" for proper pronunciation and remove emojis
        const speechText = response.text
          .replace(/Foi/g, 'Foy')
          .replace(/\*\*/g, '')
          .replace(/\n/g, ' ')
          // Remove all emojis using regex
          .replace(/[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]|[\u{1F000}-\u{1F02F}]|[\u{1F0A0}-\u{1F0FF}]|[\u{1F100}-\u{1F64F}]|[\u{1F680}-\u{1F6FF}]|[\u{1F900}-\u{1F9FF}]|[\u{1FA00}-\u{1FA6F}]|[\u{1FA70}-\u{1FAFF}]|[\u{2300}-\u{23FF}]|[\u{2B50}]|[\u{2934}-\u{2935}]|[\u{3030}]|[\u{3297}]|[\u{3299}]|[\u{FE00}-\u{FE0F}]|[\u{1F1E6}-\u{1F1FF}]/gu, '')
          // Remove common emoji symbols that might be missed
          .replace(/[👋🤖💬🎯✨🔍💡⚖️🧠🎤📊⭐💰✅⚠️🏆👑💎🔥📧🎓👨‍💻📂🌟🎀✓×]/g, '')
          // Clean up extra spaces
          .replace(/\s+/g, ' ')
          .trim();
        const utterance = new SpeechSynthesisUtterance(speechText);
        
        // Select a sweet female voice
        const voices = synthRef.current.getVoices();
        const femaleVoice = voices.find(voice => 
          (voice.name.toLowerCase().includes('female') || 
           voice.name.toLowerCase().includes('samantha') ||
           voice.name.toLowerCase().includes('victoria') ||
           voice.name.toLowerCase().includes('zira') ||
           voice.name.toLowerCase().includes('susan') ||
           voice.name.toLowerCase().includes('google uk english female') ||
           voice.name.toLowerCase().includes('google us english') && voice.name.toLowerCase().includes('female')) &&
          voice.lang.startsWith('en')
        ) || voices.find(voice => 
          voice.name.toLowerCase().includes('female') && voice.lang.startsWith('en')
        );
        
        if (femaleVoice) {
          utterance.voice = femaleVoice;
        }
        
        // Make voice sweeter with higher pitch and moderate rate
        utterance.pitch = 1.3; // Higher pitch for sweeter, more feminine sound (range: 0-2, default: 1)
        utterance.rate = 0.95; // Slightly slower for clarity and warmth (range: 0.1-10, default: 1)
        utterance.volume = 1; // Full volume (range: 0-1, default: 1)
        
        synthRef.current.speak(utterance);
        setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
      }
    }, 1000);
  };

  const handleToolClick = (toolId: string) => {
    onNavigate('tool-detail', toolId);
    setIsOpen(false);
  };

  const handleVoiceToggle = () => {
    setVoiceEnabled(!voiceEnabled);
    // Stop any current speech when toggling off
    if (voiceEnabled && synthRef.current) {
      synthRef.current.cancel();
      setIsSpeaking(false);
    }
  };

  const handleStopSpeaking = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsSpeaking(false);
    }
  };

  const handleVoiceStart = async () => {
    // Check if browser supports speech recognition
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Sorry, your browser doesn\'t support speech recognition. Please try Chrome or Edge.');
      return;
    }

    // Check microphone permission first
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      // Stop the stream immediately after getting permission
      stream.getTracks().forEach(track => track.stop());
    } catch (err: any) {
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        alert('🎤 Microphone Permission Required\n\nTo use voice input:\n\n1. Click the 🔒 or camera icon in your browser\'s address bar\n2. Change microphone permission to "Allow"\n3. Refresh the page and try again');
      } else if (err.name === 'NotFoundError') {
        alert('❌ No microphone found\n\nPlease connect a microphone and try again.');
      } else {
        alert('⚠️ Could not access microphone\n\n' + err.message);
      }
      return;
    }

    if (!recognitionRef.current) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputValue(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = (event: any) => {
        setIsListening(false);
        
        // Only show user-friendly errors, not technical ones
        if (event.error === 'not-allowed') {
          // User already got permission dialog, so this means they denied it
          alert('🎤 Microphone access denied\n\nPlease allow microphone access and try again.');
        } else if (event.error === 'no-speech') {
          // This is normal, just don't show anything
          console.log('No speech detected');
        } else if (event.error === 'aborted') {
          // User stopped it, don't show error
          console.log('Speech recognition aborted');
        } else if (event.error === 'audio-capture') {
          alert('❌ Microphone error\n\nPlease check your microphone connection.');
        } else if (event.error === 'network') {
          alert('🌐 Network error\n\nSpeech recognition requires an internet connection.');
        }
        // Don't log to console for common errors
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }

    try {
      setIsListening(true);
      recognitionRef.current.start();
    } catch (error: any) {
      setIsListening(false);
      if (error.message && error.message.includes('already started')) {
        // Recognition already running, stop and restart
        recognitionRef.current.stop();
        setTimeout(() => {
          try {
            setIsListening(true);
            recognitionRef.current.start();
          } catch (e) {
            setIsListening(false);
          }
        }, 100);
      }
    }
  };

  const handleVoiceStop = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  return (
    <>
      {/* Pop-up Notification */}
      {!isOpen && showNotification && (
        <div className="fixed bottom-24 right-6 z-50 animate-bounce">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border-2 border-blue-500 dark:border-blue-400 p-4 max-w-xs relative">
            <button
              onClick={() => setShowNotification(false)}
              className="absolute -top-2 -right-2 w-6 h-6 bg-gray-600 dark:bg-gray-500 text-white rounded-full hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors flex items-center justify-center"
              aria-label="Close notification"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                  👋 How can I help you?
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Ask me about any AI tool or category!
                </p>
              </div>
            </div>
            {/* Arrow pointing to chatbot */}
            <div className="absolute -bottom-2 right-8 w-4 h-4 bg-white dark:bg-gray-800 border-r-2 border-b-2 border-blue-500 dark:border-blue-400 transform rotate-45" />
          </div>
        </div>
      )}

      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => {
            setIsOpen(true);
            setShowNotification(false);
          }}
          className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 text-white rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 z-50 flex items-center justify-center group"
          aria-label="Open AI Assistant"
        >
          <MessageCircle className="w-7 h-7 group-hover:scale-110 transition-transform" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-900 animate-pulse" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-0 sm:bottom-6 right-0 sm:right-6 w-full sm:w-96 h-[100dvh] sm:h-[600px] bg-white dark:bg-gray-800 sm:rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden border-t sm:border border-gray-200 dark:border-gray-700">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold">Foi 🤖</h3>
                <p className="text-xs text-blue-100">Your friendly AI assistant</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-white/20 p-2 rounded-lg transition-colors"
              aria-label="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900">
            {messages.map((message) => (
              <div key={message.id}>
                <div
                  className={`flex gap-2 ${
                    message.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {message.sender === 'bot' && (
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-4 h-4 text-white" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] rounded-2xl p-3 ${
                      message.sender === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line">{message.text}</p>
                  </div>
                  {message.sender === 'user' && (
                    <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                    </div>
                  )}
                </div>

                {/* Tool Suggestions */}
                {message.toolSuggestions && message.toolSuggestions.length > 0 && (
                  <div className="ml-0 sm:ml-10 mt-2 space-y-2">
                    {message.toolSuggestions.map((tool) => (
                      <button
                        key={tool.id}
                        onClick={() => handleToolClick(tool.id)}
                        className="w-full bg-white dark:bg-gray-800 border-2 border-blue-200 dark:border-blue-700 rounded-xl p-3 hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-lg transition-all text-left group"
                      >
                        <div className="flex items-start gap-3">
                          <img
                            src={tool.image}
                            alt={tool.name}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                              {tool.name}
                            </h4>
                            <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-1">
                              {tool.tagline}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs text-yellow-600">⭐ {tool.rating}</span>
                              <span className="text-xs text-gray-500 dark:text-gray-400">•</span>
                              <span className="text-xs text-blue-600 dark:text-blue-400 group-hover:underline">
                                View Details →
                              </span>
                            </div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2 justify-start">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-3">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 sm:p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
            {isSpeaking && (
              <div className="mb-3 flex items-center justify-between bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl p-3 animate-pulse">
                <div className="flex items-center gap-2">
                  <Volume2 className="w-5 h-5" />
                  <span className="text-sm font-medium">Speaking...</span>
                </div>
                <button
                  onClick={handleStopSpeaking}
                  className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded-lg text-sm font-medium transition-all flex items-center gap-1"
                >
                  <X className="w-4 h-4" />
                  Stop
                </button>
              </div>
            )}
            {isListening && (
              <div className="mb-2 flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 animate-pulse">
                <Mic className="w-4 h-4" />
                <span>Listening... Speak now</span>
              </div>
            )}
            <div className="flex gap-2 items-center">
              <button
                onClick={isListening ? handleVoiceStop : handleVoiceStart}
                className={`px-2 sm:px-3 py-2 rounded-xl transition-all flex-shrink-0 ${
                  isListening
                    ? 'bg-red-500 hover:bg-red-600 text-white'
                    : 'bg-green-500 hover:bg-green-600 text-white'
                }`}
                aria-label="Voice input"
                title={isListening ? 'Stop listening' : 'Click to speak'}
              >
                {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type or click mic..."
                className="flex-1 px-3 sm:px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-sm"
              />
              <button
                onClick={handleVoiceToggle}
                className={`px-2 sm:px-3 py-2 rounded-xl transition-all flex-shrink-0 ${
                  voiceEnabled
                    ? 'bg-blue-500 hover:bg-blue-600 text-white'
                    : 'bg-gray-400 hover:bg-gray-500 text-white'
                }`}
                aria-label="Toggle voice responses"
                title={voiceEnabled ? 'Voice responses ON' : 'Voice responses OFF'}
              >
                {voiceEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
              </button>
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
                className="px-3 sm:px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 dark:hover:from-blue-600 dark:hover:to-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex-shrink-0"
                aria-label="Send message"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}