# BunnyEra 技術官網

BunnyEra 技術官網是一個基於 **HTML + CSS** 的靜態網站，展示 BunnyEra 的四大核心模組：Console、AI、Matrix、Notify。  
網站採用 **組件化設計**，方便維護與擴展。

---

## 📂 專案結構
bunnyera-website/ │── index.html              # 首頁（Hero 橫幅 + 模組卡片） │── console.html            # Console 模組頁面 │── ai.html                 # AI 模組頁面 │── matrix.html             # Matrix 模組頁面 │── notify.html             # Notify 模組頁面 │── styles.css              # 全站樣式 │ ├── components/             # 公共組件 │   ├── header.html         # 導覽列 │   ├── footer.html         # 頁腳 │   ├── card.html           # 卡片模板 │   └── modal.html          # 彈窗模板 │ ├── assets/                 # 靜態資源 │   ├── images/             # 圖片資源 │   │   ├── banner.jpg      # 首頁橫幅背景 │   │   ├── logo.png        # 品牌 Logo │   │   ├── ai.png          # AI 模組圖標 │   │   ├── console.png     # Console 模組圖標 │   │   ├── matrix.png      # Matrix 模組圖標 │   │   └── notify.png      # Notify 模組圖標 │   └── icons/              # 其他圖標 │ └── scripts/                # 前端交互腳本 └── main.js             # 全局交互邏輯

---

## 🚀 使用方式

1. **下載專案**
   ```bash
   git clone https://github.com/your-repo/bunnyera-website.git
   cd bunnyera-website