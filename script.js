// Sons
const victorySound = document.getElementById('victorySound');
const errorSound = document.getElementById('errorSound');
const backgroundMusic = document.getElementById('backgroundMusic');

// Gestion de la progression
function saveProgress(currentSection) {
    localStorage.setItem('cryptoQuestProgress', currentSection);
}

function loadProgress() {
    const progress = localStorage.getItem('cryptoQuestProgress');
    if (progress) {
        document.getElementById('welcome').style.display = 'none';
        document.getElementById(progress).style.display = 'block';
    }
    backgroundMusic.play(); // Joue la musique de fond au chargement
}

function startQuest() {
    document.getElementById('welcome').style.display = 'none';
    document.getElementById('week1').style.display = 'block';
    saveProgress('week1');
    backgroundMusic.play();
}

function nextWeek(currentWeek, nextWeek) {
    document.getElementById(currentWeek).style.display = 'none';
    document.getElementById(nextWeek).style.display = 'block';
    saveProgress(nextWeek);
}

function endQuest() {
    document.getElementById('bonus').style.display = 'none';
    document.getElementById('end').style.display = 'block';
    saveProgress('end');
    backgroundMusic.pause(); // Arrête la musique à la fin
}

// Semaine 1
function checkAnswer(answer, missionId) {
    if (missionId === 'mission1-1' && answer === 'Décentralisation') {
        alert('Correct ! Bitcoin est décentralisé.');
        victorySound.play();
        document.getElementById('mission1-1').style.display = 'none';
        document.getElementById('mission1-2').style.display = 'block';
    } else if (missionId === 'mission2-1' && answer === 'Ethereum') {
        alert('Correct ! Ethereum est la magie des contrats intelligents.');
        victorySound.play();
        document.getElementById('mission2-1').style.display = 'none';
        document.getElementById('mission2-2').style.display = 'block';
    } else if (missionId === 'mission3-1' && answer === 'Une adresse') {
        alert('Correct ! La clé publique est ton adresse publique.');
        victorySound.play();
        document.getElementById('mission3-1').style.display = 'none';
        document.getElementById('mission3-2').style.display = 'block';
    } else {
        alert('Erreur ! Réessaie, aventurier.');
        errorSound.play();
    }
}

function checkPassword(missionId) {
    const password = document.getElementById('password1').value;
    if (password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password)) {
        alert('Superbe bouclier ! Le Forgeron 2FA approuve.');
        victorySound.play();
        document.getElementById(missionId).style.display = 'none';
        document.getElementById('mission1-3').style.display = 'block';
    } else {
        alert('Trop faible ! Ajoute 8+ caractères, une majuscule et un chiffre.');
        errorSound.play();
    }
}

function checkCoffre(choice, missionId) {
    alert(`Tu as choisi le ${choice} ! Chaque coffre a ses forces.`);
    victorySound.play();
    document.getElementById(missionId).style.display = 'none';
    document.getElementById('mission1-4').style.display = 'block';
}

function checkPhishing(answer, missionId) {
    if (answer === 'Faux') {
        alert('Bien vu ! Les Bandits du Phishing ne t’auront pas.');
        victorySound.play();
        document.getElementById(missionId).style.display = 'none';
        document.getElementById('boss1').style.display = 'block';
    } else {
        alert('Attention ! C’est un piège.');
        errorSound.play();
    }
}

function checkBoss(answer, missionId) {
    if (missionId === 'boss1' && answer === '2FA') {
        alert('Victoire ! Le Dragon s’incline.');
        victorySound.play();
        document.getElementById('boss1').style.display = 'none';
        document.getElementById('reward1').style.display = 'block';
    } else if (missionId === 'boss2' && answer === 'Any') {
        alert('Le Géant approuve ta sagesse !');
        victorySound.play();
        document.getElementById('boss2').style.display = 'none';
        document.getElementById('reward2').style.display = 'block';
    } else if (missionId === 'boss3' && answer === 'Email') {
        alert('Victoire ! Le Titan des Clés est vaincu.');
        victorySound.play();
        document.getElementById('boss3').style.display = 'none';
        document.getElementById('reward3').style.display = 'block';
    } else if (missionId === 'boss4' && answer === 'Any') {
        alert('Le Kraken salue ta stratégie !');
        victorySound.play();
        document.getElementById('boss4').style.display = 'none';
        document.getElementById('reward4').style.display = 'block';
    } else {
        alert('Mauvaise réponse ! Réessaie.');
        errorSound.play();
    }
}

// Semaine 2
function checkStyle(choice, missionId) {
    alert(`Tu es un aventurier ${choice === 'Rapide' ? 'audacieux' : 'patient'} !`);
    victorySound.play();
    document.getElementById(missionId).style.display = 'none';
    document.getElementById('mission2-3').style.display = 'block';
}

