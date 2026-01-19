// Animal categorization data
const animalCategories = {
    "Land Animals": ["Iguana", "Tortoise", "Giraffe", "Rhinoceros", "Okapi", "Panda", "Elephant", "Capybara"],
    "Air Animals": ["Eagle", "Dove", "Pigeon", "Owl", "Beetle", "Penguin", "Goose"],
    "Water Animals": ["Turtle", "Crocodile", "Manta Ray", "Dolphin", "Mollusk", "Seal", "Penguin", "Stingray"]
};

// Initialize event listeners when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Category button navigation on home page
    const categoryButtons = document.querySelectorAll('.category-btn');
    if (categoryButtons.length > 0) {
        categoryButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const target = this.getAttribute('data-target');
                window.location.href = target;
            });
        });
    }

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
    
    //Total correct answers
    let correctCount = 0;
    let totalCorrect = animalCategories[pageTitle].length;
    let answered = new Set();

    // Users progress
    const feedbackDiv = document.createElement('div');
    feedbackDiv.id = 'feedback-panel';
    feedbackDiv.style.cssText = 'margin: 20px auto; padding: 15px 30px; background: rgba(255, 255, 255, 0.9); border-radius: 10px; font-size: 1.1rem; font-weight: 600; min-width: 300px;';
    feedbackDiv.textContent = `Correct: 0/${totalCorrect}`;
    
    document.body.insertBefore(feedbackDiv, document.querySelector('.animal-grid'));

    // Add interactivity to each animal card
        animalCards.forEach((card, index) => {
        card.style.cursor = 'pointer';
        card.style.transition = 'transform 0.2s ease, filter 0.2s ease, opacity 0.2s ease';
        card.style.position = 'relative';
        
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
                card.style.opacity = '0.7';
                showMessage(`✗ ${animalName} doesn't belong here!`, 'incorrect', card);
            }
            
            // Correct answers
            // Correct answers
            feedbackDiv.textContent = `Correct: ${correctCount}/${totalCorrect}`;
            feedbackDiv.style.color = correctCount === totalCorrect ? '#2d8f85' : '#333';
            
            // Check if game is complete (all correct answers found)
            if (correctCount === totalCorrect) {
                setTimeout(() => showGameComplete(correctCount, totalCorrect), 800);
            }
        });

        card.addEventListener('mouseover', function() {
            if (!answered.has(index)) {
                this.style.transform = 'scale(1.08)';
                this.style.filter = 'brightness(1.1)';
            }
        });

        card.addEventListener('mouseout', function() {
            if (!answered.has(index)) {
                this.style.transform = 'scale(1)';
                this.style.filter = 'brightness(1)';
            }
        });
    });
}

// Check if animal belongs in the current category using if-else
function checkAnimal(animalName, categoryName) {
    const animals = animalCategories[categoryName];
    
    if (!animals) {
        return false;
    } else if (categoryName === "Land Animals") {
        if (animals.some(animal => animal.toLowerCase() === animalName.toLowerCase())) {
            return true;
        } else {
            return false;
        }
    } else if (categoryName === "Air Animals") {
        if (animals.some(animal => animal.toLowerCase() === animalName.toLowerCase())) {
            return true;
        } else {
            return false;
        }
    } else if (categoryName === "Water Animals") {
        if (animals.some(animal => animal.toLowerCase() === animalName.toLowerCase())) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

// Message display for correct/incorrect answers
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
        padding: 6px 10px;
        border-radius: 6px;
        font-weight: 600;
        pointer-events: none;
        z-index: 10;
        font-size: 0.6rem;
        white-space: nowrap;
    `;
    
    element.appendChild(messageEl);
    
    setTimeout(() => messageEl.remove(), 1500);
}

// Result display when the player completes the game
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
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        text-align: center;
        z-index: 1000;
        max-width: 450px;
        animation: slideInScale 0.4s ease-out;
    `;
    
    completeDiv.innerHTML = `
        <h2 style="margin-bottom: 15px; color: #1f4f5a; font-size: 1.8rem;">${message}</h2>
        <p style="font-size: 1.4rem; margin-bottom: 25px; color: #333; font-weight: 600;">Score: ${correct}/${total} (${percentage}%)</p>
        <button onclick="location.href='index.html'" style="
            padding: 14px 35px;
            font-size: 1rem;
            background: linear-gradient(180deg, #2d8f85, #1f6f68);
            color: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 600;
            transition: transform 0.2s ease, filter 0.2s ease;
        " onmouseover="this.style.transform='translateY(-2px)'; this.style.filter='brightness(1.1)'" onmouseout="this.style.transform='translateY(0)'; this.style.filter='brightness(1)'">
            Return to Home
        </button>
    `;
    
    document.body.appendChild(completeDiv);
    
    // Add animation keyframes
    if (!document.querySelector('style[data-game-animation]')) {
        const style = document.createElement('style');
        style.setAttribute('data-game-animation', 'true');
        style.textContent = `
            @keyframes slideInScale {
                from {
                    opacity: 0;
                    transform: translate(-50%, -50%) scale(0.8);
                }
                to {
                    opacity: 1;
                    transform: translate(-50%, -50%) scale(1);
                }
            }
        `;
        document.head.appendChild(style);
    }
}