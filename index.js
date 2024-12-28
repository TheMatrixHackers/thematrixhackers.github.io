const matrixEffect = document.querySelector('.matrix-effect');
const symbols = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890@#$%^&*()_+";

function randomSymbol() {
  return symbols.charAt(Math.floor(Math.random() * symbols.length));
}

function createSymbolLine() {
  const line = document.createElement('div');
  for (let i = 0; i < window.innerWidth / 50; i++) {
    const symbolSpan = document.createElement('span');
    symbolSpan.textContent = randomSymbol();
    line.appendChild(symbolSpan);
  }
  matrixEffect.appendChild(line);
}

function animateSymbols() {
  const lines = document.querySelectorAll('.matrix-effect div');
  lines.forEach(line => {
    const spans = line.querySelectorAll('span');
    spans.forEach(span => span.textContent = randomSymbol());
  });
}

// Create initial lines
for (let i = 0; i < window.innerHeight / 20; i++) {
  createSymbolLine();
}

setInterval(animateSymbols, 300);

// Typing effect
const elonMuskText = "``People are mistaken when they think that technology just automatically improves. It does not automatically improve. It only improves if a lot of people work very hard to make it better, and actually it will, I think, by itself degrade, actually´´ Elon-Musk ";
const additionalText = "``We think the same way about science, as well as about the P-vs-NP problem.´´";
const matrixText = "``No one can tell you what the matrix is, you have to see it for yourself, this is your chance, choose the blue pill and you will live a normal life doing what you want and believing what you believe about the universe, or choose the red pill and work with us to understand the truth of the universe.´´";

let charIndex = 0;
let currentText = elonMuskText;
let isFirstTextComplete = false;
let isSecondTextComplete = false;

function showPillButtons() {
    const pillButtons = document.querySelector('.pill-buttons');
    pillButtons.style.display = 'flex';
    pillButtons.style.opacity = '0';
    setTimeout(() => {
        pillButtons.style.transition = 'opacity 1s ease';
        pillButtons.style.opacity = '1';
    }, 100);
}

function typeText() {
    const centerText = document.querySelector('.center-text');
    if (charIndex < currentText.length) {
        centerText.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        
        // Check if we're at the point where "blue pill" is mentioned in the matrix text
        if (isSecondTextComplete && currentText === matrixText && 
            currentText.substring(0, charIndex).includes("blue pill")) {
            showPillButtons();
        }
        
        setTimeout(typeText, 200);
    } else if (!isFirstTextComplete) {
        isFirstTextComplete = true;
        charIndex = 0;
        currentText = additionalText;
        setTimeout(typeText, 3000);
    } else if (!isSecondTextComplete) {
        isSecondTextComplete = true;
        charIndex = 0;
        currentText = matrixText;
        setTimeout(typeText, 3000);
    }
}

// Start typing effect after a short delay
setTimeout(typeText, 1000);
