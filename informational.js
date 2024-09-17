// Information content for each question
const informationalContent = [
    {
        title: "Environmental Impact",
        imageSrc: "EnvironmentImpact.svg", 
        imageAlt: "AI Energy Consumption Illustration",
        caption: "Illustration by Erik Carter, retrieved from <a href='https://www.theverge.com/2023/6/5/23752586/ai-electricity-energy-watts-generative-consumption' target='_blank'>The Verge</a>.",
        mainText: "Yes, that is true! According to a recent article [1], <strong>generate one image using AI can use almost as much energy as charging your smartphone.</strong>",
        secondaryText: "Not only training AI generative systems, but also using AI generative systems can increase electrical energy consumption.</strong>",
        reference: "[1] Luccioni, Sasha, Yacine Jernite, and Emma Strubell. 'Power Hungry Processing: Watts Driving the Cost of AI Deployment?' In Proceedings of the 2024 ACM conference on Fairness, Accountability, and Transparency, 85–99. FAccT '24, New York, NY, USA: Association for Computing Machinery, 2024. <a href='https://doi.org/10.1145/3505106.3686542' target='_blank'>https://doi.org/10.1145/3505106.3686542</a>."
    },
    {
        title: "Misinformation",
        imageSrc: "your-image-url-2.png",
        imageAlt: "Generative AI Misinformation",
        caption: "Illustration retrieved from <a href='https://www.example.com' target='_blank'>Example Source</a>.",
        mainText: "Yes, it is true! In 2022, AI-generated deepfake videos were used to spread misinformation during international conflicts.",
        secondaryText: "With Generative AI systems, it became impressively easy to generate impressive image, audios and videos.",
        reference: "[1] BBC News. (2022, March 18). Deepfake presidents used in Russia-Ukraine war.  <a href='https://www.bbc.com/news/technology-60780142' target='_blank'>Read More</a>."
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
