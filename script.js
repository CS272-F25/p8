let map;
let currentHotspot = null;
const markersById = {};

// Campus hotspots with riddles.
// Each riddle is "near" a well-known UW–Madison location.
const hotspotData = [
  {
    id: "memorial_union",
    name: "Memorial Union Terrace",
    coords: [43.0766, -89.3985],
    riddle:
      "Colorful chairs face the water here. Students eat ice cream and watch the sunset over Lake Mendota. What lakeside hangout is this?",
    answers: ["memorial union", "memorial union terrace", "the terrace"],
  },
  {
    id: "bascom_hill",
    name: "Bascom Hill",
    coords: [43.0753, -89.4042],
    riddle:
      "Climb this steep green slope to find a seated president watching over campus. What famous hill is this near the top of campus?",
    answers: ["bascom hill", "bascom"],
  },
  {
    id: "camp_randall",
    name: "Camp Randall Stadium",
    coords: [43.0699, -89.4127],
    riddle:
      "On fall Saturdays, thousands jump around here in red and white. What stadium near Regent Street is this?",
    answers: ["camp randall", "camp randall stadium"],
  },
  {
    id: "college_library",
    name: "College Library",
    coords: [43.0716, -89.4019],
    riddle:
      "Open late and right next to Lake Street, this library is packed during midterms. What study spot near the southeast dorms is this?",
    answers: ["college library"],
  },
  {
    id: "union_south",
    name: "Union South",
    coords: [43.0719, -89.4076],
    riddle:
      "You can bowl, watch movies, or grab food here, just across from engineering buildings. What modern union is this on the south side of campus?",
    answers: ["union south"],
  },
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
