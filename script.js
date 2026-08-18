const cont = document.querySelector(".container");
const timeCont = document.querySelector(".time");

let currentI = 1;
let filledButtons = []; // Scoped outside so the grid click listener can access it
let activeTimeout = null; // Stores timer reference to prevent lingering timeouts

// 1. Time Selector Listener
timeCont.addEventListener('click', (e) => {
    // Prevent errors if user clicks container padding instead of a button
    if (!e.target.matches("button") && !e.target.classList.contains("time-btn")) return;
    
    const time = e.target.textContent;
    populateButtons(time);
});

// 2. Main Game Logic (Populate Grid)
function populateButtons(time) {
    // Clear any pending hide timers from a previous round
    if (activeTimeout) clearTimeout(activeTimeout);

    // Reset game state
    currentI = 1;
    filledButtons = [];

    const allButtons = Array.from(cont.querySelectorAll(".grid-btn"));
    
    // Clear previous numbers and classes from ALL grid buttons
    allButtons.forEach(btn => {
        btn.textContent = "";
        btn.classList.remove("hidden-text", "display");
    });

    const availableButtons = [...allButtons];

    // Randomly pick and populate 9 buttons
    for (let i = 0; i < 9; i++) {
        if (availableButtons.length === 0) break;

        const randomIndex = Math.floor(Math.random() * availableButtons.length);
        const selectedButton = availableButtons[randomIndex];

        selectedButton.textContent = i + 1;
        filledButtons.push(selectedButton);

        availableButtons.splice(randomIndex, 1);
    }

    // Hide numbers after selected time limit
    activeTimeout = setTimeout(() => {
        filledButtons.forEach(btn => {
            btn.classList.add("hidden-text");
        });
    }, Number(time) * 1000);
}

// 3. Grid Click Listener (Attached ONCE globally)
cont.addEventListener('click', (e) => {
    // Ensure user actually clicked a grid button that contains a number
    if (!e.target.classList.contains("grid-btn")) return;

    const clickedValue = Number(e.target.textContent);

    if (clickedValue === currentI) {
        // CORRECT GUESS
        e.target.classList.remove("hidden-text");
        currentI++;

        // WIN CONDITION: Found all 9 numbers
        if (currentI > 9) {
            setTimeout(() => {
                alert("You won! Select a time to play again.");
            }, 100);
        }
    } else {
        // WRONG GUESS (RESET GAME)
        alert(`Wrong! You needed ${currentI}, but clicked ${clickedValue}. Game Over!`);

        // Reveal all hidden numbers so user sees what they missed
        filledButtons.forEach(btn => {
            btn.classList.remove("hidden-text");
            btn.classList.add("display");
        });

        // Clear timer if active
        if (activeTimeout) clearTimeout(activeTimeout);

        // Reset state tracker
        currentI = 1;
    }
});