let currentQuestionIndex = 0; // To track which question is currently being shown

// List of questions and answers
const questions = [
    {
        question: "Generating an image using an AI system can consume almost as much energy as charging your smartphone.",
        correctAnswer: "true"
    },
    {
        question: "Although generative AI systems have great potential to foster creativity, they also contribute to the spread of misinformation.",
        correctAnswer: "true"
    },
    {
        question: "A company used data from Facebook to automatically create user profiles and personalize content for political manipulation purposes.",
        correctAnswer: "true"
    },
    {
        question: "Facial recognition software developed using billions of photos from the internet has been used by police in various countries, raising concerns among human rights researchers about the surveillance of citizens.",
        correctAnswer: "true"
    }
];

// Function to reset the score in localStorage
function resetScore() {
    localStorage.setItem('score', 0);
}

// Function to get the current score from localStorage (or default to 0)
function getScore() {
    return parseInt(localStorage.getItem('score')) || 0;
}

// Function to update the score in localStorage
function updateScore(newScore) {
    localStorage.setItem('score', newScore);
}

// Get the current question index from the URL
function getQuestionIndexFromURL() {
    const params = new URLSearchParams(window.location.search);
    return parseInt(params.get('questionIndex')) || 0;
}

// Function to load the current question
function loadQuestion() {
    const questionElement = document.querySelector('.question-text');
    const currentQuestion = questions[currentQuestionIndex];
    
    // Update the question text
    questionElement.textContent = currentQuestion.question;

    // Enable buttons for new selection
    document.querySelectorAll('.option-button').forEach(btn => {
        btn.disabled = false;
        btn.style.backgroundColor = '#0056b3'; // Reset color for new question
    });

    // Display the score from localStorage
    document.getElementById('score').textContent = `${getScore()}`;
}

// Event listeners for option buttons
document.querySelectorAll('.option-button').forEach(button => {
    button.addEventListener('click', function() {
        const isCorrect = this.getAttribute('data-answer') === questions[currentQuestionIndex].correctAnswer;
        let currentScore = getScore(); // Retrieve current score

        // Change button color based on correctness and update score
        if (isCorrect) {
            this.style.backgroundColor = '#009599'; // Correct: Greenish color
            currentScore += 1; // Increase score by 1 for correct answer
        } else {
            this.style.backgroundColor = '#DDB527'; // Wrong: Yellowish color
            currentScore -= 0; // Decrease score by 0 for wrong answer
        }

        // Update the score display and save it in localStorage
        updateScore(currentScore);
        document.getElementById('score').textContent = `${currentScore}`;

        // Disable all buttons after the choice is made
        document.querySelectorAll('.option-button').forEach(btn => {
            btn.disabled = true;
        });

        // Show the "Read More" button after selection
        document.querySelector('.read-more-button').style.display = 'block';
    });
});

// Event listener for the "Read More" button to navigate to the informational page
document.querySelector('.read-more-button').addEventListener('click', function() {
    // Redirect to the informational page, passing the current question index
    window.location.href = `informational.html?questionIndex=${currentQuestionIndex}`;
});

// Reset score if starting a new game session
window.onload = function() {
    currentQuestionIndex = getQuestionIndexFromURL();

    // Reset the score when the user starts from the first question
    if (currentQuestionIndex === 0) {
        resetScore();
    }

    loadQuestion();
};
