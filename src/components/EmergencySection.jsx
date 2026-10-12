import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";

function EmergencyCard({ icon, title, description, phone }) {
  return (
    <motion.article
      whileHover={{ y: -7 }}
      className="rounded-2xl border border-red-400/20 bg-white/10 p-7 backdrop-blur"
    >
      <p className="text-4xl">{icon}</p>

      <h3 className="mt-5 text-lg font-black">{title}</h3>

      <p className="mt-2 text-sm text-red-100/70">{description}</p>

      <a
        href={`tel:${phone}`}
        className="mt-6 block w-full rounded-xl bg-red-500 py-3 text-center text-xs font-black uppercase tracking-wider text-white hover:bg-red-600"
      >
        Call {phone}
      </a>
    </motion.article>
  );
}

function EmergencySection() {
  const navigate = useNavigate();

  return (
    <section id="emergency" className="bg-red-950 px-5 py-20 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <p className="text-xs font-black uppercase tracking-[0.25em] text-red-300">
            Quick Assistance
          </p>

          <h2 className="mt-3 text-3xl font-black md:text-5xl">
            Emergency Support
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-red-100/70">
            Quickly access health, safety and transport assistance while
            travelling.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <EmergencyCard
            icon="🚨"
            title="National Emergency"
            description="Emergency assistance"
            phone="112"
          />

          <EmergencyCard
            icon="🚑"
            title="Ambulance"
            description="Medical emergency assistance"
            phone="108"
          />

          <EmergencyCard
            icon="🛡️"
            title="Women Safety"
            description="Women's safety assistance"
            phone="1091"
          />

          <motion.article
            whileHover={{ y: -7 }}
            className="rounded-2xl border border-red-400/20 bg-white/10 p-7 backdrop-blur"
          >
            <p className="text-4xl">🚌</p>

            <h3 className="mt-5 text-lg font-black">
              Local Transport Help
            </h3>

            <p className="mt-2 text-sm text-red-100/70">
              Find buses, taxis and local transport options.
            </p>

            <button
              type="button"
              onClick={() => navigate("/explore")}
              className="mt-6 w-full rounded-xl bg-white py-3 text-xs font-black uppercase tracking-wider text-red-950"
            >
              Find Transport
            </button>
          </motion.article>
        </div>
      </div>
    </section>
  );
}

export default EmergencySection;