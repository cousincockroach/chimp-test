const cont = document.querySelector(".container");
let arr = [1,2]

cont.addEventListener('click', (e) => {

        if (Number(e.target.textContent) === arr[0]){
            e.target.style.backgroundColor = 'black';
            e.target.style.color = 'white';
        }

    

});