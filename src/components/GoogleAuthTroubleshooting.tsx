import { AlertCircle, CheckCircle, ExternalLink } from 'lucide-react';

interface GoogleAuthTroubleshootingProps {
  onClose: () => void;
}

export function GoogleAuthTroubleshooting({ onClose }: GoogleAuthTroubleshootingProps) {
  return (
    <div className="fixed inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-red-600 to-pink-600 text-white p-6 rounded-t-2xl">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl font-bold mb-1">Google Sign-In Issue</h2>
                <p className="text-red-100 text-sm">Error 403: Access Denied</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white transition-colors"
              aria-label="Close"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Problem Explanation */}
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4">
            <h3 className="font-semibold text-red-900 dark:text-red-100 mb-2">What's happening?</h3>
            <p className="text-sm text-red-800 dark:text-red-200">
              Google is blocking the sign-in because your OAuth app is in <strong>Testing mode</strong> and 
              your Google account isn't added to the list of test users.
            </p>
          </div>

          {/* Solution Steps */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              Quick Fix (Choose One)
            </h3>

            {/* Option 1: Add Test User */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
              <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-3">
                Option 1: Add Your Email as Test User (Fastest)
              </h4>
              <ol className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
                <li className="flex gap-2">
                  <span className="font-semibold">1.</span>
                  <span>Go to <a href="https://console.cloud.google.com/apis/credentials/consent" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-600">Google Cloud Console → OAuth Consent Screen</a></span>
                </li>
                <li className="flex gap-2">
                  <span className="font-semibold">2.</span>
                  <span>Scroll down to <strong>"Test users"</strong> section</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-semibold">3.</span>
                  <span>Click <strong>"+ ADD USERS"</strong></span>
                </li>
                <li className="flex gap-2">
                  <span className="font-semibold">4.</span>
                  <span>Enter your Gmail address (the one you tried to sign in with)</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-semibold">5.</span>
                  <span>Click <strong>"SAVE"</strong></span>
                </li>
                <li className="flex gap-2">
                  <span className="font-semibold">6.</span>
                  <span>Try signing in again with Google</span>
                </li>
              </ol>
            </div>

            {/* Option 2: Publish App */}
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4">
              <h4 className="font-semibold text-green-900 dark:text-green-100 mb-3">
                Option 2: Publish Your OAuth App (For Public Use)
              </h4>
              <ol className="space-y-2 text-sm text-green-800 dark:text-green-200">
                <li className="flex gap-2">
                  <span className="font-semibold">1.</span>
                  <span>Go to <a href="https://console.cloud.google.com/apis/credentials/consent" target="_blank" rel="noopener noreferrer" className="underline hover:text-green-600">Google Cloud Console → OAuth Consent Screen</a></span>
                </li>
                <li className="flex gap-2">
                  <span className="font-semibold">2.</span>
                  <span>Fill out all required fields (App name, Support email, Developer contact)</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-semibold">3.</span>
                  <span>Click <strong>"PUBLISH APP"</strong> button</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-semibold">4.</span>
                  <span>Confirm publishing</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-semibold">5.</span>
                  <span>Wait a few minutes for changes to take effect</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-semibold">6.</span>
                  <span>Try signing in again (any Google account will work)</span>
                </li>
              </ol>
              <div className="mt-3 bg-green-100 dark:bg-green-900/40 rounded-lg p-3">
                <p className="text-xs text-green-900 dark:text-green-100">
                  <strong>Note:</strong> Publishing makes your app available to anyone. For personal/testing use, Option 1 is recommended.
                </p>
              </div>
            </div>
          </div>

          {/* Additional Tips */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
            <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Still having issues?
            </h4>
            <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                <span>Make sure the Redirect URI in Google Cloud matches your Supabase URL</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                <span>Check that Google provider is enabled in Supabase Dashboard</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                <span>Try clearing browser cache and cookies</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                <span>Use an incognito/private window to test</span>
              </li>
            </ul>
          </div>

          {/* Help Links */}
          <div className="flex flex-wrap gap-3">
            <a
              href="https://console.cloud.google.com/apis/credentials/consent"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 min-w-[200px] bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-4 py-3 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg"
            >
              <span>Open Google Cloud Console</span>
              <ExternalLink className="w-4 h-4" />
            </a>
            <a
              href="https://supabase.com/docs/guides/auth/social-login/auth-google"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 min-w-[200px] bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white px-4 py-3 rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <span>Supabase Guide</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
