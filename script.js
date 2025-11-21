let map;
let currentHotspot = null;
const markersById = {};

// Campus hotspots with riddles.
// Each riddle is "near" a well-known UW–Madison location.
// All the places the riddles can point to
const hotspotData = [
  {
    id: 'memorial_union',
    name: 'Memorial Union',
    coords: [43.07625, -89.40006],
    riddle: 'Bright sunburst chairs, ice cream by the lake, and live music on warm nights. Which lakeside hangout is this?',
    acceptedAnswers: [
      'memorial union',
      'the union',
      'union',
      'memorial union terrace',
      'terrace'
    ]
  },
  {
    id: 'bascom_hill',
    name: 'Bascom Hill',
    coords: [43.0753, -89.4034],
    riddle: 'You climb me for class and sled down me in winter. Abe Lincoln watches from the top. Where are you?',
    acceptedAnswers: [
      'bascom hill',
      'bascom',
      'bascom hall',
      'the hill'
    ]
  },
  {
    id: 'union_south',
    name: 'Union South',
    coords: [43.0713, -89.4073],
    riddle: 'I’m the newer union with bowling, concerts, and late-night food, closer to Camp Randall than the lake. What building am I?',
    acceptedAnswers: [
      'union south',
      'south union'
    ]
  },
  {
    id: 'college_library',
    name: 'College Library (Helen C. White)',
    coords: [43.0762, -89.3985],
    riddle: 'Open late for cramming, I live inside a tall lakeshore building on N. Park Street. Which library is this?',
    acceptedAnswers: [
      'college library',
      'helen c white',
      'helen c. white',
      'helen c white hall'
    ]
  },
  {
    id: 'camp_randall',
    name: 'Camp Randall Stadium',
    coords: [43.0699962, -89.4126194],
    riddle: 'On game day I shake when everyone “Jump Arounds.” What famous stadium is this?',
    acceptedAnswers: [
      'camp randall',
      'camp randall stadium',
      'the stadium'
    ]
  },

  // NEW: dining halls, dorms, teaching halls

  {
    id: 'gordon_dining',
    name: 'Gordon Avenue Market (Gordon Dining & Event Center)',
    coords: [43.0715, -89.4000],
    riddle: 'So many food stations in one giant hall by the Kohl Center. You swipe in hungry and leave in a food coma. Which dining hall is this?',
    acceptedAnswers: [
      'gordon',
      'gordon dining',
      'gordon avenue market',
      'gordon dining and event center',
      'gordon dining & event center'
    ]
  },
  {
    id: 'dejope',
    name: 'Dejope Residence Hall',
    coords: [43.077791, -89.417511],
    riddle: 'My name means “four lakes,” I overlook Mendota, and I’m home to Four Lakes Market. Which lakeshore dorm is this?',
    acceptedAnswers: [
      'dejope',
      'dejope residence hall',
      'dejope hall'
    ]
  },
  {
    id: 'ogg',
    name: 'Ogg Residence Hall',
    coords: [43.070549, -89.399936],
    riddle: 'I’m a tall Southeast dorm on Dayton Street, right across from Gordon and close to State Street. Which hall am I?',
    acceptedAnswers: [
      'ogg',
      'ogg hall',
      'ogg residence hall'
    ]
  },
  {
    id: 'grainger',
    name: 'Grainger Hall (Business School)',
    coords: [43.072697, -89.401463],
    riddle: 'Group projects, case competitions, and Business Badgers everywhere. I’m the home of the business school on University Avenue. Where are you?',
    acceptedAnswers: [
      'grainger',
      'grainger hall',
      'school of business',
      'wisconsin school of business'
    ]
  },
  {
    id: 'van_vleck',
    name: 'Van Vleck Hall',
    coords: [43.074975, -89.403831],
    riddle: 'Many a calc exam has been taken in my classrooms on Bascom Hill. I’m the concrete tower of math. What building is this?',
    acceptedAnswers: [
      'van vleck',
      'van vleck hall'
    ]
  }
];


// Initialize the Leaflet map and add hotspot markers
function initMap() {
  const mapElement = document.getElementById("map");
  if (!mapElement || typeof L === "undefined") {
    // Not on the scavenger page or Leaflet not loaded
    return;
  }

  // Center roughly on UW–Madison campus
  map = L.map("map").setView([43.0766, -89.4125], 14);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "&copy; OpenStreetMap contributors",
  }).addTo(map);

  // Add markers for hotspots (with popups showing the real names)
  hotspotData.forEach((spot) => {
    const marker = L.marker(spot.coords).addTo(map);
    marker.bindPopup(`<strong>${spot.name}</strong>`);
    markersById[spot.id] = marker;
  });
}

// Pick a random hotspot and show its riddle
function pickRandomRiddle() {
  const riddleText = document.getElementById("riddle-text");
  const riddleResult = document.getElementById("riddle-result");
  const guessInput = document.getElementById("riddle-guess");

  if (!riddleText || !riddleResult || !guessInput) return;

  const randomIndex = Math.floor(Math.random() * hotspotData.length);
  currentHotspot = hotspotData[randomIndex];

  riddleText.textContent = currentHotspot.riddle;
  riddleResult.textContent = "";
  guessInput.value = "";
  guessInput.focus();
}

// Check the user's answer against the current hotspot
function handleRiddleSubmit(event) {
  event.preventDefault();

  const guessInput = document.getElementById("riddle-guess");
  const riddleResult = document.getElementById("riddle-result");

  if (!guessInput || !riddleResult) return;

  const guess = guessInput.value.trim().toLowerCase();

  if (!currentHotspot) {
    riddleResult.textContent = "No riddle loaded yet. Click 'New Riddle'.";
    riddleResult.style.color = "orange";
    return;
  }

  if (!guess) {
    riddleResult.textContent = "Type your guess before submitting.";
    riddleResult.style.color = "orange";
    return;
  }

  const isCorrect = currentHotspot.answers.some((ans) =>
    guess.includes(ans)
  );

  if (isCorrect) {
    riddleResult.textContent = `Correct! 🎉 It was ${currentHotspot.name}.`;
    riddleResult.style.color = "green";

    // Zoom the map to the hotspot and open its popup
    if (map && markersById[currentHotspot.id]) {
      map.setView(currentHotspot.coords, 17);
      markersById[currentHotspot.id].openPopup();
    }
  } else {
    riddleResult.textContent = "Not quite. Try again or ask for a new riddle!";
    riddleResult.style.color = "red";
  }
}

// Set up event listeners for the riddle form and new riddle button
function setupRiddleGame() {
  const form = document.getElementById("riddle-form");
  const newRiddleBtn = document.getElementById("new-riddle-btn");

  if (!form || !newRiddleBtn) return;

  form.addEventListener("submit", handleRiddleSubmit);
  newRiddleBtn.addEventListener("click", pickRandomRiddle);

  // Load an initial riddle when the page is ready
  pickRandomRiddle();
}

// DOMContentLoaded: init map + riddle game
document.addEventListener("DOMContentLoaded", () => {
  initMap();
  setupRiddleGame();
});
