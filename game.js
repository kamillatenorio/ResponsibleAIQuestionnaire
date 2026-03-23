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

const informationalContent = [
    {
        title: "Environmental Impact",
        imageSrc: "EnvironmentImpact.svg",
        imageAlt: "AI Energy Consumption Illustration",
        caption: "Vincent, James. \"How Much Electricity Does AI Consume?\" The Verge, February 16, 2024. <a href='https://www.theverge.com/24066646/ai-electricity-energy-watts-generative-consumption' target='_blank'>Source</a>.",
        mainText: "Yes, that's correct! According to a recent article [1], <strong>generating an image using AI can consume almost as much energy as charging your smartphone.</strong><br><br>",
        secondaryText: "Not only the training of generative AI systems, but also their use can increase electricity consumption.",
        reference: "[1] Luccioni, Sasha, Yacine Jernite, and Emma Strubell. 'Power Hungry Processing: Watts Driving the Cost of AI Deployment?' In Proceedings of the 2024 ACM conference on Fairness, Accountability, and Transparency, 85-99. FAccT '24, New York, NY, USA: Association for Computing Machinery, 2024. <a href='https://dl.acm.org/doi/10.1145/3630106.3658542' target='_blank'>https://dl.acm.org/doi/10.1145/3630106.3658542</a>."
    },
    {
        title: "Misinformation",
        imageSrc: "Misinformation.svg",
        imageAlt: "Generative AI Misinformation",
        caption: "With AI, realistic images and messages can be created instantly, with only subtle details revealing their artificial nature. | &copy; Image: created with AI.",
        mainText: "Yes, it's true! Some generative AI systems can be used by people who intend to cause harm. These systems can provide a cost-effective way to create disinformation on a large scale and are harder to detect.<br><br>",
        secondaryText: "For example, the AI-generated image of Pope Francis that went viral shows how AI can be used to accelerate the creation of fake news.",
        reference: ""
    },
    {
        title: "Threats to Democracy and Civil Rights",
        imageSrc: "Politic.svg",
        imageAlt: "Generative AI Misinformation",
        caption: "Rosenberg, M., Confessore, N., & Cadwalladr, C. (2018, March 17). How Trump consultants exploited the Facebook data of millions. The New York Times. <a href='https://www.nytimes.com/2018/03/17/us/politics/cambridge-analytica-trump-campaign.html' target='_blank'>Source</a>.",
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

const state = {
    score: 0,
    answersByQuestion: {},
    currentQuestionIndex: 0
};

const views = {
    question: document.querySelector('[data-view="question"]'),
    info: document.querySelector('[data-view="info"]'),
    end: document.querySelector('[data-view="end"]')
};

const questionTextEl = document.querySelector('.question-text');
const optionButtons = document.querySelectorAll('.option-button');
const readMoreButton = document.querySelector('.read-more-button');
const scoreEl = document.getElementById('score');

const infoTitleEl = document.querySelector('.title');
const infoImageEl = document.querySelector('.info-image');
const infoCaptionEl = document.querySelector('.image-caption');
const infoMainEl = document.querySelector('.text-main');
const infoSecondaryEl = document.querySelector('.text-secondary');
const infoReferenceEl = document.querySelector('.reference');
const nextButton = document.querySelector('.next-button');

const finalScoreEl = document.getElementById('final-score');
const restartButton = document.querySelector('.restart-button');

function clampQuestionIndex(index) {
    return Math.min(Math.max(index, 0), questions.length - 1);
}

function setHash(route, index) {
    if (route === 'end') {
        window.location.hash = '#end';
        return;
    }

    window.location.hash = `#${route}/${index}`;
}

function parseRouteFromHash() {
    const hash = (window.location.hash || '').replace(/^#/, '');

    if (!hash) {
        const params = new URLSearchParams(window.location.search);
        const questionFromQuery = parseInt(params.get('questionIndex'), 10);

        if (!Number.isNaN(questionFromQuery)) {
            return { view: 'question', index: clampQuestionIndex(questionFromQuery) };
        }

        return { view: 'question', index: 0 };
    }

    if (hash === 'end') {
        return { view: 'end', index: questions.length - 1 };
    }

    const [view, rawIndex] = hash.split('/');
    const parsedIndex = parseInt(rawIndex, 10);

    if ((view === 'question' || view === 'info') && !Number.isNaN(parsedIndex)) {
        return { view, index: clampQuestionIndex(parsedIndex) };
    }

    return { view: 'question', index: 0 };
}

function updateScoreDisplay() {
    scoreEl.textContent = `${state.score}`;
}

function showView(viewName) {
    Object.keys(views).forEach((key) => {
        views[key].hidden = key !== viewName;
    });
}

function resetQuestionButtons() {
    optionButtons.forEach((button) => {
        button.disabled = false;
        button.style.backgroundColor = '#0056b3';
    });
}

function paintAnsweredState(index) {
    const savedAnswer = state.answersByQuestion[index];
    if (!savedAnswer) {
        return;
    }

    optionButtons.forEach((button) => {
        const answerValue = button.getAttribute('data-answer');
        button.disabled = true;

        if (answerValue === savedAnswer.selected) {
            button.style.backgroundColor = savedAnswer.correct ? '#009599' : '#DDB527';
        } else {
            button.style.backgroundColor = '#0056b3';
        }
    });

    readMoreButton.style.display = 'block';
}

function renderQuestion(index) {
    state.currentQuestionIndex = index;
    showView('question');

    questionTextEl.textContent = questions[index].question;
    updateScoreDisplay();
    resetQuestionButtons();
    readMoreButton.style.display = 'none';
    paintAnsweredState(index);
}

function renderInfo(index) {
    state.currentQuestionIndex = index;
    showView('info');

    const content = informationalContent[index];

    infoTitleEl.textContent = content.title;
    infoImageEl.src = content.imageSrc;
    infoImageEl.alt = content.imageAlt;
    infoCaptionEl.innerHTML = content.caption;
    infoMainEl.innerHTML = content.mainText;
    infoSecondaryEl.innerHTML = content.secondaryText;
    infoReferenceEl.innerHTML = content.reference;
}

function renderEnd() {
    showView('end');
    finalScoreEl.textContent = `${state.score}`;
}

function syncRoute() {
    const route = parseRouteFromHash();

    if (route.view === 'question') {
        renderQuestion(route.index);
        return;
    }

    if (route.view === 'info') {
        renderInfo(route.index);
        return;
    }

    renderEnd();
}

function resetGame() {
    state.score = 0;
    state.answersByQuestion = {};
    updateScoreDisplay();
}

optionButtons.forEach((button) => {
    button.addEventListener('click', function () {
        const questionIndex = state.currentQuestionIndex;
        if (state.answersByQuestion[questionIndex]) {
            return;
        }

        const selectedAnswer = this.getAttribute('data-answer');
        const isCorrect = selectedAnswer === questions[questionIndex].correctAnswer;

        state.answersByQuestion[questionIndex] = {
            selected: selectedAnswer,
            correct: isCorrect
        };

        if (isCorrect) {
            state.score += 1;
        }

        updateScoreDisplay();
        paintAnsweredState(questionIndex);
    });
});

readMoreButton.addEventListener('click', () => {
    setHash('info', state.currentQuestionIndex);
});

nextButton.addEventListener('click', () => {
    const nextQuestionIndex = state.currentQuestionIndex + 1;

    if (nextQuestionIndex >= questions.length) {
        setHash('end');
        return;
    }

    setHash('question', nextQuestionIndex);
});

restartButton.addEventListener('click', () => {
    resetGame();
    setHash('question', 0);
});

window.addEventListener('hashchange', syncRoute);

window.addEventListener('DOMContentLoaded', () => {
    const route = parseRouteFromHash();

    if (route.view === 'question' && route.index === 0 && !window.location.hash) {
        resetGame();
    }

    if (!window.location.hash) {
        setHash(route.view, route.index);
        return;
    }

    syncRoute();
});
