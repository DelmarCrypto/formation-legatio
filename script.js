let progress = 0;
let inventory = [];

const adventureMusic = document.getElementById('adventureMusic');
const winSound = document.getElementById('winSound');
const wrongSound = document.getElementById('wrongSound');

// Déverrouillage audio pour certains navigateurs
document.body.addEventListener('click', () => {
    adventureMusic.play().catch(error => console.log("Erreur audio :", error));
}, { once: true });

function startQuest() {
    document.getElementById('welcome').style.display = 'none';
    document.getElementById('week1').style.display = 'block';
    document.getElementById('mission1-1').style.display = 'block';
    adventureMusic.play();
}

function checkAnswer(userAnswer, missionId) {
    const correctAnswer = {
        'mission1-1': 'Décentralisation'
    }[missionId];

    if (userAnswer === correctAnswer) {
        winSound.play();
        progress += 20;
        updateProgress();
        nextMission(missionId);
    } else {
        wrongSound.play();
        alert('Mauvaise réponse ! Réessaie.');
    }
}

function checkPassword(missionId) {
    const password = document.getElementById('password1').value;
    if (password.length >= 12 && /[0-9]/.test(password) && /[!@#$%^&*]/.test(password)) {
        winSound.play();
        progress += 20;
        updateProgress();
        nextMission(missionId);
    } else {
        wrongSound.play();
        alert('Mot de passe faible ! 12+ caractères, chiffres et symboles requis.');
    }
}

function checkCoffre(coffre, missionId) {
    if (coffre === 'Matériel') {
        winSound.play();
        progress += 20;
        updateProgress();
        nextMission(missionId);
    } else {
        wrongSound.play();
        alert('Mauvais choix ! Le coffre matériel est le plus sûr.');
    }
}

function checkPhishing(answer, missionId) {
    if (answer === 'Faux') {
        winSound.play();
        progress += 20;
        updateProgress();
        nextMission(missionId);
    } else {
        wrongSound.play();
        alert('Attention ! C’est une arnaque.');
    }
}

function checkBoss(userAnswer, bossId) {
    if (userAnswer === '2FA') {
        winSound.play();
        progress += 20;
        updateProgress();
        document.getElementById(bossId).style.display = 'none';
        document.getElementById('reward1').style.display = 'block';
        inventory.push('Crypto-Médaille du Courage');
        updateInventory();
    } else {
        wrongSound.play();
        alert('Le Dragon résiste ! Réessaie.');
    }
}

function nextMission(currentMissionId) {
    document.getElementById(currentMissionId).style.display = 'none';
    const nextIds = {
        'mission1-1': 'mission1-2',
        'mission1-2': 'mission1-3',
        'mission1-3': 'mission1-4',
        'mission1-4': 'boss1'
    };
    const nextMissionId = nextIds[currentMissionId];
    if (nextMissionId) {
        document.getElementById(nextMissionId).style.display = 'block';
    }
}

function endWeek1() {
    document.getElementById('week1').style.display = 'none';
    document.getElementById('end').style.display = 'block';
    adventureMusic.pause();
}

function restartQuest() {
    progress = 0;
    inventory = [];
    updateProgress();
    updateInventory();
    document.getElementById('end').style.display = 'none';
    document.getElementById('week1').style.display = 'none';
    document.getElementById('welcome').style.display = 'block';
    adventureMusic.currentTime = 0;
    adventureMusic.play();
}

function updateProgress() {
    progress = Math.min(progress, 100);
    document.getElementById('progress').value = progress;
    document.getElementById('progress-text').textContent = `Progression : ${progress}%`;
}

function updateInventory() {
    const inventoryList = document.getElementById('inventory-list');
    inventoryList.innerHTML = '';
    inventory.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        inventoryList.appendChild(li);
    });
}
