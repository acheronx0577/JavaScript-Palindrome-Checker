const textInput = document.getElementById("text-input");
const checkButton = document.getElementById("check-btn");
const resultDiv = document.getElementById("result");
const outputPanel = document.getElementById("output");
const charCount = document.getElementById("char-count");
const outputStatus = document.querySelector('.output-status');

// Unique dark theme colors
const theme = {
    valid: '#00ff9d',
    invalid: '#ff4444',
    processing: '#4488ff',
    accent: '#b467ff'
};

const checkPalindrome = (input) => {
    const originalInput = input;
    
    if (input === "") {
        showNotification("ERROR: No input detected", theme.invalid);
        return;
    }
    
    // Show processing state
    outputPanel.classList.remove('hide');
    outputStatus.textContent = 'PROCESSING';
    outputStatus.style.color = theme.processing;
    outputStatus.style.borderColor = theme.processing;
    
    resultDiv.innerHTML = '<div style="text-align: center; color: var(--text-dim); font-family: \'JetBrains Mono\', monospace;">ANALYZING_TEXT...</div>';
    checkButton.disabled = true;

    // Simulate processing delay for terminal feel
    setTimeout(() => {
        try {
            // Clean the input: convert to lowercase and remove non-alphanumeric characters
            const cleanedInput = input.toLowerCase().replace(/[^a-z0-9]/g, "");
            
            // Check if it's a palindrome
            const isPalindrome = cleanedInput === [...cleanedInput].reverse().join("");
            
            // Create detailed analysis
            const analysisClass = isPalindrome ? 'analysis-valid' : 'analysis-invalid';
            const statusText = isPalindrome ? 'PALINDROME_DETECTED' : 'NOT_A_PALINDROME';
            const statusColor = isPalindrome ? theme.valid : theme.invalid;
            
            resultDiv.innerHTML = `
                <div class="${analysisClass}" style="margin-bottom: 16px; font-size: 1.1em;">
                    > ${statusText}
                </div>
                <div style="color: var(--text-secondary); font-size: 0.9em; line-height: 1.8;">
                    <strong>ORIGINAL_TEXT:</strong> "${originalInput}"<br>
                    <strong>CLEANED_TEXT:</strong> "${cleanedInput}"<br>
                    <strong>LENGTH:</strong> ${cleanedInput.length} characters<br>
                    <strong>REVERSED:</strong> "${[...cleanedInput].reverse().join('')}"<br>
                    <strong>ANALYSIS:</strong> ${isPalindrome ? 'Text reads identical forwards and backwards' : 'Text does not read identical when reversed'}
                </div>
                ${isPalindrome ? 
                    `<div style="margin-top: 12px; color: ${theme.valid}; font-weight: 600;">
                        ✓ VALID_PALINDROME
                    </div>` : 
                    `<div style="margin-top: 12px; color: ${theme.invalid}; font-weight: 600;">
                        ✗ INVALID_PALINDROME
                    </div>`
                }
            `;

            // Update output status
            outputStatus.textContent = statusText;
            outputStatus.style.color = statusColor;
            outputStatus.style.borderColor = statusColor;

        } catch (error) {
            resultDiv.innerHTML = `
                <div style="color: ${theme.invalid}; font-weight: 600;">
                    ERROR: ${error.message}
                </div>
            `;
            outputStatus.textContent = 'ERROR';
            outputStatus.style.color = theme.invalid;
            outputStatus.style.borderColor = theme.invalid;
        } finally {
            checkButton.disabled = false;
        }
    }, 800);
};

// Utility functions
const showNotification = (message, color) => {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--bg-tertiary);
        color: ${color};
        border: 2px solid ${color};
        padding: 12px 16px;
        font-family: 'JetBrains Mono', monospace;
        font-weight: 600;
        z-index: 1000;
        border-radius: 0px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
};

const updateCharCount = () => {
    const count = textInput.value.length;
    charCount.textContent = count;
    charCount.style.color = count > 0 ? theme.accent : 'var(--text-dim)';
};

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Initialize character count
    updateCharCount();
    
    checkButton.addEventListener('click', () => {
        checkPalindrome(textInput.value);
    });

    textInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            checkPalindrome(textInput.value);
        }
    });

    textInput.addEventListener('input', updateCharCount);

    // Add some terminal-like interactivity
    textInput.addEventListener('focus', () => {
        textInput.style.borderColor = theme.accent;
    });

    textInput.addEventListener('blur', () => {
        textInput.style.borderColor = 'var(--border-primary)';
    });

    // Add click sound effect (optional)
    checkButton.addEventListener('mousedown', () => {
        // You could add a click sound here for terminal authenticity
    });
});

// Console greeting for terminal authenticity
console.log(`
%cPALINDROME_TERMINAL v2.1.3
%c> System initialized
> Ready for text analysis
> Mode: CASE_INSENSITIVE
> Filter: ALPHANUMERIC_ONLY
`, 'color: #b467ff; font-weight: bold;', 'color: #00ff9d;');
