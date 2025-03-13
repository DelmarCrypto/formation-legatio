// Variables globales
let progress = 0;
const inventory = [];

// Fonction pour charger la progression initiale
function loadProgress() {
    updateProgress();
}

// Fonction pour démarrer la quête
function startQuest() {
    console.log("startQuest appelé");
    document.getElementById('welcome').style.display = 'none';
    document.getElementById('week1').style.display = 'block';
    const adventureMusic = document.getElementById('adventureMusic');
    console.log("adventureMusic :", adventureMusic);
    adventureMusic.play().catch(error => console.log("Erreur lecture musique aventure :", error));
    progress += 5;
    updateProgress();
}

// Fonction pour vérifier les réponses des QCM
function checkAnswer(correctAnswer, missionId) {
    const userAnswer = event.target.textContent;
    const winSound = document.getElementById('winSound');
    const wrongSound = document.getElementById('wrongSound');
    console.log("checkAnswer appelé, réponse utilisateur :", userAnswer);

    if (userAnswer === correctAnswer) {
        console.log("Réponse correcte, jouer winSound");
        winSound.play().catch(error => console.log("Erreur lecture son victoire :", error));
        progress += 5;
        updateProgress();
        document.getElementById(missionId).style.display = 'none';
        const nextMissionId = missionId.replace(/\d+$/, num => parseInt(num) + 1);
        const nextMission = document.getElementById(nextMissionId);
        if (nextMission) {
            nextMission.style.display = 'block';
        } else {
            document.getElementById(missionId.replace('mission', 'boss')).style.display = 'block';
        }
    } else {
        console.log("Mauvaise réponse, jouer wrongSound");
        wrongSound.play().catch(error => console.log("Erreur lecture son erreur :", error));
        alert("Mauvaise réponse ! Réessaie.");
    }
}

// Fonction pour vérifier le mot de passe (Semaine 1, Mission 2)
function checkPassword(missionId) {
    const password = document.getElementById('password1').value;
    const winSound = document.getElementById('winSound');
    const wrongSound = document.getElementById('wrongSound');

    if (password.length >= 12 && /[0-9]/.test(password) && /[!@#$%^&*]/.test(password)) {
        winSound.play();
        progress += 5;
        updateProgress();
        document.getElementById(missionId).style.display = 'none';
        document.getElementById('mission1-3').style.display = 'block';
    } else {
        wrongSound.play();
        alert("Le mot de passe doit avoir au moins 12 caractères, inclure des chiffres et des symboles !");
    }
}

// Fonction pour vérifier le choix du coffre (Semaine 1, Mission 3)
function checkCoffre(correctCoffre, missionId) {
    const userCoffre = event.target.textContent.split(' ')[1];
    const winSound = document.getElementById('winSound');
    const wrongSound = document.getElementById('wrongSound');

    if (userCoffre === correctCoffre) {
        winSound.play();
        progress += 5;
        updateProgress();
        document.getElementById(missionId).style.display = 'none';
        document.getElementById('mission1-4').style.display = 'block';
    } else {
        wrongSound.play();
        alert("Ce coffre est moins sûr. Réessaie !");
    }
}

// Fonction pour vérifier le phishing (Semaine 1, Mission 4)
function checkPhishing(correctAnswer, missionId) {
    const userAnswer = event.target.textContent;
    const winSound = document.getElementById('winSound');
    const wrongSound = document.getElementById('wrongSound');

    if (userAnswer === correctAnswer) {
        winSound.play();
        progress += 5;
        updateProgress();
        document.getElementById(missionId).style.display = 'none';
        document.getElementById('boss1').style.display = 'block';
    } else {
        wrongSound.play();
        alert("Mauvaise réponse ! Réessaie.");
    }
}

// Fonction pour vérifier les réponses des boss
function checkBoss(correctAnswer, bossId) {
    const userAnswer = event.target.textContent;
    const winSound = document.getElementById('winSound');
    const wrongSound = document.getElementById('wrongSound');

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
        alert("Mauvaise réponse ! Réessaie.");
    }
}

// Fonction pour vérifier le style (Semaine 2, Mission 2)
function checkStyle(userStyle, missionId) {
    const winSound = document.getElementById('winSound');
    winSound.play();
    progress += 5;
    updateProgress();
    document.getElementById(missionId).style.display = 'none';
    document.getElementById('mission2-3').style.display = 'block';
}

// Fonction pour vérifier le marché (Semaine 2, Mission 3)
function checkMarket(correctMarket, missionId) {
    const userMarket = event.target.textContent;
    const winSound = document.getElementById('winSound');
    const wrongSound = document.getElementById('wrongSound');

    if (userMarket === correctMarket) {
        winSound.play();
        progress += 5;
        updateProgress();
        document.getElementById(missionId).style.display = 'none';
        document.getElementById('mission2-4').style.display = 'block';
    } else {
        wrongSound.play();
        alert("Ce marché est moins sûr. Réessaie !");
    }
}

