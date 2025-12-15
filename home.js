// List of Christmas songs to recommend to the users for the home page
const songs = [
  { title: "All I Want For Christmas Is You", artist: "Mariah Carey" },
  { title: "Jingle Bell Rock", artist: "Bobby Helms" },
  { title: "Last Christmas Cover", artist: "BLACKPINK" },
  { title: "Feliz Navidad", artist: "José Feliciano" },
  { title: "Rockin' Around the Christmas Tree", artist: "Brenda Lee" },
  { title: "It's Beginning to Look a Lot Like Christmas", artist: "Michael Bublé" },
  { title: "Santa Tell Me", artist: "Ariana Grande" },
  { title: "Christmas Without You Cover", artist: "BABYMONSTER"},
  { title: "Beautiful Christmas", artist: "Red Velvet X aespa"},
  { title: "Mistletoe", artist: "Justin Bieber"},
  { title: "Under the Mistletoe", artist: "Kelly Clarkson X Brett Eldredge"},
  { title: "Carol of the Bells Cover", artist: "Lindsey Stirling"},
  { title: "Christmas EveL", artist: "Stray Kids"},
  { title: "Snowman", artist: "Sia"},
  { title: "Cozy Little Christmas", artist: "Katy Perry"},
  { title: "Christmas Tree Farm", artist: "Taylor Swift"},
  { title: "Underneath the Tree", artist: "Kelly Clarkson"},
  { title: "Winter Wonderland", artist: "Dua Lipa"},
  { title: "First Snow", artist: "EXO"}
];

// Use today's date to pick the song
const today = new Date();
const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));

// Pick a song based on today's number
const index = dayOfYear % songs.length;
const songOfTheDay = songs[index];

// Insert into HTML
document.getElementById("song-title").textContent = `"${songOfTheDay.title}"`;
document.getElementById("song-artist").textContent = `— ${songOfTheDay.artist}`;
