import { motion } from "motion/react";
import { foodItems } from "../data/homeData";

function FoodSection() {
  return (
    <section id="food" className="bg-orange-50 px-5 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <p className="text-xs font-black uppercase tracking-[0.25em] text-orange-600">
            Taste of Konkan
          </p>

          <h2 className="mt-3 text-3xl font-black text-slate-900 md:text-5xl">
            Local Favourite Food
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {foodItems.map((food, index) => (
            <motion.article
              key={food.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              whileHover={{ y: -8 }}
              className="rounded-2xl border border-orange-100 bg-white p-7 text-center shadow-sm"
            >
              <motion.div
                whileHover={{ rotate: [0, -10, 10, 0], scale: 1.2 }}
                className="text-5xl"
              >
                {food.icon}
              </motion.div>

              <h3 className="mt-5 text-lg font-black text-slate-900">
                {food.name}
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                {food.description}
              </p>

              <button
                type="button"
                className="mt-5 text-xs font-black uppercase tracking-widest text-orange-600"
              >
                Find Restaurants →
              </button>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FoodSection;