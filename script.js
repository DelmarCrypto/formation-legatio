// script.js
let progress = 0;
let inventory = {
    BTC: 0,
    ETH: 0,
    DOGE: 0
};

const adventureMusic = document.getElementById('adventureMusic');
const winSound = document.getElementById('winSound');
const wrongSound = document.getElementById('wrongSound');

function updateProgress(points) {
    progress += points;
    document.getElementById('progress').value = progress;
    document.getElementById('progress-text').textContent = `Progression : ${Math.min(progress, 110)}%`;
}

function updateInventory(crypto, amount) {
    inventory[crypto] += amount;
    const inventoryList = document.getElementById('inventory-list');
    inventoryList.innerHTML = `
        <li><img src="https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=029" alt="BTC"> ${inventory.BTC} BTC</li>
        <li><img src="https://cryptologos.cc/logos/ethereum-eth-logo.png?v=029" alt="ETH"> ${inventory.ETH} ETH</li>
        <li><img src="https://cryptologos.cc/logos/dogecoin-doge-logo.png?v=029" alt="DOGE"> ${inventory.DOGE} DOGE</li>
    `;
}

function startQuest() {
    document.getElementById('welcome').style.display = 'none';
    document.getElementById('week1').style.display = 'block';
    adventureMusic.play();
}

function checkAnswer(answer, missionId) {
    const correctAnswers = {
        'mission1-1': 'Décentralisation',
        'mission2-1': 'Ethereum',
        'meme-bonus-1': 'Dogecoin'
    };
    if (answer === correctAnswers[missionId]) {
        winSound.play();
        updateProgress(10);
        document.getElementById(missionId).style.display = 'none';
        const nextMission = document.getElementById(missionId).nextElementSibling;
        if (nextMission && nextMission.classList.contains('mission')) {
            nextMission.style.display = 'block';
        } else if (missionId === 'boss1') {
            document.getElementById('reward1').style.display = 'block';
            updateInventory('BTC', 1);
            triggerRewardEffect('reward1');
        }
    } else {
        wrongSound.play();
        alert('Mauvaise réponse, réessaie !');
    }
}

function nextWeek(currentWeek, nextWeek) {
    document.getElementById(currentWeek).style.display = 'none';
    document.getElementById(nextWeek).style.display = 'block';
}

function triggerRewardEffect(rewardId) {
    const reward = document.getElementById(rewardId);
    reward.classList.add('reward-active');
    setTimeout(() => reward.classList.remove('reward-active'), 1000);
    // Ajout de particules via particles.js (configuré plus tôt)
    particlesJS(rewardId, {
        particles: {
            number: { value: 20 },
            color: { value: '#ffd700' },
            shape: { type: 'star' },
            size: { value: 5 },
            move: { speed: 3, direction: 'top' }
        }
    });
}

// Exemple pour une mission spécifique (à adapter pour chaque mission)
function checkPassword(missionId) {
    const password = document.getElementById('password1').value;
    if (password.length >= 12 && /\d/.test(password) && /[!@#$%]/.test(password)) {
        winSound.play();
        updateProgress(10);
        document.getElementById(missionId).style.display = 'none';
        document.getElementById('mission1-3').style.display = 'block';
    } else {
        wrongSound.play();
        alert('Mot de passe trop faible !');
    }
}
