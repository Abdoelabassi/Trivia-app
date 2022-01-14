const gamy = document.getElementById("game")

const scoreID = document.getElementById("score")

let score = 0

const genres = [
    {
        name: "Film",
        id:11
    },
    {
        name: "Books",
        id:10
    },
    {
        name: "Music",
        id:12
    }
]

const levels = ['easy', 'medium', 'hard']

function addGenre(genre){
    const col = document.createElement("div")
    col.classList.add("genre-col")
    col.innerHTML = genre.name
    gamy.append(col)

    levels.forEach(level =>{
        const card = document.createElement("div")
        card.classList.add("card")
        col.append(card)
        if(level === 'easy'){
            card.innerHTML = 100
        }
        if(level=== 'medium'){
            card.innerHTML = 200
        }
        if(level=='hard'){
            card.innerHTML = 300
        }

        fetch(`https://opentdb.com/api.php?amount=1&category=${genre.id}&difficulty=${level}&type=boolean`)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                card.setAttribute("data-question", data.results[0].question)
                card.setAttribute("data-answer",data.results[0].correct_answer)
                card.setAttribute("data-value", card.getInnerHTML())

            })
            .then(dobe => card.addEventListener("click", flipCard))

            
    })

}

genres.forEach(genre=> addGenre(genre))

function flipCard(){
    this.innerHTML =''
    this.style.fontSize = "15px"
    console.log("clicked")
    const textDisplay = document.createElement("div")
    const trueButton = document.createElement("button")
    const falseButton = document.createElement("button")
    trueButton.innerHTML = "True"
    falseButton.innerHTML = "False"
    trueButton.classList.add("true-button")
    falseButton.classList.add("false-button")
    trueButton.addEventListener("click", getResult)
    falseButton.addEventListener("click", getResult)
    textDisplay.innerHTML = this.getAttribute("data-question")

    this.append(textDisplay, trueButton, falseButton)

    const allCards = Array.from(document.querySelectorAll(".card"))
    allCards.forEach(card => card.removeEventListener("click", flipCard))

}

function getResult(){
    const allCards = Array.from(document.querySelectorAll(".card"))
    allCards.forEach(card => card.addEventListener("click", flipCard))
    const buttonCard = this.parentElement
    if(buttonCard.getAttribute("data-answer") === this.innerHTML){
        score = score +  parseInt(buttonCard.getAttribute("data-value"))
        scoreID.innerHTML = score
        buttonCard.classList.add("correct-answer")
        setTimeout(()=>{
            while(buttonCard.firstChild){
                buttonCard.removeChild(buttonCard.lastChild)
            }
            buttonCard.innerHTML = buttonCard.getAttribute("data-value")
        },100)
    }else{
        buttonCard.classList.add("wrong-answer")
        setTimeout(()=>{
            while(buttonCard.firstChild){
                buttonCard.removeChild(buttonCard.lastChild)
            }
            buttonCard.innerHTML = 0
        },100)
        
    }
        buttonCard.removeEventListener("click", flipCard)
    

}
    