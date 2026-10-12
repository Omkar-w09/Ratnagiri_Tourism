import { motion } from "motion/react";
import { testimonials } from "../data/homeData";

function Testimonials() {
  return (
    <section className="bg-orange-50 px-5 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <p className="text-xs font-black uppercase tracking-[0.25em] text-orange-500">
            Traveller Experiences
          </p>

          <h2 className="mt-3 text-3xl font-black text-slate-900 md:text-5xl">
            What Visitors Say
          </h2>
        </div>

        <div className="grid gap-7 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.article
              key={testimonial.name}
              initial={{ opacity: 0, y: 45 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -7 }}
              className="rounded-2xl bg-white p-8 shadow-sm"
            >
              <p className="text-orange-500">{testimonial.rating}</p>

              <p className="mt-5 text-sm leading-7 text-slate-600">
                “{testimonial.review}”
              </p>

              <div className="mt-6 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-orange-100 font-black text-orange-600">
                  {testimonial.name.charAt(0)}
                </div>

                <p className="font-black text-slate-900">
                  {testimonial.name}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;