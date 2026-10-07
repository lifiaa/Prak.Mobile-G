# 🐾 PetCare
PetCare adalah aplikasi mobile berbasis **React Native + Expo** yang dirancang untuk membantu pengguna dalam mengelola data dan perawatan hewan peliharaan.
Project ini dikembangkan sebagai bagian dari **Praktikum Pemrograman Mobile** menggunakan TypeScript dan React Native.

## 📱 Fitur
Pada Modul 1, PetCare memiliki beberapa fitur utama:
1. 🏠 **Home / Dashboard**
  - Greeting pengguna
  - Ringkasan jumlah hewan
  - Ringkasan perawatan
  - Jadwal perawatan terdekat
  - Daftar hewan peliharaan

2. 🐶 **Daftar Hewan**
  - Menampilkan daftar hewan
  - Menampilkan informasi dasar hewan
  - Detail hewan

3. ➕ **Tambah Hewan**
  - Input nama hewan
  - Input jenis hewan
  - Input ras
  - Input umur
  - Validasi input

4. 🎨 **Reusable UI Components**
  - Custom Button
  - Custom Input
  - Penggunaan StyleSheet dan Inline Style

## 🛠️ Teknologi
Project ini menggunakan:
- React Native
- Expo
- TypeScript
- Expo Router
- JavaScript / JSX ecosystem
- Git & GitHub

## 📂 Struktur Project
```text
Prak.Mobile-G/
│
├── src/
│   ├── app/
│   │   ├── _layout.tsx
│   │   ├── index.tsx
│   │   ├── pets.tsx
│   │   ├── pet-detail.tsx
│   │   └── add-pet.tsx
│   │
│   ├── components/
│   │   ├── CustomButton.tsx
│   │   ├── CustomInput.tsx
│   │   ├── PetCard.tsx
│   │   └── SummaryCard.tsx
│   │
│   ├── data/
│   │   └── pets.ts
│   │
│   ├── types/
│   │   └── pet.ts
│   │
│   └── styles.ts
│
├── assets/
├── package.json
├── tsconfig.json
└── README.md
