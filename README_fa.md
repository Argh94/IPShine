# آی‌پی‌شاین (IPShine)

🌍 [English](https://github.com/Argh94/IPShine/blob/main/README.md) | 🌐[فارسی](https://github.com/Argh94/IPShine/blob/main/README_fa.md)


![ستاره‌های گیت‌هاب](https://img.shields.io/github/stars/Argh94/IPShine?color=brightgreen&style=flat-square)
![ایشیوهای گیت‌هاب](https://img.shields.io/github/issues/Argh94/IPShine?color=red&style=flat-square)
![لایسنس گیت‌هاب](https://img.shields.io/github/license/Argh94/IPShine?color=blue&style=flat-square)
![آخرین کامیت](https://img.shields.io/github/last-commit/Argh94/IPShine?color=purple&style=flat-square)
![Cloudflare Workers](https://img.shields.io/badge/Deployed%20on-Cloudflare%20Workers-blueviolet?logo=cloudflare&style=flat-square)

یک ابزار شیک و مدرن با تم نئونی برای نمایش اطلاعات آی‌پی و دستگاه شما، ساخته شده با Cloudflare Workers و دارای داده‌های لحظه‌ای، شناسایی WebRTC و رابط کاربری مدرن.

## ✨ معرفی

آی‌پی‌شاین یک اپلیکیشن تحت وب سبک است که اطلاعات کاملی از آدرس آی‌پی و دستگاه کاربر نمایش می‌دهد. با طراحی زیبای گرادیانی و نئونی و دریافت داده‌های زنده، مناسب توسعه‌دهندگان، علاقه‌مندان به امنیت یا هر کسی است که کنجکاو ردپای آنلاین خودش باشد. این ابزار روی Cloudflare Workers دیپلوی شده و سرعت و دسترسی سراسری را تضمین می‌کند.

## 🌟 امکانات

- **اطلاعات آی‌پی**: نمایش آدرس آی‌پی، کشور، استان، شهر، ارائه‌دهنده اینترنت، مختصات و موارد دیگر.
- **جزئیات دستگاه**: نمایش سیستم عامل، مرورگر، پلتفرم، زبان‌ها و User Agent.
- **بررسی‌های امنیتی**: شناسایی VPN، پراکسی، تور، دیتاسنتر بودن و نشت آی‌پی WebRTC.
- **به‌روزرسانی لحظه‌ای**: اطلاعات زنده سیستم و منطقه زمانی آی‌پی.
- **رابط کاربری نئونی**: تم تیره با افکت‌های پارتیکل و گرادیان‌های متحرک.
- **قابلیت کپی**: امکان کپی آسان آی‌پی یا سایر داده‌ها با یک کلیک.
- **واکنش‌گرا**: طراحی بهینه برای دسکتاپ و موبایل.
- **پشتیبانی ترمینال**: دریافت داده‌ها با فرمت مناسب از طریق `curl`.

## 🚀 شروع سریع

### پیش‌نیازها

- یک حساب Cloudflare با فعال‌سازی Workers.
- نصب Node.js و npm (برای تست محلی).

### نصب

1. ریپازیتوری را کلون کنید:
    ```bash
    git clone https://github.com/Argh94/IPShine.git
    cd IPShine
    ```
2. نصب وابستگی‌ها (در صورت اضافه شدن اسکریپت سفارشی):
    ```bash
    npm install
    ```
3. دیپلوی روی Cloudflare Workers:
    - یک Worker جدید در داشبورد Cloudflare بسازید.
    - کد `index.js` را در اسکریپت Worker قرار دهید.
    - دیپلوی کنید و آدرس Worker خود را یادداشت کنید (مثلاً: `https://your-worker.workers.dev`).

### استفاده

- آدرس Worker دیپلوی‌شده را در مرورگر باز کنید تا رابط کاربری را ببینید.
- برای استفاده ترمینال، این دستور را بزنید:
    ```bash
    curl https://your-worker.workers.dev
    ```
- داده‌های لحظه‌ای را بررسی و در صورت نیاز مقادیر را کپی کنید.

## 📸 اسکرین‌شات‌ها

![WebSift Logo](https://github.com/Argh94/IPShine/blob/main/IMG.png)

## 🛠 ساخته‌شده با

- **Cloudflare Workers**: پلتفرم سرورلس برای دیپلوی.
- **HTML/CSS/JavaScript**: ظاهر نئونی اختصاصی.
- **IPAPI.is**: API برای داده‌های مکان‌یابی آی‌پی.
- **WebRTC**: جهت شناسایی نشت آی‌پی.

## 🤝 مشارکت

1. ریپازیتوری را Fork کنید.
2. یک شاخه جدید برای فیچر بسازید (`git checkout -b feature-name`).
3. تغییرات خود را کامیت کنید (`git commit -m 'Add feature'`).
4. شاخه را پوش کنید (`git push origin feature-name`).
5. Pull Request باز کنید.

## 🐞 اشکال و پیشنهاد

در صورت مشاهده باگ یا داشتن پیشنهاد، لطفاً [ایشیو جدید باز کنید!](https://github.com/Argh94/IPShine/issues)

## 📄 لایسنس

این پروژه تحت لایسنس MIT منتشر شده است. جهت جزئیات به فایل LICENSE مراجعه کنید.

## 🙏 تشکر و قدردانی

- الهام گرفته از ترندهای مدرن طراحی وب با زیبایی نئونی
- سپاس از جامعه Cloudflare Workers برای پلتفرم قدرتمند
- تشکر ویژه از Argh94 برای ساخت و نگهداری این پروژه

## 📬 تماس

- **گیت‌هاب**: [Argh94](https://github.com/Argh94)
