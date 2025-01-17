document.addEventListener("DOMContentLoaded", () => {
    const rankingTable = document.getElementById("rankingTable");
    const ranking = JSON.parse(localStorage.getItem("ranking")) || [];
  
    rankingTable.innerHTML = ranking
      .map((entry) => `<tr><td>${entry.name}</td><td>${entry.score}</td></tr>`)
      .join("");
  });
  