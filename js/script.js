const dino = document.querySelector('.dino');
const background = document.querySelector('.background');

let isJumping = false;
let position = 0;
let score = 0;

function handleKeyDown(event) {
    if (event.keyCode === 32) {
        if (!isJumping) {
            jump();
        }
    }
}

function jump() {
    isJumping = true;

    let upInterval = setInterval(() => {
        if (position >= 150) {
            clearInterval(upInterval);

            // Descendo
            let downInterval = setInterval(() => {
                if (position <= 0) {
                    clearInterval(downInterval);
                    isJumping = false;
                } else {
                    position -= 20;
                    dino.style.bottom = position + 'px';
                }
            }, 20)
        } else {
            // Subindo
            position += 20;
            dino.style.bottom = position + 'px';
        }
    }, 25);
}

function createCactus() {
    const cactus = document.createElement('div');
    let cactusPosition = 1000;
    let randomTime = Math.random() * 1000 + 500;

    cactus.classList.add('cactus');
    cactus.style.left = 1000 + 'px';
    background.appendChild(cactus);

    let leftInterval = setInterval(() => {
        if (cactusPosition < -60) {
            clearInterval(leftInterval);
            background.removeChild(cactus);
            score += 10
        } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {
            //Game over
            clearInterval(leftInterval);
            document.body.innerHTML = '<div class="game-over"><h1>Fim de jogo</h1><p>Sua pontuação: ' + score + '</p></div>';
        } else {
            cactusPosition -= 10;
            cactus.style.left = cactusPosition + 'px';
        }
    }, 20);
    setTimeout(createCactus, randomTime);
}

function createBirds() {
    const birds = document.createElement('div');
    let birdsPosition = 1000;
    let randomTime = Math.random() * 2000 + 2000;
    let yAxis = Math.random() * 120 + 150;

    birds.classList.add('birds');
    birds.style.bottom = yAxis + 'px';
    birds.style.left = 1000 + 'px';
    background.appendChild(birds);

    let leftInterval = setInterval(() => {
        if (birdsPosition < -60) {
            clearInterval(leftInterval);
            background.removeChild(birds);
        } else {
            birdsPosition -= 10;
            birds.style.left = birdsPosition + 'px';
        }
    }, 22);
    setTimeout(createBirds, randomTime);
}

function createClouds() {
    const cloud = document.createElement('div');
    let randomTime = Math.random() * 1150;
    let yAxis = Math.random() * 120 + 250;
    let cloudPosition = 1000;

    cloud.classList.add('cloud');
    cloud.style.bottom = yAxis + 'px';
    cloud.style.left = 1000 + 'px';
    background.appendChild(cloud);
    
    let leftInterval = setInterval(() => {
        if (cloudPosition < -300) {
            clearInterval(leftInterval);
            background.removeChild(cloud);
        } else {
            cloudPosition -= 10;
            cloud.style.left = cloudPosition + 'px';
        }
    }, 28);
    setTimeout(createClouds, randomTime);
}

createBirds();
createClouds();
createCactus();
document.addEventListener('keydown', handleKeyDown);