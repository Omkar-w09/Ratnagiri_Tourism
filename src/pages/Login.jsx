
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 22 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: "easeOut" },
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password) {
      setError("Please enter your email and password.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      // Connect your backend authentication API here.
      // Example:
      // const response = await fetch("/api/auth/login", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({
      //     email: email.trim(),
      //     password,
      //     rememberMe,
      //   }),
      // });
      //
      // if (!response.ok) throw new Error("Invalid email or password.");
      // const data = await response.json();
      // Navigate after successful authentication.

      await new Promise((resolve) => setTimeout(resolve, 600));

      setError(
        "Authentication is not connected yet. Connect your backend API to sign in."
      );
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    setGoogleLoading(true);

    try {
      // Connect Firebase Authentication or Google OAuth here.
      await new Promise((resolve) => setTimeout(resolve, 500));

      setError(
        "Google sign-in is not configured yet. Connect your Google OAuth provider to continue."
      );
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <main className="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-[#07111e] px-4 py-8 text-white sm:px-6">
      {/* Cinematic background */}
      <motion.div
        className="absolute inset-0 -z-20 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/16354184/pexels-photo-16354184.jpeg')",
        }}
        initial={{ scale: 1.15 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.5, ease: "easeOut" }}
      />

      {/* Background overlays */}
      <div className="absolute inset-0 -z-10 bg-[#07111e]/75" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-slate-950/80 via-transparent to-orange-950/40" />

      {/* Animated orange glow */}
      <motion.div
        className="pointer-events-none absolute -left-24 top-10 -z-10 h-80 w-80 rounded-full bg-orange-500/20 blur-[110px]"
        animate={{
          x: [0, 45, 0],
          y: [0, 30, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Animated cyan glow */}
      <motion.div
        className="pointer-events-none absolute -bottom-20 -right-20 -z-10 h-96 w-96 rounded-full bg-cyan-500/15 blur-[120px]"
        animate={{
          x: [0, -35, 0],
          y: [0, -25, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Main card */}
      <motion.div
        initial={{ opacity: 0, y: 35, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative grid w-full max-w-6xl overflow-hidden rounded-[2rem] border border-white/15 bg-white/[0.05] shadow-[0_30px_100px_rgba(0,0,0,0.5)] backdrop-blur-2xl lg:grid-cols-2"
      >
        {/* Left branding panel */}
        <section className="relative hidden min-h-[720px] flex-col justify-between overflow-hidden border-r border-white/10 p-10 lg:flex xl:p-14">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-cyan-500/10" />

          <motion.div
            className="relative z-10"
            variants={container}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={item}>
              <Link to="/" className="inline-flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-orange-400/40 bg-orange-500/15 text-2xl text-orange-400">
                  ✦
                </span>

                <span className="text-xl font-black tracking-tight">
                  Ratnagiri{" "}
                  <span className="text-orange-400">Tourism</span>
                </span>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            className="relative z-10 max-w-lg"
            variants={container}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              variants={item}
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold tracking-widest text-orange-200"
            >
              <span className="h-2 w-2 animate-pulse rounded-full bg-orange-400" />
              DISCOVER THE KONKAN COAST
            </motion.div>

            <motion.h1
              variants={item}
              className="text-5xl font-black leading-[1.08] tracking-tight xl:text-6xl"
            >
              Every journey
              <br />
              tells a story.
              <br />
              <span className="bg-gradient-to-r from-orange-300 via-orange-400 to-yellow-200 bg-clip-text text-transparent">
                Yours starts here.
              </span>
            </motion.h1>

            <motion.p
              variants={item}
              className="mt-6 max-w-md text-base leading-7 text-slate-300"
            >
              Discover beautiful beaches, historic forts, lush green
              landscapes, and the unforgettable charm of Ratnagiri.
              Your next adventure begins with us.
            </motion.p>

            <motion.div
              variants={item}
              className="mt-9 flex flex-wrap gap-3"
            >
              {[
                "Beautiful beaches",
                "Historic forts",
                "Konkan culture",
              ].map((feature) => (
                <span
                  key={feature}
                  className="rounded-full border border-white/15 bg-black/20 px-4 py-2 text-xs text-slate-200 transition hover:border-orange-400/60 hover:bg-orange-500/10"
                >
                  {feature}
                </span>
              ))}
            </motion.div>
          </motion.div>

          <div className="relative z-10 flex items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-slate-400">
            <span>Discover more. Travel better.</span>
            <span>Ratnagiri, Maharashtra</span>
          </div>
        </section>

        {/* Right login panel */}
        <section className="flex items-center justify-center p-6 sm:p-10 lg:p-12 xl:p-16">
          <motion.div
            className="w-full max-w-md"
            variants={container}
            initial="hidden"
            animate="visible"
          >
            {/* Mobile branding */}
            <motion.div variants={item} className="mb-9 lg:hidden">
              <Link to="/" className="inline-flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-500/15 text-2xl text-orange-400">
                  ✦
                </span>

                <span className="text-lg font-black">
                  Ratnagiri{" "}
                  <span className="text-orange-400">Tourism</span>
                </span>
              </Link>
            </motion.div>

            {/* Heading */}
            <motion.div variants={item} className="mb-8">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-orange-400">
                Welcome back
              </p>

              <h2 className="text-4xl font-black tracking-tight sm:text-5xl">
                Sign in<span className="text-orange-400">.</span>
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-400">
                Sign in to continue exploring Ratnagiri.
              </p>
            </motion.div>

            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              {/* Email */}
              <motion.div variants={item}>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-slate-200"
                >
                  Email address
                </label>

                <div className="group flex items-center gap-3 rounded-xl border border-white/15 bg-white/[0.04] px-4 transition duration-300 focus-within:border-orange-400 focus-within:bg-white/[0.07] focus-within:ring-4 focus-within:ring-orange-500/10">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    className="h-5 w-5 shrink-0 text-slate-500 group-focus-within:text-orange-400"
                    aria-hidden="true"
                  >
                    <rect x="3" y="5" width="18" height="14" rx="3" />
                    <path d="m4 7 8 6 8-6" />
                  </svg>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError("");
                    }}
                    required
                    className="min-w-0 w-full bg-transparent py-4 text-sm text-white outline-none placeholder:text-slate-500"
                  />
                </div>
              </motion.div>

              {/* Password */}
              <motion.div variants={item}>
                <div className="mb-2 flex items-center justify-between gap-3">
                  <label
                    htmlFor="password"
                    className="text-sm font-semibold text-slate-200"
                  >
                    Password
                  </label>

                  <Link
                    to="/forgot-password"
                    className="text-xs font-semibold text-orange-400 transition hover:text-orange-300"
                  >
                    Forgot password?
                  </Link>
                </div>

                <div className="group flex items-center gap-3 rounded-xl border border-white/15 bg-white/[0.04] px-4 transition duration-300 focus-within:border-orange-400 focus-within:bg-white/[0.07] focus-within:ring-4 focus-within:ring-orange-500/10">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    className="h-5 w-5 shrink-0 text-slate-500 group-focus-within:text-orange-400"
                    aria-hidden="true"
                  >
                    <rect x="4" y="10" width="16" height="11" rx="3" />
                    <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                    <path d="M12 14v3" />
                  </svg>

                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError("");
                    }}
                    required
                    className="min-w-0 w-full bg-transparent py-4 text-sm text-white outline-none placeholder:text-slate-500"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    aria-pressed={showPassword}
                    className="shrink-0 rounded-lg p-1 text-slate-400 transition hover:text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
                  >
                    {showPassword ? (
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        className="h-5 w-5"
                        aria-hidden="true"
                      >
                        <path d="M3 3l18 18" />
                        <path d="M10.6 10.6a2 2 0 0 0 2.8 2.8" />
                        <path d="M9.9 5.2A11 11 0 0 1 12 5c5.5 0 9 7 9 7a15 15 0 0 1-3.1 3.9" />
                        <path d="M6.2 6.2C3.9 7.8 2 12 2 12s3.5 7 10 7a10 10 0 0 0 4-.8" />
                      </svg>
                    ) : (
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        className="h-5 w-5"
                        aria-hidden="true"
                      >
                        <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>
              </motion.div>

              {/* Remember me */}
              <motion.label
                variants={item}
                className="flex w-fit cursor-pointer items-center gap-3 text-sm text-slate-400"
              >
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 cursor-pointer rounded accent-orange-500"
                />
                Remember me
              </motion.label>

              {/* Error message */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    role="alert"
                    initial={{ opacity: 0, height: 0, y: -5 }}
                    animate={{ opacity: 1, height: "auto", y: 0 }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden rounded-xl border border-orange-400/20 bg-orange-400/10 px-4 py-3 text-sm leading-6 text-orange-200"
                  >
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Sign In */}
              <motion.div variants={item} className="pt-2">
                <motion.button
                  type="submit"
                  disabled={loading || googleLoading}
                  whileHover={{ scale: loading ? 1 : 1.015, y: -2 }}
                  whileTap={{ scale: 0.985 }}
                  className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-xl bg-gradient-to-r from-orange-500 via-orange-500 to-amber-500 px-5 py-4 text-sm font-bold text-white shadow-[0_8px_30px_rgba(249,115,22,0.22)] transition-shadow hover:shadow-[0_12px_35px_rgba(249,115,22,0.35)] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

                  <span className="relative">
                    {loading ? "Signing you in..." : "Sign In"}
                  </span>

                  {loading ? (
                    <span className="relative h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  ) : (
                    <span className="relative text-lg">→</span>
                  )}
                </motion.button>
              </motion.div>

              {/* Divider */}
              <motion.div
                variants={item}
                className="flex items-center gap-4 py-1"
              >
                <div className="h-px flex-1 bg-white/10" />
                <span className="text-[10px] font-semibold tracking-[0.2em] text-slate-500">
                  OR CONTINUE WITH
                </span>
                <div className="h-px flex-1 bg-white/10" />
              </motion.div>

              {/* Google Sign In */}
              <motion.div variants={item}>
                <motion.button
                  type="button"
                  disabled={loading || googleLoading}
                  onClick={handleGoogleLogin}
                  whileHover={{ scale: 1.015, y: -2 }}
                  whileTap={{ scale: 0.985 }}
                  className="flex w-full items-center justify-center gap-3 rounded-xl border border-white/15 bg-white/[0.05] px-5 py-3.5 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {googleLoading ? (
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 48 48"
                      className="h-5 w-5"
                      aria-hidden="true"
                    >
                      <path
                        fill="#FFC107"
                        d="M43.6 24.5c0-1.4-.1-2.8-.4-4.1H24v7.8h11a9.4 9.4 0 0 1-4.1 6.2v5.1h6.6c3.9-3.6 6.1-8.9 6.1-15Z"
                      />
                      <path
                        fill="#4CAF50"
                        d="M24 44c5.5 0 10.1-1.8 13.5-4.9l-6.6-5.1c-1.8 1.2-4.1 2-6.9 2-5.3 0-9.8-3.6-11.4-8.4H5.8v5.3C9.2 39.5 16 44 24 44Z"
                      />
                      <path
                        fill="#1976D2"
                        d="M12.6 27.6a12 12 0 0 1 0-7.2v-5.3H5.8a20 20 0 0 0 0 17.8l6.8-5.3Z"
                      />
                      <path
                        fill="#EA4335"
                        d="M24 12c3 0 5.7 1 7.8 3.1l5.8-5.8C34.1 6.1 29.5 4 24 4 16 4 9.2 8.5 5.8 15.1l6.8 5.3C14.2 15.6 18.7 12 24 12Z"
                      />
                    </svg>
                  )}

                  {googleLoading
                    ? "Connecting to Google..."
                    : "Continue with Google"}
                </motion.button>
              </motion.div>
            </form>

            {/* Create account */}
            <motion.p
              variants={item}
              className="mt-8 text-center text-sm text-slate-400"
            >
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-bold text-orange-400 transition hover:text-orange-300"
              >
                Create account
              </Link>
            </motion.p>

            {/* Return home */}
            <motion.div
              variants={item}
              className="mt-7 border-t border-white/10 pt-6 text-center"
            >
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-xs font-medium text-slate-500 transition hover:text-white"
              >
                <span aria-hidden="true">←</span>
                Back to homepage
              </Link>
            </motion.div>

            <motion.p
              variants={item}
              className="mt-8 text-center text-[10px] leading-5 tracking-[0.18em] text-slate-600"
            >
              EXPLORE RATNAGIRI · EXPERIENCE KONKAN
            </motion.p>
          </motion.div>
        </section>
      </motion.div>
    </main>
  );
}

export default Login;
