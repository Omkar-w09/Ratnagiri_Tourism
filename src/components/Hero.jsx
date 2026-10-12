import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import {
  Search,
  MapPin,
  CalendarDays,
  Users,
  ChevronRight,
  PlayCircle,
  Map,
  ShieldCheck,
  Compass,
  Star,
} from "lucide-react";

import Navbar from "./Navbar";

const heroContainerAnimation = {
  hidden: {
    opacity: 0,
  },

  visible: {
    opacity: 1,

    transition: {
      staggerChildren: 0.13,
      delayChildren: 0.25,
    },
  },
};

const heroItemAnimation = {
  hidden: {
    opacity: 0,
    y: 38,
  },

  visible: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

const quickStats = [
  {
    number: "30+",
    label: "Tourist Places",
  },
  {
    number: "15+",
    label: "Hidden Gems",
  },
  {
    number: "24/7",
    label: "Safety Support",
  },
  {
    number: "100%",
    label: "Local Experience",
  },
];


function HeroClock() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

const time = new Intl.DateTimeFormat("en-IN", {
  timeZone: "Asia/Kolkata",
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
})
  .format(now)
  .toUpperCase();

  const date = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Kolkata",
    weekday: "short",
    month: "short",
    day: "2-digit",
  })
    .format(now)
    .toUpperCase();

  return (
    <motion.div
      variants={heroItemAnimation}
      className="mb-5 text-center text-white"
    >
      <p className="text-3xl font-light leading-none tracking-tight sm:text-4xl">
        {time}
      </p>

      <p className="mt-2 text-[9px] font-semibold uppercase tracking-[0.22em] text-white/75 sm:text-[10px]">
        {date} · Ratnagiri IST
      </p>
    </motion.div>
  );
}

