# Development Log

只記錄實際做過的檢查與已完成的項目。沒有在瀏覽器裡捲到的畫面，不寫成已用眼睛看過。

## 靜態官方網站

日期：2026-11-06

狀態：三個頁面、三語切換與本機預覽已完成。沒有建立 GitHub 儲存庫，沒有 commit，沒有 push。沒有改 Flutter App。

### 實際完成

- 在這個網站目錄建立 GitHub Pages 用的靜態檔：`index.html`、`privacy.html`、`support.html`、`assets/css/styles.css`、`assets/js/i18n.js`、`assets/js/site.js`、`.nojekyll`、`README.md`。
- 文案只放在 `assets/js/i18n.js` 的 `zh-Hant`、`en`、`ja`。HTML 裡的繁體中文是沒有 JavaScript 時的後備，並與 `zh-Hant` 逐字對過。
- 語言存在瀏覽器 `localStorage`，鍵名 `kitchen-multi-timer-language`。切換時不改網址。沒有 Cookie，沒有分析或廣告 SDK。
- 品牌色沿用 App：`#819A86`、`#C77B59`、`#F7F3EB`、`#34453D`。淺色字用更深的綠，避免淺鼠尾草綠直接當內文。
- `assets/logo.png` 是 Flutter `assets/icons/app_icon.png` 的複本。兩邊 SHA-256 都是 `3ecede8748ef1d17a2d043bf5fd58c61b28e8aa42bf242c5d4f7816e7193cd47`，大小都是 1,379,625 bytes。原圖沒有改。沒有另外做縮小版。
- 首頁三個截圖位置只有「截圖待補」文字，沒有假的功能畫面。App Store 只有「即將推出」，沒有下載連結。
- 隱私權頁標成草稿。廣告節標成「待 AdMob 整合後審核」。沒有填公司名稱或電子郵件。
- 沒有建立 `app-ads.txt`。`README.md` 寫了日後要放在儲存庫根目錄，以及 AdMob 要的是網域根路徑。

### 沒有做的事

- 沒有修改 `Kitchen Multi-Timer` 的程式、`schemaVersion` 或 `assets/icons/app_icon.png`。
- 沒有 `git commit` 或 `git push`。這個目錄原本就有一個還沒有任何 commit 的 Git 目錄，這次沒有建立遠端儲存庫。
- 沒有加入廣告 SDK、分析 SDK 或後端。

### 驗證

本機用 `python3 -m http.server 8765 --bind 127.0.0.1`。

- `GET /`、`/privacy.html`、`/support.html`、`/assets/css/styles.css`、`/assets/js/site.js`、`/assets/logo.png` 都是 200。`logo.png` 的 Content-Type 是 `image/png`。
- `GET /app-ads.txt` 是 404。
- 三語 key 數量都是 102，沒有缺 key。HTML 的 `data-i18n` 後備文字與 `zh-Hant` 一致。
- 瀏覽器從首頁按 English：網址仍是 `/`，`html lang` 為 `en`，標題為 `Kitchen Multi Timer`，`localStorage` 為 `en`。頁面上沒有 `document.cookie`，腳本只有本機的 `i18n.js` 與 `site.js`，連結都是相對路徑，沒有 App Store 網址。
- 由首頁的隱私權政策連結進到 `/privacy.html`，語言維持英文，標題為 `Privacy Policy — Kitchen Multi Timer`。
- 在隱私權頁改成日文：網址仍是 `/privacy.html`，`html lang` 為 `ja`，標題為 `プライバシーポリシー — Kitchen Multi Timer`，畫面上有「AdMob 統合後に確認」與「未記入」。
- 再開 `/support.html`：沿用日文，標題為 `サポート — Kitchen Multi Timer`。內文有「サポート用メール」與「未記入」，沒有 `mailto:`。
- 回到 `/` 後改回繁體中文：網址仍是 `/`，`html lang` 為 `zh-Hant`，標語是「每一道料理，都有自己的時間。」，「截圖待補」與「即將推出」都在。
- 版面量過 1280、471、390、320 寬。1280 時標誌、導覽與語言按鈕在同一列。390 與 320 沒有橫向溢出，語言按鈕高度 44。471 的實際畫面看到標誌、選取中的繁體中文、導覽、標語與第一張功能卡。
- 內嵌瀏覽器的捲動沒有生效，`scrollY` 維持 0，所以首頁下半部與隱私權頁下半部沒有用截圖看過。那些區塊的文字與位置是用 DOM 量的：四張功能卡、三個截圖框、「即將推出」在文件流裡，1280 寬沒有橫向溢出。

## 發布前優化

日期：2026-11-06

狀態：Logo、favicon、Open Graph 與截圖框已調整。沒有 commit，沒有 push，沒有改 Flutter App，沒有建立 `app-ads.txt`。

### 實際完成

