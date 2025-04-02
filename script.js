// script.js
document.addEventListener('DOMContentLoaded', () => {
    let coins = 0;
    let multiplier = 1;
    let petName = '';

    // Имитация загрузки
    setTimeout(() => {
        document.getElementById('loading-screen').classList.add('hidden');
        document.getElementById('start-screen').classList.remove('hidden');
    }, 2000);

    // Начало игры
    document.getElementById('start-btn').addEventListener('click', () => {
        document.getElementById('start-screen').classList.add('hidden');
        document.getElementById('name-screen').classList.remove('hidden');
    });

    // Подтверждение имени
    document.getElementById('confirm-name').addEventListener('click', () => {
        petName = document.getElementById('pet-name').value;
        if (petName.trim() !== '') {
            document.getElementById('name-screen').classList.add('hidden');
            document.getElementById('pet-selection').classList.remove('hidden');
        }
    });

    // Выбор питомца
    document.querySelectorAll('.pet-card').forEach(card => {
        card.addEventListener('click', () => {
            const petType = card.dataset.pet;
            document.getElementById('selected-pet').src = `images/${petType}.png`;
            document.getElementById('pet-selection').classList.add('hidden');
            document.getElementById('game-screen').classList.remove('hidden');
        });
    });

    // Клик по питомцу
    document.getElementById('selected-pet').addEventListener('click', () => {
        coins += multiplier;
        updateStats();
        showCoinAnimation();
    });

    // Покупка множителей
    document.querySelectorAll('.shop-item').forEach(item => {
        item.addEventListener('click', () => {
            const newMultiplier = parseFloat(item.dataset.multiplier);
            const cost = getMultiplierCost(newMultiplier);
            
            if (coins >= cost) {
                coins -= cost;
                multiplier = newMultiplier;
                updateStats();
            }
        });
    });

    function updateStats() {
        document.getElementById('coins').textContent = `Монеты: ${Math.floor(coins)}`;
        document.getElementById('multiplier').textContent = `Множитель: ${multiplier}x`;
    }

    function getMultiplierCost(multiplier) {
        const costs = {
            '1.2': 100,
            '1.5': 200,
            '2.0': 500
        };
        return costs[multiplier.toString()];
    }

    function showCoinAnimation() {
        const coin = document.createElement('div');
        coin.className = 'coin-animation';
        coin.textContent = '+' + multiplier;
        document.getElementById('pet-container').appendChild(coin);
        
        setTimeout(() => {
            coin.remove();
        }, 1000);
    }
});
