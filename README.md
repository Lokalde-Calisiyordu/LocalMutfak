# LocalMutfak

LocalMutfak, kullanıcıların HTML, CSS ve JavaScript kodlarını yazıp çalıştırabildiği, projelerini paylaşabildiği ve diğer geliştiricilerle iş birliği yapabildiği bir yazılım platformu projesidir. CodePen benzeri bir kod editörü deneyimi sunarken, aynı zamanda proje paylaşımı, pull request sistemi, profil yönetimi ve mesajlaşma gibi sosyal yazılım geliştirme özelliklerini bir araya getirir.

## https://localde-calisiyordu.vercel.app
*(Proje LocalMutfak olarak yeniden adlandırıldı; canlı adres yeni deploy ile güncellenene kadar eski bağlantı geçerlidir.)*

## Proje Hakkında

Bu proje, geliştiricilerin:
- Kod yazıp doğrudan önizleyebildiği
- Projelerini yayınlayıp paylaşabildiği
- Başka kullanıcıların projelerine pull request açabildiği
- Profil, takip ve mesajlaşma özellikleriyle bir topluluk deneyimi yaşayabildiği

bir ortam oluşturmayı hedefler.

## Mutfak Temalı Arayüz

LocalMutfak'ın arayüzü, oyunlaştırılmış bir mutfak/restoran deneyimi olarak yeniden tasarlandı:

- **Masaüstü / kontrol paneli**, karolu bir mutfak zemini ve paslanmaz çelik dokusuyla karşılıyor.
- **Pencereler**, bir sipariş fişi / tarif kartı gibi görünüyor; başlık çubukları mutfak istasyonu etiketleri gibi tasarlandı.
- **Butonlar**, bir oyun arayüzündeki gibi kalın, "basılabilir" servis zili düğmelerine benziyor.
- **Proje/Pull Request akışı**, bir mutfakta sipariş hazırlama ve teslim etme deneyimini çağrıştıracak renk ve etiketlerle (hazırlanıyor, mutfaktan çıktı, teslim edildi vb.) sunuluyor.

Bu tema tamamen CSS tasarım sistemi (`frontend/src/styles/kitchen-ui.css`) üzerinden uygulanır; mevcut bileşen yapısı korunarak sadece görsel kimlik değiştirilmiştir.

## Kullanılan Teknolojiler

### Frontend
- React
- Vite
- React Router DOM
- CodeMirror
- Axios
- Diff
- CSS ve kullanıcı arayüz tasarımı

### Backend
- Node.js
- Express.js
- JWT (kimlik doğrulama)
- bcryptjs (şifre güvenliği)
- multer (dosya yükleme)
- PostgreSQL
- CORS

### Araçlar
- Concurrently
- npm tabanlı kurulum ve geliştirme akışı

## Özellikler

- HTML, CSS ve JavaScript editörü
- Canlı önizleme deneyimi
- Proje oluşturma ve paylaşma
- Pull request sistemi
- Kullanıcı profilleri ve mesajlaşma
- Public/Private proje görünürlüğü

## Kurulum

Projeyi çalıştırmak için aşağıdaki adımları izleyebilirsiniz:

```bash
npm run install:all
npm run dev
```

### Kalıcı veritabanı

Backend artık geçici SQLite dosyası kullanmaz; PostgreSQL bağlantısı olmadan başlamaz. Yerel geliştirmede `backend/.env` içine bir PostgreSQL bağlantısı ekleyin:

```env
DATABASE_URL=postgresql://kullanici:sifre@localhost:5432/localmutfak
JWT_SECRET=yerel-gelistirme-gizli-anahtari
```

Render kullanıyorsanız `render.yaml`, web servisine kalıcı PostgreSQL veritabanının `DATABASE_URL` bağlantısını otomatik olarak bağlar. Uygulama ilk açılışta tabloları ve indeksleri oluşturur.

## Amaç

Bu proje, kod paylaşımı ve geliştirici iş birliği deneyimini tek bir platformda birleştirerek, daha interaktif ve sosyal bir yazılım geliştirme ortamı sunmayı amaçlamaktadır.
