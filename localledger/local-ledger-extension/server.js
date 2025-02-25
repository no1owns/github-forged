const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());

// Simple GET route for testing
app.get("/", (req, res) => {
    res.send("Server is running! Use POST /process_product to send data.");
});

// Process product details
app.post("/process_product", async (req, res) => {
    const { title, asin, url } = req.body;

    if (!title) {
        return res.status(400).json({ success: false, error: "Missing product title" });
    }

    console.log("Processing product:", title);

    const targetSearchUrl = `https://www.target.com/s?searchTerm=${encodeURIComponent(title)}`;
    const targetAlternative = { title: `${title} (from Target)`, url: targetSearchUrl };

    return res.json({ success: true, target_product: targetAlternative });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

