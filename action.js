
// Store all registered participants in an array.
let participants = [];

// Get the registration form from the HTML.
const participantForm = document.getElementById("participant-form");

// Get the name input field from the HTML.
const participantInput = document.getElementById("participant-name");

// Get the participants list from the HTML.
const participantsList = document.getElementById("participants-list");

// Get the participant counter from the HTML.
const participantCount = document.getElementById("participant-count");

// Get the winner display area from the HTML.
const winnerDisplay = document.getElementById("winner-display");

// Get the draw button from the HTML.
const drawButton = document.getElementById("draw-button");


// Listen for when someone submits the registration form.
participantForm.addEventListener("submit", function(event) {

    // Prevent the page from refreshing when the form is submitted.
    event.preventDefault();

    // Get the participant's name and remove extra spaces.
    const name = participantInput.value.trim();

    // Check if the input is empty.
    if (name === "") {

        // Show an alert asking the user to enter a name.
        alert("Please enter a participant name!");

        // Stop the registration process.
        return;
    }

    // Check whether the name is already registered, ignoring capitalization.
    const alreadyRegistered = participants.some(function(participant) {
        return participant.toLowerCase() === name.toLowerCase();
    });

    // Prevent duplicate registrations.
    if (alreadyRegistered) {

        // Inform the user that the name already exists.
        alert("This participant is already registered!");

        // Stop the registration process.
        return;
    }

    // Add the new participant to the array.
    participants.push(name);

    // Update the participant list on the screen.
    updateParticipantsList();

    // Clear the input field.
    participantInput.value = "";

    // Return the cursor to the input field.
    participantInput.focus();

    // Reset the winner display because the participant pool has changed.
    winnerDisplay.innerHTML = "<p>Waiting for the draw...</p>";

});


// Create a function to update the participants list.
function updateParticipantsList() {

    // Clear the current participant list.
    participantsList.innerHTML = "";

    // Loop through every participant in the array.
    participants.forEach(function(participant, index) {

        // Create a new list item for the participant.
        const listItem = document.createElement("li");

        // Add the participant's position and name.
        listItem.textContent = (index + 1) + ". " + participant;

        // Add the list item to the participants section.
        participantsList.appendChild(listItem);

    });

    // Update the total number of participants.
    participantCount.textContent = participants.length + (participants.length === 1 ? " participant" : " participants");

    // Enable the draw button if at least one participant exists.
    drawButton.disabled = participants.length === 0;

}


// Listen for clicks on the draw button.
drawButton.addEventListener("click", function() {

    // Check whether there are any registered participants.
    if (participants.length === 0) {

        // Show an alert if nobody has registered.
        alert("You need at least one participant to draw a winner!");

        // Stop the draw process.
        return;
    }

    // Generate a random number between zero and the last array index.
    const randomIndex = Math.floor(Math.random() * participants.length);

    // Get the participant at the randomly selected position.
    const winner = participants[randomIndex];

    // Display the winner's name with cake and party emojis.
    winnerDisplay.innerHTML = "<div class='winner-name'>🎂 " + winner + " 🎉</div>";

});
