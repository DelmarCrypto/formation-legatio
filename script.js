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
    const normalizedUserAnswer = userAnswer.trim().toLowerCase();
    const correctAnswers = {
        'mission1-1': 'décentralisation',
        'mission2-1': 'ethereum',
        'mission3-1': 'une adresse',
        'mission4-1': 'registre décentralisé'
    };
    const correctAnswer = correctAnswers[missionId];

    if (normalizedUserAnswer === correctAnswer) {
        winSound.play();
        progress += 5; // 20 étapes pour les semaines (4 × 5) = 100%
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
        progress += 5;
        updateProgress();
        nextMission(missionId);
    } else {
        wrongSound.play();
        alert('Mot de passe faible ! 12+ caractères, chiffres et symboles requis.');
    }
}

function checkCoffre(coffre, missionId) {
    if (coffre.toLowerCase() === 'matériel') {
        winSound.play();
        progress += 5;
        updateProgress();
        nextMission(missionId);
    } else {
        wrongSound.play();
        alert('Mauvais choix ! Le coffre matériel est le plus sûr.');
    }
}

function checkPhishing(answer, missionId) {
    if (answer.toLowerCase() === 'faux') {
        winSound.play();
        progress += 5;
        updateProgress();
        nextMission(missionId);
    } else {
        wrongSound.play();
        alert('Attention ! C’est une arnaque.');
    }
}

function checkBoss(userAnswer, bossId) {
    const correctAnswer = {
        'boss1': '2fa',
        'boss3': 'email',
        'boss4': 'centralisation'
    }[bossId];

    if (userAnswer.toLowerCase() === correctAnswer) {
        winSound.play();
        progress += 5;
        updateProgress();
        document.getElementById(bossId).style.display = 'none';
        const rewardId = `reward${bossId.replace('boss', '')}`;
        document.getElementById(rewardId).style.display = 'block';
        const rewards = {
            'boss1': 'Crypto-Médaille du Courage',
            'boss2': 'Clé d’Or du Marché',
            'boss3': 'Cristal de Protection',
            'boss4': 'Sceptre de la Blockchain'
        };
        inventory.push(rewards[bossId]);
        updateInventory();
    } else {
        wrongSound.play();
        alert('Le boss résiste ! Réessaie.');
    }
}

function checkStyle(style, missionId) {
    winSound.play();
    progress += 5;
    updateProgress();
    nextMission(missionId);
}

function checkMarket(market, missionId) {
    if (market.toLowerCase() === 'sécurité') {
        winSound.play();
        progress += 5;
        updateProgress();
        nextMission(missionId);
    } else {
        wrongSound.play();
        alert('Mauvais choix ! La sécurité est essentielle.');
    }
}

