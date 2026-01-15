# Network Troubleshooting & Subnet Calculator

## 📌 Overview
Network Troubleshooting & Subnet Calculator adalah aplikasi web responsif tanpa backend yang dirancang sebagai alat bantu kerja dasar untuk IT Support dan Network Support dalam melakukan troubleshooting jaringan. Aplikasi ini berfokus pada pemahaman network fundamentals, perhitungan subnet yang akurat, serta pola pikir troubleshooting yang sistematis, dengan implementasi yang ringan, stabil, dan mudah digunakan di desktop maupun perangkat mobile.

---

## 🎯 Project Objectives
- Menunjukkan pemahaman **dasar jaringan komputer**
- Menerapkan **logika subnetting yang benar dan aman**
- Melatih **mindset troubleshooting jaringan**
- Menyediakan alat bantu yang **siap dipresentasikan ke HR / recruiter**
- Membuat aplikasi **client-side yang stabil dan minim risiko error**

---

## 🧩 Key Features

### 1. Subnet Calculator
- Perhitungan network address
- Broadcast address
- Host range
- Subnet mask
- Total usable hosts
- Penanganan khusus untuk CIDR `/0`, `/31`, dan `/32`

### 2. OSI Layer Guide
- Penjelasan fungsi setiap layer OSI
- Gejala umum per layer
- Contoh langkah pengecekan saat troubleshooting

### 3. Command Cheatsheet
- Perintah jaringan penting:
  - `ping`
  - `tracert / traceroute`
  - `nslookup`
- Contoh penggunaan di berbagai sistem operasi

### 4. Case Simulation
- Contoh kasus jaringan nyata
- Gejala masalah
- Langkah diagnosis
- Akar penyebab
- Solusi yang direkomendasikan

---

## 🖥️ User Interface & UX
- Mobile-first responsive design
- Bottom navigation untuk mobile
- Card-based layout yang rapi
- UI state lengkap:
  - Idle state
  - Validating state
  - Success state
  - Empty state
  - Error state
- Tombol bantu: Reset & Copy hasil

---

## 🛠️ Tech Stack
- **HTML**
- **CSS**
- **JavaScript**
- **Build Tool:** Vite (Auto Refresh)
- **Execution:** Client-side only (tanpa backend)

> Tidak menggunakan API eksternal atau database untuk menjaga kestabilan dan menghindari error jaringan.

---

## 🔐 Validation & Anti-Error Design
- Validasi format IP (4 oktet, 0–255)
- Validasi CIDR (0–32)
- Input tidak valid langsung ditolak
- Tidak ada perhitungan jika input salah
- Tidak ada risiko crash akibat input ekstrem

---

## 🧪 Testing Checklist
- [x] IP valid dan invalid
- [x] CIDR ekstrem (/0, /31, /32)
- [x] UI tetap stabil saat input salah
- [x] Tampilan rapi di desktop & mobile
- [x] Semua modul dapat diakses tanpa error

---

## 📚 What I Learned
- Network fundamentals & subnetting
- OSI Layer troubleshooting mindset
- Validasi input dan error handling di frontend
- Mobile-first UI/UX design
- Membangun aplikasi client-side yang stabil

---

## 🚀 Future Improvements
- Export hasil ke PDF / CSV
- Mode gelap (Dark Mode)
- History perhitungan subnet
- Progressive Web App (PWA) support
- Backend API (opsional)

---

## 👤 Author
**[Nama Kamu]**  
IT Support / Network Support / Junior IT  

- GitHub: https://github.com/your-username  
- Portfolio: https://your-portfolio-link  

---

## 📄 License
This project is created for educational and portfolio purposes.

---

## 🏁 Recruiter Notes
✔ Relevan untuk IT Support & Network Support  
✔ Menunjukkan logika troubleshooting  
✔ Tidak bergantung pada backend  
✔ Stabil dan mudah diuji  
✔ Cocok untuk internship & entry-level roles  
