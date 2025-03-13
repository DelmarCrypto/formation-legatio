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
        'mission1-1': 'Décentralisation',
        'mission2-1': 'Ethereum'
    }[missionId];

    if (userAnswer === correctAnswer) {
        winSound.play();
        progress += 10; // 10% par étape, 10 étapes au total (5 par semaine)
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
        progress += 10;
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
        progress += 10;
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
        progress += 10;
        updateProgress();
        nextMission(missionId);
    } else {
        wrongSound.play();
        alert('Attention ! C’est une arnaque.');
    }
}

function checkBoss(userAnswer, bossId) {
    const correctAnswer = {
        'boss1': '2FA',
        'boss2': null // Géré par checkReason pour boss2
    }[bossId];

    if (userAnswer === correctAnswer) {
        winSound.play();
        progress += 10;
        updateProgress();
        document.getElementById(bossId).style.display = 'none';
        document.getElementById('reward1').style.display = 'block';
        inventory.push('Crypto-Médaille du Courage');
        updateInventory();
    } else {
        wrongSound.play();
        alert('Le boss résiste ! Réessaie.');
    }
}

function checkStyle(style, missionId) {
    winSound.play();
    progress += 10;
    updateProgress();
    nextMission(missionId);
}

function checkMarket(market, missionId) {
    if (market === 'Sécurité') {
        winSound.play();
        progress += 10;
        updateProgress();
        nextMission(missionId);
    } else {
        wrongSound.play();
        alert('Mauvais choix ! La sécurité est essentielle.');
    }
}

function checkFees(missionId) {
    const fees = document.getElementById('fees').value;
    if (fees == 0.5) {
        winSound.play();
        progress += 10;
        updateProgress();
        nextMission(missionId);
    } else {
        wrongSound.play();
        alert('Faux ! Les frais sont de 0,5 €.');
    }
}

function checkReason(bossId) {
    const reason = document.getElementById('reason').value;
    if (reason.split(' ').length <= 3) {
        winSound.play();
        progress += 10;
        updateProgress();
        document.getElementById(bossId).style.display = 'none';
        document.getElementById('reward2').style.display = 'block';
        inventory.push('Clé d’Or du Marché');
        updateInventory();
    } else {
        wrongSound.play();
        alert('Trop long ! 3 mots maximum.');
    }
}

function nextMission(currentMissionId) {
    document.getElementById(currentMissionId).style.display = 'none';
    const nextIds = {
        'mission1-1': 'mission1-2',
        'mission1-2': 'mission1-3',
        'mission1-3': 'mission1-4',
        'mission1-4': 'boss1',
        'mission2-1': 'mission2-2',
        'mission2-2': 'mission2-3',
        'mission2-3': 'mission2-4',
        'mission2-4': 'boss2'
    };
    const nextMissionId = nextIds[currentMissionId];
    if (nextMissionId) {
        document.getElementById(nextMissionId).style.display = 'block';
    }
}

function nextWeek(currentWeek, nextWeek) {
    document.getElementById(currentWeek).style.display = 'none';
    document.getElementById(nextWeek).style.display = 'block';
    document.getElementById(`mission${nextWeek.replace('week', '')}-1`).style.display = 'block';
}

function endWeek2() {
    document.getElementById('week2').style.display = 'none';
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
    document.getElementById('week2').style.display = 'none';
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
