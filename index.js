// Configuração do Canvas
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Definindo o carro e obstáculos
const carWidth = 50, carHeight = 100;
let carX = canvas.width / 2 - carWidth / 2;
let carY = canvas.height - carHeight - 10;
const carSpeed = 5;

const obstacleWidth = 50, obstacleHeight = 100;
let obstacles = [];
const obstacleSpeed = 4;

// Variáveis de controle do jogo
let gameInterval;
let gameOver = false;
let score = 0;

// Função para desenhar o carro
function drawCar() {
    ctx.fillStyle = 'blue';
    ctx.fillRect(carX, carY, carWidth, carHeight);
}

// Função para desenhar os obstáculos
function drawObstacles() {
    ctx.fillStyle = 'red';
    obstacles.forEach(obstacle => {
        ctx.fillRect(obstacle.x, obstacle.y, obstacleWidth, obstacleHeight);
    });
}

// Função para movimentar os obstáculos
function moveObstacles() {
    obstacles.forEach(obstacle => {
        obstacle.y += obstacleSpeed;
    });
    
    // Remover obstáculos que saíram da tela
    obstacles = obstacles.filter(obstacle => obstacle.y < canvas.height);
}

// Função para gerar novos obstáculos
function generateObstacle() {
    const xPosition = Math.random() * (canvas.width - obstacleWidth);
    obstacles.push({
        x: xPosition,
        y: -obstacleHeight
    });
}

// Função para detectar colisões
function checkCollisions() {
    for (let i = 0; i < obstacles.length; i++) {
        const obstacle = obstacles[i];
        if (carX < obstacle.x + obstacleWidth &&
            carX + carWidth > obstacle.x &&
            carY < obstacle.y + obstacleHeight &&
            carY + carHeight > obstacle.y) {
            gameOver = true;
            clearInterval(gameInterval); // Para o jogo ao colidir
            alert("Game Over! Pontuação: " + score);
            return;
        }
    }
}

// Função para atualizar a pontuação
function updateScore() {
    score += 1;
    ctx.font = '20px Arial';
    ctx.fillStyle = 'white';
    ctx.fillText('Pontuação: ' + score, 10, 30);
}

// Função para atualizar o jogo a cada intervalo
function gameLoop() {
    if (gameOver) return;

    // Limpar a tela
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Desenhar o carro e obstáculos
    drawCar();
    drawObstacles();

    // Movimentar obstáculos
    moveObstacles();

    // Verificar colisões
    checkCollisions();

    // Atualizar pontuação
    updateScore();
}

// Função para controlar a movimentação do carro
document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowLeft' && carX > 0) {
        carX -= carSpeed;
    }
    if (event.key === 'ArrowRight' && carX < canvas.width - carWidth) {
        carX += carSpeed;
    }
});

// Função para iniciar o jogo
function startGame() {
    score = 0;
    gameOver = false;
    obstacles = [];
    carX = canvas.width / 2 - carWidth / 2;
    gameInterval = setInterval(function() {
        if (!gameOver) {
            generateObstacle();
            gameLoop();
        }
    }, 1000 / 60); // 60 FPS
}

// Começar o jogo
startGame();
