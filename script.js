//your JS code here.

// Do not change code below this line
// This code will just display the questions to the screen
const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars", "Saturn"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

const questionsElement = document.getElementById("questions");
const submitBtn = document.getElementById("submit");
const scoreDiv = document.getElementById("score");

// Load saved progress (sessionStorage)
let progress = JSON.parse(sessionStorage.getItem("progress")) || {};

// Load saved score (localStorage)
const savedScore = localStorage.getItem("score");
if (savedScore) {
  scoreDiv.textContent = `Your score is ${savedScore} out of ${questions.length}.`;
}

// Function to render quiz questions
function renderQuestions() {
  questionsElement.innerHTML = "";

  questions.forEach((q, index) => {
    const questionDiv = document.createElement("div");

    const qText = document.createElement("p");
    qText.textContent = q.question;
    questionDiv.appendChild(qText);

    q.choices.forEach((choice) => {
      const label = document.createElement("label");
      const input = document.createElement("input");

      input.type = "radio";
      input.name = `question-${index}`;
      input.value = choice;

      // Restore saved answers from sessionStorage
      if (progress[`question-${index}`] === choice) {
        input.checked = true;
      }

      // Save to sessionStorage when user selects an option
      input.addEventListener("change", () => {
        progress[`question-${index}`] = choice;
        sessionStorage.setItem("progress", JSON.stringify(progress));
      });

      label.appendChild(input);
      label.appendChild(document.createTextNode(choice));
      questionDiv.appendChild(label);
    });

    questionsElement.appendChild(questionDiv);
  });
}

// Function to calculate and display the score
function calculateScore() {
  let score = 0;

  questions.forEach((q, index) => {
    const selected = progress[`question-${index}`];
    if (selected === q.answer) {
      score++;
    }
  });

  scoreDiv.textContent = `Your score is ${score} out of ${questions.length}.`;

  // Save final score to localStorage
  localStorage.setItem("score", score);
}

// Handle quiz submission
submitBtn.addEventListener("click", calculateScore);

// Initial render
renderQuestions();
