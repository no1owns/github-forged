chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === "amazonProduct") {
        const productData = request.data;

        console.log("Received product details:", productData);

        // Send product data to the local API for processing
        fetch("http://localhost:5000/process_product", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(productData)
        })
        .then(response => response.json())
        .then(data => {
            if (data && data.message) {
                sendResponse({ success: true, message: data.message });
            } else if (data && data.error) {
                sendResponse({ success: false, error: data.error });
            } else {
                sendResponse({ success: false, error: "An unknown error occurred with the API request" });
            }
        })
        .catch(error => {
            console.error("Error contacting the API:", error);
            sendResponse({ success: false, error: "Error contacting the API" });
        });

        return true; // Keeps the message channel open for async response
    }
});

