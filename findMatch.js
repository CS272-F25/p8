document.addEventListener("DOMContentLoaded", () => {
    if(localStorage.getItem("participants") === null){
        let message = document.createElement("p");
        message.innerText = "Make sure you are registered before you make a match."
        document.getElementById("match").appendChild(message);
    }

    if(localStorage.getItem("match") !== null){
        generateMatch()
    }
});

function generateMatch(){ 
    if(localStorage.getItem("match") === null){
        let participantArray = JSON.parse(localStorage.getItem("participants"));
        let randomParticipantIndex = Math.floor(Math.random() * participantArray.length);
        let match = participantArray[randomParticipantIndex];

        localStorage.setItem("match", JSON.stringify(match));
        createMatchContainer(match)
    } else {
        let match = JSON.parse(localStorage.getItem("match"))
        createMatchContainer(match)
    }
}

function createMatchContainer(match){
    let matchContainer = document.createElement("div");
    matchContainer.className = "card";
    matchContainer.style = "width:35%";
    let cardText = document.createElement("h2");
    let matchInfo = document.createElement("h2");
    let goldenCurl = document.createElement("img");

    cardText.innerText = "Here is Your Match";
    matchInfo.innerText = `Match: ${match.name}\nEmail: ${match.email}\nPhone Number: ${match.phone}`;

    goldenCurl.className = "curl left"
    goldenCurl.alt = "golden curls decoration for generated match"
    goldenCurl.src = "./images/goldencurls.png"

    matchContainer.appendChild(cardText);
    matchContainer.appendChild(matchInfo);
    matchContainer.appendChild(goldenCurl);

    document.getElementById("match").innerText = "";
    document.getElementById("match").appendChild(matchContainer);
}
