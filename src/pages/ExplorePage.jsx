import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowRight,
  Bike,
  CalendarDays,
  ChevronDown,
  ChevronUp,
  Compass,
  HeartPulse,
  Map,
  MapPin,
  Navigation,
  Search,
  ShieldAlert,
  Sparkles,
  Star,
  Users,
  X,
  Zap,
} from "lucide-react";

const PLACES_DATA = [
  {
    id: "ratnadurg-fort",
    name: "Ratnadurg Fort",
    category: "Fort",
    rating: 4.8,
    price: 0,
    location: "Ratnagiri Coast",
    bestTime: "October to March",
    description:
      "An architectural sea fort providing majestic panoramic vistas of the Arabian Sea.",
    image:
      "https://images.unsplash.com/photo-1626082929543-5bab0f090c42?q=80&w=1200&auto=format&fit=crop",
    mapsUrl: "https://maps.app.goo.gl/zVMXWKQmXX3K9BkJ6",
    guide: {
      name: "Rajesh Mane",
      contact: "+91 98230 XXXXX",
      experience: "8 Years",
      languages: "Marathi, Hindi",
      fee: 300,
    },
  },
  {
    id: "jaigad-fort",
    name: "Jaigad Fort",
    category: "Fort",
    rating: 4.6,
    price: 0,
    location: "Jaigad Creek",
    bestTime: "November to February",
    description:
      "An ancient fort where dramatic architecture meets river, creek and ocean views.",
    image:
      "https://images.unsplash.com/photo-1590001155093-a3c66ab0c3ff?q=80&w=1200&auto=format&fit=crop",
    mapsUrl: "https://maps.app.goo.gl/mau5hztsDUbzYzmC7",
    guide: {
      name: "Aniket Pawar",
      contact: "+91 91582 XXXXX",
      experience: "5 Years",
      languages: "Marathi, Hindi",
      fee: 250,
    },
  },
  {
    id: "ganpatipule",
    name: "Shree Ganpatipule Mandir",
    category: "Temple",
    rating: 4.9,
    price: 0,
    location: "Ganpatipule Beach",
    bestTime: "All Year Round",
    description:
      "A famous beachside sanctuary known for its revered Ganpati temple and serene coastal setting.",
    image:
      "https://images.unsplash.com/photo-1605649487212-47bdab064df7?q=80&w=1200&auto=format&fit=crop",
    mapsUrl: "https://maps.app.goo.gl/RfQjjWskAtYPTxxQ9",
    guide: {
      name: "Ganesh Joshi Guruji",
      contact: "+91 94224 XXXXX",
      experience: "12 Years",
      languages: "Marathi, Hindi, Sanskrit",
      fee: 400,
    },
  },
  {
    id: "are-ware",
    name: "Are Ware Road & Beach",
    category: "Beach",
    rating: 4.7,
    price: 0,
    location: "Ganpatipule-Ratnagiri Road",
    bestTime: "November to May",
    description:
      "A breathtaking coastal drive with dramatic sea views, green hills and peaceful beaches.",
    image:
      "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=1200&auto=format&fit=crop",
    mapsUrl: "https://maps.app.goo.gl/Z7YCgJuz7msM6miG6",
    guide: {
      name: "Vikram Jadhav",
      contact: "+91 77091 XXXXX",
      experience: "4 Years",
      languages: "Marathi, English, Hindi",
      fee: 350,
    },
  },
  {
    id: "thiba-palace",
    name: "Thiba Palace",
    category: "Historical",
    rating: 4.4,
    price: 0,
    location: "Thiba Road, Ratnagiri",
    bestTime: "October to March",
    description:
      "A historic palace associated with the exile of Burmese royalty in Ratnagiri.",
    image:
      "https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=1200&auto=format&fit=crop",
    mapsUrl: "https://maps.app.goo.gl/NPWauj1nFAydd1fj6",
    guide: {
      name: "Prof. Suresh Desai",
      contact: "+91 98905 XXXXX",
      experience: "15 Years",
      languages: "English, Marathi, Hindi",
      fee: 500,
    },
  },
  {
    id: "pawas",
    name: "Pawas - Swami Swaroopanand Samadhi Mandir",
    category: "Temple",
    rating: 4.7,
    price: 0,
    location: "Pawas, Ratnagiri",
    bestTime: "October to March",
    description:
      "A peaceful spiritual destination known for its calm ashram atmosphere and devotional importance.",
    image:
      "https://images.unsplash.com/photo-1605649487212-47bdab064df7?q=80&w=1200&auto=format&fit=crop",
    mapsUrl: "https://maps.app.goo.gl/EkCpnahnLamDn8Ar9",
    guide: {
      name: "Guide not assigned",
      contact: "Not available",
      experience: "Not assigned",
      languages: "Marathi, Hindi",
      fee: 0,
    },
  },
  {
    id: "bhatye-beach",
    name: "Bhatye Beach",
    category: "Beach",
    rating: 4.5,
    price: 0,
    location: "Bhatye Village",
    bestTime: "October to May",
    description:
      "A long, peaceful coastline close to Ratnagiri city, ideal for sunset walks and relaxed evenings.",
    image:
      "https://images.unsplash.com/photo-1545562083-a600704fa487?q=80&w=1200&auto=format&fit=crop",
    mapsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=Bhatye%20Beach%2C%20Ratnagiri%2C%20Maharashtra&travelmode=driving&dir_action=navigate",
    guide: {
      name: "Nitin Surve",
      contact: "+91 88883 XXXXX",
      experience: "6 Years",
      languages: "Marathi, Hindi",
      fee: 200,
    },
  },
];

