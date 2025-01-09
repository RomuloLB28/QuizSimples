let currentQuestionIndex = 0;
let score = 0;
let username = "";
const questions = [
  { question: "Qual é a capital do Brasil?", options: ["Rio", "Brasília", "São Paulo"], answer: 1 },
  { question: "2 + 2 é igual a?", options: ["3", "4", "5"], answer: 1 },
  { question: "Qual é a cor do céu?", options: ["Azul", "Verde", "Roxo"], answer: 0 },
  { question: "Quantos meses tem um ano?", options: ["12", "10", "15"], answer: 0 },
  { question: "Qual é o maior planeta?", options: ["Marte", "Terra", "Júpiter"], answer: 2 },
];

// Mostra o campo de inserir nome
function showNameInput() {
  document.querySelector(".intro").style.display = "none";
  document.querySelector(".name-input").style.display = "block";
}

// Inicia o quiz
function startQuiz() {
  const usernameInput = document.getElementById("username");
  username = usernameInput.value.trim();

  if (!username) {
    alert("Por favor, insira seu nome!");
    return;
  }

  document.querySelector(".name-input").style.display = "none";
  document.querySelector(".quiz").style.display = "block";
  loadQuestion();
}

// Carrega a pergunta atual
function loadQuestion() {
  const questionObj = questions[currentQuestionIndex];
  const questionElement = document.querySelector(".question");
  const optionsElement = document.querySelector(".options");

  questionElement.textContent = questionObj.question;
  optionsElement.innerHTML = "";

  questionObj.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.textContent = option;
    button.addEventListener("click", () => checkAnswer(index));
    optionsElement.appendChild(button);
  });
}

// Verifica a resposta e avança para a próxima pergunta
function checkAnswer(selectedOption) {
  if (selectedOption === questions[currentQuestionIndex].answer) {
    score++;
  }

  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    loadQuestion();
  } else {
    endQuiz();
  }
}

// Finaliza o quiz
function endQuiz() {
  // Salva o nome e a pontuação no localStorage
  const ranking = JSON.parse(localStorage.getItem("ranking")) || [];
  ranking.push({ name: username, score });
  localStorage.setItem("ranking", JSON.stringify(ranking));
  window.location.href = "ranking.html";
}
