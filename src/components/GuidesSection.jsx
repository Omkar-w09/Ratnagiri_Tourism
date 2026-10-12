import { motion } from "motion/react";
import { guides } from "../data/homeData";

function GuidesSection() {
  return (
    <section id="guides" className="bg-slate-100 px-5 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <p className="text-xs font-black uppercase tracking-[0.25em] text-orange-500">
            Explore with Experts
          </p>

          <h2 className="mt-3 text-3xl font-black text-slate-900 md:text-5xl">
            Trusted Local Guides
          </h2>
        </div>

        <div className="grid gap-7 md:grid-cols-3">
          {guides.map((guide, index) => (
            <motion.article
              key={guide.name}
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="rounded-2xl bg-white p-8 text-center shadow-sm"
            >
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-orange-100 text-4xl">
                {guide.icon}
              </div>

              <h3 className="mt-5 text-xl font-black text-slate-900">
                {guide.name}
              </h3>

              <p className="mt-2 text-sm font-bold text-orange-600">
                {guide.speciality}
              </p>

              <div className="mt-5 space-y-2 text-sm text-slate-500">
                <p>🗣️ {guide.languages}</p>
                <p>⭐ Experience: {guide.experience}</p>
              </div>

              <button
                type="button"
                className="mt-7 w-full rounded-xl bg-slate-900 py-3 text-xs font-black uppercase tracking-wider text-white hover:bg-orange-500"
              >
                Contact Guide
              </button>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default GuidesSection;