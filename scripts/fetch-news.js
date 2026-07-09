// GitHub Actions tarafından çalıştırılır: tüm kaynakları çekip
// public/news.json dosyasını üretir (GitHub Pages statik yayını için).
const fs = require("fs");
const path = require("path");
const { buildNews } = require("../server.js");

buildNews()
  .then((data) => {
    const out = path.join(__dirname, "..", "public", "news.json");
    fs.writeFileSync(out, JSON.stringify(data));
    const fails = data.sources.filter((s) => !s.ok || !s.count);
    console.log(`news.json yazıldı: ${data.articles.length} haber, ${data.sources.length - fails.length}/${data.sources.length} kaynak çalışıyor`);
    fails.forEach((s) => console.log(`  UYARI: ${s.name} → ${s.error || "0 haber"}`));
    process.exit(0);
  })
  .catch((err) => {
    console.error("Haber çekme başarısız:", err);
    process.exit(1);
  });
