import { AlertCircle, ExternalLink } from 'lucide-react';

export function GoogleAuthSetupNotice() {
  return (
    <div className="fixed bottom-4 right-4 max-w-md bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 text-white p-4 rounded-xl shadow-2xl z-50 animate-in slide-in-from-bottom-4 duration-300">
      <div className="flex items-start gap-3">
        <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <h3 className="font-semibold mb-1">Google Sign-In Setup Required</h3>
          <p className="text-sm text-blue-100 mb-2">
            To enable Google authentication, you need to configure OAuth credentials in your Supabase dashboard.
          </p>
          <a
            href="https://supabase.com/docs/guides/auth/social-login/auth-google"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-lg transition-colors"
          >
            <span>Setup Guide</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