// Fonction pour vérifier les frais (Semaine 2, Mission 4)
function checkFees(missionId) {
    const userFees = document.getElementById('fees').value;
    const winSound = document.getElementById('winSound');
    const wrongSound = document.getElementById('wrongSound');

    if (userFees == 0.5) {
        winSound.play();
        progress += 5;
        updateProgress();
        document.getElementById(missionId).style.display = 'none';
        document.getElementById('boss2').style.display = 'block';
    } else {
        wrongSound.play();
        alert("Faux ! Les frais sont 0,5 €. Réessaie.");
    }
}

// Fonction pour vérifier la raison (Semaine 2, Boss)
function checkReason(bossId) {
    const reason = document.getElementById('reason').value;
    const winSound = document.getElementById('winSound');
    const wrongSound = document.getElementById('wrongSound');

    if (reason.split(' ').length <= 3 && reason.trim() !== '') {
        winSound.play();
        progress += 10;
        updateProgress();
        document.getElementById(bossId).style.display = 'none';
        document.getElementById('reward2').style.display = 'block';
        inventory.push(document.querySelector('#reward2 p strong').textContent);
        updateInventory();
    } else {
        wrongSound.play();
        alert("Ta réponse doit être en 3 mots maximum ! Réessaie.");
    }
}

// Fonction pour vérifier le type de portefeuille (Semaine 3, Mission 2)
function checkWalletType(correctType, missionId) {
    const userType = event.target.textContent;
    const winSound = document.getElementById('winSound');
    const wrongSound = document.getElementById('wrongSound');

    if (userType === correctType) {
        winSound.play();
        progress += 5;
        updateProgress();
        document.getElementById(missionId).style.display = 'none';
        document.getElementById('mission3-3').style.display = 'block';
    } else {
        wrongSound.play();
        alert("Ce type de portefeuille est moins sûr. Réessaie !");
    }
}

// Fonction pour activer 2FA (Semaine 3, Mission 3)
function activate2FA(correctChoice, missionId) {
    const userChoice = event.target.textContent;
    const winSound = document.getElementById('winSound');
    const wrongSound = document.getElementById('wrongSound');

    if (userChoice === correctChoice) {
        winSound.play();
        progress += 5;
        updateProgress();
        document.getElementById(missionId).style.display = 'none';
        document.getElementById('mission3-4').style.display = 'block';
    } else {
        wrongSound.play();
        alert("Mauvaise réponse ! Réessaie.");
    }
}

// Fonction pour vérifier la sauvegarde (Semaine 3, Mission 4)
function checkBackup(correctBackup, missionId) {
    const userBackup = event.target.textContent;
    const winSound = document.getElementById('winSound');
    const wrongSound = document.getElementById('wrongSound');

    if (userBackup === correctBackup) {
        winSound.play();
        progress += 5;
        updateProgress();
        document.getElementById(missionId).style.display = 'none';
        document.getElementById('mission3-5').style.display = 'block';
    } else {
        wrongSound.play();
        alert("Ce n'est pas sécurisé. Réessaie !");
    }
}

// Fonction pour transférer BTC (Semaine 3, Mission 5)
function transferBTC(missionId) {
    const winSound = document.getElementById('winSound');
    winSound.play();
    progress += 5;
    updateProgress();
    document.getElementById(missionId).style.display = 'none';
    document.getElementById('boss3').style.display = 'block';
}

// Fonction pour vérifier la méthode d'achat (Semaine 4, Mission 1)
function checkPurchaseMethod(correctMethod, missionId) {
    const userMethod = event.target.textContent;
    const winSound = document.getElementById('winSound');
    const wrongSound = document.getElementById('wrongSound');

    if (userMethod === correctMethod) {
        winSound.play();
        progress += 5;
        updateProgress();
        document.getElementById(missionId).style.display = 'none';
        document.getElementById('mission4-2').style.display = 'block';
    } else {
        wrongSound.play();
        alert("Ce n'est pas la meilleure méthode. Réessaie !");
    }
}

// Fonction pour vérifier le dépôt (Semaine 4, Mission 2)
function checkDeposit(missionId) {
    const userDeposit = document.getElementById('deposit').value;
    const winSound = document.getElementById('winSound');
    const wrongSound = document.getElementById('wrongSound');

    if (userDeposit == 500) {
        winSound.play();
        progress += 5;
        updateProgress();
        document.getElementById(missionId).style.display = 'none';
        document.getElementById('mission4-3').style.display = 'block';
    } else {
        wrongSound.play();
        alert("Faux ! Le dépôt doit être de 500 €. Réessaie.");
    }
}

