function registerUser(){
    let userName = document.getElementById("nameInput").value;
    let userEmail = document.getElementById("emailInput").value;
    let userNumber = document.getElementById("phoneNumberInput").value;

    if(userName === "" || userEmail === "" || userNumber === ""){
        alert("Please enter all fields.")
        return
    }

    if(!(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(userEmail))){
        alert("Please enter a valid email.")
        return
    }

    if(!(/^(\+1-)?\d{3}-\d{3}-\d{4}$/.test(userNumber))){
        alert("Please enter a valid phone number.")
        return
    }
    
    addParticipant(userName, userEmail, userNumber)
}