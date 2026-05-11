// City → [lat, lng] lookup. Covers every city referenced across all market entity datasets.
// Lookup key format: "City, ST" (matches Company.city + Company.state).

export const cityCoords: Record<string, [number, number]> = {
  // FMCSA carrier cities
  "Wichita, KS": [37.6872, -97.3301],
  "El Paso, TX": [31.7619, -106.4850],
  "Phoenix, AZ": [33.4484, -112.0740],
  "Albuquerque, NM": [35.0844, -106.6504],
  "Tampa, FL": [27.9506, -82.4572],
  "Houston, TX": [29.7604, -95.3698],
  "Pittsburgh, PA": [40.4406, -79.9959],
  "Dallas, TX": [32.7767, -96.7970],
  "Indianapolis, IN": [39.7684, -86.1581],
  "Reno, NV": [39.5296, -119.8138],
  "Buffalo, NY": [42.8864, -78.8784],
  "Omaha, NE": [41.2565, -95.9345],
  "Laredo, TX": [27.5306, -99.4803],
  "Memphis, TN": [35.1495, -90.0490],
  "Fresno, CA": [36.7378, -119.7871],
  "Salt Lake City, UT": [40.7608, -111.8910],
  "Atlanta, GA": [33.7490, -84.3880],
  "Baton Rouge, LA": [30.4515, -91.1871],
  "Portland, OR": [45.5152, -122.6784],
  "Newark, NJ": [40.7357, -74.1724],
  "Charlotte, NC": [35.2271, -80.8431],

  // Government contract-winner cities
  "Detroit, MI": [42.3314, -83.0458],
  "Reston, VA": [38.9586, -77.3570],
  "Chicago, IL": [41.8781, -87.6298],
  "Seattle, WA": [47.6062, -122.3321],
  "Huntsville, AL": [34.7304, -86.5861],
  "Norfolk, VA": [36.8508, -76.2859],
  "New Orleans, LA": [29.9511, -90.0715],
  "St. Louis, MO": [38.6270, -90.1994],
  "San Diego, CA": [32.7157, -117.1611],
  "Austin, TX": [30.2672, -97.7431],
  "Baltimore, MD": [39.2904, -76.6122],
  "Tucson, AZ": [32.2226, -110.9747],

  // SBA borrower cities
  "Cleveland, OH": [41.4993, -81.6944],
  "Charleston, SC": [32.7765, -79.9311],
  "Asheville, NC": [35.5951, -82.5515],
  "Madison, WI": [43.0731, -89.4012],
  "Denver, CO": [39.7392, -104.9903],
  "Sarasota, FL": [27.3364, -82.5307],
  "Plano, TX": [33.0198, -96.6989],
  "Manchester, NH": [42.9956, -71.4548],
  "San Antonio, TX": [29.4241, -98.4936],

  // Franchise operator cities
  "Boston, MA": [42.3601, -71.0589],
  "Minneapolis, MN": [44.9778, -93.2650],
  "Los Angeles, CA": [34.0522, -118.2437],
  "Nashville, TN": [36.1627, -86.7816],
  "Sacramento, CA": [38.5816, -121.4944],

  // SectorDetail / TopHiring auxiliary cities (used for cohort sample companies)
  "Long Beach, CA": [33.7701, -118.1937],
  "Channelview, TX": [29.7763, -95.1166],
  "Lake Charles, LA": [30.2266, -93.2174],
  "Midland, TX": [31.9973, -102.0779],
  "Tulsa, OK": [36.1540, -95.9928],
  "Modesto, CA": [37.6391, -120.9969],
  "Yuma, AZ": [32.6927, -114.6277],
  "Wilmington, NC": [34.2257, -77.9447],
  "Naperville, IL": [41.7508, -88.1535],
  "New York, NY": [40.7128, -74.0060],
  "Norfolk, VA (2)": [36.8508, -76.2859], // alias
  "Bethesda, MD": [38.9847, -77.0947],
  "Boise, ID": [43.6150, -116.2023],
  "Savannah, GA": [32.0809, -81.0912],
};

export function getCoords(city: string, state: string): [number, number] | null {
  const key = `${city}, ${state}`;
  return cityCoords[key] || null;
}

// Convert (lat, lng) to a unit-sphere 3D position
// Three.js coordinate system: y up, z out of screen
export function latLngToVec3(
  lat: number,
  lng: number,
  radius: number = 1
): [number, number, number] {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return [
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  ];
}