- `assets/logo.png` 原圖沒有改。SHA-256 仍是 `3ecede8748ef1d17a2d043bf5fd58c61b28e8aa42bf242c5d4f7816e7193cd47`，與 Flutter `assets/icons/app_icon.png` 相同。
- 由原圖整張等比縮成 512×512。繪製範圍是 x=0、y=0、寬 512、高 512，沒有裁切。頁面用 `assets/logo-512.webp`（9,426 bytes），不支援 WebP 時用 `assets/logo-512.png`（228,539 bytes）。顯示時 `object-fit: contain`，40×40 與 96×96 都是正方形。
- 分頁圖示是 32×32 的 `assets/favicon-32.png` 與根目錄 `favicon.ico`。頁面不再載入 1.4 MB 的原圖。
- 三頁都有 viewport、title、description、favicon，以及 `og:site_name`、`og:type`、`og:title`、`og:description`、`og:locale`。沒有填 `og:url` 或絕對網址的 `og:image`。切換語言時 title、description 與這三個 Open Graph 欄位一起改。
- 頁首 Logo 的 alt 維持空白，因為旁邊已有「Kitchen Multi Timer」文字。首頁大圖的 alt 會隨語言改變。
- 三個截圖框改成 9:19.5。還沒有圖片，框內仍是「截圖待補」。之後把 `<img>` 放進 `.shot-frame`，佔位文字會隱藏，圖片以 `object-fit: contain` 放進同一框。
- 隱私權三語沒有改寫。既有文字已寫明語言選擇存在 `localStorage`、鍵名 `kitchen-multi-timer-language`，廣告節仍是待 AdMob 整合後審核，也沒有寫開發者名稱或 Email。

### 驗證

沿用 `http://127.0.0.1:8765/`。

- `logo-512.webp` 200、`image/webp`、9,426 bytes。`logo-512.png` 200。`favicon-32.png` 200。`favicon.ico` 200、`image/x-icon`。`/app-ads.txt` 仍是 404。
- 瀏覽器實際載入的是 `logo-512.webp`，自然尺寸 512×512。頁首畫成 40×40，首頁大圖畫成 96×96。
- 三個截圖框在 1280、471、390、320 寬都是 220×477，高寬比 2.167，框內沒有 `<img>`。1280 時三框並排，390 與 320 時上下排，右緣都在畫面內。
- 1280 寬沒有橫向溢出，標誌、導覽與語言在同一列。390 與 320 也沒有橫向溢出。語言按鈕高度 44。320 寬的日文「プライバシーポリシー」右緣在 297。
- 首頁改英文後網址仍是 `/`，`html lang` 為 `en`，hero alt 為 `Kitchen Multi Timer logo`，`og:locale` 為 `en`，`og:description` 換成英文。
- 再開隱私權頁仍是日文。標題與 `og:title` 是「プライバシーポリシー — Kitchen Multi Timer」。內文有 `localStorage`、鍵名，以及「AdMob 統合後に確認」。沒有 `og:url`，沒有 `mailto:`。
- 支援頁標題是「サポート — Kitchen Multi Timer」，聯絡處有「未記入」，沒有 `mailto:`，471 寬沒有橫向溢出。
- 三個 HTML、CSS、JS 裡沒有 `http://`、`https://`、`apps.apple.com`、`mailto:` 或 `logo.png`。連結都是相對路徑。

### 尚未完成

- 開發者或營運者名稱、聯絡信箱、真實截圖、上架後的 App Store 網址，都還沒有。
- 隱私權草稿還沒有做法律審閱，不能直接當成已定稿的 App Store 政策。
- `app-ads.txt` 要等 AdMob 給正式內容，並確認網站發布在網域根路徑之後再加。

## 正式聯絡資訊與 GitHub Pages 網址

日期：2026-11-06

狀態：支援頁與隱私權頁已改用正式信箱。canonical 與 Open Graph 網址已指向預定的使用者網站。沒有建立 GitHub 儲存庫，沒有 commit，沒有 push。沒有改 Flutter App。沒有建立 `app-ads.txt`。

### 實際完成

- 支援頁與隱私權頁的聯絡方式改為 `mailto:ryouki1897@gmail.com`，顯示文字是 `ryouki1897@gmail.com`。繁中、英文、日文的提示都改成這個信箱可用。
- 開發者或營運者名稱維持「待填寫」。GitHub 帳號沒有拿來當作正式名稱。
- 隱私權廣告節仍是「待 AdMob 整合後審核」。`privacy.limits1` 改成不再說電子郵件尚未提供，並註明信箱寫在上方。
- 首頁 canonical 與 `og:url` 是 `https://ryouki1897.github.io/`。隱私權頁是 `https://ryouki1897.github.io/privacy.html`。支援頁是 `https://ryouki1897.github.io/support.html`。
- `og:image` 三頁都指向 `https://ryouki1897.github.io/assets/logo-512.png`，並標明 512×512。切換語言時只改 `og:image:alt`。
- `README.md` 寫上 GitHub 帳號 Ryouki1897、儲存庫名稱 `Ryouki1897.github.io`，以及根路徑發布方式。
- 頁面之間的導覽仍使用相對路徑：`index.html`、`privacy.html`、`support.html`。

