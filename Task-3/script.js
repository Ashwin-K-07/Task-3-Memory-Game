// script.js
document.addEventListener("DOMContentLoaded", () => {
    const gameBoard = document.getElementById("game-board");
    const restartButton = document.getElementById("restart");
  
    const cardsArray = [
      "A", "A", "B", "B", "C", "C", "D", "D",
      "E", "E", "F", "F", "G", "G", "H", "H"
    ];
  
    let firstCard, secondCard;
    let lockBoard = false;
    let matchedPairs = 0;
  
    // Shuffle cards
    function shuffle(array) {
      return array.sort(() => Math.random() - 0.5);
    }
  
    // Initialize game
    function initGame() {
      gameBoard.innerHTML = "";
      const shuffledCards = shuffle([...cardsArray]);
      shuffledCards.forEach((value) => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
          <div class="front"></div>
          <div class="back">${value}</div>
        `;
        card.addEventListener("click", flipCard);
        gameBoard.appendChild(card);
      });
      matchedPairs = 0;
      lockBoard = false;
      firstCard = null;
      secondCard = null;
    }
  
    // Flip card
    function flipCard() {
      if (lockBoard || this === firstCard) return;
  
      this.classList.add("flip");
  
      if (!firstCard) {
        firstCard = this;
        return;
      }
  
      secondCard = this;
      checkMatch();
    }
  
    // Check for match
    function checkMatch() {
      const isMatch =
        firstCard.querySelector(".back").textContent ===
        secondCard.querySelector(".back").textContent;
  
      if (isMatch) {
        disableCards();
        matchedPairs++;
        if (matchedPairs === cardsArray.length / 2) {
          setTimeout(() => alert("You win!"), 500);
        }
      } else {
        unflipCards();
      }
    }
  
    // Disable matched cards
    function disableCards() {
      firstCard.removeEventListener("click", flipCard);
      secondCard.removeEventListener("click", flipCard);
      resetBoard();
    }
  
    // Unflip unmatched cards
    function unflipCards() {
      lockBoard = true;
      setTimeout(() => {
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");
        resetBoard();
      }, 1000);
    }
  
    // Reset board state
    function resetBoard() {
      [firstCard, secondCard, lockBoard] = [null, null, false];
    }
  
    // Restart game
    restartButton.addEventListener("click", initGame);
  
    // Start game
    initGame();
  });


