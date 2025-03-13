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

    console.log(`Checking answer for ${missionId}: User = ${userAnswer}, Correct = ${correctAnswer}`);
    if (userAnswer === correctAnswer) {
        console.log("Correct answer!");
        progress += 5;
        updateProgress();
        nextMission(missionId);
    } else {
        console.log("Wrong answer!");
        alert('Mauvaise réponse. Réessaie !');
    }
}

function nextMission(missionId) {
    const weekNumber = missionId.split('-')[0].replace('mission', '');
    const missionNumber = missionId.includes('-') ? parseInt(missionId.split('-')[1]) : null;

    console.log(`Hiding mission: ${missionId}`);
    document.getElementById(missionId).style.display = 'none';

    if (missionNumber && ((weekNumber === '3' && missionNumber < 5) || (weekNumber !== '3' && missionNumber < 4))) {
        const nextMissionId = `mission${weekNumber}-${missionNumber + 1}`;
        console.log(`Trying to show next mission: ${nextMissionId}`);
        const nextMission = document.getElementById(nextMissionId);
        if (nextMission) {
            nextMission.style.display = 'block';
        } else {
            console.error(`Next mission ${nextMissionId} not found`);
        }
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
        const rewardElement = document.getElementById(rewardId);
        if (rewardElement) {
            rewardElement.style.display = 'block';
            const rewardText = document.querySelector(`#${rewardId} p strong`);
            if (rewardText) inventory.push(rewardText.textContent);
            updateInventory();
            if (bossId === 'boss1') setTimeout(() => nextWeek('week1', 'week2'), 2000);
            if (bossId === 'boss2') setTimeout(() => nextWeek('week2', 'week3'), 2000);
            if (bossId === 'boss3') setTimeout(() => nextWeek('week3', 'week4'), 2000);
        } else {
            console.error(`Reward element ${rewardId} not found`);
        }
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
        const rewardElement = document.getElementById(rewardId);
        if (rewardElement) {
            rewardElement.style.display = 'block';
            const rewardText = document.querySelector(`#${rewardId} p strong`);
            if (rewardText) inventory.push(rewardText.textContent);
            updateInventory();
            if (bossId === 'boss2') setTimeout(() => nextWeek('week2', 'week3'), 2000);
        }
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
        const rewardElement = document.getElementById(rewardId);
        if (rewardElement) {
            rewardElement.style.display = 'block';
            const rewardText = document.querySelector(`#${rewardId} p strong`);
            if (rewardText) inventory.push(rewardText.textContent);
            updateInventory();
            if (bossId === 'boss4') setTimeout(() => nextWeek('week4', 'bonus'), 2000);
        }
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
    const rewardElement = document.getElementById('rewardBonus');
    if (rewardElement) {
        rewardElement.style.display = 'block';
        inventory.push('Couronne Fiscale', 'Étoile de Vision');
        updateInventory();
    }
}

function nextMission(missionId) {
    const weekNumber = missionId.split('-')[0].replace('mission', ''); // Extrait "1" de "mission1-1"
    const missionNumber = missionId.includes('-') ? parseInt(missionId.split('-')[1]) : null;

    console.log(`Hiding mission: ${missionId}`); // Debug
    document.getElementById(missionId).style.display = 'none';

    if (missionNumber && ((weekNumber === '3' && missionNumber < 5) || (weekNumber !== '3' && missionNumber < 4))) {
        const nextMissionId = `mission${weekNumber}-${missionNumber + 1}`;
        const nextMission = document.getElementById(nextMissionId);
        console.log(`Trying to show next mission: ${nextMissionId}`); // Debug
        if (nextMission) {
            nextMission.style.display = 'block';
        } else {
            console.error(`Next mission ${nextMissionId} not found`);
        }
    } else if ((missionNumber === 4 && weekNumber !== '3') || (missionNumber === 5 && weekNumber === '3')) {
        const bossId = `boss${weekNumber}`;
        const boss = document.getElementById(bossId);
        console.log(`Showing boss: ${bossId}`); // Debug
        if (boss) {
            boss.style.display = 'block';
        } else {
            console.error(`Boss ${bossId} not found`);
        }
    }
}

function nextWeek(currentWeek, nextWeek) {
    document.getElementById(currentWeek).style.display = 'none';
    const nextWeekElement = document.getElementById(nextWeek);
    if (nextWeekElement) {
        nextWeekElement.style.display = 'block';
    } else {
        console.error(`Next week element ${nextWeek} not found`);
    }
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
    progress = Math.min(progress, 100); // Limite à 100%
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
