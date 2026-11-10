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
├── assets/
├── src/
│   ├── app/
│   │   ├── _layout.tsx
│   │   ├── index.tsx
│   │   ├── add-pet.tsx
│   │   ├── petCareAI.tsx
│   │   └── pets/
│   │       ├── _layout.tsx
│   │       ├── index.tsx
│   │       └── [id].tsx
│   ├── components/
│   ├── constants/
│   ├── context/
│   │   ├── PetContext.tsx
│   │   └── ThemeContext.tsx
│   ├── data/
│   ├── docs/
│   ├── hooks/
│   ├── types/
│   │   └── pet.ts
│   ├── utils/
│   └── styles.ts
├── package.json
├── package-lock.json
├── app.json
├── tsconfig.json
├── README.md
└── .gitignore

## Implementasi Custom & Pre-built Async Function

Pada aplikasi PetCare, penerapan Custom dan Pre-built Async Function diimplementasikan pada fitur Dark Mode menggunakan AsyncStorage.

### Custom Async Function
- `loadTheme()`: Mengambil preferensi tema pengguna yang sebelumnya disimpan.
- `saveTheme()`: Menyimpan perubahan preferensi tema pengguna.

### Pre-built Async Function
- `AsyncStorage.getItem()`: Mengambil data preferensi tema dari penyimpanan lokal.
- `AsyncStorage.setItem()`: Menyimpan preferensi tema ke penyimpanan lokal.

### Hasil Pengujian
Pengujian dilakukan dengan mengaktifkan Dark Mode, kemudian menutup dan membuka kembali aplikasi PetCare. Hasil pengujian menunjukkan bahwa preferensi Dark Mode tetap tersimpan dan diterapkan setelah aplikasi dibuka kembali.

**Kesimpulan:** Implementasi Custom dan Pre-built Async Function berhasil diterapkan pada fitur Dark Mode. AsyncStorage memungkinkan aplikasi menyimpan dan mengambil preferensi tema pengguna secara asynchronous.