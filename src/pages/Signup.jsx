import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "motion/react";

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (
      !formData.fullName ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("Please fill in all fields.");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    alert("Registration successful!");

    navigate("/login");
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-4 py-10">
      {/* Animated background image */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/16354184/pexels-photo-16354184.jpeg')",
        }}
        initial={{
          scale: 1.18,
        }}
        animate={{
          scale: 1,
        }}
        transition={{
          duration: 2,
          ease: "easeOut",
        }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-[2px]" />

      {/* Orange animated light */}
      <motion.div
        className="absolute left-0 top-20 h-56 w-56 rounded-full bg-orange-500/20 blur-3xl"
        animate={{
          x: [0, 70, 0],
          y: [0, 40, 0],
          scale: [1, 1.25, 1],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Purple animated light */}
      <motion.div
        className="absolute bottom-10 right-0 h-64 w-64 rounded-full bg-purple-500/20 blur-3xl"
        animate={{
          x: [0, -60, 0],
          y: [0, -40, 0],
          scale: [1.1, 1, 1.1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Register card */}
      <motion.div
        className="relative z-10 w-full max-w-md rounded-3xl border border-white/15 bg-white/10 p-7 text-white shadow-2xl backdrop-blur-xl sm:p-10"
        initial={{
          opacity: 0,
          y: 90,
          scale: 0.88,
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        transition={{
          duration: 0.85,
          ease: "easeOut",
        }}
      >
        {/* Heading */}
        <motion.div
          className="mb-7 text-center"
          initial={{
            opacity: 0,
            y: -30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.25,
            duration: 0.6,
          }}
        >
          <Link to="/">
            <motion.h1
              className="text-2xl font-black"
              whileHover={{
                scale: 1.04,
              }}
            >
              Ratnagiri{" "}
              <span className="text-orange-500">Tourism</span>
            </motion.h1>
          </Link>

          <h2 className="mt-5 text-3xl font-bold">
            Create Account
          </h2>

          <p className="mt-2 text-sm text-slate-300">
            Register and begin exploring Ratnagiri.
          </p>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full name */}
          <motion.div
            initial={{
              opacity: 0,
              x: -45,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              delay: 0.4,
              duration: 0.6,
            }}
          >
            <label
              htmlFor="fullName"
              className="mb-2 block text-sm font-semibold"
            >
              Full Name
            </label>

            <motion.input
              id="fullName"
              name="fullName"
              type="text"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              autoComplete="name"
              whileFocus={{
                scale: 1.02,
              }}
              className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white outline-none transition placeholder:text-slate-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30"
            />
          </motion.div>

          {/* Email */}
          <motion.div
            initial={{
              opacity: 0,
              x: 45,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              delay: 0.55,
              duration: 0.6,
            }}
          >
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-semibold"
            >
              Email Address
            </label>

            <motion.input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              autoComplete="email"
              whileFocus={{
                scale: 1.02,
              }}
              className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white outline-none transition placeholder:text-slate-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30"
            />
          </motion.div>

          {/* Password */}
          <motion.div
            initial={{
              opacity: 0,
              x: -45,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              delay: 0.7,
              duration: 0.6,
            }}
          >
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-semibold"
            >
              Password
            </label>

            <motion.input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              autoComplete="new-password"
              whileFocus={{
                scale: 1.02,
              }}
              className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white outline-none transition placeholder:text-slate-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30"
            />
          </motion.div>

          {/* Confirm password */}
          <motion.div
            initial={{
              opacity: 0,
              x: 45,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              delay: 0.85,
              duration: 0.6,
            }}
          >
            <label
              htmlFor="confirmPassword"
              className="mb-2 block text-sm font-semibold"
            >
              Confirm Password
            </label>

            <motion.input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Enter password again"
              autoComplete="new-password"
              whileFocus={{
                scale: 1.02,
              }}
              className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white outline-none transition placeholder:text-slate-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30"
            />
          </motion.div>

          {/* Terms */}
          <motion.label
            className="flex cursor-pointer items-start gap-2 text-xs text-slate-300"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              delay: 1,
              duration: 0.5,
            }}
          >
            <input
              type="checkbox"
              required
              className="mt-0.5 accent-orange-500"
            />

            <span>
              I agree to the terms, privacy policy and account
              guidelines.
            </span>
          </motion.label>

          {/* Error message */}
          {error && (
            <motion.p
              className="rounded-lg border border-red-400/30 bg-red-500/15 px-3 py-2 text-center text-sm text-red-200"
              initial={{
                opacity: 0,
                y: -10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
            >
              {error}
            </motion.p>
          )}

          {/* Register button */}
          <motion.button
            type="submit"
            className="w-full rounded-xl bg-orange-500 py-3 font-bold text-white shadow-lg shadow-orange-950/30 transition hover:bg-orange-600"
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 1.1,
              duration: 0.6,
            }}
            whileHover={{
              scale: 1.04,
              y: -3,
              boxShadow: "0 15px 35px rgba(249, 115, 22, 0.25)",
            }}
            whileTap={{
              scale: 0.96,
            }}
          >
            Register
          </motion.button>
        </form>

        {/* Login link */}
        <motion.p
          className="mt-7 text-center text-sm text-slate-300"
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 1.25,
            duration: 0.6,
          }}
        >
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-bold text-orange-400 transition hover:text-orange-300"
          >
            Sign In
          </Link>
        </motion.p>

        {/* Home link */}
        <motion.div
          className="mt-5 text-center"
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 1.35,
          }}
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

export default Signup;