const questionList = document.getElementById("questionList");
const searchInput = document.getElementById("search");
const activeQuestion = document.getElementById("activeQuestion");
const answersDiv = document.getElementById("answers");

let currentRound = null;

// ─────────────────────────────
// Render question list
// ─────────────────────────────
function renderList(filter = "") {
questionList.innerHTML = "";

GAME_DATA.rounds
.filter(r => r.question.toLowerCase().includes(filter.toLowerCase()))
.forEach((round, index) => {

const div = document.createElement("div");
div.className = "question-item";
div.textContent = `${index + 1}. ${round.question}`;

div.onclick = () => loadRound(round);

questionList.appendChild(div);
});
}

// ─────────────────────────────
// Load selected question
// ─────────────────────────────
function loadRound(round) {
currentRound = round;

activeQuestion.textContent = round.question;
answersDiv.innerHTML = "";

round.answers.forEach((a, i) => {
const row = document.createElement("div");
row.className = "answer hidden";

row.innerHTML = `
<div class="answer-number">${i + 1}</div>
<div>${a.text}</div>
<div>${a.points}</div>
`;

row.onclick = () => row.classList.toggle("hidden");

answersDiv.appendChild(row);
});
}

// ─────────────────────────────
// Search
// ─────────────────────────────
searchInput.addEventListener("input", (e) => {
renderList(e.target.value);
});

// init
renderList();
