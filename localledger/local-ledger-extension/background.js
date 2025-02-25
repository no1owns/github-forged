chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("trying")
    if (request.type === "amazonProduct" || request.type === "amazonLink") {
        const productData = request.data || { asin: request.asin, url: `https://www.amazon.com/*/dp/${request.asin}` };

        console.log("Processing product:", productData);

        // Send product data to local API
        fetch("http://localhost:5000/process_product", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(productData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Now fetch from Target
                fetchTargetAlternatives(productData.title, sendResponse);
            } else {
                sendResponse({ success: false, error: "API request failed" });
            }
        })
        .catch(error => {
            console.error("API Error:", error);
            sendResponse({ success: false, error: "Error contacting API" });
        });

        return true; // Keep response channel open for async requests
    }
});

function fetchTargetAlternatives(productTitle, sendResponse) {
    const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(productTitle + " site:target.com")}`;

    console.log("Generated Google Search URL for Target:", googleSearchUrl);

    sendResponse({
        success: true,
        targetSearchUrl: googleSearchUrl
    });
}


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === "amazonProduct") {
        fetchTargetProduct(request.data.asin, sendResponse);
        return true;
    }
});