### 這次檢查

- 本機 `http://127.0.0.1:8765/` 三頁、CSS、JS、`favicon.ico`、`logo-512.png`、`logo-512.webp` 都是 200。`/app-ads.txt` 是 404。
- 瀏覽器先開支援頁，沿用先前的日文。信箱連結是 `mailto:ryouki1897@gmail.com`，提示是「サポートとプライバシーの連絡は、このメールアドレスへ送ってください。」canonical 與 `og:url` 是 `https://ryouki1897.github.io/support.html`。`og:image:alt` 是「Kitchen Multi Timer のロゴ」。471 寬沒有橫向溢出。
- 改成英文後仍停在 `support.html`。再點隱私權政策，進到 `privacy.html`，語言仍是英文。開發者名稱是 “To be filled in”。廣告標籤是 “Pending review after AdMob is integrated”。信箱連結高度 44px。
- 改回繁中後仍停在 `privacy.html`。限制條文是「沒有記載公司名稱或地址，因為這些還沒有提供。聯絡信箱寫在上方。」廣告標籤是「待 AdMob 整合後審核」。
- 首頁繁中的支援卡片已改成「以及聯絡信箱」。canonical 與 `og:url` 是 `https://ryouki1897.github.io/`。頁內連結是 `index.html`、`privacy.html`、`support.html`。
- 320 寬、日文首頁：`scrollWidth` 與 `clientWidth` 都是 320。「プライバシーポリシー」右緣在 297。語言按鈕高度 44px。`og:url` 沒有因語言改變。
- Flutter `assets/icons/app_icon.png` 與網站 `assets/logo.png` 的 SHA-256 仍是 `3ecede8748ef1d17a2d043bf5fd58c61b28e8aa42bf242c5d4f7816e7193cd47`。網站儲存庫沒有 commit。

### 尚未完成

- 開發者或營運者名稱、真實截圖、上架後的 App Store 網址仍未提供。
- 隱私權草稿還沒有做法律審閱。
- 儲存庫與 GitHub Pages 還沒有建立或發布。
- `app-ads.txt` 仍不建立。預定發布後，它的位置會是 `https://ryouki1897.github.io/app-ads.txt`。

## 正式網址改為專案子路徑

日期：2026-11-06

狀態：網站已發布在 `https://ryouki1897.github.io/kitchen-multi-timer-website/`。canonical、`og:url` 與 `og:image` 已改到這個子路徑。儲存庫名稱維持 `kitchen-multi-timer-website`。沒有 commit，沒有 push，沒有改 Flutter App，沒有建立 `app-ads.txt`。

### 實際完成

- 首頁 canonical 與 `og:url` 改為 `https://ryouki1897.github.io/kitchen-multi-timer-website/`。
- 隱私權頁改為 `https://ryouki1897.github.io/kitchen-multi-timer-website/privacy.html`。
- 支援頁改為 `https://ryouki1897.github.io/kitchen-multi-timer-website/support.html`。
- 三頁 `og:image` 改為 `https://ryouki1897.github.io/kitchen-multi-timer-website/assets/logo-512.png`。
- `README.md` 的正式網址、儲存庫名稱與 Pages 說明改成這個專案網站。AdMob 要的 `app-ads.txt` 仍是網域根目錄 `https://ryouki1897.github.io/app-ads.txt`，不是這個子路徑。
- CSS、JavaScript、圖片與頁面連結維持相對路徑。

### 這次檢查

- 已上線的首頁、`privacy.html`、`support.html`、`assets/css/styles.css`、`assets/js/i18n.js`、`assets/js/site.js`、`assets/logo-512.png`、`assets/logo-512.webp`、`assets/favicon-32.png`、`favicon.ico` 都是 200，網址留在 `/kitchen-multi-timer-website/`。
- 已上線版本的 canonical、`og:url` 與 `og:image` 仍指向 `https://ryouki1897.github.io/` 根目錄。那些根目錄網址目前是 404。這次的網址修正還在本機，尚未推上。
- `https://ryouki1897.github.io/kitchen-multi-timer-website/app-ads.txt` 是 404。`https://ryouki1897.github.io/` 也是 404。
- 本機以 `http://127.0.0.1:8766/kitchen-multi-timer-website/` 預覽修改後的檔案。首頁樣式已載入，背景色是 `rgb(247, 243, 235)`，Logo 是子路徑下的 `assets/logo-512.webp`，512×512。
- 從首頁進隱私權頁，再進支援頁，網址分別停在子路徑的 `privacy.html` 與 `support.html`。三頁的 canonical、`og:url`、`og:image` 都是上面的正式網址。

### 尚未完成

- 這次網址修正需要推上 `kitchen-multi-timer-website` 之後，已上線頁面的 canonical 與 Open Graph 才會換成子路徑。
- 開發者或營運者名稱、真實截圖、App Store 網址、隱私權草稿審閱仍未完成。
- `app-ads.txt` 仍不建立。放在這個專案網站裡不會出現在網域根目錄。