function checkFees(missionId) {
    const fees = document.getElementById('fees').value;
    if (parseFloat(fees) === 0.5) {
        winSound.play();
        progress += 5;
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
        progress += 5;
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

function checkWalletType(type, missionId) {
    if (type.toLowerCase() === 'matériel') {
        winSound.play();
        progress += 5;
        updateProgress();
        nextMission(missionId);
    } else {
        wrongSound.play();
        alert('Mauvais choix ! Le matériel est le plus sûr.');
    }
}

function activate2FA(answer, missionId) {
    if (answer.toLowerCase() === 'oui') {
        winSound.play();
        progress += 5;
        updateProgress();
        nextMission(missionId);
    } else {
        wrongSound.play();
        alert('Erreur ! 2FA est essentiel.');
    }
}

function checkBackup(backup, missionId) {
    if (backup.toLowerCase() === 'usb') {
        winSound.play();
        progress += 5;
        updateProgress();
        nextMission(missionId);
    } else {
        wrongSound.play();
        alert('Mauvais choix ! Le Cloud est risqué.');
    }
}

function transferBTC(missionId) {
    winSound.play();
    progress += 5;
    updateProgress();
    nextMission(missionId);
}

function checkBlocks(missionId) {
    const blocks = document.getElementById('blocks').value;
    if (parseInt(blocks) === 6) {
        winSound.play();
        progress += 5;
        updateProgress();
        nextMission(missionId);
    } else {
        wrongSound.play();
        alert('Faux ! Il faut 6 blocs pour confirmer une transaction Bitcoin.');
    }
}

function checkProof(proof, missionId) {
    if (proof.toLowerCase() === 'preuve de travail') {
        winSound.play();
        progress += 5;
        updateProgress();
        nextMission(missionId);
    } else {
        wrongSound.play();
        alert('Mauvais choix ! Bitcoin utilise la preuve de travail.');
    }
}

function checkSpeed(blockchain, missionId) {
    if (blockchain.toLowerCase() === 'solana') {
        winSound.play();
        progress += 5;
        updateProgress();
        nextMission(missionId);
    } else {
        wrongSound.play();
        alert('Mauvais choix ! Solana est plus rapide que Bitcoin.');
    }
}

function exploreBlock(missionId) {
    winSound.play();
    progress += 5;
    updateProgress();
    nextMission(missionId);
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
        'mission2-4': 'boss2',
        'mission3-1': 'mission3-2',
        'mission3-2': 'mission3-3',
        'mission3-3': 'mission3-4',
        'mission3-4': 'mission3-5',
        'mission3-5': 'boss3',
        'mission4-1': 'mission4-2',
        'mission4-2': 'mission4-3',
        'mission4-3': 'mission4-4',
        'mission4-4': 'mission4-5',
        'mission4-5': 'boss4',
        'bonus-tax-1': 'bonus-tax-2',
        'bonus-tax-2': 'bonus-tax-3'
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

function endWeek3() {
    document.getElementById('week3').style.display = 'none';
    document.getElementById('end').style.display = 'block';
    adventureMusic.pause();
}

function endWeek4() {
    document.getElementById('week4').style.display = 'none';
    document.getElementById('end').style.display = 'block';
    adventureMusic.pause();
}

function startBonus() {
    document.getElementById('week4').style.display = 'none';
    document.getElementById('bonus-tax').style.display = 'block';
    document.getElementById('bonus-tax-1').style.display = 'block';
    adventureMusic.play();
}

function checkTaxAnswer(answer, missionId) {
    if (answer.toLowerCase() === 'oui') {
        winSound.play();
        progress += 3.33; // 3 missions × 3.33% = 10% bonus
        updateProgress();
        nextMission(missionId);
    } else {
        wrongSound.play();
        alert('Faux ! La déclaration est obligatoire.');
    }
}

function checkTaxGain(missionId) {
    const gain = document.getElementById('tax-gain').value;
    if (parseFloat(gain) === 20000) {
        winSound.play();
        progress += 3.33;
        updateProgress();
        nextMission(missionId);
    } else {
        wrongSound.play();
        alert('Faux ! Le gain imposable est de 20 000 €.');
    }
}

function checkTaxStrategy(strategy, missionId) {
    if (strategy.toLowerCase() === 'défiscalisation') {
        winSound.play();
        progress += 3.33;
        updateProgress();
        document.getElementById(missionId).style.display = 'none';
        document.getElementById('bonus-tax-reward').style.display = 'block';
        inventory.push('Bouclier Fiscal');
        updateInventory();
    } else {
        wrongSound.play();
        alert('Mauvais choix ! L’évasion fiscale est illégale.');
    }
}

function endGame() {
    document.getElementById('bonus-tax').style.display = 'none';
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
    document.getElementById('week3').style.display = 'none';
    document.getElementById('week4').style.display = 'none';
    document.getElementById('bonus-tax').style.display = 'none';
    document.getElementById('welcome').style.display = 'block';
    adventureMusic.currentTime = 0;
    adventureMusic.play();
}

function updateProgress() {
    progress = Math.min(progress, 110);
    document.getElementById('progress').value = progress;
    document.getElementById('progress-text').textContent = `Progression : ${Math.round(progress)}%`;
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
