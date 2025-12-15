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
    let matchName = document.createElement("p");
    let cardText = document.createElement("p");

    matchName.innerText = match.name;
    cardText.innerText = "Here is Your Match";

    matchContainer.appendChild(cardText);
    matchContainer.appendChild(matchName);

    document.getElementById("match").innerText = "";
    document.getElementById("match").appendChild(matchContainer);
}