function Hero() {
  const navigate = useNavigate();

  const [destination, setDestination] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [travelDate, setTravelDate] = useState("");
  const [travellers, setTravellers] = useState("1 Traveller");

  function handleSearch(event) {
    event.preventDefault();

    const query = new URLSearchParams();

    if (destination.trim()) {
      query.set("search", destination.trim());
    }

    if (category !== "All Categories") {
      query.set("category", category);
    }

    if (travelDate) {
      query.set("date", travelDate);
    }

    query.set("travellers", travellers);

    navigate(`/explore?${query.toString()}`);
  }

  function scrollToPlaces() {
    const placesSection = document.querySelector("#places");

    if (placesSection) {
      placesSection.scrollIntoView({
        behavior: "smooth",
      });
    }
  }

  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden bg-slate-950"
    >
      {/* Background */}

      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/16354184/pexels-photo-16354184.jpeg')",
        }}
        initial={{
          scale: 1.18,
        }}
        animate={{
          scale: 1,
        }}
        transition={{
          duration: 2.4,
          ease: "easeOut",
        }}
      />

      {/* Background overlays */}

      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/75 via-slate-950/48 to-slate-950" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(249,115,22,0.17),transparent_40%)]" />

      {/* Decorative animated light */}

      <motion.div
        animate={{
          x: [0, 70, 0],
          y: [0, 35, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute left-[-100px] top-1/3 h-80 w-80 rounded-full bg-orange-500/15 blur-[110px]"
      />

      <Navbar />

      {/* Main hero content */}

      <motion.div
        variants={heroContainerAnimation}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-5 pb-14 pt-32 text-center text-white sm:px-8 lg:pt-36"
      >
        {/* Compact live Ratnagiri time */}
        <HeroClock />

        {/* Badge */}

        <motion.div
          variants={heroItemAnimation}
          className="mb-6 flex items-center gap-2 rounded-full border border-orange-400/25 bg-slate-950/45 px-4 py-2 text-[9px] font-black uppercase tracking-[0.2em] text-orange-300 shadow-xl backdrop-blur-xl sm:px-5 sm:text-[10px]"
        >
          <Compass size={14} />

          Discover the Soul of the Konkan Coast
        </motion.div>

        {/* Heading */}

        <motion.h1
          variants={heroItemAnimation}
          className="max-w-6xl text-5xl font-black leading-[0.95] tracking-[-0.04em] sm:text-6xl md:text-8xl lg:text-[92px]"
        >
          Explore the Beauty of

          <span className="mt-2 block bg-gradient-to-r from-orange-300 via-orange-400 to-orange-600 bg-clip-text text-transparent">
            Ratnagiri
          </span>
        </motion.h1>

        {/* Description */}

        <motion.p
          variants={heroItemAnimation}
          className="mt-7 max-w-3xl text-sm leading-7 text-slate-200 sm:text-base md:text-lg md:leading-8"
        >
          Discover pristine beaches, ancient sea forts, hidden
          coastal gems, authentic Konkani cuisine, trusted local
          guides and unforgettable travel experiences.
        </motion.p>

        {/* Trust badges */}

        <motion.div
          variants={heroItemAnimation}
          className="mt-6 flex flex-wrap items-center justify-center gap-3 text-[10px] font-bold uppercase tracking-wider text-slate-300"
        >
          <span className="flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-2 backdrop-blur">
            <ShieldCheck
              size={14}
              className="text-emerald-400"
            />

            Safety Support
          </span>

          <span className="flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-2 backdrop-blur">
            <Map size={14} className="text-cyan-400" />

            Maps and Directions
          </span>

          <span className="flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-2 backdrop-blur">
            <Star size={14} className="text-yellow-400" />

            Local Recommendations
          </span>
        </motion.div>

        {/* Search panel */}

        <motion.form
          variants={heroItemAnimation}
          onSubmit={handleSearch}
          className="mt-9 w-full max-w-6xl rounded-3xl border border-white/15 bg-white/10 p-3 shadow-[0_30px_100px_rgba(0,0,0,0.45)] backdrop-blur-2xl"
        >
          <div className="grid gap-2 lg:grid-cols-[1.45fr_1fr_1fr_0.85fr_auto]">
            {/* Destination */}

            <label className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 text-left">
              <MapPin
                size={19}
                className="shrink-0 text-orange-500"
              />

              <span className="min-w-0 flex-1">
                <span className="block text-[9px] font-black uppercase tracking-[0.15em] text-slate-400">
                  Destination
                </span>

                <input
                  type="text"
                  value={destination}
                  onChange={(event) =>
                    setDestination(event.target.value)
                  }
                  placeholder="Where do you want to go?"
                  className="mt-1 w-full bg-transparent text-xs font-semibold text-slate-800 outline-none placeholder:font-normal placeholder:text-slate-400"
                />
              </span>
            </label>

            {/* Category */}

            <label className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 text-left">
              <Compass
                size={19}
                className="shrink-0 text-orange-500"
              />

              <span className="min-w-0 flex-1">
                <span className="block text-[9px] font-black uppercase tracking-[0.15em] text-slate-400">
                  Category
                </span>

                <select
                  value={category}
                  onChange={(event) =>
                    setCategory(event.target.value)
                  }
                  className="mt-1 w-full cursor-pointer bg-transparent text-xs font-semibold text-slate-800 outline-none"
                >
                  <option>All Categories</option>
                  <option>Beaches</option>
                  <option>Historic Forts</option>
                  <option>Hidden Gems</option>
                  <option>Local Food</option>
                  <option>Religious Places</option>
                </select>
              </span>
            </label>

            {/* Date */}

            <label className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 text-left">
              <CalendarDays
                size={19}
                className="shrink-0 text-orange-500"
              />

              <span className="min-w-0 flex-1">
                <span className="block text-[9px] font-black uppercase tracking-[0.15em] text-slate-400">
                  Travel Date
                </span>

                <input
                  type="date"
                  value={travelDate}
                  onChange={(event) =>
                    setTravelDate(event.target.value)
                  }
                  className="mt-1 w-full cursor-pointer bg-transparent text-xs font-semibold text-slate-800 outline-none"
                />
              </span>
            </label>

            {/* Travellers */}

            <label className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 text-left">
              <Users
                size={19}
                className="shrink-0 text-orange-500"
              />

              <span className="min-w-0 flex-1">
                <span className="block text-[9px] font-black uppercase tracking-[0.15em] text-slate-400">
                  Travellers
                </span>

                <select
                  value={travellers}
                  onChange={(event) =>
                    setTravellers(event.target.value)
                  }
                  className="mt-1 w-full cursor-pointer bg-transparent text-xs font-semibold text-slate-800 outline-none"
                >
                  <option>1 Traveller</option>
                  <option>2 Travellers</option>
                  <option>3 Travellers</option>
                  <option>4 Travellers</option>
                  <option>5+ Travellers</option>
                </select>
              </span>
            </label>

            {/* Search */}

            <motion.button
              type="submit"
              whileHover={{
                scale: 1.03,
              }}
              whileTap={{
                scale: 0.95,
              }}
              className="flex min-h-16 items-center justify-center gap-2 rounded-2xl bg-orange-500 px-7 text-xs font-black uppercase tracking-widest text-white shadow-xl shadow-orange-950/25 transition hover:bg-orange-600"
            >
              <Search size={18} />

              Search
            </motion.button>
          </div>
        </motion.form>

        {/* Action buttons */}

        <motion.div
          variants={heroItemAnimation}
          className="mt-6 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row"
        >
          <motion.button
            type="button"
            onClick={scrollToPlaces}
            whileHover={{
              scale: 1.04,
              y: -3,
            }}
            whileTap={{
              scale: 0.95,
            }}
            className="flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-7 py-4 text-xs font-black uppercase tracking-widest text-white shadow-xl transition hover:bg-orange-600"
          >
            Explore Destinations

            <ChevronRight size={17} />
          </motion.button>

          <motion.button
            type="button"
            onClick={() =>
              navigate("/explore?mode=planner")
            }
            whileHover={{
              scale: 1.04,
              y: -3,
            }}
            whileTap={{
              scale: 0.95,
            }}
            className="flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-7 py-4 text-xs font-black uppercase tracking-widest text-white backdrop-blur transition hover:bg-white hover:text-slate-950"
          >
            <PlayCircle size={17} />

            Plan My Trip
          </motion.button>
        </motion.div>

        {/* Statistics */}

        <motion.div
          variants={heroItemAnimation}
          className="mt-12 grid w-full max-w-4xl grid-cols-2 overflow-hidden rounded-2xl border border-white/10 bg-slate-950/30 backdrop-blur-xl sm:grid-cols-4"
        >
          {quickStats.map((stat, index) => (
            <div
              key={stat.label}
              className={`px-4 py-5 ${
                index !== quickStats.length - 1
                  ? "border-r border-white/10"
                  : ""
              } ${
                index < 2
                  ? "border-b border-white/10 sm:border-b-0"
                  : ""
              }`}
            >
              <p className="text-xl font-black text-orange-400 sm:text-2xl">
                {stat.number}
              </p>

              <p className="mt-1 text-[8px] font-bold uppercase tracking-[0.16em] text-slate-300 sm:text-[9px]">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Scroll indicator */}

        <motion.button
          type="button"
          onClick={scrollToPlaces}
          animate={{
            y: [0, 8, 0],
          }}
          transition={{
            duration: 1.6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="mt-10 text-slate-400"
        >
          <p className="text-[8px] font-bold uppercase tracking-[0.3em]">
            Scroll to Discover
          </p>

          <p className="mt-1 text-xl">↓</p>
        </motion.button>
      </motion.div>
    </section>
  );
}

export default Hero;