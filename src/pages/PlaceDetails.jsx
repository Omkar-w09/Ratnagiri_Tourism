import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getPlaceDetails } from "../data/placeDetails";

function PlaceDetails() {
  const navigate = useNavigate();
  const { placeId } = useParams();

  const place = getPlaceDetails(placeId);

  const openMaps = () => {
    if (!place?.mapsUrl) {
      return;
    }

    window.open(
      place.mapsUrl,
      "_blank",
      "noopener,noreferrer"
    );
  };

  if (!place) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6">
        <div className="max-w-lg text-center">
          <p className="text-orange-400 text-xs font-black uppercase tracking-[0.25em]">
            Destination Not Found
          </p>

          <h1 className="mt-4 text-4xl font-black">
            This place is not available.
          </h1>

          <p className="mt-4 text-slate-400 leading-relaxed">
            The destination link may be incorrect or this place has not been
            added yet.
          </p>

          <Link
            to="/explore"
            className="inline-block mt-8 bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-xl text-sm font-black uppercase tracking-wider"
          >
            Back to Explore
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800">
      {/* TOP NAVIGATION */}
      <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-black uppercase tracking-wider"
          >
            ← Back
          </button>

          <Link
            to="/"
            className="font-black text-slate-900 uppercase tracking-tight"
          >
            Ratnagiri{" "}
            <span className="text-orange-500 normal-case">
              Tourism
            </span>
          </Link>

          <button
            type="button"
            onClick={openMaps}
            className="px-4 py-2 rounded-lg bg-slate-900 hover:bg-orange-500 text-white text-xs font-black uppercase tracking-wider"
          >
            🧭 Navigate
          </button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative min-h-[62vh] bg-slate-950 overflow-hidden">
        <img
          src={place.heroImage}
          alt={place.name}
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/30 via-slate-950/50 to-slate-950" />

        <div className="relative max-w-7xl mx-auto min-h-[62vh] px-5 sm:px-8 pb-14 pt-28 flex flex-col justify-end text-white">
          <span className="w-fit px-4 py-2 rounded-full bg-orange-500/15 border border-orange-400/30 text-orange-300 text-[10px] font-black uppercase tracking-[0.2em]">
            {place.category}
          </span>

          <h1 className="mt-5 max-w-5xl text-4xl sm:text-6xl lg:text-7xl font-black leading-tight">
            {place.name}
          </h1>

          <p className="mt-4 text-sm sm:text-base text-slate-200">
            📍 {place.location}
          </p>

          <p className="mt-6 max-w-3xl text-sm sm:text-base leading-8 text-slate-300">
            {place.overview}
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={openMaps}
              className="bg-orange-500 hover:bg-orange-600 px-7 py-4 rounded-xl text-xs font-black uppercase tracking-wider"
            >
              🧭 Navigate with Google Maps
            </button>

            <Link
              to="/explore"
              className="border border-white/20 bg-white/10 hover:bg-white hover:text-slate-950 px-7 py-4 rounded-xl text-xs font-black uppercase tracking-wider text-center"
            >
              Explore Other Places
            </Link>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {/* QUICK FACTS */}
        <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <QuickFact
            icon="🕒"
            label="Opening Hours"
            value={place.quickFacts.openingHours}
          />

          <QuickFact
            icon="🎟️"
            label="Entry Fee"
            value={place.quickFacts.entryFee}
          />

          <QuickFact
            icon="🌤️"
            label="Best Time"
            value={place.quickFacts.bestTime}
          />

          <QuickFact
            icon="⏳"
            label="Recommended Duration"
            value={place.quickFacts.duration}
          />
        </section>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8">
          {/* MAIN CONTENT */}
          <div className="space-y-8">
            <ContentCard title={`What is ${place.shortName}?`}>
              <p>{place.overview}</p>
            </ContentCard>

            <ContentCard title={`History of ${place.shortName}`}>
              <p>{place.history}</p>
            </ContentCard>

            <ContentCard title="Surroundings and Local Setting">
              <p>{place.surroundings}</p>
            </ContentCard>

            {place.sections.map((section) => (
              <ContentCard
                key={section.title}
                title={section.title}
              >
                <p>{section.content}</p>
              </ContentCard>
            ))}

            <ContentCard title="How to Reach">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <TravelBox
                  title="By Road"
                  text={place.howToReach.road}
                />

                <TravelBox
                  title="By Rail"
                  text={place.howToReach.rail}
                />

                <TravelBox
                  title="Local Travel"
                  text={place.howToReach.local}
                />
              </div>
            </ContentCard>

            <ContentCard title="Important Visitor Instructions">
              <ul className="space-y-3">
                {place.visitorTips.map((tip) => (
                  <li
                    key={tip}
                    className="flex gap-3"
                  >
                    <span className="text-emerald-600 font-black">
                      ✓
                    </span>

                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </ContentCard>

            <section className="rounded-2xl border border-amber-200 bg-amber-50 p-6 sm:p-8">
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-amber-700">
                Timing and Fee Verification
              </p>

              <p className="mt-3 text-sm leading-7 text-amber-900">
                {place.verificationNote}
              </p>
            </section>
          </div>

          {/* SIDEBAR */}
          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <SidebarCard title="Top Highlights">
              <ul className="space-y-3">
                {place.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="rounded-xl bg-slate-50 border border-slate-100 px-4 py-3 text-sm font-semibold"
                  >
                    ✓ {highlight}
                  </li>
                ))}
              </ul>
            </SidebarCard>

            <SidebarCard title="Nearby Places">
              <ul className="space-y-3">
                {place.nearbyPlaces.map((nearby) => (
                  <li
                    key={nearby}
                    className="border-b border-slate-100 pb-3 text-sm font-medium"
                  >
                    📍 {nearby}
                  </li>
                ))}
              </ul>
            </SidebarCard>

            <section className="rounded-2xl bg-slate-950 p-6 text-white shadow-lg">
              <h2 className="text-lg font-black">
                Official Information Sources
              </h2>

              <div className="mt-5 space-y-3">
                {place.sources.map((source) => (
                  <a
                    key={source.url}
                    href={source.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between gap-3 rounded-xl bg-white/5 hover:bg-white/10 px-4 py-3 text-sm text-slate-200"
                  >
                    <span>{source.label}</span>
                    <span>↗</span>
                  </a>
                ))}
              </div>
            </section>

            <button
              type="button"
              onClick={openMaps}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-xl text-xs font-black uppercase tracking-wider shadow-lg"
            >
              🧭 Start Navigation
            </button>
          </aside>
        </div>
      </main>
    </div>
  );
}

function QuickFact({
  icon,
  label,
  value,
}) {
  return (
    <article className="rounded-2xl bg-white border border-slate-200 p-6 shadow-sm">
      <div className="text-2xl">
        {icon}
      </div>

      <p className="mt-4 text-[10px] font-black uppercase tracking-[0.17em] text-slate-400">
        {label}
      </p>

      <p className="mt-2 text-sm font-bold leading-6 text-slate-800">
        {value}
      </p>
    </article>
  );
}

function ContentCard({
  title,
  children,
}) {
  return (
    <section className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 shadow-sm">
      <h2 className="text-2xl font-black text-slate-900">
        {title}
      </h2>

      <div className="mt-5 text-sm sm:text-[15px] leading-8 text-slate-600">
        {children}
      </div>
    </section>
  );
}

function TravelBox({
  title,
  text,
}) {
  return (
    <article className="rounded-xl bg-slate-50 border border-slate-100 p-5">
      <h3 className="font-black text-slate-900">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-7 text-slate-600">
        {text}
      </p>
    </article>
  );
}

function SidebarCard({
  title,
  children,
}) {
  return (
    <section className="rounded-2xl bg-white border border-slate-200 p-6 shadow-sm">
      <h2 className="text-lg font-black text-slate-900">
        {title}
      </h2>

      <div className="mt-5">
        {children}
      </div>
    </section>
  );
}

export default PlaceDetails;