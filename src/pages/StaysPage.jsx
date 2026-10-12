import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  BedDouble,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  Compass,
  Filter,
  MapPin,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
  WalletCards,
  X,
} from "lucide-react";

const STAYS_DATA = [
  {
    id: "blue-ocean-resort",
    name: "Blue Ocean Resort & Spa",
    type: "Resort",
    location: "Ganpatipule Beachfront",
    price: 5500,
    rating: 4.8,
    amenities: ["Beach Access", "Swimming Pool", "Spa", "Free Wi-Fi"],
    image:
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=1400&auto=format&fit=crop",
    description:
      "A luxurious Portuguese-style beach resort offering premium villas directly overlooking the serene Arabian Sea landscape.",
    highlight: "Best beachfront experience",
  },
  {
    id: "kohinoor-samudra",
    name: "Kohinoor Samudra Beach Resort",
    type: "Hotel",
    location: "Bhatye Hills",
    price: 4200,
    rating: 4.6,
    amenities: ["Sunset View", "Swimming Pool", "Lounge", "Restaurant"],
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1400&auto=format&fit=crop",
    description:
      "Perched beautifully on a cliffside, offering sweeping panoramic views of Bhatye Beach and the coastline.",
    highlight: "Panoramic hilltop views",
  },
  {
    id: "ratnasagar-villa",
    name: "Ratnasagar Beach Villa",
    type: "Villa",
    location: "Bhatye Beachfront",
    price: 7500,
    rating: 4.9,
    amenities: ["Private Villa", "Coconut Grove", "Private Chef", "Laundry"],
    image:
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1400&auto=format&fit=crop",
    description:
      "An exclusive heritage-style private villa nestled inside a lush coconut plantation right next to the sand.",
    highlight: "Private coastal escape",
  },
  {
    id: "atithi-lodge",
    name: "Hotel Atithi Executive",
    type: "Hotel",
    location: "Ratnagiri City Central",
    price: 1800,
    rating: 4.3,
    amenities: ["AC Rooms", "Free Parking", "Elevator", "Room Service"],
    image:
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=1400&auto=format&fit=crop",
    description:
      "A clean and convenient city hotel located in central Ratnagiri for easy access to transport, markets and attractions.",
    highlight: "Best value in the city",
  },
];

const PROPERTY_TYPES = ["All", "Resort", "Villa", "Hotel"];

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

function getNightCount(checkInDate, checkOutDate) {
  if (!checkInDate || !checkOutDate) {
    return 1;
  }

  const checkIn = new Date(`${checkInDate}T00:00:00`);
  const checkOut = new Date(`${checkOutDate}T00:00:00`);
  const difference = checkOut.getTime() - checkIn.getTime();
  const nights = Math.ceil(difference / (1000 * 60 * 60 * 24));

  return Math.max(1, nights);
}

function formatPrice(value) {
  return new Intl.NumberFormat("en-IN").format(value);
}

