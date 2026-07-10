export const getOpenStreetMapDirectionsUrl = (latitude, longitude) => {
  return `https://www.openstreetmap.org/directions?engine=osrm&route=;${latitude},${longitude}`;
};
