// Correct answer
const correctAnswer = "B";
let hasAnswered = false; // This will track if the user has already answered

// Event listeners for each answer button
document.querySelectorAll('.answer-btn').forEach(button => {
    button.addEventListener('click', function () {
        if (!hasAnswered) { // Allow answering only once
            const selectedAnswer = this.getAttribute('data-answer');
            checkAnswer(selectedAnswer, this);
        }
    });
});

// Check if the selected answer is correct or not
function checkAnswer(selectedAnswer, buttonElement) {
    const resultDiv = document.getElementById('result');
    hasAnswered = true; // Mark that the user has answered

    // Reset all buttons' colors before checking
    document.querySelectorAll('.answer-btn').forEach(button => {
        button.style.backgroundColor = '#a83232'; // Reset to original color
    });

    // Highlight the correct answer in green
    document.querySelector(`[data-answer="${correctAnswer}"]`).style.backgroundColor = '#27AB1C';

    if (selectedAnswer === correctAnswer) {
        resultDiv.textContent = "Correct! Generating one AI image consumes almost as much energy as charging a smartphone.";
        resultDiv.style.color = "green";
    } else {
        // Highlight the wrong selected answer in yellow
        buttonElement.style.backgroundColor = '#DDB527';
        resultDiv.textContent = "Wrong! The correct answer is 2) Almost as much energy as charging your smartphone.";
        resultDiv.style.color = "red";
    }
}
