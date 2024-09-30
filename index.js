const coin = document.getElementById('coin');
const boy = document.getElementById('boy');
const car = document.getElementById('car');
const scoreDisplay = document.getElementById('score');

let score = 0;
let boyPosition = 125;
let gameInterval;
let gameSpeed = 5.8;

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft' && boyPosition > 0) {
        boyPosition -= 20;
    } else if (event.key === 'ArrowRight' && boyPosition < 250) {
        boyPosition += 20;
    }
    boy.style.left = `${boyPosition}px`;
});
function startGame() {
    resetObject(coin);
    resetObject(car);

    gameInterval = setInterval(() => {
        moveObject(coin);
        moveObject(car);
        checkCollision();
    }, 20);
}
function moveObject(object) {
    let objectTop = parseInt(window.getComputedStyle(object).getPropertyValue('top'));

    if (objectTop >= 600) {
        resetObject(object);
    } else {
        object.style.top = `${objectTop + gameSpeed}px`;
    }
}
function resetObject(object) {
    object.style.top = '-50px';
    object.style.left = `${Math.floor(Math.random() * 270)}px`;
}
function checkCollision() {
    let boyRect = boy.getBoundingClientRect();
    let coinRect = coin.getBoundingClientRect();
    let carRect = car.getBoundingClientRect();

    // Collision with coin
    if (boyRect.left < coinRect.right &&
        boyRect.right > coinRect.left &&
        boyRect.top < coinRect.bottom &&
        boyRect.bottom > coinRect.top) {
        score++;
        scoreDisplay.textContent = score;
        resetObject(coin);
    }

    // Collision with car
    if (boyRect.left < carRect.right &&
        boyRect.right > carRect.left &&
        boyRect.top < carRect.bottom &&
        boyRect.bottom > carRect.top) {
        clearInterval(gameInterval);
        alert('Game Over! Your Score: ' + score);
        window.location.reload();
    }
}
startGame();