// Fonction pour lancer le dé (Semaine 4, Mission 3)
function rollDice(missionId) {
    const diceResult = Math.floor(Math.random() * 10) + 1;
    document.getElementById('diceResult').textContent = `Résultat du dé : ${diceResult}%`;
    const winSound = document.getElementById('winSound');
    winSound.play();
    progress += 5;
    updateProgress();
    setTimeout(() => {
        document.getElementById(missionId).style.display = 'none';
        document.getElementById('mission4-4').style.display = 'block';
    }, 1000);
}

// Fonction pour diversifier (Semaine 4, Mission 4)
function diversify(crypto, missionId) {
    const winSound = document.getElementById('winSound');
    winSound.play();
    progress += 5;
    updateProgress();
    document.getElementById(missionId).style.display = 'none';
    document.getElementById('boss4').style.display = 'block';
}

// Fonction pour vérifier la stratégie (Semaine 4, Boss)
function checkStrategy(bossId) {
    const strategy = document.getElementById('strategy').value;
    const winSound = document.getElementById('winSound');
    const wrongSound = document.getElementById('wrongSound');

    if (strategy.split(' ').length <= 5 && strategy.trim() !== '') {
        winSound.play();
        progress += 10;
        updateProgress();
        document.getElementById(bossId).style.display = 'none';
        document.getElementById('reward4').style.display = 'block';
        inventory.push(document.querySelector('#reward4 p strong').textContent);
        updateInventory();
    } else {
        wrongSound.play();
        alert("Ta stratégie doit être en 5 mots maximum ! Réessaie.");
    }
}

// Fonction pour vérifier la taxe (Bonus, Quête 1)
function checkTax(missionId) {
    const userTax = document.getElementById('tax').value;
    const winSound = document.getElementById('winSound');
    const wrongSound = document.getElementById('wrongSound');

    if (userTax == 100) {
        winSound.play();
        progress += 5;
        updateProgress();
        document.getElementById(missionId).style.display = 'none';
        document.getElementById('bonus2').style.display = 'block';
    } else {
        wrongSound.play();
        alert("Faux ! La taxe est de 100 €. Réessaie.");
    }
}

// Fonction pour vérifier le destin (Bonus, Quête 2)
function checkDestiny(userDestiny, missionId) {
    const winSound = document.getElementById('winSound');
    winSound.play();
    progress += 5;
    updateProgress();
    document.getElementById(missionId).style.display = 'none';
    document.getElementById('rewardBonus').style.display = 'block';
    inventory.push("Couronne Fiscale");
    inventory.push("Étoile de Vision");
    updateInventory();
}

// Fonction pour passer à la semaine suivante
function nextWeek(currentWeek, nextWeek) {
    const winSound = document.getElementById('winSound');
    winSound.play();
    document.getElementById(currentWeek).style.display = 'none';
    document.getElementById(nextWeek).style.display = 'block';
    progress += 5;
    updateProgress();
}

// Fonction pour terminer la quête
function endQuest() {
    const winSound = document.getElementById('winSound');
    winSound.play();
    document.getElementById('bonus').style.display = 'none';
    document.getElementById('end').style.display = 'block';
    progress = 100;
    updateProgress();
}

// Fonction pour recommencer la quête
function restartQuest() {
    progress = 0;
    inventory.length = 0;
    updateProgress();
    updateInventory();
    document.getElementById('end').style.display = 'none';
    document.getElementById('welcome').style.display = 'block';
    const adventureMusic = document.getElementById('adventureMusic');
    adventureMusic.currentTime = 0;
    adventureMusic.play();
}

// Fonction pour mettre à jour la barre de progression
function updateProgress() {
    const progressBar = document.getElementById('progress');
    const progressText = document.getElementById('progress-text');
    progressBar.value = progress;
    progressText.textContent = `Progression : ${progress}%`;
}

// Fonction pour mettre à jour l'inventaire
function updateInventory() {
    const inventoryList = document.getElementById('inventory-list');
    inventoryList.innerHTML = '';
    inventory.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        inventoryList.appendChild(li);
    });
}

// Déverrouiller l'audio après une interaction utilisateur
document.addEventListener('click', function unlockAudio() {
    const adventureMusic = document.getElementById('adventureMusic');
    const winSound = document.getElementById('winSound');
    const wrongSound = document.getElementById('wrongSound');
    adventureMusic.load();
    winSound.load();
    wrongSound.load();
    document.removeEventListener('click', unlockAudio); // Ne s'exécute qu'une fois
}, { once: true });
