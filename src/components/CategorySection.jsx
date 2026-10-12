import { motion } from "motion/react";
import { categories } from "../data/homeData";

function CategorySection() {
  return (
    <section className="px-5 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <p className="text-xs font-black uppercase tracking-[0.25em] text-orange-500">
            Start Exploring
          </p>

          <h2 className="mt-3 text-3xl font-black text-slate-900 md:text-5xl">
            Explore by Category
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-500">
            Find everything needed to plan a memorable Ratnagiri journey.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, index) => (
            <motion.a
              key={category.title}
              href={category.link}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition hover:border-orange-200 hover:shadow-xl"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50 text-2xl transition group-hover:scale-110 group-hover:bg-orange-500">
                {category.icon}
              </div>

              <h3 className="mt-5 text-lg font-black text-slate-900">
                {category.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                {category.description}
              </p>

              <p className="mt-5 text-xs font-black uppercase tracking-widest text-orange-500">
                Explore →
              </p>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CategorySection;