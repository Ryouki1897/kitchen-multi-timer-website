# Kitchen Multi Timer 官方網站

Kitchen Multi Timer 的靜態官方網站，與 Flutter App 分開。用 HTML、CSS 與原生 JavaScript 寫成，可部署到 GitHub Pages 的網站根目錄。

網站用來介紹 App、提供 App Store 所需的隱私權政策網址、提供支援與 FAQ，並預留日後 `app-ads.txt` 的位置。預設語言是繁體中文，另有英文與日文。

沒有 Cookie 追蹤、Google Analytics 或其他分析 SDK。沒有後端，也沒有廣告 SDK。

## 頁面

| 檔案 | 用途 |
| --- | --- |
| `index.html` | 首頁：介紹、截圖預留位置、尚未上架的 App Store 狀態 |
| `privacy.html` | 隱私權政策草稿 |
| `support.html` | 操作說明與聯絡信箱 |
| `assets/js/i18n.js` | 三種語言的文案 |
| `assets/logo.png` | App 圖示原圖，1254×1254，網站頁面不直接載入它 |
| `assets/logo-512.webp` | 頁面上顯示的 512×512 Logo，WebP |
| `assets/logo-512.png` | 不支援 WebP 時使用的同一張 512×512 Logo |
| `assets/favicon-32.png`、`favicon.ico` | 瀏覽器分頁圖示，32×32 |

文案以 `assets/js/i18n.js` 為準。HTML 裡的繁體中文是沒有 JavaScript 時的後備，要與 `zh-Hant` 的字串相同。語言選擇存在瀏覽器的 `localStorage`，鍵名是 `kitchen-multi-timer-language`。切換語言不會改變網址。

## 本機預覽

在這個目錄啟動靜態伺服器：

```bash
python3 -m http.server 8080
```

然後開啟 `http://127.0.0.1:8080/`。`privacy.html` 與 `support.html` 也在同一個位址下。

## 正式網站

| 項目 | 內容 |
| --- | --- |
| GitHub 帳號 | Ryouki1897 |
| 儲存庫名稱 | `Ryouki1897.github.io` |
| 網站網址 | https://ryouki1897.github.io/ |
| 支援與隱私權信箱 | ryouki1897@gmail.com |

這是 GitHub 使用者網站，發布在網域根路徑。正式頁面是：

- https://ryouki1897.github.io/
- https://ryouki1897.github.io/privacy.html
- https://ryouki1897.github.io/support.html

三頁已寫入對應的 `canonical` 與 `og:url`。`og:image` 使用 https://ryouki1897.github.io/assets/logo-512.png 。頁面之間的連結與 CSS、JavaScript、圖示仍是相對路徑。

## GitHub Pages

這個目錄就是網站根目錄。`index.html` 在根路徑，並已放入 `.nojekyll`，避免 GitHub Pages 用 Jekyll 處理檔案。

發布時：

1. 把這個網站放進名為 `Ryouki1897.github.io` 的儲存庫。不要把 Flutter App 放進同一個網站儲存庫。
2. 推送到 GitHub 的預設分支。根目錄必須有 `index.html` 與 `.nojekyll`。
3. 在儲存庫的 Settings → Pages，選 Deploy from a branch。
4. Branch 選預設分支，資料夾選 `/ (root)`，然後儲存。
5. 部署完成後，首頁是 https://ryouki1897.github.io/ 。
6. 確認 `/`、`/privacy.html`、`/support.html`、`/favicon.ico` 與 `assets/` 都開得了。
7. 開發者或營運者名稱補上，隱私權草稿再審一次之後，才把 `https://ryouki1897.github.io/privacy.html` 填進 App Store。

不要把這個網站發布成其他儲存庫底下的 project site。那樣網址會變成 `https://ryouki1897.github.io/<其他儲存庫>/`，與已寫入的 canonical、Open Graph 網址不同，也不能當作 AdMob 要的網域根路徑。

## 日後加入 app-ads.txt

現在不要建立 `app-ads.txt`。沒有 AdMob 提供的正式內容時，不放佔位檔，也不要自填 publisher ID。

這個網站預定發布在 https://ryouki1897.github.io/ 。屆時檔案網址會是 https://ryouki1897.github.io/app-ads.txt ，這是該網域的根路徑。

整合並核對 AdMob 之後：

1. 從 AdMob 取得 `app-ads.txt` 的正式內容。只使用 AdMob 給的那幾行。
2. 在這個儲存庫根目錄、與 `index.html` 同一層，新增名為 `app-ads.txt` 的純文字檔。
3. 推送後，用瀏覽器打開 https://ryouki1897.github.io/app-ads.txt ，確認回應是純文字。
4. 在 AdMob 查看抓取狀態。
5. 同一次變更裡審閱 `privacy.html` 的廣告節。核對完成之前，保留「待 AdMob 整合後審核」。

這個網站本身不加廣告 SDK。

## 尚未填寫

上架或公開前仍需要：

- 開發者或營運者名稱。GitHub 帳號不是這份草稿裡的正式名稱。
- App 的真實截圖
- 上架後的 App Store 網址
- 隱私權草稿的審閱
- AdMob 整合並核對後的 `app-ads.txt`

截圖還沒有時，首頁三個框只顯示「截圖待補」，不放假的功能畫面。框的比例是 9:19.5，圖片用 `object-fit: contain`，所以放進去不會被裁切或拉變形。App Store 尚未上架，首頁沒有下載連結。

有真實截圖之後，把檔案放到 `assets/screenshots/`，在對應的 `.shot-frame` 裡、佔位區塊前面加上圖片。佔位文字會自己隱藏，版面不用改：

```html
<img src="assets/screenshots/home.webp" width="1170" height="2532" alt="Kitchen Multi Timer 首頁">
```

`width` 和 `height` 用該張截圖的實際像素。不支援 WebP 時，改放 PNG，或在同一個框裡用 `<picture>` 包住 WebP 與 PNG。
