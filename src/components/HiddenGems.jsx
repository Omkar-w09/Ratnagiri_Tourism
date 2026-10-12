import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { hiddenGems } from "../data/homeData";

function HiddenGems() {
  const navigate = useNavigate();

  return (
    <section id="hidden-gems" className="px-5 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <p className="text-xs font-black uppercase tracking-[0.25em] text-emerald-600">
            Less Crowded Places
          </p>

          <h2 className="mt-3 text-3xl font-black text-slate-900 md:text-5xl">
            Hidden Gems
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-500">
            Explore peaceful destinations beyond the usual tourist routes.
          </p>
        </div>

        <div className="grid gap-7 lg:grid-cols-3">
          {hiddenGems.map((place, index) => (
            <motion.article
              key={place.name}
              initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className="group overflow-hidden rounded-2xl bg-white shadow-lg"
            >
              <div className="h-60 overflow-hidden">
                <img
                  src={place.image}
                  alt={place.name}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-black text-slate-900">
                  {place.name}
                </h3>

                <div className="mt-4 space-y-2 text-sm text-slate-500">
                  <p>📍 {place.distance}</p>
                  <p>📅 Best time: {place.bestTime}</p>
                  <p>🥾 Travel level: {place.level}</p>
                </div>

                <button
                  type="button"
                  onClick={() => navigate("/explore")}
                  className="mt-6 w-full rounded-xl bg-emerald-600 py-3 text-xs font-black uppercase tracking-wider text-white hover:bg-emerald-700"
                >
                  Explore Hidden Gem
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HiddenGems;