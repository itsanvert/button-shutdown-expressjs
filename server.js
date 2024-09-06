const express = require("express");
const { exec } = require("child_process");
const app = express();
const port = 3000;

// Route to serve the HTML file
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// API to shutdown Windows
app.post("/shutdown", (req, res) => {
  exec("shutdown /s /f /t 0", (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      res.status(500).send("Failed to shutdown");
      return;
    }
    if (stderr) {
      console.error(`Error: ${stderr}`);
      res.status(500).send("Shutdown error occurred");
      return;
    }
    res.send("Shutting down...");
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
