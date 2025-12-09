// Information content for each question
const informationalContent = [
    {
        title: "Environmental Impact",
        imageSrc: "EnvironmentImpact.svg", 
        imageAlt: "AI Energy Consumption Illustration",
        caption: "Vincent, James. “How Much Electricity Does AI Consume?” The Verge, February 16, 2024. <a href='https://www.theverge.com/24066646/ai-electricity-energy-watts-generative-consumption' target='_blank'>Source</a>.“",
        mainText: "Yes, that's correct! According to a recent article [1], <strong>generating an image using AI can consume almost as much energy as charging your smartphone.</strong><br><br>",
        secondaryText: "Not only the training of generative AI systems, but also their use can increase electricity consumption.</strong>",
        reference: "[1] Luccioni, Sasha, Yacine Jernite, and Emma Strubell. 'Power Hungry Processing: Watts Driving the Cost of AI Deployment?' In Proceedings of the 2024 ACM conference on Fairness, Accountability, and Transparency, 85–99. FAccT '24, New York, NY, USA: Association for Computing Machinery, 2024. <a href='https://dl.acm.org/doi/10.1145/3630106.3658542' target='_blank'>https://dl.acm.org/doi/10.1145/3630106.3658542</a>."
    },
    {
        title: "Misinformation",
        imageSrc: "Misinformation.svg",
        imageAlt: "Generative AI Misinformation",
        caption: "With AI, realistic images and messages can be created instantly, with only subtle details revealing their artificial nature. | © Image: created with AI.",
        mainText: "Yes, it's true! Some generative AI systems can be used by people who intend to cause harm. These systems can provide a cost-effective way to create disinformation on a large scale and are harder to detect.<br><br>",
        secondaryText: "For example, the AI-generated image of Pope Francis that went viral shows how AI can be used to accelerate the creation of fake news.",
        reference: ""
    }, 
    {
        title: "Threats to Democracy and Civil Rights",
        imageSrc: "Politic.svg",
        imageAlt: "Generative AI Misinformation",
        caption: "Rosenberg, M., Confessore, N., & Cadwalladr, C. (2018, March 17). How Trump consultants exploited the Facebook data of millions. The New York Times.  <a href='https://www.nytimes.com/2018/03/17/us/politics/cambridge-analytica-trump-campaign.html' target='_blank'> Source</a>.",
        mainText: "The use of adaptive AI systems to present readers with personalized news based on their previous reading behavior can increase societal polarization.<br><br>",
        secondaryText: "A famous example was the Cambridge Analytica case, where data stolen from Facebook was used to create user profiles based on behavior. These profiles were then used to automatically make decisions to personalize content for political manipulation purposes.",
        reference: ""
    },
    {
        title: "Surveillance",
        imageSrc: "Surveillance.svg",
        imageAlt: "Generative AI Misinformation",
        caption: "In J. Delcker, Clearview AI controversy highlights rise of high-tech surveillance. DW. <a href='https://www.dw.com/en/clearview-ai-controversy-highlights-rise-of-high-tech-surveillance/a-57890435' target='_blank'>Source</a>.",
        mainText: "AI image recognition systems, when installed in publicly accessible spaces, can violate the privacy of large numbers of people and create a sense of constant surveillance.<br><br>",
        secondaryText: "For example, a facial recognition software developed using billions of photos from the internet has been used by police in various countries and has raised concerns among human rights researchers about the surveillance of citizens.",
        reference: ""
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
