let map;
let currentHotspot = null;
const markersById = {};

// Campus hotspots with riddles.
// Each riddle is "near" a well-known UW–Madison location.
// All the places the riddles can point to

const santaPresents = [
  "a cozy Badgers hoodie",
  "a box of chocolates",
  "a surprise Amazon gift card",
  "a warm winter scarf",
  "a shiny new water bottle",
  "a pair of fuzzy socks",
  "a mystery wrapped gift from Santa"
];


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
    coords: [43.075172137710446, -89.402481812244],
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
    coords: [43.0719305367149, -89.40794722416881],
    riddle: 'I’m the newer union with bowling, concerts, and late-night food, closer to Camp Randall than the lake. What building am I?',
    acceptedAnswers: [
      'union south',
      'south union'
    ]
  },
  {
    id: 'college_library',
    name: 'College Library (Helen C. White)',
    coords: [43.07673156430469, -89.40138343627987],
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
    coords: [43.071177830070994, -89.39834000485139],
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
    coords: [43.07478540420711, -89.4050098911146],
    riddle: 'Many a calc exam has been taken in my classrooms on Bascom Hill. I’m the concrete tower of math. What building is this?',
    acceptedAnswers: [
      'van vleck',
      'van vleck hall'
    ]
  },
  {
    id: 'memorial_library',
    name: 'Memorial Library',
    coords: [43.07536615440875, -89.39797338321374],
    riddle: 'Quiet floors, research desks, and endless books just off State Street. Which main campus library is this?',
    acceptedAnswers: [
      'memorial library',
      'memorial',
      'mem lib'
    ]
  },
  {
    id: 'steenbock',
    name: 'Steenbock Library',
    coords: [43.076094619083634, -89.41339863724043],
    riddle: 'Engineering, agriculture, and science students study here near Babcock Drive. Which library is this?',
    acceptedAnswers: [
      'steenbock',
      'steenbock library'
    ]
  },
  {
    id: 'humanities',
    name: 'Humanities Building',
    coords: [43.0735, -89.4050],
    riddle: 'Huge lectures, philosophy exams, and long hallways. Many gen-eds meet here on Bascom Hill. What building is this?',
    acceptedAnswers: [
      'humanities',
      'humanities building'
    ]
  },
  {
    id: 'ingraham',
    name: 'Ingraham Hall',
    coords: [43.075460266181615, -89.40525153568136],
    riddle: 'Languages, writing classes, and large lecture rooms near Van Vleck. What hall is this?',
    acceptedAnswers: [
      'ingraham',
      'ingraham hall'
    ]
  },
  {
    id: 'van_hise',
    name: 'Van Hise Hall',
    coords: [43.075593703888735, -89.40701943993193],
    riddle: 'One of the tallest academic buildings on campus with many numbered lecture halls. What building is this?',
    acceptedAnswers: [
      'van hise',
      'van hise hall'
    ]
  },
  {
    id: 'engineering_hall',
    name: 'Engineering Hall',
    coords: [43.071692266239616, -89.41021823507864],
    riddle: 'Design labs, problem sets, and late nights for engineers near Randall Avenue. What building is this?',
    acceptedAnswers: [
      'engineering hall',
      'engineering'
    ]
  },
  {
    id: 'chemistry',
    name: 'Chemistry Building',
    coords: [43.07272866958054, -89.40480762014779],
    riddle: 'Labs, goggles, and reactions everywhere near Bascom Hill. What building is this?',
    acceptedAnswers: [
      'chemistry',
      'chemistry building'
    ]
  },
  {
    id: 'sellery',
    name: 'Sellery Residence Hall',
    coords: [43.07153835299818, -89.40034093276036],
    riddle: 'Known for its social scene and Southeast location near State Street. Which dorm is this?',
    acceptedAnswers: [
      'sellery',
      'sellery hall',
      'sellery residence hall'
    ]
  },
  {
    id: 'witte',
    name: 'Witte Residence Hall',
    coords: [43.071659833065496, -89.39703108686908],
    riddle: 'A loud, social dorm right by Gordon and the Kohl Center. Which hall is this?',
    acceptedAnswers: [
      'witte',
      'witte hall',
      'witte residence hall'
    ]
  },
  {
    id: 'state_street',
    name: 'State Street',
    coords: [43.07487563095516, -89.39464242158978],
    riddle: 'Connecting campus to the Capitol, full of food, shops, and students. What street is this?',
    acceptedAnswers: [
      'state street',
      'state st'
    ]
  },
  {
    id: 'allen_fieldhouse',
    name: 'Allen Centennial Gardens',
    coords: [43.076906962721885, -89.41342129400194],
    riddle: 'A peaceful garden escape near engineering buildings. What place is this?',
    acceptedAnswers: [
      'allen gardens',
      'allen centennial gardens',
      'centennial gardens'
    ]
  },
  {
    id: 'kohl_center',
    name: 'Kohl Center',
    coords: [43.06938458111083, -89.39671664937482],
    riddle: 'Basketball games, concerts, commencement, and huge crowds on Dayton Street. What arena is this?',
    acceptedAnswers: [
      'kohl center',
      'kohl',
      'the kohl'
    ]
  },
  {
    id: 'nick',
    name: 'Nicholas Recreation Center (The Nick)',
    coords: [43.070529910390135, -89.39844620954955],
    riddle: 'Weights, courts, cardio machines, and packed evenings near Camp Randall. What campus gym is this?',
    acceptedAnswers: [
      'nick',
      'the nick',
      'nicholas recreation center',
      'nicholas rec center'
    ]
  },
  {
    id: 'capitol',
    name: 'Wisconsin State Capitol',
    coords: [43.074679767568014, -89.38417916432935],
    riddle: 'The domed building at the end of State Street where laws are made and graduation photos are taken. What is this?',
    acceptedAnswers: [
      'capitol',
      'state capitol',
      'wisconsin state capitol'
    ]
  },
  {
    id: 'monona_terrace',
    name: 'Monona Terrace',
    coords: [43.071749468798636, -89.38040305921868],
    riddle: 'A lakeside convention center designed by Frank Lloyd Wright near downtown Madison. What place is this?',
    acceptedAnswers: [
      'monona terrace',
      'terrace'
    ]
  },
  {
    id: 'lake_mendota',
    name: 'Lake Mendota',
    coords: [43.10850563939696, -89.41823833292923],
    riddle: 'Frozen walks in winter, sunsets in summer, and lakeshore paths near Dejope. Which lake is this?',
    acceptedAnswers: [
      'lake mendota',
      'mendota'
    ]
  },
  {
    id: 'lakeshore_path',
    name: 'Lakeshore Path',
    coords: [43.07758195627801, -89.40654112660526],
    riddle: 'A scenic walking and biking path along the lake behind residence halls. What path is this?',
    acceptedAnswers: [
      'lakeshore path',
      'lakeshore',
      'lakeshore trail'
    ]
  },
  {
    id: 'bakke',
    name: 'Bakke Recreation & Wellbeing Center',
    coords: [43.077100333285436, -89.42021421835665],
    riddle: 'Climbing walls, pools, fitness classes, and lake views on the west side of campus. What massive rec center is this?',
    acceptedAnswers: [
      'bakke',
      'bakke recreation',
      'bakke recreation center',
      'bakke wellbeing center',
      'bakke recreation and wellbeing center'
    ]
  },
  {
    id: 'lake_monona',
    name: 'Lake Monona',
    coords: [43.06795014295759, -89.36124675789155],
    riddle: 'A scenic lake south of campus with bike paths, sunsets, and views of the Capitol across the water. Which lake is this?',
    acceptedAnswers: [
      'lake monona',
      'monona'
    ]
  },
  {
    id: 'dane_county_airport',
    name: 'Dane County Regional Airport (MSN)',
    coords: [43.1399, -89.3375],
    riddle: 'Madison’s main airport north of the city, where students fly home for breaks and study abroad. What airport is this?',
    acceptedAnswers: [
      'dane county airport',
      'dane county regional airport',
      'msn airport',
      'msn'
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

  if (!guessInput || !riddleResult || !currentHotspot) return;

  const guess = guessInput.value.trim().toLowerCase();

  if (!guess) {
    riddleResult.textContent = "Type your guess before submitting.";
    riddleResult.style.color = "orange";
    return;
  }

  const isCorrect = currentHotspot.acceptedAnswers.some((ans) =>
    guess.includes(ans)
  );

  if (isCorrect) {
    // Clear inline message
    riddleResult.textContent = "";
    
    // Zoom map
    if (map && markersById[currentHotspot.id]) {
      map.setView(currentHotspot.coords, 17);
      markersById[currentHotspot.id].openPopup();
    }

    // Show modal with random present
    const present = getRandomPresent();
    document.getElementById("present-text").textContent =
      `Congratulations! 🎉 You found ${present} hidden by Santa at ${currentHotspot.name}!`;

    const modal = new bootstrap.Modal(
      document.getElementById("successModal")
    );
    modal.show();
  } else {
    // WRONG guess feedback (stays until correct)
    riddleResult.textContent = "❌ Incorrect guess. Try again!";
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

function getRandomPresent() {
  return santaPresents[Math.floor(Math.random() * santaPresents.length)];
}

document.addEventListener("DOMContentLoaded", () => {
  const continueBtn = document.getElementById("continue-btn");

  if (continueBtn) {
    continueBtn.addEventListener("click", () => {
      const modalEl = document.getElementById("successModal");
      const modal = bootstrap.Modal.getInstance(modalEl);
      modal.hide();

      pickRandomRiddle(); // go back to original screen
      if (map) map.setView([43.0766, -89.4125], 14);
    });
  }
});

// DOMContentLoaded: init map + riddle game
document.addEventListener("DOMContentLoaded", () => {
  initMap();
  setupRiddleGame();
});
