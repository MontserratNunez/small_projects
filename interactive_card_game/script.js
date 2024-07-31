function load_cards(number){
    /*The load_cards funtion recives a number as an argument.
    It calculates the width, height and font_size of the cards based on the number given as an argument,
    then load them on the div "cardsContainer" and after 2 seconds flip all the cards upside down*/

    exit(0)

    if(number <= 36){
        height = Math.floor((-4 * number) + 284);
        width = Math.floor((-2.5 * number)+ 190);
    }else{
        height = Math.floor((-4 * 40) + 284);
        width = Math.floor((-2.5 * 40)+ 190);
    }

    size = Math.floor(width * 1);
    card_content = shuffle(cards_type(number))
    for(let i = 0; i < number; i++){ 
        document.getElementById("cardsContainer").innerHTML += `
        <div class="pair">
            <div class="card top">
                <p class="black">${card_content[i]}</p>
            </div>
            <div class="card back none">
                <p>🂠</p>
            </div>
        </div>
        `;
    }
    let cards = document.querySelectorAll(".card");
    cards.forEach(card => {
        card.style.fontSize = `${size}px`;
        card.style.height = `${height}px`;
        card.style.width = `${width}px`;
    });

    setTimeout(()=>{
        hide(0)
    }, 2000);

    game()
}


function game(){
    /*The game function is in charge of the movements of the cards 
    it call the updateScore_Moves and compare functions*/

    let cardsBack = document.querySelectorAll(".back");
    let cardsPairs = document.querySelectorAll(".pair");
    let pair_list = [];
    if (cardsBack){
        cardsPairs.forEach(cardPair => {
            cardPair.addEventListener("click", () =>{
                if(cardPair.children[0].classList.contains("none")){
                    toggleCards([cardPair])
                    if(pair_list.length < 2){
                        pair_list.push([cardPair.children[0].textContent.trim(), cardPair])
                    }
                    if(pair_list.length <= 1){
                        updateScore_Moves(1, "moves")
                    }
                    if(pair_list.length == 2){
                        compare(pair_list)
                        pair_list = []
                    }
                }
            });
        });
    }
}

function cards_type(number){
    /*The cards_type function recives a number as an argument.
    Chooses randomly the cards and return them as a list*/

    let cards_list = ["🂱", "🂲", "🂳", "🂴", "🂵", "🂶", "🂷", "🂸", "🂹", "🂺", "🂻", "🂽", "🂾",
                      "🃑", "🃒", "🃓", "🃔", "🃕", "🃖", "🃗", "🃘", "🃙", "🃚", "🃛", "🃝", "🃞",
                      "🃁", "🃂", "🃃", "🃄", "🃅", "🃆", "🃇", "🃈", "🃉", "🃊", "🃋", "🃍", "🃎",
                      "🂡", "🂢", "🂣", "🂤", "🂥", "🂦", "🂧", "🂨", "🂩", "🂪", "🂫", "🂭", "🂮"]
    let cards = []
    while(cards.length < number){
        let random_num = Math.floor(Math.random() * cards_list.length);
        if(!cards.some((card) => card === cards_list[random_num])){
            cards.push(cards_list[random_num], cards_list[random_num])
        }
    }

    return cards
}

function shuffle(cards){
    /* Shuffles the cards. */
    indexes = []
    card_list = []
    while (card_list.length < cards.length){
        let random = Math.floor(Math.random() * cards.length);
        if(!indexes.some((index) => index == random)){
            card_list.push(cards[random])
            indexes.push(random)
        }
    }
    return card_list
}

function compare(pair_list){
    /* The compare function recives a list as an argument.
    Compares the given pair and if they are the same increase the score by 10, 
    if they are not, decrease the score by 5 and increase the moves by 1. */

    if(pair_list[0][0] == pair_list[1][0]){
        updateScore_Moves(10, "score")
        win()
    }else{
        setTimeout(()=>{
            toggleCards([pair_list[0][1], pair_list[1][1]])
        }, 1000);
        updateScore_Moves(1, "moves")
        updateScore_Moves(-2, "score")
    }
}

function updateScore_Moves(num, element){
    /* The updateScore_Moves function recives a number and the id of an element as an argument.
    It add to the score or the moves the given number. */

    let update = document.getElementById(element);
    let updateInt = parseInt(update.innerText);
    if(num === 0){
        update.innerText = 0;
    }else{
        update.innerText = num + updateInt;
    }
}

function toggleCards(cardPairs){
    /* The toggleCards function recives a list of pair cards as an argument.
    Flip to the oposite side all the cards. */

    for(let i = 0; i < cardPairs.length; i++){
        cardPairs[i].children[0].classList.toggle("none")
        cardPairs[i].children[1].classList.toggle("none")
    }
}

function win(){
    /* Shows the score and moves of the player when the game ends. */

    let cardsPairs = document.querySelectorAll(".pair");
    for(let i = 0; i < cardsPairs.length; i++){
        if (cardsPairs[i].children[0].classList.contains("none")){
            return 0
        };
    }
    document.getElementById("stats").classList.toggle("none")
    document.getElementById("statS").innerText = "Score: " + document.getElementById("score").innerText
    document.getElementById("statM").innerText = "Moves: " + document.getElementById("moves").innerText
}

function hide(num){
    /* The hide function recives a numeric argument. If the argument is diferent than 1, 
    only flip all the cards to the back side, if it's 1, also reset the score and moves. */

    let cardsPairs = document.querySelectorAll(".pair");
    for(let i = 0; i < cardsPairs.length; i++){
        cardsPairs[i].children[0].classList.add("none");
        cardsPairs[i].children[1].classList.remove("none");
    }
    if(num === 1){
        updateScore_Moves(0, "score")
        updateScore_Moves(0, "moves")
    }
}

function exit(num){
    /* The exit function recives a numeric argument. If the argument is diferent than 1, 
    it toggles the visibility of the menu and the content, if it's 1, also removes all the cards. */

    document.getElementById("chooseContainer").classList.toggle("none");
    document.getElementById("mainContent").classList.toggle("none");
    document.getElementById("stats").classList.add("none")
    updateScore_Moves(0, "moves")
    if(num === 1){
        let cardsContainer = document.getElementById("cardsContainer")
        while (cardsContainer.firstChild) {
            cardsContainer.removeChild(cardsContainer.firstChild);
        }
    }
}


