addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request));
});

function parseUserAgent(ua) {
    if (!ua || ua === 'Unknown') {
        return { browser: 'Unknown', os: 'Unknown', platform: 'Unknown', version: 'Unknown' };
    }
    
    let browser = 'Unknown', os = 'Unknown', platform = 'Unknown', version = 'Unknown';
    
    if (/firefox/i.test(ua)) {
        browser = 'Firefox';
        const match = ua.match(/firefox\/([0-9.]+)/i);
        if (match) version = match[1];
    } else if (/edg/i.test(ua)) {
        browser = 'Edge';
        const match = ua.match(/edg\/([0-9.]+)/i);
        if (match) version = match[1];
    } else if (/chrome/i.test(ua)) {
        browser = 'Chrome';
        const match = ua.match(/chrome\/([0-9.]+)/i);
        if (match) version = match[1];
    } else if (/safari/i.test(ua) && !/chrome/i.test(ua)) {
        browser = 'Safari';
        const match = ua.match(/version\/([0-9.]+)/i);
        if (match) version = match[1];
    } else if (/opera|opr/i.test(ua)) {
        browser = 'Opera';
        const match = ua.match(/(?:opera|opr)\/([0-9.]+)/i);
        if (match) version = match[1];
    } else if (/msie|trident/i.test(ua)) {
        browser = 'Internet Explorer';
        const match = ua.match(/(?:msie |rv:)([0-9.]+)/i);
        if (match) version = match[1];
    }
    
    if (/windows nt/i.test(ua)) os = 'Windows';
    else if (/android/i.test(ua)) os = 'Android';
    else if (/iphone|ipad|ipod/i.test(ua)) os = 'iOS';
    else if (/mac os x/i.test(ua)) os = 'macOS';
    else if (/linux/i.test(ua)) os = 'Linux';
    else if (/cros/i.test(ua)) os = 'Chrome OS';
    
    if (/mobile/i.test(ua)) platform = 'Mobile';
    else if (/tablet/i.test(ua)) platform = 'Tablet';
    else platform = 'Desktop';
    
    return { browser, os, platform, version };
}