function checkMarket(choice, missionId) {
    alert(`Tu privilégies ${choice} ! Bonne stratégie.`);
    victorySound.play();
    document.getElementById(missionId).style.display = 'none';
    document.getElementById('mission2-4').style.display = 'block';
}

function checkFees(missionId) {
    const fees = document.getElementById('fees').value;
    if (fees == 0.5) {
        alert('Correct ! 0,5 % de 100 € = 0,50 €.');
        victorySound.play();
        document.getElementById(missionId).style.display = 'none';
        document.getElementById('boss2').style.display = 'block';
    } else {
        alert('Erreur ! Calcule encore.');
        errorSound.play();
    }
}

function checkReason(missionId) {
    const reason = document.getElementById('reason').value;
    if (reason.split(' ').length >= 3) {
        checkBoss('Any', missionId);
    } else {
        alert('Il faut au moins 3 mots !');
        errorSound.play();
    }
}

// Semaine 3
function checkWalletType(choice, missionId) {
    if (choice === 'Matériel') {
        alert('Correct ! Les portefeuilles matériels sont les plus sécurisés.');
        victorySound.play();
        document.getElementById(missionId).style.display = 'none';
        document.getElementById('mission3-3').style.display = 'block';
    } else {
        alert('Pas tout à fait ! Les portefeuilles matériels sont les meilleurs.');
        errorSound.play();
    }
}

function activate2FA(choice, missionId) {
    if (choice === 'Oui') {
        alert('Bien joué ! 2FA renforce ta tour.');
        victorySound.play();
        document.getElementById(missionId).style.display = 'none';
        document.getElementById('mission3-4').style.display = 'block';
    } else {
        alert('Erreur ! 2FA est essentiel.');
        errorSound.play();
    }
}

function checkBackup(choice, missionId) {
    if (choice === 'USB') {
        alert('Correct ! Une sauvegarde hors ligne est sûre.');
        victorySound.play();
        document.getElementById(missionId).style.display = 'none';
        document.getElementById('mission3-5').style.display = 'block';
    } else {
        alert('Danger ! Le cloud est risqué.');
        errorSound.play();
    }
}

function transferBTC(missionId) {
    alert('Transfert réussi ! 10 BTC fictifs sont en sécurité.');
    victorySound.play();
    document.getElementById(missionId).style.display = 'none';
    document.getElementById('boss3').style.display = 'block';
}

// Semaine 4
function checkPurchaseMethod(choice, missionId) {
    alert(`Tu choisis ${choice} ! Chaque méthode a ses avantages.`);
    victorySound.play();
    document.getElementById(missionId).style.display = 'none';
    document.getElementById('mission4-2').style.display = 'block';
}

function checkDeposit(missionId) {
    const deposit = document.getElementById('deposit').value;
    if (deposit >= 500) {
        alert('Achat réussi ! 0,01 BTC est à toi.');
        victorySound.play();
        document.getElementById(missionId).style.display = 'none';
        document.getElementById('mission4-3').style.display = 'block';
    } else {
        alert('Pas assez ! Il faut au moins 500 €.');
        errorSound.play();
    }
}

function rollDice(missionId) {
    const roll = Math.floor(Math.random() * 20) + 1; // 1 à 20%
    document.getElementById('diceResult').innerText = `Résultat : -${roll}% ! Que fais-tu ?`;
    setTimeout(() => {
        alert(`Ton trésor a chuté de ${roll}%. Reste calme et avance !`);
        victorySound.play();
        document.getElementById(missionId).style.display = 'none';
        document.getElementById('mission4-4').style.display = 'block';
    }, 1000);
}

function diversify(choice, missionId) {
    alert(`${choice} ajouté ! Ton portefeuille est plus équilibré.`);
    victorySound.play();
    document.getElementById(missionId).style.display = 'none';
    document.getElementById('boss4').style.display = 'block';
}

function checkStrategy(missionId) {
    const strategy = document.getElementById('strategy').value;
    if (strategy.split(' ').length >= 5) {
        checkBoss('Any', missionId);
    } else {
        alert('Il faut au moins 5 mots !');
        errorSound.play();
    }
}

// Quêtes Bonus
function checkTax(missionId) {
    const tax = document.getElementById('tax').value;
    if (tax == 100) {
        alert('Correct ! 20 % de 500 € = 100 €. Le Roi est satisfait.');
        victorySound.play();
        document.getElementById(missionId).style.display = 'none';
        document.getElementById('bonus2').style.display = 'block';
    } else {
        alert('Erreur ! Recalcule : 20 % de 500 €.');
        errorSound.play();
    }
}

function checkDestiny(choice, missionId) {
    alert(`Tu as choisi ${choice === 'Investir' ? 'la patience' : 'l’agilité'} ! L’Oracle te sourit.`);
    victorySound.play();
    document.getElementById(missionId).style.display = 'none';
    document.getElementById('rewardBonus').style.display = 'block';
}
