# AiPedia - Comprehensive AI Tools Directory

![AiPedia](https://img.shields.io/badge/AI%20Tools-500%2B-blue)
![React](https://img.shields.io/badge/React-18.3-61dafb)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-3178c6)
![Tailwind](https://img.shields.io/badge/Tailwind-4.0-38bdf8)

A comprehensive, high-quality directory of 500+ AI tools with detailed information, use cases, tips, and honest assessments.

## 🌟 Features

- **500+ AI Tools**: Comprehensive database across all categories
- **Detailed Information**: Best use cases, limitations, tips, and shortcuts for each tool
- **Smart Search & Filters**: Find the perfect AI tool for your needs
- **User Authentication**: Powered by Supabase for secure login
- **AI Chatbot "Foi"**: Gemini-level intelligent assistant
- **Fully Responsive**: Works perfectly on desktop, tablet, and mobile
- **Modern UI/UX**: High-quality design with smooth animations

## 🚀 Live Demo

Visit the live website: `https://YOUR_USERNAME.github.io/aipedia/`

## 📱 Pages

- **Home**: Welcome page with featured tools and categories
- **AI Tools**: Browse all 500+ tools with advanced filtering
- **About Us**: Learn about the creators
- **Contact Us**: Get in touch with the team

## 👥 Creators

**AiPedia** is created and maintained by:

- **Ritesh Thakur** - [ritesh_2503mc03@iitp.ac.in](mailto:ritesh_2503mc03@iitp.ac.in)
- **Rishu Kumar** - [rishu_2503ct03@iitp.ac.in](mailto:rishu_2503ct03@iitp.ac.in)

## 🛠️ Technology Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS 4.0
- **Backend**: Supabase (Authentication & Database)
- **Build Tool**: Vite
- **Deployment**: GitHub Pages
- **Icons**: Lucide React
- **Charts**: Recharts

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/aipedia.git

# Navigate to project directory
cd aipedia

# Install dependencies
npm install

# Create .env file and add your Supabase credentials
# VITE_SUPABASE_URL=your_supabase_url
# VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Start development server
npm run dev
```

## 🚀 Deployment

This project is configured for automatic deployment to GitHub Pages. See [GITHUB_DEPLOYMENT_GUIDE.md](./GITHUB_DEPLOYMENT_GUIDE.md) for detailed instructions.

### Quick Deploy

```bash
# Build the project
npm run build

# Deploy to GitHub Pages
npm run deploy
```

## 📂 Project Structure

```
aipedia/
├── components/           # React components
│   ├── HomePage.tsx      # Home page
│   ├── ToolsPage.tsx     # AI Tools listing
│   ├── AboutPage.tsx     # About Us
│   ├── ContactPage.tsx   # Contact Us
│   ├── Chatbot.tsx       # Foi AI assistant
│   └── ui/               # Reusable UI components
├── data/
│   └── tools.ts          # Database of 500+ AI tools
├── utils/
│   ├── auth.tsx          # Authentication utilities
│   └── supabase/         # Supabase configuration
├── styles/
│   └── globals.css       # Global styles
├── App.tsx               # Main application component
└── vite.config.ts        # Vite configuration
```

## 🔧 Configuration

### Vite Config
The `vite.config.ts` is pre-configured for GitHub Pages deployment. Update the `base` path if your repository name differs from "aipedia".

### Environment Variables
Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 📊 AI Tools Database

Our database includes 500+ carefully curated AI tools across categories:
- Text Generation
- Image Generation
- Video Generation
- Audio & Music
- Code & Development
- Business & Productivity
- Design & Creativity
- Data & Analytics
- Marketing & SEO
- And many more...

Each tool entry includes:
- Name and description
- Category and pricing
- Official website link
- Best use cases
- Limitations
- Pro tips and shortcuts
- User ratings

## 🤖 Foi Chatbot

**Foi** is our intelligent AI assistant powered by Gemini-level capabilities:
- Answer questions about AI tools
- Provide recommendations
- Explain features and use cases
- Mobile-responsive interface
- Context-aware responses

## 📱 Responsive Design

AiPedia is fully responsive and optimized for:
- Desktop (1920px and above)
- Laptop (1024px - 1919px)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🔒 Authentication

Secure authentication system powered by Supabase:
- Email/Password login
- Google OAuth (optional)
- Secure session management
- Protected user data

## 🎨 UI Components

Built with shadcn/ui component library:
- Buttons, Cards, Modals
- Forms and Inputs
- Navigation components
- Alerts and Toasts
- And 50+ more components

## 📈 Future Enhancements

- [ ] User reviews and ratings
- [ ] Bookmark favorite tools
- [ ] Tool comparison feature
- [ ] Advanced filters and sorting
- [ ] Newsletter subscription
- [ ] API access
- [ ] Mobile app

## 🤝 Contributing

We welcome contributions! If you'd like to add new AI tools or improve existing information:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-tools`)
3. Commit your changes (`git commit -m 'Add 10 new AI tools'`)
4. Push to the branch (`git push origin feature/new-tools`)
5. Open a Pull Request

## 📄 License

This project is created for educational purposes by students of IIT Patna.

## 📧 Contact

For questions, suggestions, or business inquiries:

- **Ritesh Thakur**: ritesh_2503mc03@iitp.ac.in
- **Rishu Kumar**: rishu_2503ct03@iitp.ac.in

## 🙏 Acknowledgments

- Thanks to all AI tool creators and developers
- Supabase for backend infrastructure
- Vercel for shadcn/ui components
- The open-source community

---

<div align="center">

**Made with ❤️ by Ritesh Thakur and Rishu Kumar**

[Website](https://YOUR_USERNAME.github.io/aipedia/) • [Report Bug](https://github.com/YOUR_USERNAME/aipedia/issues) • [Request Feature](https://github.com/YOUR_USERNAME/aipedia/issues)

</div>
