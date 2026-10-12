import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { popularPlaces } from "../data/homeData";

function PopularPlaces() {
  const navigate = useNavigate();

  return (
    <section id="places" className="bg-slate-950 px-5 py-20 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.25em] text-orange-400">
              Popular Destinations
            </p>

            <h2 className="mt-3 text-3xl font-black md:text-5xl">
              Tourist Places in Ratnagiri
            </h2>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400">
              Discover beaches, forts, palaces, spiritual destinations and
              scenic coastal routes.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate("/explore")}
            className="rounded-xl border border-orange-500/30 bg-orange-500/10 px-6 py-3 text-xs font-black uppercase tracking-widest text-orange-400"
          >
            View All Places →
          </button>
        </div>

        <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-3">
          {popularPlaces.map((place, index) => (
            <motion.article
              key={place.name}
              initial={{ opacity: 0, y: 45 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              whileHover={{ y: -8 }}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-xl"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={place.image}
                  alt={place.name}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />

                <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-slate-900">
                  {place.category}
                </span>

                <span className="absolute bottom-4 right-4 rounded-full bg-orange-500 px-3 py-1 text-xs font-bold">
                  ⭐ {place.rating}
                </span>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-black">{place.name}</h3>

                <p className="mt-2 text-xs font-semibold text-orange-400">
                  📍 {place.location}
                </p>

                <p className="mt-4 text-sm leading-6 text-slate-400">
                  {place.description}
                </p>

                <div className="mt-6 flex gap-3">
                  <button
                    type="button"
                    onClick={() => navigate("/explore")}
                    className="flex-1 rounded-xl bg-orange-500 py-3 text-xs font-black uppercase tracking-wider hover:bg-orange-600"
                  >
                    View Details
                  </button>

                  <a
                    href={place.maps}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 rounded-xl border border-white/15 py-3 text-center text-xs font-black uppercase tracking-wider hover:bg-white hover:text-slate-900"
                  >
                    Maps
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PopularPlaces;