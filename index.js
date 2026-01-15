// Animal categorization data
const animalCategories = {
    "Land Animals": {
        correct: ["Tortoise", "Giraffe", "Rhinoceros", "Okapi", "Panda", "Ostrich", "Elephant", "Capybara"],
        incorrect: ["Beetle", "Mollusk", "Ostrich", "Crocodile"],
        page: "land animals.html"
    },
    "Air Animals": {
        correct: ["Eagle", "Dove", "Pigeon", "Owl", "Beetle", "Penguin", "Goose"],
        incorrect: ["Seal", "Crocodile", "Ostrich", "Capybara", "Mollusk", "Iguana", "Tortoise"],
        page: "air animals.html"
    },
    "Water Animals": {
        correct: ["Turtle", "Crocodile", "Manta Ray", "Dolphin", "Mollusk", "Seal", "Penguin", "Stingray"],
        incorrect: ["Ostrich", "Iguana", "Tortoise", "Rhinoceros", "Elephant", "Panda", "Giraffe"],
        page: "water animals.html"
    }
};

// Initialize event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Category button navigation on home page
    const categoryButtons = document.querySelectorAll('.category-btn');
    categoryButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('data-target');
            window.location.href = target;
        });
    });

    // Animal card interaction on category pages
    const animalCards = document.querySelectorAll('.animal-card');
    if (animalCards.length > 0) {
        initializeGamePage();
    }
});

// Initialize game page with animal interactions
function initializeGamePage() {
    const animalCards = document.querySelectorAll('.animal-card');
    const pageTitle = document.querySelector('h1').textContent;
    
    let correctCount = 0;
    let totalAnimals = animalCards.length;
    let answered = new Set();

    // Create feedback counter
    const feedbackDiv = document.createElement('div');
    feedbackDiv.id = 'feedback-panel';
    feedbackDiv.style.cssText = 'margin: 20px auto; padding: 15px 30px; background: rgba(255, 255, 255, 0.9); border-radius: 10px; font-size: 1.1rem; font-weight: 600; min-width: 300px;';
    feedbackDiv.textContent = `Correct: 0/${totalAnimals}`;
    
    document.body.insertBefore(feedbackDiv, document.querySelector('.animal-grid'));

    // Add interactivity to each animal card
    animalCards.forEach((card, index) => {
        card.style.cursor = 'pointer';
        card.style.transition = 'transform 0.2s ease, filter 0.2s ease';
        
        const img = card.querySelector('.animal-img');
        const animalName = img.getAttribute('alt');

        card.addEventListener('click', function() {
            if (answered.has(index)) return; // Already answered

            answered.add(index);
            
            // Check if animal belongs in this category
            const isCorrect = checkAnimal(animalName, pageTitle);
            
            if (isCorrect) {
                correctCount++;
                card.style.filter = 'brightness(0.7) saturate(0.5)';
                card.style.opacity = '0.6';
                showMessage(`✓ ${animalName} belongs here!`, 'correct', card);
            } else {
                card.style.filter = 'brightness(1.2) grayscale(100%)';
                showMessage(`✗ ${animalName} doesn't belong here!`, 'incorrect', card);
            }
            
            // Update feedback
            feedbackDiv.textContent = `Correct: ${correctCount}/${totalAnimals}`;
            feedbackDiv.style.color = correctCount === totalAnimals ? '#2d8f85' : '#333';
            
            // Check if game is complete
            if (answered.size === totalAnimals) {
                setTimeout(() => showGameComplete(correctCount, totalAnimals), 500);
            }
        });

        card.addEventListener('mouseover', function() {
            if (!answered.has(index)) {
                this.style.transform = 'scale(1.05)';
            }
        });

        card.addEventListener('mouseout', function() {
            if (!answered.has(index)) {
                this.style.transform = 'scale(1)';
            }
        });
    });
}

// Check if animal belongs in the current category
function checkAnimal(animalName, categoryName) {
    const category = animalCategories[categoryName];
    if (!category) return false;
    
    return category.correct.some(animal => 
        animal.toLowerCase() === animalName.toLowerCase()
    );
}

// Show temporary message on animal card
function showMessage(message, type, element) {
    const messageEl = document.createElement('div');
    messageEl.textContent = message;
    messageEl.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: ${type === 'correct' ? '#84fab0' : '#ff6b6b'};
        color: ${type === 'correct' ? '#2d8f85' : '#8b0000'};
        padding: 10px 20px;
        border-radius: 8px;
        font-weight: 600;
        pointer-events: none;
        z-index: 10;
    `;
    
    element.style.position = 'relative';
    element.appendChild(messageEl);
    
    setTimeout(() => messageEl.remove(), 1500);
}

// Show completion message
function showGameComplete(correct, total) {
    const percentage = Math.round((correct / total) * 100);
    let message = '';
    
    if (percentage === 100) {
        message = '🎉 Perfect Score! You got them all right!';
    } else if (percentage >= 80) {
        message = '🌟 Excellent work! Great job!';
    } else if (percentage >= 60) {
        message = '👍 Good effort! Keep learning about animals!';
    } else {
        message = '📚 Not quite! Try again and learn more about animals!';
    }
    
    const completeDiv = document.createElement('div');
    completeDiv.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        padding: 40px;
        border-radius: 20px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
        text-align: center;
        z-index: 1000;
        max-width: 400px;
    `;
    
    completeDiv.innerHTML = `
        <h2 style="margin-bottom: 15px; color: #1f4f5a;">${message}</h2>
        <p style="font-size: 1.3rem; margin-bottom: 20px; color: #333;">Score: ${correct}/${total} (${percentage}%)</p>
        <button onclick="location.href='index.html'" style="
            padding: 12px 30px;
            font-size: 1rem;
            background: linear-gradient(180deg, #2d8f85, #1f6f68);
            color: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 600;
        ">Return to Home</button>
    `;
    
    document.body.appendChild(completeDiv);
}
