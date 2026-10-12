export function getGoogleMapsDirectionsUrl(destination) {
  if (!destination || typeof destination !== "string") {
    throw new Error("A valid destination is required.");
  }

  const encodedDestination = encodeURIComponent(destination.trim());

  return (
    "https://www.google.com/maps/dir/?api=1" +
    `&destination=${encodedDestination}` +
    "&travelmode=driving" +
    "&dir_action=navigate"
  );
}

export function openGoogleMapsDirections(destination) {
  try {
    const mapsUrl = getGoogleMapsDirectionsUrl(destination);

    window.open(
      mapsUrl,
      "_blank",
      "noopener,noreferrer"
    );
  } catch (error) {
    console.error("Unable to open Google Maps:", error);
    alert("Google Maps could not be opened for this destination.");
  }
}