const RENTAL_SHOPS = [
  {
    id: "srinath-rentals",
    shopName: "Srinath Bike Rentals",
    owner: "Srinath Gavhane",
    rating: 4.9,
    location: "Ratnagiri City Core",
    contact: "+91 98231 XXXXX",
    fleet: [
      { bikeId: "s-bullet", name: "Royal Enfield 350", rate: 900, icon: "🏍️" },
      { bikeId: "s-activa", name: "Honda Activa 6G", rate: 400, icon: "🛵" },
    ],
  },
  {
    id: "ashwinat-rentals",
    shopName: "Ashwinat Hub & Tours",
    owner: "Ashwinat Pawar",
    rating: 4.7,
    location: "Thiba Palace Gate",
    contact: "+91 91583 XXXXX",
    fleet: [
      { bikeId: "a-bullet", name: "RE Bullet 350", rate: 850, icon: "🏍️" },
      { bikeId: "a-dio", name: "Honda Dio", rate: 380, icon: "🛵" },
    ],
  },
];

const categories = ["All", "Beach", "Fort", "Temple", "Historical"];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: "easeOut",
    },
  },
};

function ExplorePage() {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [expandedShopId, setExpandedShopId] = useState(null);
  const [activeRentalSelection, setActiveRentalSelection] = useState(null);
  const [rentalDays, setRentalDays] = useState(1);
  const [rentalSuccess, setRentalSuccess] = useState(false);
  const [pinnedSpots, setPinnedSpots] = useState([]);
  const [groupSize, setGroupSize] = useState(1);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [activeCallNotice, setActiveCallNotice] = useState("");

  const filteredPlaces = useMemo(() => {
    return PLACES_DATA.filter((place) => {
      const query = searchQuery.toLowerCase();
      const matchText =
        place.name.toLowerCase().includes(query) ||
        place.description.toLowerCase().includes(query) ||
        place.location.toLowerCase().includes(query);

      const matchCategory =
        selectedCategory === "All" || place.category === selectedCategory;

      return matchText && matchCategory;
    });
  }, [searchQuery, selectedCategory]);

  const routeCalculations = useMemo(() => {
    let entryFees = 0;
    let guideFees = 0;

    pinnedSpots.forEach((spot) => {
      entryFees += spot.price;
      guideFees += spot.guide.fee;
    });

    let bikeFees = 0;

    if (activeRentalSelection) {
      bikeFees = activeRentalSelection.bike.rate * rentalDays;
    }

    const total = entryFees + guideFees + bikeFees;

    return {
      entryTotal: entryFees,
      guideTotal: guideFees,
      bikeTotal: bikeFees,
      grandTotal: total,
      perPersonShare: Math.round(total / Math.max(1, groupSize)),
    };
  }, [pinnedSpots, activeRentalSelection, rentalDays, groupSize]);

  const moveSpot = (index, direction) => {
    const updated = [...pinnedSpots];
    const targetIndex = index + direction;

    if (targetIndex < 0 || targetIndex >= updated.length) {
      return;
    }

    [updated[index], updated[targetIndex]] = [
      updated[targetIndex],
      updated[index],
    ];

    setPinnedSpots(updated);
  };

  const handleSmartOptimize = () => {
    setIsOptimizing(true);

    setTimeout(() => {
      const categoryOrder = {
        Historical: 1,
        Fort: 2,
        Temple: 3,
        Beach: 4,
      };

      const sorted = [...pinnedSpots].sort(
        (a, b) =>
          (categoryOrder[a.category] || 9) -
          (categoryOrder[b.category] || 9)
      );

      setPinnedSpots(sorted);
      setIsOptimizing(false);
    }, 600);
  };

  const getWhatsAppShareLink = () => {
    let message = `*📍 My Ratnagiri Tour Plan*\n\n`;

    pinnedSpots.forEach((spot, index) => {
      message += `${index + 1}. ${spot.name} (${spot.category})\n`;
    });

    if (activeRentalSelection) {
      message += `\n*🛵 Ride:* ${activeRentalSelection.bike.name}`;
    }

    message += `\n\n*💰 Total Budget:* ₹${routeCalculations.grandTotal}`;

    return `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
  };

  const triggerCallRouting = (serviceName) => {
    setActiveCallNotice(`Opening phone dialer for ${serviceName}...`);

    setTimeout(() => {
      setActiveCallNotice("");
    }, 4000);
  };

  const openGoogleMaps = (mapsUrl) => {
    if (!mapsUrl) {
      window.alert("Google Maps location is not available for this place.");
      return;
    }

    window.open(mapsUrl, "_blank", "noopener,noreferrer");
  };

  const togglePinnedPlace = (place) => {
    const isPinned = pinnedSpots.some((item) => item.id === place.id);

    if (isPinned) {
      setPinnedSpots((prev) =>
        prev.filter((item) => item.id !== place.id)
      );
    } else {
      setPinnedSpots((prev) => [...prev, place]);
    }
  };

  return (
    <div className="min-h-screen bg-[#f6f7f9] text-slate-900">
      {/* NAVBAR */}
      <motion.nav
        initial={{ y: -70, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="sticky top-0 z-50 border-b border-white/60 bg-white/80 backdrop-blur-2xl"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="flex items-center gap-3 font-black tracking-tight"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-lg">
              <Compass size={20} />
            </span>

            <span className="text-lg">
              Ratnagiri{" "}
              <span className="text-orange-500">Tourism</span>
            </span>
          </Link>

          <button
            type="button"
            onClick={() => navigate("/stays")}
            className="group inline-flex items-center gap-2 rounded-2xl bg-slate-950 px-4 py-2.5 text-[10px] font-black uppercase tracking-[0.16em] text-white transition hover:bg-orange-500 sm:px-5"
          >
            Reserve Stays
            <ArrowRight
              size={15}
              className="transition group-hover:translate-x-1"
            />
          </button>
        </div>
      </motion.nav>

      <main className="mx-auto max-w-7xl px-4 pb-20 pt-6 sm:px-6 lg:px-8">
        {/* HERO */}
        <motion.section
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative overflow-hidden rounded-[2rem] bg-slate-950 text-white shadow-2xl shadow-slate-900/10"
        >
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=1800&auto=format&fit=crop"
              alt="Ratnagiri coast"
              className="h-full w-full object-cover opacity-35"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-950/35" />
          </div>

          <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-orange-500/20 blur-3xl" />
          <div className="absolute -bottom-24 left-1/3 h-72 w-72 rounded-full bg-sky-500/10 blur-3xl" />

          <div className="relative grid gap-10 px-6 py-10 sm:px-10 sm:py-14 lg:grid-cols-[1.25fr_0.75fr] lg:px-14 lg:py-16">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-orange-200 backdrop-blur">
                <Sparkles size={14} />
                Explore the Konkan coast
              </div>

              <h1 className="mt-6 max-w-3xl text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
                Find your next{" "}
                <span className="text-orange-400">Ratnagiri escape.</span>
              </h1>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                Discover forts, beaches, temples and historic landmarks.
                Build a route, estimate your trip and navigate directly with
                Google Maps.
              </p>

              <div className="mt-8 grid max-w-2xl grid-cols-3 gap-3">
                <HeroStat value="7" label="Featured places" />
                <HeroStat value="4" label="Categories" />
                <HeroStat value="1" label="Route planner" />
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="self-end rounded-[1.75rem] border border-white/10 bg-white/10 p-4 backdrop-blur-xl sm:p-5"
            >
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                    Quick Discovery
                  </p>
                  <p className="mt-1 text-sm font-bold">
                    Search the coast in seconds
                  </p>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-orange-500 text-white">
                  <Search size={18} />
                </div>
              </div>

              <div className="relative">
                <Search
                  size={17}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Search forts, beaches, temples..."
                  className="w-full rounded-2xl border border-white/10 bg-slate-950/70 py-4 pl-11 pr-4 text-sm text-white outline-none placeholder:text-slate-500 focus:border-orange-400"
                />
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setSelectedCategory(category)}
                    className={`rounded-full px-3 py-2 text-[9px] font-black uppercase tracking-[0.14em] transition ${
                      selectedCategory === category
                        ? "bg-orange-500 text-white"
                        : "border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* SECTION HEADING */}
        <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-orange-500">
              Curated destinations
            </p>
            <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
              Places worth the journey
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500">
              Choose a place, add it to your route and open detailed travel
              information whenever you are ready.
            </p>
          </div>

          <div className="inline-flex w-fit items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-xs font-bold text-slate-600 shadow-sm">
            <MapPin size={16} className="text-orange-500" />
            {filteredPlaces.length} destinations found
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="mt-8 grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
          {/* DESTINATIONS */}
          <motion.div
            key={`${selectedCategory}-${searchQuery}`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid gap-6 md:grid-cols-2"
          >
            <AnimatePresence mode="popLayout">
              {filteredPlaces.map((place, index) => {
                const isPinned = pinnedSpots.some(
                  (item) => item.id === place.id
                );

                const isFeatured =
                  index === 0 && filteredPlaces.length > 2;

                return (
                  <motion.article
                    key={place.id}
                    layout
                    variants={itemVariants}
                    exit={{ opacity: 0, scale: 0.96 }}
                    whileHover={{ y: -8 }}
                    className={`group overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-white shadow-sm transition hover:border-orange-200 hover:shadow-2xl hover:shadow-slate-900/10 ${
                      isFeatured ? "md:col-span-2" : ""
                    }`}
                  >
                    <div
                      className={
                        isFeatured
                          ? "grid h-full md:grid-cols-[1.1fr_0.9fr]"
                          : "flex h-full flex-col"
                      }
                    >
                      <div
                        className={`relative overflow-hidden ${
                          isFeatured
                            ? "min-h-[320px]"
                            : "aspect-[4/3]"
                        }`}
                      >
                        <img
                          src={place.image}
                          alt={place.name}
                          className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent" />

                        <div className="absolute left-4 top-4 flex items-center gap-2">
                          <span className="rounded-full bg-white/90 px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.15em] text-slate-800 backdrop-blur">
                            {place.category}
                          </span>

                          <span className="inline-flex items-center gap-1 rounded-full bg-slate-950/70 px-3 py-1.5 text-[10px] font-black text-white backdrop-blur">
                            <Star
                              size={12}
                              fill="currentColor"
                              className="text-amber-400"
                            />
                            {place.rating}
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={() => togglePinnedPlace(place)}
                          className={`absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border backdrop-blur transition ${
                            isPinned
                              ? "border-emerald-400/30 bg-emerald-500 text-white"
                              : "border-white/20 bg-slate-950/35 text-white hover:bg-white hover:text-slate-950"
                          }`}
                          aria-label={
                            isPinned
                              ? "Remove from route"
                              : "Add to route"
                          }
                        >
                          {isPinned ? (
                            <Zap size={17} fill="currentColor" />
                          ) : (
                            <Map size={17} />
                          )}
                        </button>

                        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4 text-white">
                          <div>
                            <div className="flex items-center gap-1.5 text-xs text-slate-200">
                              <MapPin size={14} />
                              {place.location}
                            </div>
                          </div>

                          {isPinned && (
                            <span className="rounded-full bg-emerald-500 px-3 py-1 text-[9px] font-black uppercase tracking-wider">
                              Added
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-1 flex-col p-5 sm:p-6">
                        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.16em] text-orange-500">
                          <CalendarDays size={14} />
                          Best time: {place.bestTime}
                        </div>

                        <h3
                          className={`mt-3 font-black tracking-tight text-slate-950 ${
                            isFeatured
                              ? "text-2xl sm:text-3xl"
                              : "text-xl"
                          }`}
                        >
                          {place.name}
                        </h3>

                        <p className="mt-3 flex-1 text-sm leading-7 text-slate-500">
                          {place.description}
                        </p>

                        <div className="mt-6 grid grid-cols-2 gap-3">
                          <button
                            type="button"
                            onClick={() =>
                              navigate(`/place/${place.id}`)
                            }
                            className="group/button inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-[10px] font-black uppercase tracking-[0.13em] text-slate-700 transition hover:border-orange-200 hover:bg-orange-50 hover:text-orange-600"
                          >
                            View Details
                            <ArrowRight
                              size={14}
                              className="transition group-hover/button:translate-x-1"
                            />
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              openGoogleMaps(place.mapsUrl)
                            }
                            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-950 px-4 py-3 text-[10px] font-black uppercase tracking-[0.13em] text-white transition hover:bg-orange-500"
                          >
                            <Navigation size={14} />
                            Navigate
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </AnimatePresence>

            {filteredPlaces.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="md:col-span-2 rounded-[1.75rem] border border-dashed border-slate-300 bg-white px-6 py-16 text-center"
              >
                <Search
                  size={28}
                  className="mx-auto text-slate-300"
                />
                <p className="mt-4 font-black text-slate-800">
                  No destination found
                </p>
                <p className="mt-2 text-sm text-slate-400">
                  Try another place name or category.
                </p>
              </motion.div>
            )}
          </motion.div>

          {/* SIDEBAR */}
          <motion.aside
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6 lg:sticky lg:top-24"
          >
            {/* ROUTE PLANNER */}
            <motion.section
              variants={itemVariants}
              className="overflow-hidden rounded-[1.75rem] bg-slate-950 text-white shadow-xl shadow-slate-950/10"
            >
              <div className="border-b border-white/10 bg-gradient-to-r from-orange-500/20 to-transparent p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 text-orange-300">
                      <Map size={17} />
                      <span className="text-[10px] font-black uppercase tracking-[0.18em]">
                        Route Planner
                      </span>
                    </div>

                    <h3 className="mt-3 text-xl font-black">
                      Build your day
                    </h3>

                    <p className="mt-2 text-xs leading-6 text-slate-400">
                      Add destinations and arrange them into one simple trip.
                    </p>
                  </div>

                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10">
                    <Compass size={20} />
                  </div>
                </div>
              </div>

              <div className="p-5">
                {pinnedSpots.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-white/10 bg-white/5 px-4 py-8 text-center">
                    <MapPin
                      size={24}
                      className="mx-auto text-slate-600"
                    />
                    <p className="mt-3 text-sm font-bold text-slate-300">
                      Your route is empty
                    </p>
                    <p className="mt-2 text-xs leading-6 text-slate-500">
                      Tap the route icon on any destination card.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {pinnedSpots.length > 1 && (
                      <button
                        type="button"
                        onClick={handleSmartOptimize}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-orange-500 px-4 py-3 text-[10px] font-black uppercase tracking-[0.14em] transition hover:bg-orange-600"
                      >
                        <Zap size={14} />
                        {isOptimizing
                          ? "Optimizing route..."
                          : "Smart optimize"}
                      </button>
                    )}

                    <div className="max-h-[240px] space-y-2 overflow-y-auto pr-1">
                      {pinnedSpots.map((spot, index) => (
                        <div
                          key={spot.id}
                          className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-3"
                        >
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-orange-500 text-xs font-black">
                            {index + 1}
                          </div>

                          <div className="min-w-0 flex-1">
                            <p className="truncate text-xs font-bold text-white">
                              {spot.name}
                            </p>
                            <p className="mt-1 text-[10px] text-slate-500">
                              {spot.category}
                            </p>
                          </div>

                          <div className="flex gap-1">
                            <button
                              type="button"
                              onClick={() => moveSpot(index, -1)}
                              disabled={index === 0}
                              className="rounded-lg bg-white/10 p-1.5 text-slate-300 disabled:opacity-20"
                            >
                              <ChevronUp size={13} />
                            </button>

                            <button
                              type="button"
                              onClick={() => moveSpot(index, 1)}
                              disabled={
                                index === pinnedSpots.length - 1
                              }
                              className="rounded-lg bg-white/10 p-1.5 text-slate-300 disabled:opacity-20"
                            >
                              <ChevronDown size={13} />
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                setPinnedSpots((prev) =>
                                  prev.filter(
                                    (item) =>
                                      item.id !== spot.id
                                  )
                                )
                              }
                              className="rounded-lg bg-rose-500/15 p-1.5 text-rose-300"
                            >
                              <X size={13} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
                          <Users size={15} />
                          Travellers
                        </div>

                        <input
                          type="number"
                          min="1"
                          max="10"
                          value={groupSize}
                          onChange={(event) =>
                            setGroupSize(
                              Math.max(
                                1,
                                parseInt(event.target.value) ||
                                  1
                              )
                            )
                          }
                          className="w-14 rounded-xl border border-white/10 bg-slate-950 px-2 py-2 text-center text-xs font-black text-orange-400 outline-none"
                        />
                      </div>

                      <div className="mt-4 border-t border-white/10 pt-4">
                        <div className="flex items-end justify-between">
                          <div>
                            <p className="text-[9px] font-black uppercase tracking-[0.16em] text-slate-500">
                              Estimated total
                            </p>
                            <p className="mt-1 text-2xl font-black">
                              ₹{routeCalculations.grandTotal}
                            </p>
                          </div>

                          <div className="text-right">
                            <p className="text-[9px] font-black uppercase tracking-[0.16em] text-slate-500">
                              Per person
                            </p>
                            <p className="mt-1 text-lg font-black text-emerald-400">
                              ₹{routeCalculations.perPersonShare}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <a
                      href={getWhatsAppShareLink()}
                      target="_blank"
                      rel="noreferrer"
                      className="block rounded-2xl bg-emerald-500 px-4 py-3 text-center text-[10px] font-black uppercase tracking-[0.14em] text-white transition hover:bg-emerald-600"
                    >
                      Share trip on WhatsApp
                    </a>
                  </div>
                )}
              </div>
            </motion.section>

            {/* SAFETY */}
            <motion.section
              variants={itemVariants}
              className="rounded-[1.75rem] border border-rose-100 bg-gradient-to-br from-rose-50 to-white p-5 shadow-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-rose-600">
                    <ShieldAlert size={17} />
                    <span className="text-[10px] font-black uppercase tracking-[0.18em]">
                      Emergency Help
                    </span>
                  </div>

                  <h3 className="mt-3 text-lg font-black">
                    Travel with confidence
                  </h3>
                </div>

                <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-rose-500" />
              </div>

              {activeCallNotice && (
                <div className="mt-4 rounded-xl bg-slate-950 px-3 py-2 text-center text-[10px] font-bold text-white">
                  {activeCallNotice}
                </div>
              )}

              <div className="mt-5 grid grid-cols-3 gap-2">
                <EmergencyButton
                  href="tel:102"
                  icon={<HeartPulse size={18} />}
                  label="Medical"
                  number="102"
                  onClick={() =>
                    triggerCallRouting("Ambulance")
                  }
                />

                <EmergencyButton
                  href="tel:02352222222"
                  icon={<ShieldAlert size={18} />}
                  label="Police"
                  number="222222"
                  onClick={() =>
                    triggerCallRouting(
                      "Ratnagiri Police HQ"
                    )
                  }
                />

                <EmergencyButton
                  href="tel:02352226247"
                  icon={<Zap size={18} />}
                  label="Disaster"
                  number="226247"
                  onClick={() =>
                    triggerCallRouting("Disaster Cell")
                  }
                />
              </div>
            </motion.section>

            {/* RENTALS */}
            <motion.section
              variants={itemVariants}
              className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center gap-2 text-orange-500">
                <Bike size={17} />
                <span className="text-[10px] font-black uppercase tracking-[0.18em]">
                  Vehicle Rentals
                </span>
              </div>

              <h3 className="mt-3 text-lg font-black">
                Ride around Ratnagiri
              </h3>

              <div className="mt-5 space-y-3">
                {RENTAL_SHOPS.map((shop) => {
                  const isExpanded =
                    expandedShopId === shop.id;

                  return (
                    <div
                      key={shop.id}
                      className="overflow-hidden rounded-2xl border border-slate-200"
                    >
                      <button
                        type="button"
                        onClick={() =>
                          setExpandedShopId(
                            isExpanded ? null : shop.id
                          )
                        }
                        className="flex w-full items-center justify-between gap-3 bg-slate-50 px-4 py-3 text-left"
                      >
                        <div>
                          <p className="text-xs font-black text-slate-900">
                            {shop.shopName}
                          </p>
                          <p className="mt-1 text-[10px] text-slate-400">
                            ★ {shop.rating} · {shop.location}
                          </p>
                        </div>

                        {isExpanded ? (
                          <ChevronUp
                            size={16}
                            className="text-slate-400"
                          />
                        ) : (
                          <ChevronDown
                            size={16}
                            className="text-slate-400"
                          />
                        )}
                      </button>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{
                              opacity: 0,
                              height: 0,
                            }}
                            animate={{
                              opacity: 1,
                              height: "auto",
                            }}
                            exit={{
                              opacity: 0,
                              height: 0,
                            }}
                            className="overflow-hidden"
                          >
                            <div className="space-y-2 p-3">
                              {shop.fleet.map((bike) => (
                                <div
                                  key={bike.bikeId}
                                  className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-3"
                                >
                                  <div>
                                    <p className="text-xs font-bold text-slate-800">
                                      {bike.icon} {bike.name}
                                    </p>
                                    <p className="mt-1 text-[10px] text-slate-400">
                                      ₹{bike.rate}/day
                                    </p>
                                  </div>

                                  <button
                                    type="button"
                                    onClick={() => {
                                      setActiveRentalSelection({
                                        shop,
                                        bike,
                                      });
                                      setRentalDays(1);
                                      setRentalSuccess(false);
                                    }}
                                    className="rounded-xl bg-slate-950 px-3 py-2 text-[9px] font-black uppercase tracking-wider text-white transition hover:bg-orange-500"
                                  >
                                    Rent
                                  </button>
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </motion.section>
          </motion.aside>
        </div>
      </main>

      {/* RENTAL MODAL */}
      <AnimatePresence>
        {activeRentalSelection && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-md"
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.97 }}
              className="relative w-full max-w-sm rounded-[1.75rem] bg-white p-6 shadow-2xl"
            >
              <button
                type="button"
                onClick={() =>
                  setActiveRentalSelection(null)
                }
                className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition hover:bg-slate-200"
              >
                <X size={16} />
              </button>

              {!rentalSuccess ? (
                <>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-orange-500">
                    <Bike size={22} />
                  </div>

                  <p className="mt-5 text-[10px] font-black uppercase tracking-[0.18em] text-orange-500">
                    Rental configuration
                  </p>

                  <h2 className="mt-2 text-2xl font-black">
                    {activeRentalSelection.bike.name}
                  </h2>

                  <p className="mt-2 text-sm text-slate-500">
                    {activeRentalSelection.shop.shopName}
                  </p>

                  <label className="mt-6 block text-[10px] font-black uppercase tracking-[0.14em] text-slate-500">
                    Number of days
                  </label>

                  <input
                    type="number"
                    min="1"
                    max="14"
                    value={rentalDays}
                    onChange={(event) =>
                      setRentalDays(
                        Math.max(
                          1,
                          parseInt(event.target.value) || 1
                        )
                      )
                    }
                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold outline-none focus:border-orange-500"
                  />

                  <div className="mt-4 rounded-2xl bg-slate-950 p-4 text-white">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-400">
                        Estimated rental
                      </span>
                      <span className="text-lg font-black text-orange-400">
                        ₹
                        {activeRentalSelection.bike.rate *
                          rentalDays}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setRentalSuccess(true)}
                    className="mt-5 w-full rounded-2xl bg-orange-500 px-4 py-3 text-[10px] font-black uppercase tracking-[0.14em] text-white transition hover:bg-orange-600"
                  >
                    Add rental to plan
                  </button>
                </>
              ) : (
                <div className="py-6 text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-500">
                    <Zap size={24} />
                  </div>

                  <h3 className="mt-5 text-xl font-black">
                    Rental added
                  </h3>

                  <p className="mt-2 text-sm text-slate-500">
                    Your route budget has been updated.
                  </p>

                  <button
                    type="button"
                    onClick={() =>
                      setActiveRentalSelection(null)
                    }
                    className="mt-6 w-full rounded-2xl bg-slate-950 px-4 py-3 text-[10px] font-black uppercase tracking-[0.14em] text-white"
                  >
                    Continue exploring
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function HeroStat({ value, label }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
      <p className="text-2xl font-black text-white">{value}</p>
      <p className="mt-1 text-[9px] font-black uppercase tracking-[0.14em] text-slate-400">
        {label}
      </p>
    </div>
  );
}

function EmergencyButton({
  href,
  icon,
  label,
  number,
  onClick,
}) {
  return (
    <a
      href={href}
      onClick={onClick}
      className="rounded-2xl border border-rose-100 bg-white px-2 py-3 text-center transition hover:-translate-y-1 hover:border-rose-200 hover:shadow-md"
    >
      <span className="mx-auto flex h-8 w-8 items-center justify-center rounded-xl bg-rose-50 text-rose-500">
        {icon}
      </span>

      <p className="mt-2 text-[10px] font-black text-slate-800">
        {label}
      </p>

      <p className="mt-1 text-[9px] text-slate-400">
        {number}
      </p>
    </a>
  );
}

export default ExplorePage;