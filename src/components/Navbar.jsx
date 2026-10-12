import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import {
  Compass,
  Menu,
  X,
  Globe2,
  ChevronDown,
  ShieldAlert,
  LogIn,
  UserPlus,
} from "lucide-react";

const navigationLinks = [
  {
    name: "Home",
    href: "#home",
  },
  {
    name: "Places",
    href: "#places",
  },
  {
    name: "Hidden Gems",
    href: "#hidden-gems",
  },
  {
    name: "Food",
    href: "#food",
  },
  {
    name: "Rentals",
    href: "#rentals",
  },
  {
    name: "Guides",
    href: "#guides",
  },
];

function Navbar() {
  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("EN");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 35);
    }

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function handleNavigation(href) {
    setMobileMenuOpen(false);

    const element = document.querySelector(href);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }

  function selectLanguage(language) {
    setSelectedLanguage(language);
    setLanguageOpen(false);
  }

  return (
    <motion.nav
      initial={{
        opacity: 0,
        y: -70,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.8,
        ease: "easeOut",
      }}
      className={`fixed left-0 right-0 top-0 z-50 border-b transition-all duration-500 ${
        scrolled
          ? "border-slate-200/10 bg-slate-950/95 py-3 shadow-2xl backdrop-blur-xl"
          : "border-white/10 bg-slate-950/20 py-4 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex max-w-[1450px] items-center justify-between px-5 sm:px-8 lg:px-12">
        {/* Brand */}

        <Link
          to="/"
          className="group flex items-center gap-3"
          aria-label="Explore Ratnagiri home"
        >
          <motion.div
            whileHover={{
              rotate: -8,
              scale: 1.08,
            }}
            className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 text-white shadow-lg shadow-orange-950/30"
          >
            <Compass size={23} strokeWidth={2.4} />
          </motion.div>

          <div>
            <p className="text-base font-black uppercase leading-none tracking-tight text-white sm:text-lg">
              Explore{" "}
              <span className="text-orange-400">
                Ratnagiri
              </span>
            </p>

            <p className="mt-1 hidden text-[8px] font-bold uppercase tracking-[0.22em] text-slate-300 sm:block">
              Your Gateway to the Konkan Coast
            </p>
          </div>
        </Link>

        {/* Desktop navigation */}

        <div className="hidden items-center gap-7 xl:flex">
          {navigationLinks.map((link) => (
            <button
              key={link.name}
              type="button"
              onClick={() => handleNavigation(link.href)}
              className="group relative py-2 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-300 transition hover:text-white"
            >
              {link.name}

              <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-orange-500 transition-all duration-300 group-hover:w-full" />
            </button>
          ))}

          <button
            type="button"
            onClick={() => handleNavigation("#emergency")}
            className="flex items-center gap-1.5 rounded-full border border-red-400/25 bg-red-500/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.15em] text-red-300 transition hover:border-red-400/50 hover:bg-red-500 hover:text-white"
          >
            <ShieldAlert size={14} />

            Emergency
          </button>
        </div>

        {/* Desktop actions */}

        <div className="hidden items-center gap-2 sm:flex">
          {/* Language selector */}

          <div className="relative">
            <button
              type="button"
              onClick={() => setLanguageOpen((previous) => !previous)}
              className="flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/5 px-3 py-2.5 text-[10px] font-bold text-white transition hover:bg-white/10"
              aria-expanded={languageOpen}
            >
              <Globe2 size={15} />

              {selectedLanguage}

              <ChevronDown
                size={13}
                className={`transition ${
                  languageOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <AnimatePresence>
              {languageOpen && (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: -8,
                    scale: 0.95,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    y: -8,
                    scale: 0.95,
                  }}
                  className="absolute right-0 mt-3 w-36 overflow-hidden rounded-xl border border-slate-200 bg-white p-1.5 shadow-2xl"
                >
                  {[
                    { value: "EN", label: "English" },
                    { value: "मराठी", label: "मराठी" },
                    { value: "हिंदी", label: "हिंदी" },
                  ].map((language) => (
                    <button
                      key={language.value}
                      type="button"
                      onClick={() =>
                        selectLanguage(language.value)
                      }
                      className="block w-full rounded-lg px-3 py-2 text-left text-xs font-semibold text-slate-700 transition hover:bg-orange-50 hover:text-orange-600"
                    >
                      {language.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <motion.button
            type="button"
            onClick={() => navigate("/login")}
            whileHover={{
              y: -2,
            }}
            whileTap={{
              scale: 0.95,
            }}
            className="flex items-center gap-2 rounded-xl border border-white/20 px-4 py-2.5 text-[10px] font-black uppercase tracking-widest text-white transition hover:bg-white hover:text-slate-950"
          >
            <LogIn size={14} />

            Sign In
          </motion.button>

          <motion.button
            type="button"
            onClick={() => navigate("/signup")}
            whileHover={{
              y: -2,
              scale: 1.03,
            }}
            whileTap={{
              scale: 0.95,
            }}
            className="flex items-center gap-2 rounded-xl bg-orange-500 px-4 py-2.5 text-[10px] font-black uppercase tracking-widest text-white shadow-lg shadow-orange-950/20 transition hover:bg-orange-600"
          >
            <UserPlus size={14} />

            Register
          </motion.button>
        </div>

        {/* Mobile button */}

        <button
          type="button"
          onClick={() =>
            setMobileMenuOpen((previous) => !previous)
          }
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-white sm:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? (
            <X size={21} />
          ) : (
            <Menu size={21} />
          )}
        </button>
      </div>

      {/* Mobile menu */}

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{
              opacity: 0,
              height: 0,
            }}
            animate={{
              opacity: 1,
              height: "auto",
            }}
            exit={{
              opacity: 0,
              height: 0,
            }}
            className="overflow-hidden border-t border-white/10 bg-slate-950/98 sm:hidden"
          >
            <div className="space-y-2 px-5 py-5">
              {navigationLinks.map((link) => (
                <button
                  key={link.name}
                  type="button"
                  onClick={() =>
                    handleNavigation(link.href)
                  }
                  className="block w-full rounded-xl px-4 py-3 text-left text-sm font-semibold text-slate-200 transition hover:bg-white/5 hover:text-orange-400"
                >
                  {link.name}
                </button>
              ))}

              <button
                type="button"
                onClick={() =>
                  handleNavigation("#emergency")
                }
                className="flex w-full items-center gap-2 rounded-xl bg-red-500/10 px-4 py-3 text-left text-sm font-semibold text-red-300"
              >
                <ShieldAlert size={17} />

                Emergency Support
              </button>

              <div className="grid grid-cols-2 gap-3 border-t border-white/10 pt-4">
                <button
                  type="button"
                  onClick={() => navigate("/login")}
                  className="rounded-xl border border-white/20 py-3 text-xs font-black uppercase tracking-widest text-white"
                >
                  Sign In
                </button>

                <button
                  type="button"
                  onClick={() => navigate("/signup")}
                  className="rounded-xl bg-orange-500 py-3 text-xs font-black uppercase tracking-widest text-white"
                >
                  Register
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

export default Navbar;