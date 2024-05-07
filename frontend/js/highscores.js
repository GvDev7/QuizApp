const highScoresList = document.getElementById('highScoresList');
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

highScoresList.innerHTML = highScores.map( score => {
    return `<li class="list-group-item">${score.user}: ${score.score}</li>`;
}).join('');