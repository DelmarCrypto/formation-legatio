let progress = 0;
let inventory = [];

const adventureMusic = document.getElementById('adventureMusic');
const winSound = document.getElementById('winSound');
const wrongSound = document.getElementById('wrongSound');

// Déverrouillage de l'audio pour Safari et autres navigateurs
document.body.addEventListener('click', () => {
    adventureMusic.play().catch(error => {
        console.log("Erreur lors de la lecture de la musique : ", error);
    });
}, { once: true });

function startQuest() {
    document.getElementById('welcome').style.display = 'none';
    document.getElementById('week1').style.display = 'block';
    adventureMusic.play();
}

function checkAnswer(userAnswer, missionId) {
    const correctAnswer = {
        'mission1-1': 'Décentralisation',
        'mission2-1': 'Ethereum',
        'mission3-1': 'Une adresse'
    }[missionId];

    if (userAnswer === correctAnswer) {
        winSound.play();
        progress += 5;
        updateProgress();
        nextMission(missionId);
    } else {
        wrongSound.play();
        alert('Mauvaise réponse. Réessaie !');
    }
}

function checkPassword(missionId) {
    const password = document.getElementById('password1').value;
    if (password.length >= 12 && /[0-9]/.test(password) && /[!@#$%^&*]/.test(password)) {
        winSound.play();
        progress += 5;
        updateProgress();
        nextMission(missionId);
    } else {
        wrongSound.play();
        alert('Ton mot de passe doit contenir au moins 12 caractères, des chiffres et des symboles !');
    }
}

function checkCoffre(coffre, missionId) {
    if (coffre === 'Matériel') {
        winSound.play();
        progress += 5;
        updateProgress();
        nextMission(missionId);
    } else {
        wrongSound.play();
        alert('Mauvais choix. Le coffre matériel est le plus sécurisé !');
    }
}

function checkPhishing(answer, missionId) {
    if (answer === 'Faux') {
        winSound.play();
        progress += 5;
        updateProgress();
        nextMission(missionId);
    } else {
        wrongSound.play();
        alert('Mauvaise réponse. Les offres trop belles sont souvent des arnaques !');
    }
}

function checkBoss(userAnswer, bossId) {
    const correctAnswer = {
        'boss1': '2FA',
        'boss3': 'Email'
    }[bossId];

    if (userAnswer === correctAnswer) {
        winSound.play();
        progress += 10;
        updateProgress();
        document.getElementById(bossId).style.display = 'none';
        const rewardId = 'reward' + bossId.replace('boss', '');
        document.getElementById(rewardId).style.display = 'block';
        inventory.push(document.querySelector(`#${rewardId} p strong`).textContent);
        updateInventory();
    } else {
        wrongSound.play();
        alert('Mauvaise réponse. Réessaie !');
    }
}

function checkStyle(style, missionId) {
    winSound.play();
    progress += 5;
    updateProgress();
    nextMission(missionId);
}

function checkMarket(market, missionId) {
    if (market === 'Sécurité') {
        winSound.play();
        progress += 5;
        updateProgress();
        nextMission(missionId);
    } else {
        wrongSound.play();
        alert('Mauvais choix. La sécurité est essentielle !');
    }
}

function checkFees(missionId) {
    const fees = document.getElementById('fees').value;
    if (fees == 0.5) {
        winSound.play();
        progress += 5;
        updateProgress();
        nextMission(missionId);
    } else {
        wrongSound.play();
        alert('Mauvaise réponse. Les frais sont de 0,5 € pour 100 € à 0,5 %.');
    }
}

function checkReason(bossId) {
    const reason = document.getElementById('reason').value;
    if (reason.split(' ').length <= 3) {
        winSound.play();
        progress += 10;
        updateProgress();
        document.getElementById(bossId).style.display = 'none';
        const rewardId = 'reward' + bossId.replace('boss', '');
        document.getElementById(rewardId).style.display = 'block';
        inventory.push(document.querySelector(`#${rewardId} p strong`).textContent);
        updateInventory();
    } else {
        wrongSound.play();
        alert('Ta réponse doit contenir 3 mots maximum !');
    }
}

function checkWalletType(type, missionId) {
    if (type === 'Matériel') {
        winSound.play();
        progress += 5;
        updateProgress();
        nextMission(missionId);
    } else {
        wrongSound.play();
        alert('Mauvais choix. Le portefeuille matériel est le plus sécurisé !');
    }
}

function activate2FA(answer, missionId) {
    if (answer === 'Oui') {
        winSound.play();
        progress += 5;
        updateProgress();
        nextMission(missionId);
    } else {
        wrongSound.play();
        alert('Mauvaise réponse. Activer 2FA est essentiel !');
    }
}

function checkBackup(backup, missionId) {
    if (backup === 'USB') {
        winSound.play();
        progress += 5;
        updateProgress();
        nextMission(missionId);
    } else {
        wrongSound.play();
        alert('Mauvais choix. Le Cloud est trop risqué !');
    }
}

function transferBTC(missionId) {
    winSound.play();
    progress += 5;
    updateProgress();
    nextMission(missionId);
}

function checkPurchaseMethod(method, missionId) {
    if (method === 'Plateformes') {
        winSound.play();
        progress += 5;
        updateProgress();
        nextMission(missionId);
    } else {
        wrongSound.play();
        alert('Les plateformes sont souvent le meilleur choix pour débuter !');
    }
}

function checkDeposit(missionId) {
    const deposit = document.getElementById('deposit').value;
    if (deposit == 500) {
        winSound.play();
        progress += 5;
        updateProgress();
        nextMission(missionId);
    } else {
        wrongSound.play();
        alert('Mauvaise réponse. Le prix est de 500 € pour 0,01 BTC.');
    }
}

function rollDice(missionId) {
    const result = Math.floor(Math.random() * 6) + 1;
    document.getElementById('diceResult').textContent = `Résultat : ${result}`;
    if (result >= 3) {
        winSound.play();
        progress += 5;
        updateProgress();
        nextMission(missionId);
    } else {
        wrongSound.play();
        alert('Tu as perdu 10 % de ton trésor. Réessaie !');
    }
}

function diversify(crypto, missionId) {
    winSound.play();
    progress += 5;
    updateProgress();
    nextMission(missionId);
}

function checkStrategy(bossId) {
    const strategy = document.getElementById('strategy').value;
    if (strategy.split(' ').length <= 5) {
        winSound.play();
        progress += 10;
        updateProgress();
        document.getElementById(bossId).style.display = 'none';
        const rewardId = 'reward' + bossId.replace('boss', '');
        document.getElementById(rewardId).style.display = 'block';
        inventory.push(document.querySelector(`#${rewardId} p strong`).textContent);
        updateInventory();
    } else {
        wrongSound.play();
        alert('Ta stratégie doit contenir 5 mots maximum !');
    }
}

function checkTax(missionId) {
    const tax = document.getElementById('tax').value;
    if (tax == 100) {
        winSound.play();
        progress += 5;
        updateProgress();
        nextMission(missionId);
    } else {
        wrongSound.play();
        alert('Mauvaise réponse. 20 % de 500 € = 100 €.');
    }
}

function checkDestiny(destiny, missionId) {
    winSound.play();
    progress += 5;
    updateProgress();
    document.getElementById(missionId).style.display = 'none';
    document.getElementById('rewardBonus').style.display = 'block';
    inventory.push('Couronne Fiscale', 'Étoile de Vision');
    updateInventory();
}

function nextMission(missionId) {
    const missionNumber = parseInt(missionId.split('-')[1] || missionId.split('mission')[1]);
    const weekId = missionId.split('-')[0].replace('mission', 'week');
    const nextMissionId = `${weekId}-${missionNumber + 1}`;
    const nextMission = document.getElementById(`mission${nextMissionId}`);

    document.getElementById(missionId).style.display = 'none';
    if (nextMission) {
        nextMission.style.display = 'block';
    } else {
        const bossId = `boss${weekId.replace('week', '')}`;
        const boss = document.getElementById(bossId);
        if (boss) {
            boss.style.display = 'block';
        }
    }
}

function nextWeek(currentWeek, nextWeek) {
    document.getElementById(currentWeek).style.display = 'none';
    document.getElementById(nextWeek).style.display = 'block';
}

function endQuest() {
    document.getElementById('bonus').style.display = 'none';
    document.getElementById('end').style.display = 'block';
    adventureMusic.pause();
}

function restartQuest() {
    progress = 0;
    inventory = [];
    updateProgress();
    updateInventory();
    document.getElementById('end').style.display = 'none';
    document.getElementById('welcome').style.display = 'block';
    adventureMusic.currentTime = 0;
    adventureMusic.play();
}

function updateProgress() {
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