function StaysPage() {
  const navigate = useNavigate();

  const [selectedType, setSelectedType] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [maximumPrice, setMaximumPrice] = useState(8000);
  const [sortBy, setSortBy] = useState("recommended");
  const [bookingStay, setBookingStay] = useState(null);
  const [detailStay, setDetailStay] = useState(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingReference, setBookingReference] = useState("");
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [guestCount, setGuestCount] = useState(2);
  const [roomCount, setRoomCount] = useState(1);
  const [guestName, setGuestName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const today = new Date().toISOString().split("T")[0];

  const filteredStays = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    const matchingStays = STAYS_DATA.filter((stay) => {
      const matchesType = selectedType === "All" || stay.type === selectedType;
      const matchesPrice = stay.price <= maximumPrice;
      const matchesSearch =
        !query ||
        stay.name.toLowerCase().includes(query) ||
        stay.location.toLowerCase().includes(query) ||
        stay.description.toLowerCase().includes(query) ||
        stay.amenities.some((amenity) => amenity.toLowerCase().includes(query));

      return matchesType && matchesPrice && matchesSearch;
    });

    return [...matchingStays].sort((firstStay, secondStay) => {
      if (sortBy === "price-low") {
        return firstStay.price - secondStay.price;
      }

      if (sortBy === "price-high") {
        return secondStay.price - firstStay.price;
      }

      if (sortBy === "rating") {
        return secondStay.rating - firstStay.rating;
      }

      return secondStay.rating - firstStay.rating;
    });
  }, [maximumPrice, searchQuery, selectedType, sortBy]);

  const averageRating = (
    STAYS_DATA.reduce((total, stay) => total + stay.rating, 0) / STAYS_DATA.length
  ).toFixed(1);

  const nightsCount = getNightCount(checkInDate, checkOutDate);
  const bookingTotal = bookingStay
    ? bookingStay.price * nightsCount * roomCount
    : 0;

  function openBooking(stay) {
    setBookingStay(stay);
    setDetailStay(null);
    setBookingSuccess(false);
    setBookingReference("");
    setCheckInDate("");
    setCheckOutDate("");
    setGuestCount(2);
    setRoomCount(1);
    setGuestName("");
    setPhoneNumber("");
  }

  function closeBooking() {
    setBookingStay(null);
    setBookingSuccess(false);
  }

  function handleBooking(event) {
    event.preventDefault();

    if (!bookingStay) {
      return;
    }

    if (checkOutDate <= checkInDate) {
      window.alert("Check-out date must be after the check-in date.");
      return;
    }

    const reference = `RTG-${bookingStay.id
      .replaceAll("-", "")
      .slice(0, 6)
      .toUpperCase()}-${Date.now().toString().slice(-6)}`;

    setBookingReference(reference);
    setBookingSuccess(true);
  }

  return (
    <div className="min-h-screen bg-[#f5f6f8] text-slate-900">
      {/* NAVBAR */}
      <motion.nav
        initial={{ opacity: 0, y: -60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="sticky top-0 z-50 border-b border-white/70 bg-white/85 backdrop-blur-2xl"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => navigate("/explore")}
              className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-600 transition hover:border-orange-200 hover:bg-orange-50 hover:text-orange-600"
              aria-label="Back to Explore"
            >
              <ArrowLeft size={18} />
            </button>

            <Link to="/" className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-lg">
                <Compass size={20} />
              </span>

              <span className="text-lg font-black tracking-tight">
                Ratnagiri <span className="text-orange-500">Stays</span>
              </span>
            </Link>
          </div>

          <div className="hidden items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-[10px] font-black uppercase tracking-[0.14em] text-slate-500 sm:flex">
            <MapPin size={14} className="text-orange-500" />
            Ratnagiri accommodation
          </div>
        </div>
      </motion.nav>

      <main className="mx-auto max-w-7xl px-4 pb-24 pt-6 sm:px-6 lg:px-8">
        {/* HERO */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative overflow-hidden rounded-[2rem] bg-slate-950 text-white shadow-2xl shadow-slate-900/10"
        >
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=1900&auto=format&fit=crop"
              alt="Luxury coastal stay"
              className="h-full w-full object-cover opacity-35"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-950/35" />
          </div>

          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-orange-500/20 blur-3xl" />
          <div className="absolute -bottom-28 left-1/3 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" />

          <div className="relative grid gap-10 px-6 py-10 sm:px-10 sm:py-14 lg:grid-cols-[1.15fr_0.85fr] lg:px-14 lg:py-16">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-orange-200 backdrop-blur">
                <Sparkles size={14} />
                Premium Konkan stays
              </div>

              <h1 className="mt-6 max-w-3xl text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
                Stay beside the{" "}
                <span className="text-orange-400">Konkan coast.</span>
              </h1>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                Compare beach resorts, private villas and comfortable city hotels.
                Find the right stay for your Ratnagiri journey and reserve it in a
                few simple steps.
              </p>

              <div className="mt-8 grid max-w-2xl grid-cols-3 gap-3">
                <HeroStat value={STAYS_DATA.length} label="Featured stays" />
                <HeroStat value={PROPERTY_TYPES.length - 1} label="Property types" />
                <HeroStat value={averageRating} label="Average rating" />
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
                    Find your stay
                  </p>
                  <p className="mt-1 text-sm font-bold">Search by property or location</p>
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
                  placeholder="Search resort, villa or location..."
                  className="w-full rounded-2xl border border-white/10 bg-slate-950/70 py-4 pl-11 pr-4 text-sm text-white outline-none placeholder:text-slate-500 focus:border-orange-400"
                />
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {PROPERTY_TYPES.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setSelectedType(type)}
                    className={`rounded-full px-3 py-2 text-[9px] font-black uppercase tracking-[0.14em] transition ${
                      selectedType === type
                        ? "bg-orange-500 text-white"
                        : "border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* FILTER BAR */}
        <section className="mt-8 rounded-[1.75rem] border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
          <div className="grid gap-5 lg:grid-cols-[1fr_1fr_auto] lg:items-end">
            <div>
              <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.16em] text-slate-500">
                <WalletCards size={15} className="text-orange-500" />
                Maximum price per night
              </label>

              <div className="mt-3 flex items-center gap-4">
                <input
                  type="range"
                  min="1800"
                  max="8000"
                  step="100"
                  value={maximumPrice}
                  onChange={(event) => setMaximumPrice(Number(event.target.value))}
                  className="w-full accent-orange-500"
                />
                <span className="min-w-[92px] rounded-xl bg-slate-950 px-3 py-2 text-center text-xs font-black text-white">
                  ₹{formatPrice(maximumPrice)}
                </span>
              </div>
            </div>

            <div>
              <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.16em] text-slate-500">
                <Filter size={15} className="text-orange-500" />
                Sort properties
              </label>

              <div className="relative mt-3">
                <select
                  value={sortBy}
                  onChange={(event) => setSortBy(event.target.value)}
                  className="w-full appearance-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 pr-10 text-xs font-bold text-slate-700 outline-none focus:border-orange-400"
                >
                  <option value="recommended">Recommended</option>
                  <option value="rating">Highest rated</option>
                  <option value="price-low">Price: low to high</option>
                  <option value="price-high">Price: high to low</option>
                </select>
                <ChevronDown
                  size={16}
                  className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                />
              </div>
            </div>

            <div className="rounded-2xl bg-orange-50 px-5 py-3 text-center">
              <p className="text-2xl font-black text-orange-500">{filteredStays.length}</p>
              <p className="text-[9px] font-black uppercase tracking-[0.14em] text-orange-700">
                Stays found
              </p>
            </div>
          </div>
        </section>

        {/* SECTION TITLE */}
        <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-orange-500">
              Handpicked accommodation
            </p>
            <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
              Choose your coastal stay
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500">
              Review amenities, compare prices and reserve the property that fits
              your trip.
            </p>
          </div>
        </div>

        {/* PROPERTY GRID */}
        <motion.div
          key={`${selectedType}-${searchQuery}-${maximumPrice}-${sortBy}`}
          initial="hidden"
          animate="visible"
          className="mt-8 grid gap-7 md:grid-cols-2"
        >
          <AnimatePresence mode="popLayout">
            {filteredStays.map((stay) => (
              <motion.article
                key={stay.id}
                layout
                variants={cardVariants}
                exit={{ opacity: 0, scale: 0.96 }}
                whileHover={{ y: -8 }}
                className="group overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-white shadow-sm transition hover:border-orange-200 hover:shadow-2xl hover:shadow-slate-900/10"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <img
                    src={stay.image}
                    alt={stay.name}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/5 to-transparent" />

                  <div className="absolute left-4 top-4 flex items-center gap-2">
                    <span className="rounded-full bg-white/90 px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.15em] text-slate-800 backdrop-blur">
                      {stay.type}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-slate-950/70 px-3 py-1.5 text-[10px] font-black text-white backdrop-blur">
                      <Star size={12} fill="currentColor" className="text-amber-400" />
                      {stay.rating}
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <p className="inline-flex items-center gap-1.5 text-xs text-slate-200">
                      <MapPin size={14} />
                      {stay.location}
                    </p>
                    <p className="mt-2 text-sm font-bold">{stay.highlight}</p>
                  </div>
                </div>

                <div className="p-5 sm:p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-black tracking-tight text-slate-950">
                        {stay.name}
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-slate-500">
                        {stay.description}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {stay.amenities.map((amenity) => (
                      <span
                        key={amenity}
                        className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[9px] font-bold text-slate-600"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 flex flex-col gap-4 border-t border-slate-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-[9px] font-black uppercase tracking-[0.15em] text-slate-400">
                        Price per night
                      </p>
                      <p className="mt-1 text-2xl font-black text-slate-950">
                        ₹{formatPrice(stay.price)}
                        <span className="ml-1 text-xs font-semibold text-slate-400">/ night</span>
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 sm:min-w-[270px]">
                      <button
                        type="button"
                        onClick={() => setDetailStay(stay)}
                        className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-[10px] font-black uppercase tracking-[0.13em] text-slate-700 transition hover:border-orange-200 hover:bg-orange-50 hover:text-orange-600"
                      >
                        View details
                      </button>

                      <button
                        type="button"
                        onClick={() => openBooking(stay)}
                        className="group/button inline-flex items-center justify-center gap-2 rounded-2xl bg-orange-500 px-4 py-3 text-[10px] font-black uppercase tracking-[0.13em] text-white transition hover:bg-orange-600"
                      >
                        Reserve stay
                        <ArrowRight
                          size={14}
                          className="transition group-hover/button:translate-x-1"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>

          {filteredStays.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="md:col-span-2 rounded-[1.75rem] border border-dashed border-slate-300 bg-white px-6 py-20 text-center"
            >
              <Search size={30} className="mx-auto text-slate-300" />
              <h3 className="mt-5 text-xl font-black">No stays found</h3>
              <p className="mt-2 text-sm text-slate-400">
                Increase the price range or try another property type.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedType("All");
                  setSearchQuery("");
                  setMaximumPrice(8000);
                }}
                className="mt-6 rounded-2xl bg-slate-950 px-5 py-3 text-[10px] font-black uppercase tracking-[0.14em] text-white"
              >
                Reset filters
              </button>
            </motion.div>
          )}
        </motion.div>

        {/* TRUST STRIP */}
        <section className="mt-12 grid gap-4 sm:grid-cols-3">
          <TrustCard
            icon={<ShieldCheck size={21} />}
            title="Verified information"
            text="Clear property details, amenities and prices in one place."
          />
          <TrustCard
            icon={<CalendarDays size={21} />}
            title="Simple reservation"
            text="Select dates, rooms and travellers using a clean booking form."
          />
          <TrustCard
            icon={<BedDouble size={21} />}
            title="Flexible choices"
            text="Compare resorts, villas and hotels for different budgets."
          />
        </section>
      </main>

      {/* DETAILS MODAL */}
      <AnimatePresence>
        {detailStay && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/65 p-4 backdrop-blur-md"
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.97 }}
              className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-[2rem] bg-white shadow-2xl"
            >
              <div className="relative h-64 overflow-hidden rounded-t-[2rem]">
                <img
                  src={detailStay.image}
                  alt={detailStay.name}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
                <button
                  type="button"
                  onClick={() => setDetailStay(null)}
                  className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-slate-700 backdrop-blur"
                >
                  <X size={17} />
                </button>
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-orange-300">
                    {detailStay.type}
                  </p>
                  <h2 className="mt-2 text-3xl font-black">{detailStay.name}</h2>
                  <p className="mt-2 flex items-center gap-2 text-sm text-slate-200">
                    <MapPin size={15} />
                    {detailStay.location}
                  </p>
                </div>
              </div>

              <div className="p-6 sm:p-8">
                <div className="flex items-center justify-between gap-4">
                  <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-2 text-xs font-black text-amber-700">
                    <Star size={14} fill="currentColor" />
                    {detailStay.rating} rating
                  </div>
                  <p className="text-2xl font-black">
                    ₹{formatPrice(detailStay.price)}
                    <span className="ml-1 text-xs font-semibold text-slate-400">/ night</span>
                  </p>
                </div>

                <p className="mt-6 text-sm leading-7 text-slate-500">
                  {detailStay.description}
                </p>

                <div className="mt-6">
                  <p className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-400">
                    Included amenities
                  </p>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    {detailStay.amenities.map((amenity) => (
                      <div
                        key={amenity}
                        className="flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3 text-sm font-bold text-slate-700"
                      >
                        <CheckCircle2 size={17} className="text-emerald-500" />
                        {amenity}
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => openBooking(detailStay)}
                  className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-orange-500 px-5 py-4 text-[10px] font-black uppercase tracking-[0.14em] text-white transition hover:bg-orange-600"
                >
                  Reserve this stay
                  <ArrowRight size={15} />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* BOOKING MODAL */}
      <AnimatePresence>
        {bookingStay && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-md"
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.97 }}
              className="relative max-h-[92vh] w-full max-w-xl overflow-y-auto rounded-[2rem] bg-white p-6 shadow-2xl sm:p-8"
            >
              <button
                type="button"
                onClick={closeBooking}
                className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition hover:bg-slate-200"
              >
                <X size={17} />
              </button>

              {!bookingSuccess ? (
                <form onSubmit={handleBooking}>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-orange-500">
                    <BedDouble size={22} />
                  </div>

                  <p className="mt-5 text-[10px] font-black uppercase tracking-[0.18em] text-orange-500">
                    Stay reservation
                  </p>
                  <h2 className="mt-2 pr-12 text-2xl font-black">{bookingStay.name}</h2>
                  <p className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                    <MapPin size={14} />
                    {bookingStay.location}
                  </p>

                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    <InputField label="Guest name">
                      <input
                        type="text"
                        value={guestName}
                        onChange={(event) => setGuestName(event.target.value)}
                        placeholder="Enter full name"
                        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-orange-500"
                        required
                      />
                    </InputField>

                    <InputField label="Phone number">
                      <input
                        type="tel"
                        value={phoneNumber}
                        onChange={(event) => setPhoneNumber(event.target.value)}
                        placeholder="Enter mobile number"
                        pattern="[0-9]{10}"
                        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-orange-500"
                        required
                      />
                    </InputField>

                    <InputField label="Check-in date">
                      <input
                        type="date"
                        min={today}
                        value={checkInDate}
                        onChange={(event) => setCheckInDate(event.target.value)}
                        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-orange-500"
                        required
                      />
                    </InputField>

                    <InputField label="Check-out date">
                      <input
                        type="date"
                        min={checkInDate || today}
                        value={checkOutDate}
                        onChange={(event) => setCheckOutDate(event.target.value)}
                        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-orange-500"
                        required
                      />
                    </InputField>

                    <InputField label="Guests">
                      <input
                        type="number"
                        min="1"
                        max="12"
                        value={guestCount}
                        onChange={(event) =>
                          setGuestCount(Math.max(1, Number(event.target.value) || 1))
                        }
                        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-orange-500"
                        required
                      />
                    </InputField>

                    <InputField label="Rooms">
                      <input
                        type="number"
                        min="1"
                        max="5"
                        value={roomCount}
                        onChange={(event) =>
                          setRoomCount(Math.max(1, Number(event.target.value) || 1))
                        }
                        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-orange-500"
                        required
                      />
                    </InputField>
                  </div>

                  <div className="mt-6 rounded-[1.5rem] bg-slate-950 p-5 text-white">
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span>₹{formatPrice(bookingStay.price)} × {nightsCount} night(s)</span>
                      <span>{roomCount} room(s)</span>
                    </div>
                    <div className="mt-4 flex items-end justify-between border-t border-white/10 pt-4">
                      <div>
                        <p className="text-[9px] font-black uppercase tracking-[0.16em] text-slate-500">
                          Estimated total
                        </p>
                        <p className="mt-1 text-3xl font-black text-orange-400">
                          ₹{formatPrice(bookingTotal)}
                        </p>
                      </div>
                      <p className="text-xs text-slate-400">Taxes excluded</p>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-orange-500 px-5 py-4 text-[10px] font-black uppercase tracking-[0.14em] text-white transition hover:bg-orange-600"
                  >
                    Confirm reservation
                    <ArrowRight size={15} />
                  </button>

                  <p className="mt-3 text-center text-[10px] leading-5 text-slate-400">
                    This is a demo reservation flow. Connect your backend and payment
                    system before accepting real bookings.
                  </p>
                </form>
              ) : (
                <div className="py-5 text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-500">
                    <CheckCircle2 size={30} />
                  </div>

                  <p className="mt-6 text-[10px] font-black uppercase tracking-[0.18em] text-emerald-600">
                    Reservation created
                  </p>
                  <h3 className="mt-2 text-2xl font-black">Your stay is reserved</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-500">
                    {guestName}, your demo reservation for {bookingStay.name} has been
                    registered successfully.
                  </p>

                  <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-left">
                    <InfoRow label="Reference" value={bookingReference} />
                    <InfoRow label="Dates" value={`${checkInDate} to ${checkOutDate}`} />
                    <InfoRow label="Guests" value={`${guestCount} guest(s)`} />
                    <InfoRow label="Rooms" value={`${roomCount} room(s)`} />
                    <InfoRow label="Estimated total" value={`₹${formatPrice(bookingTotal)}`} />
                  </div>

                  <button
                    type="button"
                    onClick={closeBooking}
                    className="mt-6 w-full rounded-2xl bg-slate-950 px-5 py-4 text-[10px] font-black uppercase tracking-[0.14em] text-white transition hover:bg-slate-800"
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

function TrustCard({ icon, title, text }) {
  return (
    <div className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-50 text-orange-500">
        {icon}
      </div>
      <h3 className="mt-4 text-base font-black">{title}</h3>
      <p className="mt-2 text-xs leading-6 text-slate-500">{text}</p>
    </div>
  );
}

function InputField({ label, children }) {
  return (
    <label className="block">
      <span className="mb-2 block text-[10px] font-black uppercase tracking-[0.14em] text-slate-500">
        {label}
      </span>
      {children}
    </label>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-slate-200 py-2.5 last:border-b-0">
      <span className="text-xs font-semibold text-slate-500">{label}</span>
      <span className="text-right text-xs font-black text-slate-800">{value}</span>
    </div>
  );
}

export default StaysPage;