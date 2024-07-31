async function pokemon(){
    /* Collects the information of a random pokemon using the PokeApi */

    let random = Math.floor(Math.random() * 1000) + 1;
    try{
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${random}`)
        

        if (!response){
            throw new Error ("Not a pokemon");
        }

        const data = await response.json();

        document.getElementById("pokemonImage").src = data.sprites.front_default;
        document.getElementById("pokemon").textContent = data.name;
        
    }catch(error){
        console.error(error);
    }
}

let name = document.getElementById("pokemon");
let form = document.getElementById("pokemonForm");
let guess = document.getElementById("pokemonInput");
let message = document.getElementById("message");
let counter = 3;
form.addEventListener("submit", event =>{
    event.preventDefault();
    if (guess.value === name.textContent){
        message.textContent = "You won";
        message.classList.remove("incorrect")
        message.classList.add("correct")
        document.getElementById("pokemonName").textContent = "It's " + name.textContent;

    }else if(counter == 0){
        document.getElementById("pokemonName").textContent = "It's " + name.textContent;
    }else{
        message.textContent = "Try again";
        message.classList.add("incorrect")
        counter--;
    }
    document.getElementById("counter").textContent = "Tries left: " + counter;
});

function play(){
    /* Hides the play button */
    
    document.getElementById("play").style.display = "none";
    document.getElementById("pokemonContainer").style.display = "flex";
    pokemon()
}