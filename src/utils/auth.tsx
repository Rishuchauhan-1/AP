import { getSupabaseClient } from './supabase/client';
import { projectId, publicAnonKey } from './supabase/info';

const API_URL = `https://${projectId}.supabase.co/functions/v1/make-server-31510e0e`;

export interface User {
  id: string;
  email: string;
  name: string;
  accessToken: string;
}

export interface SignupData {
  email: string;
  password: string;
  name: string;
}

export interface LoginData {
  email: string;
  password: string;
}

// Sign up new user
export async function signup(data: SignupData): Promise<{ success: boolean; message: string }> {
  const response = await fetch(`${API_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${publicAnonKey}`,
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error || 'Failed to create account');
  }

  return result;
}

// Login user
export async function login(data: LoginData): Promise<User> {
  const supabase = getSupabaseClient();

  const { data: authData, error } = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  });

  if (error || !authData.session) {
    throw new Error(error?.message || 'Failed to log in');
  }

  return {
    id: authData.user.id,
    email: authData.user.email!,
    name: authData.user.user_metadata.name || 'User',
    accessToken: authData.session.access_token,
  };
}

// Login with Google OAuth
// IMPORTANT: You must complete Google OAuth setup in Supabase Dashboard
// Follow instructions at: https://supabase.com/docs/guides/auth/social-login/auth-google
export async function loginWithGoogle(): Promise<void> {
  const supabase = getSupabaseClient();
  
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: window.location.origin,
    },
  });
  
  if (error) {
    throw new Error(error.message || 'Failed to sign in with Google');
  }
}

// Logout user
export async function logout(): Promise<void> {
  const supabase = getSupabaseClient();
  const { error } = await supabase.auth.signOut();
  
  if (error) {
    throw new Error(error.message || 'Failed to log out');
  }
}

// Reset password - Send reset email
export async function resetPassword(email: string): Promise<{ success: boolean; message: string }> {
  const supabase = getSupabaseClient();
  
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`,
  });
  
  if (error) {
    throw new Error(error.message || 'Failed to send reset email');
  }
  
  return {
    success: true,
    message: 'Password reset email sent! Please check your inbox.',
  };
}

// Update password (after clicking reset link)
export async function updatePassword(newPassword: string): Promise<{ success: boolean; message: string }> {
  const supabase = getSupabaseClient();
  
  const { error } = await supabase.auth.updateUser({
    password: newPassword,
  });
  
  if (error) {
    throw new Error(error.message || 'Failed to update password');
  }
  
  return {
    success: true,
    message: 'Password updated successfully!',
  };
}

// Get current session
export async function getCurrentSession(): Promise<User | null> {
  const supabase = getSupabaseClient();
  
  const { data: { session }, error } = await supabase.auth.getSession();
  
  if (error || !session) {
    return null;
  }

  return {
    id: session.user.id,
    email: session.user.email!,
    name: session.user.user_metadata.name || session.user.user_metadata.full_name || session.user.email?.split('@')[0] || 'User',
    accessToken: session.access_token,
  };
}

// Check if user is authenticated
export async function isAuthenticated(): Promise<boolean> {
  const session = await getCurrentSession();
  return session !== null;
}