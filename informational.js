// Information content for each question
const informationalContent = [
    {
        title: "Environmental Impact",
        imageSrc: "your-image-url-1.png", // Image for question 1
        imageAlt: "AI Energy Consumption Illustration",
        caption: "Illustration by Erik Carter, retrieved from <a href='https://www.theverge.com/2023/6/5/23752586/ai-electricity-energy-watts-generative-consumption' target='_blank'>The Verge</a>.",
        mainText: "Using <strong>AI generative systems</strong> can increase electrical energy consumption.",
        secondaryText: "For example, a recent article [1] shows that <strong>generating one image using AI can use almost as much energy as charging your smartphone.</strong>",
        reference: "[1] Luccioni, Sasha, Yacine Jernite, and Emma Strubell. 'Power Hungry Processing: Watts Driving the Cost of AI Deployment?' In Proceedings of the 2024 ACM conference on Fairness, Accountability, and Transparency, 85–99. FAccT '24, New York, NY, USA: Association for Computing Machinery, 2024. <a href='https://doi.org/10.1145/3505106.3686542' target='_blank'>https://doi.org/10.1145/3505106.3686542</a>."
    },
    {
        title: "Generative AI Risks",
        imageSrc: "your-image-url-2.png", // Image for question 2
        imageAlt: "Generative AI Misinformation",
        caption: "Illustration retrieved from <a href='https://www.example.com' target='_blank'>Example Source</a>.",
        mainText: "Generative AI can create realistic and potentially damaging videos of people without their consent.",
        secondaryText: "This technology raises significant ethical concerns about privacy, misinformation, and consent.",
        reference: "[2] Example Author, 'The Dangers of Deepfakes and Generative AI', 2024. <a href='https://www.example.com' target='_blank'>Read More</a>."
    }
];

// Get the current question index from the URL
const params = new URLSearchParams(window.location.search);
const currentQuestionIndex = parseInt(params.get('questionIndex')) || 0;

// Function to load the correct informational content
function loadInformationalContent() {
    const content = informationalContent[currentQuestionIndex];
    
    // Set dynamic content
    document.querySelector('.title').textContent = content.title;
    document.querySelector('.info-image').src = content.imageSrc;
    document.querySelector('.info-image').alt = content.imageAlt;
    document.querySelector('.image-caption').innerHTML = content.caption;
    document.querySelector('.text-main').innerHTML = content.mainText;
    document.querySelector('.text-secondary').innerHTML = content.secondaryText;
    document.querySelector('.reference').innerHTML = content.reference;
}

// Load the informational content when the page loads
window.onload = function() {
    loadInformationalContent();
};

// When "Next" is clicked, return to the game with the next question or end the game
document.querySelector('.next-button').addEventListener('click', function() {
    const nextQuestionIndex = currentQuestionIndex + 1;

    // If there are no more questions, redirect to the end page
    if (nextQuestionIndex >= informationalContent.length) {
        window.location.href = 'end.html'; // Redirect to the end of game page
    } else {
        // Otherwise, continue to the next question
        window.location.href = `game.html?questionIndex=${nextQuestionIndex}`;
    }
});
