const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend SAUNG STORE aktif 🚀");
});

app.post("/checkout", (req, res) => {
  const data = req.body;
  console.log("Data diterima:", data);

  res.json({
    message: "Checkout diterima",
    data: data
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server jalan di port ${PORT}`);
});
