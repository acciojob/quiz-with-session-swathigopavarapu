// Get references
const questionsElement = document.getElementById("questions");
const submitBtn = document.getElementById("submit");
const scoreDiv = document.getElementById("score");

// Questions provided
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

// Load saved answers (session)
let userAnswers = JSON.parse(sessionStorage.getItem("progress")) || {};

// Load saved score (local)
const savedScore = localStorage.getItem("score");
if (savedScore) {
  scoreDiv.textContent = `Your score is ${savedScore} out of ${questions.length}.`;
}

// Render quiz
function renderQuestions() {
  questionsElement.innerHTML = "";

  questions.forEach((q, i) => {
    const div = document.createElement("div");
    const qText = document.createElement("p");
    qText.textContent = q.question;
    div.appendChild(qText);

    q.choices.forEach((choice) => {
      const label = document.createElement("label");
      const input = document.createElement("input");
      input.type = "radio";
      input.name = `question-${i}`;
      input.value = choice;

      // Restore checked state
      if (userAnswers[i] === choice) {
        input.checked = true;
      }

      // On change, store progress in sessionStorage
      input.addEventListener("change", () => {
        userAnswers[i] = choice;
        sessionStorage.setItem("progress", JSON.stringify(userAnswers));
      });

      label.appendChild(input);
      label.append(choice);
      div.appendChild(label);
      div.appendChild(document.createElement("br"));
    });

    questionsElement.appendChild(div);
  });
}

renderQuestions();

// On submit
submitBtn.addEventListener("click", () => {
  let score = 0;
  questions.forEach((q, i) => {
    if (userAnswers[i] === q.answer) score++;
  });

  // Show and store score
  scoreDiv.textContent = `Your score is ${score} out of ${questions.length}.`;
  localStorage.setItem("score", score);
});
