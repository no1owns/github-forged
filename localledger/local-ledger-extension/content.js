// Content script to extract product details from Amazon and send to background.js

(function() {
    function extractProductDetails() {
        const productTitle = document.getElementById('productTitle')?.innerText.trim();
        const priceElement = document.querySelector('.a-price .a-offscreen');
        const price = priceElement ? priceElement.innerText.trim() : 'Unavailable';
        const asinMatch = window.location.href.match(/\/dp\/([A-Z0-9]{10})/);
        const asin = asinMatch ? asinMatch[1] : null;
        
        if (productTitle && asin) {
            const productDetails = { title: productTitle, price: price, asin: asin, url: window.location.href };
            console.log('Extracted product details:', productDetails);
            
            chrome.runtime.sendMessage({ type: "amazonProduct", data: productDetails });
        }
    }

    if (window.location.hostname.includes('amazon.')) {
        extractProductDetails();
        document.addEventListener('DOMContentLoaded', extractProductDetails);
    }
})();