function getFlagEmoji(countryCode) {
    if (!countryCode || countryCode.length !== 2) return '';
    const codePoints = countryCode
        .toUpperCase()
        .split('')
        .map(char => 127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
}

async function handleRequest(request) {
    try {
        const clientIp = request.headers.get('CF-Connecting-IP') || 'Unknown';
        const userAgent = request.headers.get('User-Agent') || 'Unknown';
        const uaInfo = parseUserAgent(userAgent);
        
        const ipApiUrl = `https://api.ipapi.is/?q=${clientIp}`;
        const ipResponse = await fetch(ipApiUrl);
        const ipData = await ipResponse.json();

        if (!ipData.ip) {
            return new Response(
                JSON.stringify({ error: 'Failed to fetch IP information' }),
                { status: 500, headers: { 'Content-Type': 'application/json' } }
            );
        }

        const acceptHeader = request.headers.get('Accept') || '';
        const isCurl = (userAgent && userAgent.toLowerCase().includes('curl')) || acceptHeader.includes('application/json');
        const flagEmoji = getFlagEmoji(ipData.location?.country_code);

        if (isCurl) {
            const cyan = '\x1b[36m', green = '\x1b[32m', yellow = '\x1b[33m', 
                  magenta = '\x1b[35m', red = '\x1b[31m', reset = '\x1b[0m', bold = '\x1b[1m';
            
            const output = `
${bold}${cyan}┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓${reset}
${bold}${cyan}┃        IP Information           ┃${reset}
${bold}${cyan}┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛${reset}

${bold}${green}IP:        ${reset}${clientIp}
${bold}${green}Country:   ${reset}${flagEmoji} ${ipData.location?.country || 'Unknown'}
${bold}${green}Region:    ${reset}${ipData.location?.state || 'Unknown'}
${bold}${green}City:      ${reset}${ipData.location?.city || 'Unknown'}
${bold}${green}ISP:       ${reset}${ipData.company?.name || 'Unknown'}
${bold}${green}Lat:       ${reset}${ipData.location?.latitude || 'Unknown'}
${bold}${green}Lon:       ${reset}${ipData.location?.longitude || 'Unknown'}
${bold}${green}TZ:        ${reset}${ipData.location?.timezone || 'Unknown'}
${bold}${yellow}Proxy:     ${reset}${ipData.is_proxy ? `${red}Yes${reset}` : `${green}No${reset}`}
${bold}${yellow}VPN:       ${reset}${ipData.is_vpn ? `${red}Yes${reset}` : `${green}No${reset}`}
${bold}${yellow}Tor:       ${reset}${ipData.is_tor ? `${red}Yes${reset}` : `${green}No${reset}`}
${bold}${yellow}Datacenter:${reset}${ipData.is_datacenter ? `${red}Yes${reset}` : `${green}No${reset}`}
${bold}${yellow}Abuser:    ${reset}${ipData.is_abuser ? `${red}Yes${reset}` : `${green}No${reset}`}

${bold}${magenta}User Agent:${reset} ${userAgent}
`;
            return new Response(output, {
                headers: { 'Content-Type': 'text/plain; charset=utf-8' },
                status: 200,
            });
        }

        const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>IP Information</title>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Fira Code', 'SF Mono', 'Monaco', 'Inconsolata', 'Droid Sans Mono', monospace;
            background: #1a1a2e;
            color: #e0e0e0;
            overflow-x: hidden;
            position: relative;
            padding-top: 20px;
            line-height: 1.6;
        }

        body::before {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #8a2be2, #00b7eb, #ff1493);
            background-size: 200% 200%;
            animation: gradientShift 15s ease infinite;
            opacity: 0.3;
            z-index: -1;
            pointer-events: none;
        }

        @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }

        .container {
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-template-rows: auto auto;
            gap: 20px;
            width: 100%;
            max-width: 1400px;
            margin: 0 auto;
        }

        .page-wrapper {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-start;
        }

        .info-card {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 12px;
            border: 1px solid rgba(255, 255, 255, 0.2);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
            transition: all 0.3s ease;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            height: fit-content;
            max-height: 80vh;
            overflow-y: auto;
        }

        .info-card:hover {
            border-color: #00b7eb;
        }

        .card-header {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 20px 24px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.2);
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(5px);
            -webkit-backdrop-filter: blur(5px);
            position: relative;
        }

        .card-header i {
            font-size: 1.2em;
            color: #61afef;
            width: 20px;
            text-align: center;
        }

        .card-header h2 {
            font-size: 1.2em;
            font-weight: 600;
            color: #e06c75;
            font-family: inherit;
        }

        .card-content {
            padding: 20px;
            flex: 1;
        }

        .info-item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 12px;
            padding: 12px 16px;
            background: rgba(255, 255, 255, 0.08);
            border: 1px solid rgba(255, 255, 255, 0.15);
            border-radius: 6px;
            backdrop-filter: blur(5px);
            -webkit-backdrop-filter: blur(5px);
            transition: background-color 0.15s ease;
        }

        .info-item:last-child {
            margin-bottom: 0;
        }

        .info-item:hover {
            background: rgba(255, 255, 255, 0.15);
        }

        .label {
            font-weight: 500;
            color: #ffeb3b;
            font-size: 1em;
            min-width: 120px;
            font-family: inherit;
        }

        .label::after {
            content: ':';
            color: #e0e0e0;
            margin-left: 2px;
        }

        .value {
            font-weight: 500;
            color: #a3be8c;
            flex: 1;
            text-align: right;
            margin-right: 12px;
            font-size: 0.95em;
            font-family: inherit;
            word-break: break-all;
        }

        .copy-btn {
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.3);
            color: #e0e0e0;
            border-radius: 6px;
            padding: 6px 8px;
            cursor: pointer;
            transition: all 0.3s ease;
            font-size: 0.8em;
            min-width: 32px;
            height: 28px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: inherit;
        }

        .copy-btn:hover {
            background: rgba(255, 255, 255, 0.3);
            border-color: #00b7eb;
            color: #ffffff;
        }

        .fade-in {
            animation: fadeIn 0.3s ease-out;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .string { color: #a3be8c; }
        .number { color: #d19a66; }
        .boolean { color: #81a1c1; }
        .keyword { color: #b48ead; }
        .comment { color: #5c6370; font-style: italic; }
        .variable { color: #bf616a; }
        .function { color: #61afef; }

        .boolean.green { color: #a3be8c !important; font-weight: bold; }
        .boolean.red { color: #bf616a !important; font-weight: bold; }
        .string.red { color: #bf616a !important; }
        .string.green { color: #a3be8c !important; }

        .badge { background: #bf616a; color: #ffffff; padding: 4px 8px; border-radius: 12px; font-size: 0.7em; font-weight: 600; margin-left: 8px; }
        .badge.warning { background: #d19a66; }

        @supports not (backdrop-filter: blur(10px)) {
            .info-card { background: rgba(26, 26, 46, 0.5); box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5); }
            .card-header { background: rgba(26, 26, 46, 0.7); }
            .info-item { background: rgba(26, 26, 46, 0.4); }
        }

        @media (max-width: 768px) {
            .container {
                grid-template-columns: 1fr;
                grid-template-rows: auto auto;
                padding: 15px;
            }
            .info-card {
                grid-column: 1 !important;
                grid-row: auto !important;
                margin-top: 0 !important;
            }
            .info-item {
                flex-direction: column;
                gap: 8px;
                text-align: center;
            }
            .value { text-align: center; margin-right: 0; }
            .label { min-width: auto; }
        }

        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: rgba(255, 255, 255, 0.1); }
        ::-webkit-scrollbar-thumb { background: #00b7eb; border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: #61afef; }

        #particle-canvas {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
            pointer-events: none;
        }

        footer svg:hover { fill: #00b7eb; }
    </style>
</head>
<body>
    <canvas id="particle-canvas"></canvas>
    <div class="page-wrapper">
        <div class="container">
            <div class="info-card" style="grid-column: 1; grid-row: 1 / 3;">
                <div class="card-header">
                    <i class="fas fa-code"></i>
                    <h2>IP Information</h2>
                </div>
                <div class="card-content">
                    <div class="info-item">
                        <span class="label">IP Address</span>
                        <span class="value string" data-ip="${clientIp}">${clientIp}</span>
                        <button class="copy-btn" title="Copy"><i class="fas fa-copy"></i></button>
                    </div>
                    <div class="info-item">
                        <span class="label">Country</span>
                        <span class="value string">${flagEmoji} ${ipData.location?.country || 'Unknown'}</span>
                    </div>
                    <div class="info-item">
                        <span class="label">ISP</span>
                        <span class="value string">${ipData.company?.name || 'Unknown'}</span>
                    </div>
                    <div class="info-item">
                        <span class="label">Region</span>
                        <span class="value string">${ipData.location?.state || 'Unknown'}</span>
                    </div>
                    <div class="info-item">
                        <span class="label">City</span>
                        <span class="value string">${ipData.location?.city || 'Unknown'}</span>
                    </div>
                    <div class="info-item">
                        <span class="label">Coordinates</span>
                        <span class="value string">${ipData.location?.latitude || 'Unknown'}, ${ipData.location?.longitude || 'Unknown'}</span>
                        <button class="copy-btn" title="Copy"><i class="fas fa-copy"></i></button>
                    </div>
                    <div class="info-item">
                        <span class="label">VPN</span>
                        <span class="value boolean ${ipData.is_vpn ? 'red' : 'green'}">${ipData.is_vpn ? 'true' : 'false'}</span>
                    </div>
                    <div class="info-item">
                        <span class="label">Proxy</span>
                        <span class="value boolean ${ipData.is_proxy ? 'red' : 'green'}">${ipData.is_proxy ? 'true' : 'false'}</span>
                    </div>
                    <div class="info-item">
                        <span class="label">Abuser</span>
                        <span class="value boolean ${ipData.is_abuser ? 'red' : 'green'}">${ipData.is_abuser ? 'true' : 'false'}</span>
                    </div>
                    <div class="info-item">
                        <span class="label">Datacenter</span>
                        <span class="value boolean ${ipData.is_datacenter ? 'red' : 'green'}">${ipData.is_datacenter ? 'true' : 'false'}</span>
                    </div>
                    <div class="info-item">
                        <span class="label">Tor</span>
                        <span class="value boolean ${ipData.is_tor ? 'red' : 'green'}">${ipData.is_tor ? 'true' : 'false'}</span>
                    </div>
                </div>
            </div>
            <div class="info-card" style="grid-column: 2; grid-row: 1;">
                <div class="card-header">
                    <i class="fas fa-terminal"></i>
                    <h2>Device Information</h2>
                    <span id="security-badges"></span>
                </div>
                <div class="card-content">
                    <div class="info-item">
                        <span class="label">OS / Platform</span>
                        <span class="value string">${uaInfo.os} / ${uaInfo.platform}</span>
                    </div>
                    <div class="info-item">
                        <span class="label">Browser</span>
                        <span class="value string">${uaInfo.browser}${uaInfo.version !== 'Unknown' ? ' ' + uaInfo.version : ''}</span>
                    </div>
                    <div class="info-item">
                        <span class="label">Languages</span>
                        <span class="value string" id="browser-languages">Loading...</span>
                    </div>
                    <div class="info-item">
                        <span class="label">User Agent</span>
                        <span class="value string">${userAgent}</span>
                        <button class="copy-btn" title="Copy"><i class="fas fa-copy"></i></button>
                    </div>
                    <div class="info-item">
                        <span class="label">WebRTC IP</span>
                        <span class="value string" id="webrtc-ip" data-ip="">Checking...</span>
                    </div>
                    <div class="info-item">
                        <span class="label">System Time Zone</span>
                        <span class="value string" id="system-time-zone">Loading...</span>
                    </div>
                    <div class="info-item">
                        <span class="label">IP Time Zone</span>
                        <span class="value string" id="ip-time-zone">Loading...</span>
                    </div>
                </div>
            </div>
            <div class="info-card" style="grid-column: 2; grid-row: 2; margin-top: 10px">
                <div class="card-header">
                    <i class="fas fa-terminal"></i>
                    <h2>Terminal Usage</h2>
                </div>
                <div class="card-content">
                    <div style="background: rgba(255, 255, 255, 0.08); border: 1px solid rgba(255, 255, 255, 0.15); border-radius: 6px; padding: 16px; font-family: 'Fira Code', monospace; backdrop-filter: blur(5px); -webkit-backdrop-filter: blur(5px);">
                        <div style="color: #a3be8c; font-size: 1em; margin-bottom: 8px;">$ curl domain.com</div>
                        <div style="color: #61afef; font-size: 0.9em; font-style: italic;">Get your IP information via terminal</div>
                    </div>
                </div>
            </div>
        </div>
        <footer style="width:100%;text-align:center;margin:20px auto;padding:10px;">
            <a href="https://github.com/Argh94" target="_blank" title="GitHub Profile">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="fill:#61afef; transition: fill 0.3s ease;">
                    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.043-1.416-4.043-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                </svg>
            </a>
        </footer>
    </div>
    <script>
        let webrtcDetected = false;
        let webrtcIP = '';
        const publicIP = '${clientIp}';

        function detectWebRTCIP() {
            return new Promise((resolve) => {
                try {
                    const rtc = new RTCPeerConnection({ iceServers: [{urls: 'stun:stun.l.google.com:19302'}, {urls: 'stun:stun1.l.google.com:19302'}] });
                    let ips = [], candidateCount = 0;
                    
                    rtc.createDataChannel('');
                    
                    rtc.onicecandidate = function(e) {
                        candidateCount++;
                        if (e.candidate) {
                            const candidate = e.candidate.candidate;
                            const ipMatch = candidate.match(/([0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3})/);
                            if (ipMatch) {
                                const ip = ipMatch[1];
                                if (!ip.startsWith('192.168.') && !ip.startsWith('10.') && !ip.startsWith('172.') &&
                                    !ip.startsWith('127.') && !ip.startsWith('169.254.') && ip !== '0.0.0.0' && !ips.includes(ip)) {
                                    ips.push(ip);
                                }
                            }
                        }
                        if (!e.candidate || candidateCount > 10) {
                            rtc.close();
                            resolve(ips);
                        }
                    };
                    
                    rtc.createOffer().then(offer => rtc.setLocalDescription(offer)).catch(() => resolve([]));
                    setTimeout(() => { rtc.close(); resolve(ips); }, 5000);
                } catch (error) {
                    resolve([]);
                }
            });
        }

        function copyToClipboard(button) {
            const infoItem = button.closest('.info-item');
            const value = infoItem.querySelector('.value');
            let text = value.textContent;
            if (value.hasAttribute('data-ip') && value.getAttribute('data-ip')) text = value.getAttribute('data-ip');
            
            navigator.clipboard.writeText(text).then(() => {
                const originalIcon = button.innerHTML;
                button.innerHTML = '<i class="fas fa-check"></i>';
                button.style.background = '#a3be8c';
                button.style.borderColor = '#a3be8c';
                button.style.color = '#282c34';
                setTimeout(() => {
                    button.innerHTML = originalIcon;
                    button.style.background = 'rgba(255, 255, 255, 0.1)';
                    button.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                    button.style.color = '#e0e0e0';
                }, 1000);
            }).catch(() => {
                const textArea = document.createElement('textarea');
                textArea.value = text;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
            });
        }

        function updateTimes() {
            const now = new Date();
            const ipTimezone = '${ipData.location?.timezone || 'UTC'}';
            const systemZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

            const systemTime = now.toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', timeZoneName: 'short' });
            document.getElementById('system-time-zone').textContent = systemTime + ' (' + systemZone + ')';
            document.getElementById('system-time-zone').className = 'value string';

            let ipTime, ipZoneDisplay = ipTimezone;
            try {
                ipTime = now.toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', timeZone: ipTimezone, timeZoneName: 'short' });
            } catch (e) {
                ipTime = 'Invalid timezone';
                ipZoneDisplay = 'Invalid timezone';
            }

            let isZoneEqual = (systemZone === ipTimezone);
            if (isZoneEqual) {
                document.getElementById('ip-time-zone').textContent = ipTime + ' (' + ipZoneDisplay + ')';
                document.getElementById('ip-time-zone').className = 'value string green';
            } else {
                document.getElementById('ip-time-zone').textContent = ipTime + ' (' + ipZoneDisplay + ') ❌';
                document.getElementById('ip-time-zone').className = 'value string red';
            }
            
            updateSecurityBadges();
        }

        function updateSecurityBadges() {
            const badges = [];
            const ipTimezone = '${ipData.location?.timezone || 'UTC'}';
            const systemZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
            
            if (systemZone !== ipTimezone) badges.push('<span class="badge warning">Timezone Mismatch</span>');
            if (webrtcDetected && webrtcIP && webrtcIP !== publicIP) badges.push('<span class="badge">WebRTC IP Leak</span>');
            
            document.getElementById('security-badges').innerHTML = badges.join('');
        }

        function initParticles() {
            const canvas = document.getElementById('particle-canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            const particles = [];
            const particleCount = 50;
            const colors = ['#8a2be2', '#00b7eb', '#ff1493', '#ff4500', '#00ff00', '#ffff00', '#ff69b4'];

            class Particle {
                constructor() {
                    this.x = Math.random() * canvas.width;
                    this.y = Math.random() * canvas.height;
                    this.size = Math.random() * 3 + 1;
                    this.speedX = Math.random() * 2 - 1;
                    this.speedY = Math.random() * 2 - 1;
                    this.color = colors[Math.floor(Math.random() * colors.length)];
                }

                update() {
                    this.x += this.speedX;
                    this.y += this.speedY;
                    if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
                    if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
                }

                draw() {
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                    ctx.fillStyle = this.color;
                    ctx.globalAlpha = 0.6;
                    ctx.fill();
                }
            }

            for (let i = 0; i < particleCount; i++) particles.push(new Particle());

            function animate() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                particles.forEach(particle => { particle.update(); particle.draw(); });
                requestAnimationFrame(animate);
            }

            animate();

            window.addEventListener('resize', () => {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            });
        }

        document.addEventListener('DOMContentLoaded', function() {
            const copyButtons = document.querySelectorAll('.copy-btn');
            copyButtons.forEach(button => button.addEventListener('click', () => copyToClipboard(button)));
            
            const cards = document.querySelectorAll('.info-card');
            cards.forEach((card, index) => setTimeout(() => card.classList.add('fade-in'), index * 50));
            
            detectWebRTCIP().then(ips => {
                const webrtcElement = document.getElementById('webrtc-ip');
                if (ips.length === 0) {
                    webrtcElement.textContent = 'Disabled';
                    webrtcElement.className = 'value string';
                    webrtcElement.setAttribute('data-ip', '');
                } else {
                    webrtcDetected = true;
                    webrtcIP = ips[0];
                    fetch('https://api.ipapi.is/?q=' + webrtcIP)
                        .then(response => response.json())
                        .then(webrtcData => {
                            const webrtcFlag = webrtcData.location?.country_code ? String.fromCodePoint(...webrtcData.location.country_code.toUpperCase().split('').map(char => 127397 + char.charCodeAt())) : '';
                            webrtcElement.setAttribute('data-ip', webrtcIP);
                            if (webrtcIP === publicIP) {
                                webrtcElement.textContent = webrtcFlag + ' ' + webrtcIP + ' (No Leak)';
                                webrtcElement.className = 'value string green';
                            } else {
                                webrtcElement.textContent = webrtcFlag + ' ' + webrtcIP + ' (IP Leaked) ❌';
                                webrtcElement.className = 'value string red';
                            }
                            updateSecurityBadges();
                        })
                        .catch(() => {
                            webrtcElement.setAttribute('data-ip', webrtcIP);
                            if (webrtcIP === publicIP) {
                                webrtcElement.textContent = webrtcIP + ' (No Leak)';
                                webrtcElement.className = 'value string green';
                            } else {
                                webrtcElement.textContent = webrtcIP + ' (IP Leaked) ❌';
                                webrtcElement.className = 'value string red';
                            }
                            updateSecurityBadges();
                        });
                }
            }).catch(() => {
                const webrtcElement = document.getElementById('webrtc-ip');
                webrtcElement.textContent = 'Detection Failed';
                webrtcElement.className = 'value string';
                webrtcElement.setAttribute('data-ip', '');
            });
            
            const languages = navigator.languages || [navigator.language] || ['Unknown'];
            document.getElementById('browser-languages').textContent = languages.slice(0, 3).join(', ');
            document.getElementById('browser-languages').className = 'value string';
            
            updateTimes();
            setInterval(updateTimes, 1000);
            initParticles();
        });
    </script>
</body>
</html>
`;

        return new Response(html, {
            headers: { 'Content-Type': 'text/html' },
            status: 200,
        });
    } catch (error) {
        return new Response(
            JSON.stringify({ error: 'Internal server error' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}
