import { motion } from "motion/react";
import { rentals } from "../data/homeData";

function RentalsSection() {
  return (
    <section id="rentals" className="px-5 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12">
          <p className="text-xs font-black uppercase tracking-[0.25em] text-orange-500">
            Travel Freely
          </p>

          <h2 className="mt-3 text-3xl font-black text-slate-900 md:text-5xl">
            Bike and Car Rentals
          </h2>
        </div>

        <div className="grid gap-7 md:grid-cols-3">
          {rentals.map((rental, index) => (
            <motion.article
              key={rental.type}
              initial={{ opacity: 0, y: 45 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm"
            >
              <div className="text-5xl">{rental.icon}</div>

              <h3 className="mt-6 text-xl font-black text-slate-900">
                {rental.type}
              </h3>

              <p className="mt-3 font-bold text-orange-600">{rental.price}</p>

              <p className="mt-2 text-sm text-slate-500">
                {rental.availability}
              </p>

              <div className="mt-7 flex gap-3">
                <button
                  type="button"
                  className="flex-1 rounded-xl bg-orange-500 py-3 text-xs font-black uppercase tracking-wider text-white"
                >
                  Book Now
                </button>

                <button
                  type="button"
                  className="flex-1 rounded-xl border border-slate-200 py-3 text-xs font-black uppercase tracking-wider"
                >
                  Contact
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default RentalsSection;