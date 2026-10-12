import { Link } from "react-router-dom";
import { motion } from "motion/react";

function Login() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-4">
      {/* Background image */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/16354184/pexels-photo-16354184.jpeg')",
        }}
        initial={{ scale: 1.15 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-slate-950/75 backdrop-blur-[2px]" />

      {/* Animated background circles */}
      <motion.div
        className="absolute left-10 top-20 h-40 w-40 rounded-full bg-orange-500/20 blur-3xl"
        animate={{
          x: [0, 40, 0],
          y: [0, 30, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-20 right-10 h-52 w-52 rounded-full bg-blue-500/20 blur-3xl"
        animate={{
          x: [0, -40, 0],
          y: [0, -30, 0],
          scale: [1.1, 1, 1.1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Login card */}
      <motion.div
        className="relative z-10 w-full max-w-md rounded-3xl border border-white/15 bg-white/10 p-7 text-white shadow-2xl backdrop-blur-xl sm:p-10"
        initial={{
          opacity: 0,
          y: 70,
          scale: 0.9,
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        transition={{
          duration: 0.8,
          ease: "easeOut",
        }}
      >
        {/* Logo */}
        <motion.div
          className="mb-7 text-center"
          initial={{ opacity: 0, y: -25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <Link to="/">
            <h1 className="text-2xl font-black">
              Ratnagiri{" "}
              <span className="text-orange-500">Tourism</span>
            </h1>
          </Link>

          <h2 className="mt-5 text-3xl font-bold">Welcome Back</h2>

          <p className="mt-2 text-sm text-slate-300">
            Sign in to continue exploring Ratnagiri.
          </p>
        </motion.div>

        <form className="space-y-5">
          {/* Email */}
          <motion.div
            initial={{ opacity: 0, x: -35 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.45, duration: 0.6 }}
          >
            <label className="mb-2 block text-sm font-semibold">
              Email Address
            </label>

            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="email"
              placeholder="Enter your email"
              required
              className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white outline-none transition placeholder:text-slate-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30"
            />
          </motion.div>

          {/* Password */}
          <motion.div
            initial={{ opacity: 0, x: 35 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <label className="mb-2 block text-sm font-semibold">
              Password
            </label>

            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="password"
              placeholder="Enter your password"
              required
              className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white outline-none transition placeholder:text-slate-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30"
            />
          </motion.div>

          {/* Remember and forgot password */}
          <motion.div
            className="flex items-center justify-between text-xs"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.75, duration: 0.6 }}
          >
            <label className="flex cursor-pointer items-center gap-2">
              <input type="checkbox" className="accent-orange-500" />
              Remember me
            </label>

            <button
              type="button"
              className="text-orange-400 hover:text-orange-300"
            >
              Forgot password?
            </button>
          </motion.div>

          {/* Login button */}
          <motion.button
            type="submit"
            className="w-full rounded-xl bg-orange-500 py-3 font-bold text-white shadow-lg shadow-orange-950/30 hover:bg-orange-600"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.6 }}
            whileHover={{
              scale: 1.04,
              y: -3,
            }}
            whileTap={{
              scale: 0.96,
            }}
          >
            Sign In
          </motion.button>
        </form>

        {/* Signup link */}
        <motion.p
          className="mt-7 text-center text-sm text-slate-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          Don&apos;t have an account?{" "}
          <Link
            to="/signup"
            className="font-bold text-orange-400 hover:text-orange-300"
          >
            Create Account
          </Link>
        </motion.p>

        <motion.div
          className="mt-5 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
        >
          <Link
            to="/"
            className="text-xs text-slate-400 transition hover:text-white"
          >
            ← Return to Home
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Login;