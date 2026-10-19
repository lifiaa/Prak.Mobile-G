import { pets } from "../data/pets";

const containsAny = (text: string, keywords: string[]) =>
  keywords.some((keyword) => text.includes(keyword));

export function getPetCareAnswer(question: string): string {
  const text = question.toLowerCase().trim();

  if (!text) {
    return "Silakan tulis pertanyaan tentang hewan peliharaanmu.";
  }

  const selectedPet = pets.find((pet) =>
    text.includes(pet.name.toLowerCase())
  );

  if (
    containsAny(text, [
      "halo",
      "hai",
      "hello",
      "selamat pagi",
      "selamat siang",
      "selamat sore",
      "selamat malam",
    ])
  ) {
    return "Halo! Aku PetCare AI. Aku bisa membantu mengenali hewan peliharaanmu dan memberikan informasi umum tentang makanan, kebersihan, perilaku, serta kesehatan kucing. Mau bertanya apa hari ini?";
  }

  if (
    containsAny(text, [
      "terima kasih",
      "makasih",
      "thanks",
      "thank you",
    ])
  ) {
    return "Sama-sama! 🐾 Semoga Aya, Loopy, dan Milo selalu sehat. Kamu boleh bertanya lagi kapan saja.";
  }

  if (
    containsAny(text, [
      "siapa saja",
      "daftar hewan",
      "hewan saya",
      "hewan peliharaan",
      "berapa hewan",
      "data kucing",
    ])
  ) {
    if (selectedPet) {
      return `${selectedPet.name} adalah ${selectedPet.type} ras ${selectedPet.breed}, berusia ${selectedPet.age} tahun. ${selectedPet.description}`;
    }

    return `Saat ini terdapat ${pets.length} hewan dalam data lokal PetCare:\n\n${pets
      .map(
        (pet, index) =>
          `${index + 1}. ${pet.name}\nJenis: ${pet.type}\nRas: ${pet.breed}\nUsia: ${pet.age} tahun\nDeskripsi: ${pet.description}`
      )
      .join("\n\n")}`;
  }

  if (selectedPet) {
    if (
      containsAny(text, [
        "umur",
        "usia",
        "berapa tahun",
        "berapa umur",
        "berapa usia",
      ])
    ) {
      return `${selectedPet.name} berusia ${selectedPet.age} tahun.`;
    }

    if (containsAny(text, ["ras", "breed"])) {
      return `${selectedPet.name} adalah kucing ras ${selectedPet.breed}.`;
    }

    if (containsAny(text, ["jenis", "spesies"])) {
      return `${selectedPet.name} termasuk jenis ${selectedPet.type}.`;
    }

    if (
      containsAny(text, [
        "sifat",
        "deskripsi",
        "tentang",
        "ceritakan",
        "karakter",
      ])
    ) {
      return selectedPet.description;
    }

    if (
      containsAny(text, [
        "anak",
        "dewasa",
        "kategori umur",
      ])
    ) {
      return `${selectedPet.name} masuk kategori ${selectedPet.ageCategories ?? "belum ditentukan"} dan berusia ${selectedPet.age} tahun.`;
    }

    if (
      containsAny(text, [
        "makan",
        "makanan",
        "pakan",
      ])
    ) {
      return `Untuk ${selectedPet.name}, pilih makanan khusus kucing yang sesuai usia dan kondisi kesehatannya. Sediakan air bersih dan pantau nafsu makannya.`;
    }

    if (
      containsAny(text, [
        "grooming",
        "mandi",
        "bulu",
        "sisir",
      ])
    ) {
      return `Untuk ${selectedPet.name}, sesuaikan perawatan bulu dengan kondisi bulunya. Sisir secara rutin dan gunakan produk khusus kucing jika diperlukan.`;
    }

    return `${selectedPet.name} adalah ${selectedPet.type} ras ${selectedPet.breed}, berusia ${selectedPet.age} tahun. ${selectedPet.description}`;
  }

  if (
    containsAny(text, [
      "makan",
      "makanan",
      "pakan",
      "lapar",
      "diet kucing",
    ])
  ) {
    return "Pilih makanan lengkap khusus kucing sesuai tahap usia dan kondisi kesehatannya. Berikan dalam porsi yang sesuai petunjuk produk, sediakan air bersih, dan hindari perubahan makanan secara mendadak. Konsultasikan kebutuhan diet khusus dengan dokter hewan.";
  }

  if (
    containsAny(text, [
      "minum",
      "air",
      "dehidrasi",
    ])
  ) {
    return "Sediakan air bersih setiap saat dan letakkan wadah di tempat yang mudah dijangkau. Jika kucing mendadak jarang minum, tidak mau makan, atau menunjukkan tanda sakit, konsultasikan dengan dokter hewan.";
  }

  if (
    containsAny(text, [
      "grooming",
      "mandi",
      "bulu rontok",
      "sisir",
      "kebersihan bulu",
    ])
  ) {
    return "Sisir bulu secara rutin sesuai jenis dan panjang bulunya. Kucing umumnya tidak perlu sering dimandikan kecuali kotor atau disarankan dokter hewan. Gunakan sampo khusus kucing dan hentikan jika kulit mengalami iritasi.";
  }

  if (
    containsAny(text, [
      "kuku",
      "potong kuku",
    ])
  ) {
    return "Periksa kuku kucing secara berkala. Jika perlu dipotong, gunakan pemotong kuku khusus hewan dan hindari bagian kuku yang berwarna merah muda karena mengandung pembuluh darah. Minta bantuan groomer atau dokter hewan jika belum terbiasa.";
  }

  if (
    containsAny(text, [
      "litter",
      "pasir",
      "toilet",
      "kotoran",
      "bak pasir",
    ])
  ) {
    return "Bersihkan kotoran dari bak pasir setiap hari dan ganti pasir sesuai jenisnya. Letakkan bak pasir di tempat yang tenang dan mudah dijangkau. Perubahan mendadak pada kebiasaan buang air dapat menjadi alasan untuk berkonsultasi dengan dokter hewan.";
  }

  if (
    containsAny(text, [
      "main",
      "bermain",
      "bosan",
      "aktif",
      "olahraga",
    ])
  ) {
    return "Ajak kucing bermain secara rutin menggunakan mainan yang aman. Sediakan tempat untuk memanjat, bersembunyi, dan beristirahat. Sesuaikan aktivitas dengan usia, kondisi fisik, serta respons kucing.";
  }

  if (
    containsAny(text, [
      "tidur",
      "istirahat",
    ])
  ) {
    return "Kucing membutuhkan banyak waktu untuk tidur dan beristirahat. Sediakan tempat tidur yang tenang, bersih, dan nyaman. Jika pola tidur berubah drastis disertai tanda sakit atau perubahan perilaku, konsultasikan dengan dokter hewan.";
  }

  if (
    containsAny(text, [
      "stres",
      "stress",
      "takut",
      "cemas",
      "bersembunyi",
    ])
  ) {
    return "Kucing yang stres dapat bersembunyi, menghindar, atau mengalami perubahan perilaku. Berikan tempat aman, hindari memaksa interaksi, dan jaga rutinitasnya. Jika kondisi menetap atau disertai gejala fisik, konsultasikan dengan dokter hewan.";
  }

  if (
    containsAny(text, [
      "vaksin",
      "vaksinasi",
      "imunisasi",
    ])
  ) {
    return "Jadwal vaksinasi kucing bergantung pada usia, riwayat vaksin, kondisi kesehatan, dan risiko lingkungannya. Mintalah dokter hewan menyusun jadwal vaksinasi yang sesuai.";
  }

  if (
    containsAny(text, [
      "cacing",
      "obat cacing",
      "parasit",
      "kutu",
    ])
  ) {
    return "Pencegahan cacing dan parasit perlu disesuaikan dengan usia, berat badan, kondisi kesehatan, serta risiko paparan. Gunakan obat khusus kucing atas arahan dokter hewan dan jangan memakai obat kutu khusus anjing pada kucing.";
  }

  if (
    containsAny(text, [
      "steril",
      "sterilisasi",
      "kebiri",
    ])
  ) {
    return "Sterilisasi dapat membantu mencegah kehamilan yang tidak direncanakan dan memiliki manfaat kesehatan tertentu. Waktu pelaksanaan dan kesiapan kucing sebaiknya dibicarakan dengan dokter hewan.";
  }

  if (
    containsAny(text, [
      "anak kucing",
      "kitten",
      "bayi kucing",
    ])
  ) {
    return "Anak kucing membutuhkan makanan khusus sesuai tahap pertumbuhannya, lingkungan hangat dan aman, serta pemantauan kesehatan. Jangan memberikan susu sapi sebagai pengganti susu induk. Untuk anak kucing yatim atau yang belum bisa makan sendiri, konsultasikan perawatannya dengan dokter hewan.";
  }

  if (
    containsAny(text, [
      "muntah",
      "diare",
      "mencret",
      "tidak mau makan",
      "lemas",
      "sakit",
      "demam",
      "luka",
      "berdarah",
    ])
  ) {
    return "Gejala tersebut dapat memiliki banyak penyebab dan tidak bisa dipastikan melalui chatbot. Hubungi dokter hewan, terutama jika gejala berat, berulang, disertai lemas, kesulitan bernapas, atau perdarahan. Jangan memberikan obat manusia tanpa petunjuk dokter hewan.";
  }

  if (
    containsAny(text, [
      "keracunan",
      "racun",
      "tertelan",
      "sulit bernapas",
      "kejang",
      "tidak sadar",
    ])
  ) {
    return "Ini bisa menjadi keadaan darurat. Segera hubungi atau bawa kucing ke klinik dokter hewan. Jangan memaksakan muntah atau memberikan obat tanpa arahan tenaga medis hewan.";
  }

  if (
    containsAny(text, [
      "jadwal",
      "perawatan terdekat",
      "appointment",
    ])
  ) {
    return "Aku belum terhubung langsung ke data jadwal perawatan. Silakan periksa bagian Perawatan Terdekat di halaman Home PetCare untuk melihat jadwal yang tersedia.";
  }

  if (
    containsAny(text, [
      "terima kasih",
      "makasih",
    ])
  ) {
    return "Sama-sama! Senang bisa membantu merawat hewan kesayanganmu.";
  }

  return "Aku belum menemukan jawaban yang sesuai. Kamu bisa bertanya tentang data Aya, Loopy, dan Milo, makanan, minum, grooming, kebersihan, bermain, vaksin, parasit, atau kesehatan kucing. Untuk kondisi medis, konsultasikan dengan dokter hewan.";
}
