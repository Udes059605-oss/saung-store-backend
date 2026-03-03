const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
app.use(cors());
app.use(express.json());

// Koneksi database
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// Test server
app.get("/", (req, res) => {
  res.send("Backend SAUNG STORE aktif 🚀");
});

// === PRODUCTS ===

// Ambil semua produk
app.get("/products", async (req, res) => {
  const result = await pool.query("SELECT * FROM products");
  res.json(result.rows);
});

// Tambah produk
app.post("/products", async (req, res) => {
  const { nama_produk, deskripsi, harga, stok, gambar } = req.body;
  const result = await pool.query(
    "INSERT INTO products (nama_produk, deskripsi, harga, stok, gambar) VALUES ($1,$2,$3,$4,$5) RETURNING *",
    [nama_produk, deskripsi, harga, stok, gambar]
  );
  res.json(result.rows[0]);
});

// === ORDERS ===

// Buat order
app.post("/orders", async (req, res) => {
  const { nama_pembeli, nomor_hp, alamat, produk_id, jumlah, total_harga } = req.body;
  const result = await pool.query(
    "INSERT INTO orders (nama_pembeli, nomor_hp, alamat, produk_id, jumlah, total_harga) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *",
    [nama_pembeli, nomor_hp, alamat, produk_id, jumlah, total_harga]
  );
  res.json(result.rows[0]);
});

// Lihat semua order
app.get("/orders", async (req, res) => {
  const result = await pool.query("SELECT * FROM orders ORDER BY tanggal_pesan DESC");
  res.json(result.rows);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server jalan di port ${PORT}`);
});
