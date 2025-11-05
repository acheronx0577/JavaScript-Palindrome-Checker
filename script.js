const textInput = document.getElementById("text-input");
const checkButton = document.getElementById("check-btn");
const resultDiv = document.getElementById("result");

const checkPalindrome = (input) => {
    const originalInput = input;
    
    // Test 4: Alert when empty input
    if (input === "") {
        alert("Please input a value");
        return;
    }
    
    // Remove previous result and show output panel
    resultDiv.replaceChildren();
    const outputPanel = document.getElementById("output");
    outputPanel.classList.remove('hide');
    
    // Clean the input: convert to lowercase and remove non-alphanumeric characters
    const cleanedInput = input.toLowerCase().replace(/[^a-z0-9]/g, "");
    
    // Check if it's a palindrome
    const isPalindrome = cleanedInput === [...cleanedInput].reverse().join("");
    
    // Create result message - EXACT format required by tests
    const resultMsg = document.createElement("p");
    resultMsg.innerHTML = `<strong>${originalInput}</strong> ${isPalindrome ? 'is' : 'is not'} a palindrome`;
    resultDiv.appendChild(resultMsg);
    
    // Update styling based on result
    resultDiv.className = isPalindrome ? "analysis-valid" : "analysis-invalid";
    
    // Update output status
    const outputStatus = document.querySelector('.output-status');
    outputStatus.textContent = isPalindrome ? 'PALINDROME' : 'NOT_PALINDROME';
    outputStatus.style.color = isPalindrome ? '#00ff9d' : '#ff4444';
    outputStatus.style.borderColor = isPalindrome ? '#00ff9d' : '#ff4444';
};

// Event Listeners
checkButton.addEventListener("click", () => {
    checkPalindrome(textInput.value);
});

// Add Enter key functionality
textInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        checkPalindrome(textInput.value);
    }
});

// Character count update
textInput.addEventListener("input", () => {
    const charCount = document.getElementById("char-count");
    const count = textInput.value.length;
    charCount.textContent = count;
    charCount.style.color = count > 0 ? '#b467ff' : 'var(--text-dim)';
});

// Initialize character count
document.addEventListener('DOMContentLoaded', function() {
    const charCount = document.getElementById("char-count");
    charCount.textContent = "0";
});
