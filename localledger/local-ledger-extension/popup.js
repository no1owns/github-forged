document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM fully loaded and parsed");

    // Function to initialize functionality
    function initialize() {
        setupButtonActions();
    }

    // Setup event listeners and handlers for button actions
    function setupButtonActions() {
        const invokeApiButton = document.getElementById('invokeApi');
        if (invokeApiButton) {
            invokeApiButton.addEventListener('click', function() {
                console.log("Invoke API Button clicked");
                sendMessageToBackground({greeting: "hello"});
            });
        } else {
            console.error('Error: Button with ID "invokeApi" not found.');
        }
    }

    // Function to send a message to background.js simulation
    function sendMessageToBackground(message) {
        if (chrome.runtime && chrome.runtime.sendMessage) {
            chrome.runtime.sendMessage(message, function(response) {
                console.log("Received response:", response);
                alert('Response: ' + response.farewell);
            });
        } else {
            console.error("chrome.runtime.sendMessage is not available.");
        }
    }

    // Assuming `chrome.runtime` should be mocked elsewhere or exists
    // If not, we could place a mock setup here or in a separate script for clarity.
    
    // Initialize functionality
    initialize();
});
