const cont = document.querySelector(".container");

function populateButtons(){
    const allButtons = Array.from(cont.querySelectorAll("button"));
    const availableButtons = [...allButtons];
    for (let i = 0; i < 9; i++) {
        if (availableButtons.length === 0) break;

        // Pick a random index from the remaining available buttons
        const randomIndex = Math.floor(Math.random() * availableButtons.length);
        const selectedButton = availableButtons[randomIndex];

        // Assign a value (e.g., numbers 1-9)
        selectedButton.textContent = i + 1;

        // Remove the selected button from available list so it can't be picked twice
        availableButtons.splice(randomIndex, 1);
    }

}
populateButtons();

// cont.addEventListener('click', (e) => {

//         if (Number(e.target.textContent) === arr[0]){
//             e.target.style.backgroundColor = 'black';
//             e.target.style.color = 'white';
//         }

    

// });