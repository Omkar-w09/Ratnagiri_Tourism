import { Link, useNavigate } from "react-router-dom";
import { motion } from "motion/react";

function Footer() {
  const navigate = useNavigate();

  return (
    <>
      <section className="bg-slate-950 px-5 py-24 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-4xl"
        >
          <p className="text-xs font-black uppercase tracking-[0.3em] text-orange-400">
            Start Your Journey
          </p>

          <h2 className="mt-5 text-3xl font-black leading-tight md:text-6xl">
            Plan Your Ratnagiri Adventure Today
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-slate-400">
            Discover destinations, food, rentals, trusted guides, maps and
            essential travel information in one place.
          </p>

          <motion.button
            type="button"
            onClick={() => navigate("/explore")}
            whileHover={{ scale: 1.06, y: -4 }}
            whileTap={{ scale: 0.95 }}
            className="mt-9 rounded-xl bg-orange-500 px-9 py-4 text-xs font-black uppercase tracking-widest hover:bg-orange-600"
          >
            Explore Ratnagiri →
          </motion.button>
        </motion.div>
      </section>

      <footer className="border-t border-slate-800 bg-slate-950 px-5 py-14 text-slate-400">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h2 className="text-xl font-black uppercase text-white">
              Ratnagiri <span className="text-orange-500">Tourism</span>
            </h2>

            <p className="mt-4 text-sm leading-7">
              Discover the beauty, heritage, culture and authentic experiences
              of Ratnagiri and the Konkan coast.
            </p>
          </div>

          <div>
            <h3 className="font-black uppercase tracking-wider text-white">
              Quick Links
            </h3>

            <div className="mt-5 flex flex-col gap-3 text-sm">
              <a href="#places" className="hover:text-orange-400">
                Tourist Places
              </a>
              <a href="#hidden-gems" className="hover:text-orange-400">
                Hidden Gems
              </a>
              <a href="#food" className="hover:text-orange-400">
                Local Food
              </a>
              <a href="#rentals" className="hover:text-orange-400">
                Rentals
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-black uppercase tracking-wider text-white">
              Services
            </h3>

            <div className="mt-5 flex flex-col gap-3 text-sm">
              <a href="#guides" className="hover:text-orange-400">
                Local Guides
              </a>
              <Link to="/stays" className="hover:text-orange-400">
                Stays
              </Link>
              <Link to="/login" className="hover:text-orange-400">
                Sign In
              </Link>
              <Link to="/signup" className="hover:text-orange-400">
                Create Account
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-black uppercase tracking-wider text-white">
              Safety
            </h3>

            <div className="mt-5 flex flex-col gap-3 text-sm">
              <a href="#emergency" className="hover:text-red-300">
                Emergency Support
              </a>
              <span>Travel Safety Tips</span>
              <span>Women Safety</span>
              <span>Local Transport Help</span>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-12 max-w-7xl border-t border-slate-800 pt-7 text-center text-xs">
          © {new Date().getFullYear()} Ratnagiri Tourism. Explore the beauty,
          culture and heritage of Konkan.
        </div>
      </footer>
    </>
  );
}

export default Footer;