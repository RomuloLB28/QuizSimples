let currentQuestionIndex = 0;
let score = 0;
let username = "";
const questions = [
  { question: "Qual é a capital do Brasil?", options: ["Rio", "Brasília", "São Paulo"], answer: 1, image: "imagens/imagem1.jpeg" },
  { question: "2 + 2 é igual a?", options: ["3", "4", "5"], answer: 1, image: "imagens/imagem2.jpg" },
  { question: "Qual é a cor do céu?", options: ["Azul", "Verde", "Roxo"], answer: 0, image: "imagens/imagem3.jpg" },
  { question: "Quantos meses tem um ano?", options: ["12", "10", "15"], answer: 0, image: "imagens/imagem4.jpg" },
  { question: "Qual é o maior planeta?", options: ["Marte", "Terra", "Júpiter"], answer: 2, image: "imagens/imagem5.jpg" },
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

function loadQuestion() {
  const questionElement = document.querySelector(".question");
  const imageElement = document.querySelector(".question-image"); // Elemento de imagem
  const optionsContainer = document.querySelector(".options");

  const currentQuestion = questions[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;
  imageElement.src = currentQuestion.image || ""; // Atualiza a imagem, se houver
  optionsContainer.innerHTML = ""; // Limpa as opções anteriores

  currentQuestion.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.textContent = option;
    button.classList.add("option-button");
    button.dataset.index = index; // Salva o índice da opção
    button.onclick = () => checkAnswer(index, button); // Passa o índice para a função
    optionsContainer.appendChild(button);
  });
}


// Fala a pergunta e todas as opções
function speakAll() {
  const questionText = document.querySelector(".question").innerText;
  const options = [...document.querySelectorAll(".option-button")].map(option => option.innerText);
  const fullText = `${questionText}. As opções são: ${options.join(", ")}`; // Concatena pergunta e opções
  speakText(fullText);
}

// Converte qualquer texto em áudio
function speakText(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'pt-BR'; // Configura o idioma para português
  window.speechSynthesis.speak(utterance);
}

function checkAnswer(selectedIndex, buttonElement) {
  const correctAnswer = questions[currentQuestionIndex].answer;
  const optionsContainer = document.querySelector(".options");

  // Desativar todos os botões
  const buttons = optionsContainer.querySelectorAll("button");
  buttons.forEach(btn => (btn.disabled = true));

  // Aplicar estilo de acordo com a resposta
  if (selectedIndex === correctAnswer) {
    buttonElement.classList.add("correct"); // Verde para correto
    score++;
  } else {
    buttonElement.classList.add("incorrect"); // Vermelho para incorreto

    // Destacar a resposta correta
    buttons.forEach(btn => {
      if (btn.dataset.index == correctAnswer) {
        btn.classList.add("correct");
      }
    });
  }

  // Avançar para a próxima pergunta após 2 segundos
  setTimeout(() => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      loadQuestion();
    } else {
      endQuiz();
    }
  }, 2000);
}

// Finaliza o quiz
function endQuiz() {
  // Salva o nome e a pontuação no localStorage
  const ranking = JSON.parse(localStorage.getItem("ranking")) || [];
  ranking.push({ name: username, score });
  localStorage.setItem("ranking", JSON.stringify(ranking));
  window.location.href = "ranking.html";
}
