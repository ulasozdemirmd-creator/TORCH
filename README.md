# Konjenital Enfeksiyon Tanı Asistanı – yüklenebilir uygulama (PWA)

Bu klasör, planlayıcının telefona ve bilgisayara **uygulama olarak yüklenebilen** sürümüdür. Yüklendikten sonra kendi simgesiyle açılır, internet olmadan çalışır ve girilen hasta verisi cihazdan çıkmaz (sunucuya hiçbir veri gönderilmez).

## Klasör içeriği

| Dosya | Görevi |
|---|---|
| `index.html` | Uygulamanın tamamı (arayüz + hesaplama motoru) |
| `manifest.webmanifest` | Ad, simge, renk; "yüklenebilir uygulama" tanımı |
| `sw.js` | Çevrimdışı çalışma ve sürüm güncelleme |
| `icons/` | Uygulama simgeleri |
| `CHANGELOG.md` | Sürüm ve kural değişiklik kaydı |
| `.nojekyll` | GitHub Pages'in dosyaları olduğu gibi yayınlaması için |

## 1. Yayınlama (GitHub Pages, ücretsiz)

PWA'nın yüklenebilmesi için dosyaların **https** adresinden sunulması gerekir; dosyaya bilgisayardan çift tıklamak yeterli değildir.

1. github.com'da ücretsiz hesap açın.
2. Sağ üstte **+ → New repository**. Ad örneği: `konjenital-tani` (aşı planlayıcıdan ayrı, yeni bir depo). **Public** seçin (Pages ücretsiz planda public depo ister), **Create repository**.
3. Açılan sayfada **uploading an existing file** bağlantısına tıklayın. Bu klasörün **içindeki** tüm dosya ve klasörleri (`index.html`, `sw.js`, `manifest.webmanifest`, `icons` klasörü, `.nojekyll`…) sürükleyip bırakın. **Commit changes**.
   - `.nojekyll` gizli dosya olduğu için görünmeyebilir; yüklenmese de uygulama çalışır.
4. **Settings → Pages**. *Source*: **Deploy from a branch**, *Branch*: **main**, klasör **/(root)** → **Save**.
5. 1–2 dakika sonra adres hazır olur: `https://KULLANICIADI.github.io/konjenital-tani/`

Alternatif: üniversite/hastane bilgi işlem birimine aynı klasörü https bir alt adrese koymalarını rica edebilirsiniz. Kurumsal adres güven açısından daha iyidir.

## 2. Cihaza yükleme

- **Android (Chrome):** Adresi açın → sayfadaki **Bu cihaza yükle** düğmesi veya menü ⋮ → **Uygulamayı yükle / Ana ekrana ekle**.
- **iPhone / iPad (Safari):** Adresi açın → **Paylaş** simgesi → **Ana Ekrana Ekle**. (iOS'ta yalnızca Safari ile yüklenir.)
- **Windows / macOS (Chrome veya Edge):** Adres çubuğunun sağındaki **yükle** simgesi ya da sayfadaki **Bu cihaza yükle** düğmesi. Başlat menüsünde / Dock'ta ayrı uygulama olarak görünür.

İlk açılıştan sonra uygulama internetsiz çalışır; başlıkta "Çevrimdışı" etiketi görünür.

## 3. Güncelleme yayınlama (kural değiştiğinde)

1. `index.html` içinde gerekli değişikliği yapın ve en üstteki şu satırları güncelleyin:
   ```js
   const APP_VERSION='1.0.1';
   const RULES_DATE='GG.AA.YYYY';
   ```
2. `sw.js` içindeki `const VERSION = '1.0.1';` değerini **aynı numara** yapın. Bu adım unutulursa kullanıcılar eski sürümde kalır.
3. `CHANGELOG.md`'ye ne değiştiğini, kaynağını ve kontrol eden hekimi yazın.
4. GitHub'da değişen dosyaları yükleyin (**Add file → Upload files**, aynı adla üzerine yazar).

Kullanıcı uygulamayı bir sonraki açışında altta **"Yeni sürüm hazır"** çubuğunu görür. "Şimdi yenile"ye basmadan sayfa yenilenmez; böylece ekranda açık hasta bilgisi kaybolmaz. Uygulama açık kaldıysa saatte bir güncelleme kontrolü yapılır.

## 4. Veri ve gizlilik

- Hasta bilgisi yalnızca o anki ekranda tutulur; tarayıcı belleğine yazılmaz, sunucuya gönderilmez.
- Kalıcı kayıt yalnızca kullanıcının indirdiği `.json` vaka dosyasıyla olur. Bu dosyalar kişisel sağlık verisidir; KVKK kapsamında kurumunuzun saklama kurallarına göre korunmalıdır. Mümkünse ad yerine protokol numarası kullanın.

## 5. Düzenleyici not

Bireysel hasta için tanı sınıfı ve tedavi öneren yazılım, **dağıtıldığında** Tıbbi Cihaz Yönetmeliği (RG 02.06.2021) kapsamında tıbbi cihaz yazılımı sayılabilir (MDCG 2019-11; yazılıma özgü Kural 11). Kapalı kullanıcı grubunda eğitim ve hekim karar desteği amacıyla kullanım ile herkese açık dağıtım (uygulama mağazaları, kamuya açık site) arasında fark vardır. Geniş dağıtım öncesinde TİTCK görüşü veya tıbbi cihaz mevzuatında uzman hukuki değerlendirme alınması önerilir. GitHub Pages adresi bağlantıyı bilen herkese açıktır; erişimi sınırlamak gerekiyorsa kurum içi sunucu tercih edilmelidir.
