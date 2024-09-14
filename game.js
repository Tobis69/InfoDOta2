let score = 0;
let time = 30;
let gameInterval;
let moleTimeout;

document.getElementById('start-btn').addEventListener('click', startGame);

function startGame() {
    score = 0;
    time = 30;
    document.getElementById('score').innerText = score;
    document.getElementById('time').innerText = time;
    gameInterval = setInterval(updateTime, 1000);
    spawnMole();
}

function hitMole(event) {
    if (event.target.classList.contains('mole-img')) {
        score++;
        document.getElementById('score').innerText = score;
        event.target.style.opacity = '0'; // робимо крота прозорим (він зникає)
        setTimeout(() => {
            event.target.style.opacity = '1'; // повертаємо прозорість для наступного крота
        }, 500);
    }
}

function spawnMole() {
    const holes = document.querySelectorAll('.hole');
    const randomHole = holes[Math.floor(Math.random() * holes.length)];
    const mole = randomHole.querySelector('.mole-img');
    mole.style.opacity = '1'; // робимо крота видимим

    // Додаємо обробник події для кліку по кроту
    mole.addEventListener('click', hitMole);

    moleTimeout = setTimeout(() => {
        mole.style.opacity = '0'; // кріт зникає через секунду
        if (time > 0) spawnMole(); // продовжуємо, якщо час не закінчився
    }, 1000); // кріт з'являється кожну секунду
}

function updateTime() {
    time--;
    document.getElementById('time').innerText = time;

    if (time === 0) {
        clearInterval(gameInterval);
        clearTimeout(moleTimeout);
        alert(`Гра завершена! Твої очки: ${score}`);
    }
}
