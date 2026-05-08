

let currentRound = null;
let reveal = false;

// flatten questions
const questions = GAME_DATA.rounds;

const qContainer = document.getElementById("questions");
const search = document.getElementById("search");
const qText = document.getElementById("qText");
const answers = document.getElementById("answers");

// render list
function render(list) {
qContainer.innerHTML = "";

list.forEach((r, i) => {
const div = document.createElement("div");
div.className = "question-card";
div.innerText = `Round ${r.id}: ${r.question}`;

div.onclick = () => loadRound(i);

qContainer.appendChild(div);
});
}

// load question
function loadRound(index) {
currentRound = questions[index];
reveal = false;

qText.innerText = currentRound.question;
renderAnswers();
}

// render answers
function renderAnswers() {
answers.innerHTML = "";

if (!currentRound) return;

currentRound.answers.forEach(a => {
const li = document.createElement("li");

li.innerText = reveal
? `${a.text} — ${a.points}`
: "???";

answers.appendChild(li);
});
}

// search
search.addEventListener("input", e => {
const val = e.target.value.toLowerCase();

const filtered = questions.filter(q =>
q.question.toLowerCase().includes(val)
);

render(filtered);
});

// reveal button
document.getElementById("revealBtn").onclick = () => {
reveal = !reveal;
renderAnswers();
};

// initial render
render(questions);
