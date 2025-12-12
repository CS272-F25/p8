document.addEventListener("DOMContentLoaded", () => {
    if(localStorage.getItem("match") !== null){
        printParticipants();
    }
});

let matchContainer = document.createElement("div");
matchContainer.className = "card"

function printParticipants(){ 

    if(localStorage.getItem("match") === null){

        let participantArray = returnParticipants();
        let randomParticipantIndex = Math.floor(Math.random() * participantArray.length);

        let match = participantArray[randomParticipantIndex];
        createMatchContainer(match, matchContainer)

        localStorage.setItem("match", JSON.stringify(match));

    } else {
        let match = JSON.parse(localStorage.getItem("match"));
        createMatchContainer(match, matchContainer)
    }
}

function createMatchContainer(match, matchContainer){
    let matchName = match.name;
    matchContainer.innerText = matchName;
    document.getElementById("match").innerText = "";
    document.getElementById("match").appendChild(matchContainer);
}