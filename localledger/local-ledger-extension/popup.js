document.addEventListener("DOMContentLoaded", function () {
    const amazonLinkInput = document.getElementById("amazonLinkInput");
    const confirmMessage = document.getElementById("confirmMessage");
    const searchButton = document.getElementById("searchButton");
    let productTitle = "";

    // Extract ASIN from Amazon URL
    function extractAsin(url) {
        const match = url.match(/\/dp\/([A-Z0-9]{10})/);
        return match ? match[1] : null;
    }

    // Fetch product details from Amazon
    function fetchAmazonProduct(asin) {
        const productUrl = `https://www.amazon.com/dp/${asin}`;

        fetch(productUrl)
            .then(response => response.text())
            .then(html => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, "text/html");
                const titleElement = doc.getElementById("productTitle");

                if (titleElement) {
                    productTitle = titleElement.innerText.trim();
                    confirmMessage.innerHTML = `<strong>Confirming Product:</strong> ${productTitle}`;
                    confirmMessage.style.color = "green";
                } else {
                    confirmMessage.innerText = "Could not fetch product title. Please check the link.";
                    confirmMessage.style.color = "red";
                }
            })
            .catch(error => {
                console.error("Error fetching Amazon product:", error);
                confirmMessage.innerText = "Failed to retrieve product details.";
                confirmMessage.style.color = "red";
            });
    }

    // Handle pasted link
    amazonLinkInput.addEventListener("input", function () {
        const amazonUrl = amazonLinkInput.value.trim();
        const asin = extractAsin(amazonUrl);

        if (asin) {
            fetchAmazonProduct(asin);
        } else {
            confirmMessage.innerText = "Invalid Amazon link. Please enter a valid product URL.";
            confirmMessage.style.color = "red";
        }
    });

    // Handle search button click
    searchButton.addEventListener("click", function () {
        if (productTitle) {
            const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(productTitle + " site:target.com")}`;
            window.open(googleSearchUrl, "_blank");
        } else {
            alert("Please enter a valid Amazon product link first.");
        }
    });
});
