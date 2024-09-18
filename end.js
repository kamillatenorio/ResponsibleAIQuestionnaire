// Get the final score from localStorage and display it
window.onload = function() {
    const finalScore = localStorage.getItem('score') || 0; // Default to 0 if no score
    document.getElementById('final-score').textContent = `${finalScore}`;
};

// Function to restart the game by resetting the score and redirecting to the first question
function restartGame() {
    localStorage.setItem('score', 0); // Reset score
    window.location.href = 'game.html?questionIndex=0'; // Start the game from the first question
}
