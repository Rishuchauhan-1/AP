import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "npm:@supabase/supabase-js@2.39.3";
import * as kv from "./kv_store.tsx";
const app = new Hono();

// Initialize Supabase client
const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-31510e0e/health", (c) => {
  return c.json({ status: "ok" });
});

// Sign up endpoint
app.post("/make-server-31510e0e/signup", async (c) => {
  try {
    const body = await c.req.json();
    const { email, password, name } = body;

    // Validate input
    if (!email || !password || !name) {
      return c.json(
        { error: "Email, password, and name are required" },
        400
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return c.json({ error: "Invalid email format" }, 400);
    }

    // Validate password length
    if (password.length < 6) {
      return c.json(
        { error: "Password must be at least 6 characters long" },
        400
      );
    }

    // Create user with Supabase Auth
    const { data, error } = await supabase.auth.admin.createUser({
      email: email,
      password: password,
      user_metadata: { name: name },
      // Automatically confirm the user's email since an email server hasn't been configured.
      // In production, you should set this to false and implement proper email verification.
      email_confirm: true,
    });

    if (error) {
      // Handle specific error cases without logging (these are expected user errors)
      if (error.message.includes('already been registered') || error.code === 'email_exists') {
        return c.json(
          { 
            error: "An account with this email already exists. Please log in instead.",
            code: "email_exists"
          },
          422
        );
      }
      
      // Log unexpected errors only
      console.error("Unexpected sign up error:", error);
      return c.json(
        { error: error.message || "Failed to create account" },
        400
      );
    }

    return c.json({
      success: true,
      message: "Account created successfully! Please log in.",
      user: {
        id: data.user.id,
        email: data.user.email,
        name: data.user.user_metadata.name,
      },
    });
  } catch (error: any) {
    console.error("Sign up error:", error);
    return c.json(
      { error: error.message || "Internal server error during sign up" },
      500
    );
  }
});

Deno.serve(app.fetch);