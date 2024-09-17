let score = 0;

// Selecting all the option buttons
const optionButtons = document.querySelectorAll('.option-button');

// Adding event listeners to the option buttons
optionButtons.forEach(button => {
    button.addEventListener('click', function() {
        const isCorrect = this.getAttribute('data-answer') === "true";
        
        if (isCorrect) {
            score += 10;  // Add XP for correct answer
        } else {
            score -= 5;   // Deduct XP for wrong answer
        }
        
        // Update score on the page
        document.getElementById('score').textContent = `${score} XP`;
        
        // For future expansion, you can add more logic here to load next question
        alert(isCorrect ? "Correct!" : "Wrong!");
    });
});

document.querySelector('.start-button').addEventListener('click', function() {
    window.location.href = "game.html";
});