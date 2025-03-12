function startQuest() {
    document.getElementById('welcome').style.display = 'none';
    document.getElementById('week1').style.display = 'block';
}

function checkAnswer(answer, missionId) {
    if (missionId === 'mission1' && answer === 'Bitcoin') {
        alert('Correct ! Bitcoin est décentralisé.');
        document.getElementById('mission1').style.display = 'none';
        document.getElementById('mission2').style.display = 'block';
    } else if (missionId === 'boss1' && answer === '2FA') {
        alert('Victoire ! Le Dragon est vaincu.');
        document.getElementById('boss1').style.display = 'none';
        document.getElementById('reward1').style.display = 'block';
    } else {
        alert('Erreur ! Réessaie, aventurier.');
    }
}

function checkPassword() {
    const password = document.getElementById('password').value;
    if (password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password)) {
        alert('Excellent mot de passe ! Le Forgeron est satisfait.');
        document.getElementById('mission2').style.display = 'none';
        document.getElementById('boss1').style.display = 'block';
    } else {
        alert('Trop faible ! Ajoute des majuscules et chiffres.');
    }
}

function nextWeek() {
    document.getElementById('week1').style.display = 'none';
    document.getElementById('week2').style.display = 'block';
}
