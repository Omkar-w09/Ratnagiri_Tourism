import { motion } from "motion/react";
import { travelTips } from "../data/homeData";

function TravelTips() {
  return (
    <section className="px-5 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <p className="text-xs font-black uppercase tracking-[0.25em] text-orange-500">
            Helpful Information
          </p>

          <h2 className="mt-3 text-3xl font-black text-slate-900 md:text-5xl">
            Travel Tips
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {travelTips.map((tip, index) => (
            <motion.article
              key={tip.title}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              whileHover={{ y: -7 }}
              className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm"
            >
              <p className="text-4xl">{tip.icon}</p>

              <h3 className="mt-5 text-lg font-black text-slate-900">
                {tip.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                {tip.description}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TravelTips;