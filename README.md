# IPShine

🌍 [English](https://github.com/Argh94/IPShine/blob/main/README.md) | 🌐[فارسی](https://github.com/Argh94/IPShine/blob/main/README_fa.md)

![GitHub stars](https://img.shields.io/github/stars/Argh94/IPShine?color=brightgreen&style=flat-square)
![GitHub issues](https://img.shields.io/github/issues/Argh94/IPShine?color=red&style=flat-square)
![GitHub license](https://img.shields.io/github/license/Argh94/IPShine?color=blue&style=flat-square)
![Last Commit](https://img.shields.io/github/last-commit/Argh94/IPShine?color=purple&style=flat-square)
![Cloudflare Workers](https://img.shields.io/badge/Deployed%20on-Cloudflare%20Workers-blueviolet?logo=cloudflare&style=flat-square)

A sleek, neon-themed IP and device information tool built with Cloudflare Workers, featuring real-time data, WebRTC detection, and a modern UI.

## ✨ Overview

IPShine is a lightweight web application that provides detailed information about a user's IP address and device. With its stunning neon gradient design and real-time data fetching, it’s perfect for developers, security enthusiasts, or anyone curious about their online footprint. Deployed on Cloudflare Workers, it ensures fast performance and global accessibility.

## 🌟 Features

- **IP Information**: Displays IP address, country, region, city, ISP, coordinates, and more.
- **Device Details**: Shows OS, browser, platform, languages, and user agent.
- **Security Checks**: Detects VPN, proxy, Tor, datacenter usage, and WebRTC IP leaks.
- **Real-Time Updates**: Live system and IP timezone information.
- **Neon UI**: Eye-catching dark theme with animated particle effects and gradient backgrounds.
- **Copy Functionality**: Easily copy IP or other data with a single click.
- **Responsive Design**: Optimized for desktop and mobile devices.
- **Terminal Support**: Fetch data via `curl` with a formatted output.

## 🚀 Getting Started

### Prerequisites

- A Cloudflare account with Workers enabled.
- Node.js and npm installed (for local testing).

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/Argh94/IPShine.git
    cd IPShine
    ```
2. Install dependencies (if any custom scripts are added later):
    ```bash
    npm install
    ```
3. Deploy to Cloudflare Workers:
    - Create a new Worker on the Cloudflare dashboard.
    - Copy the `index.js` code into your Worker script.
    - Deploy and note your Worker URL (e.g., `https://your-worker.workers.dev`).

### Usage

- Visit your deployed Worker URL in a browser to see the UI.
- For terminal use, run:
    ```bash
    curl https://your-worker.workers.dev
    ```
- Explore the real-time data and copy values as needed.

## 📸 Screenshots

![WebSift Logo](https://github.com/Argh94/IPShine/blob/main/IMG.png)

## 🛠 Built With

- **Cloudflare Workers**: Serverless platform for deployment.
- **HTML/CSS/JavaScript**: Custom neon-themed frontend.
- **IPAPI.is**: API for IP geolocation data.
- **WebRTC**: For IP leak detection.

## 🤝 Contributing

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature-name`).
3. Commit your changes (`git commit -m 'Add feature'`).
4. Push to the branch (`git push origin feature-name`).
5. Open a Pull Request.

## 🐞 Issues

Found a bug or have a suggestion? [Open an issue!](https://github.com/Argh94/IPShine/issues)

## 📄 License

This project is licensed under the MIT License. See the LICENSE file for details.

## 🙏 Acknowledgments

- Inspired by modern web design trends with neon aesthetics.
- Thanks to the Cloudflare Workers community for the robust platform.
- Special thanks to Argh94 for creating and maintaining this project.

## 📬 Contact

- **GitHub**: [Argh94](https://github.com/Argh94)
