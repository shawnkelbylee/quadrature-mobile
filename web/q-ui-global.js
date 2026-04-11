// THE QUADRATURE: APERTURE GATEWAY UI CONTROLLER
// Architect: Kelby | Engineer: Kairos
// STATUS: Version 23.2 - Root Optimization. Exclusively manages the Aperture Gateway portals and Dual-State Wings. Restored Asset Paths.

window.injectUniversalUI = function() {
    if (window.self !== window.top) return;
    if (document.getElementById('q-ui-injected-flag')) return;

    let oldMeta = document.querySelector('meta[name="viewport"]');
    if (oldMeta) oldMeta.remove();
    let meta = document.createElement('meta');
    meta.name = "viewport";
    meta.content = "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover";
    document.head.appendChild(meta);
    
    let noCache1 = document.createElement('meta'); noCache1.httpEquiv = "Cache-Control"; noCache1.content = "no-cache, no-store, must-revalidate"; document.head.appendChild(noCache1);
    let noCache2 = document.createElement('meta'); noCache2.httpEquiv = "Pragma"; noCache2.content = "no-cache"; document.head.appendChild(noCache2);
    let noCache3 = document.createElement('meta'); noCache3.httpEquiv = "Expires"; noCache3.content = "0"; document.head.appendChild(noCache3);

    const style = document.createElement('style');
    style.innerHTML = `
        /* IRONCLAD VIEWPORT RECOVERY */
        html, body { 
            position: fixed !important; top: 0px !important; left: 0px !important; right: 0px !important; bottom: 0px !important; 
            width: 100vw !important; height: var(--app-height, 100vh) !important; 
            margin: 0px !important; padding: 0px !important; 
            overflow: hidden !important; touch-action: none !important; overscroll-behavior: none !important; transform: none !important; 
            background-color: #010205; 
        }

        :root { 
            --white-pure: #ffffff; 
            --starlight: rgba(255, 255, 255, 0.7); 
            --q-metal: #e2e8f0;
            --center-gap-x: 31vh; 
            --corner-gap-y: 24vh; 
            --corner-gap-x: 23vh;
            --panel-w: 340px;
            --panel-h: 80px;
            --theme-dim: rgba(0, 240, 255, 0.2);
        }
        
        .global-header {
            position: absolute; top: 4vh; left: 0; width: 100vw;
            display: flex; justify-content: center; align-items: center; text-align: center;
            font-family: 'Courier New', Courier, monospace; font-weight: 900; font-size: 2.8rem; letter-spacing: 16px; padding-left: 16px;
            color: #ffffff; z-index: 50; pointer-events: none;
            text-shadow: 0 0 15px rgba(0, 163, 255, 0.8), 0 0 5px rgba(255, 255, 255, 0.5);
        }

        .global-footer {
            position: absolute; bottom: 6vh; left: 0; width: 100vw;
            display: flex; justify-content: center; align-items: center; text-align: center;
            font-family: 'Courier New', Courier, monospace; font-weight: 700; font-size: 1.4rem; letter-spacing: 4px; padding-left: 4px;
            color: rgba(255, 255, 255, 0.85); z-index: 50; pointer-events: none;
            text-shadow: 0 2px 5px rgba(0,0,0,0.9), 0 0 10px rgba(0, 163, 255, 0.3);
        }

        .space-bg { position: fixed; inset: 0; z-index: 0; background-image: radial-gradient(circle at 50% 50%, #030814 0%, #010205 100%); }

        .nebula-left { position: fixed; top: -10%; bottom: -10%; left: -10%; width: 55vw; z-index: 1; background: url('../assets/nebula-left.png') center/cover no-repeat; mix-blend-mode: screen; animation: nebula-drift-l 35s ease-in-out infinite alternate; -webkit-mask-image: radial-gradient(ellipse 100% 100% at 0% 50%, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 80%); mask-image: radial-gradient(ellipse 100% 100% at 0% 50%, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 80%); pointer-events: none; }
        .nebula-right { position: fixed; top: -10%; bottom: -10%; right: -10%; width: 55vw; z-index: 1; background: url('../assets/nebula-right.png') center/cover no-repeat; mix-blend-mode: screen; animation: nebula-drift-r 42s ease-in-out infinite alternate-reverse; -webkit-mask-image: radial-gradient(ellipse 100% 100% at 100% 50%, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 80%); mask-image: radial-gradient(ellipse 100% 100% at 100% 50%, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 80%); pointer-events: none; }

        @keyframes nebula-drift-l { 0% { transform: scale(1) translate(0, 0); opacity: 0.5; } 50% { transform: scale(1.05) translate(2%, 2%); opacity: 0.85; } 100% { transform: scale(1.02) translate(-1%, -1%); opacity: 0.6; } }
        @keyframes nebula-drift-r { 0% { transform: scale(1) translate(0, 0); opacity: 0.6; } 50% { transform: scale(1.05) translate(-2%, 2%); opacity: 0.9; } 100% { transform: scale(1.02) translate(1%, -1%); opacity: 0.55; } }
        
        .dust-layer-global { position: fixed; inset: 0; z-index: 2; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise2'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.012' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise2)' opacity='0.08'/%3E%3C/svg%3E"); mix-blend-mode: screen; pointer-events: none; }

        .corner-panel { position: absolute; width: var(--panel-w); height: var(--panel-h); z-index: 20; cursor: pointer; transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
        .corner-panel:hover { transform: translate(var(--tx-hover), var(--ty-hover)) scale(1.03); }

        .frost-zone { position: absolute; inset: 6px 12px; background: rgba(15, 20, 35, 0.5); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border-radius: 6px; z-index: -2; box-shadow: inset 0 0 20px rgba(0, 163, 255, 0.15); transition: 0.3s ease; }
        .corner-panel:hover .frost-zone { background: rgba(20, 25, 45, 0.65); box-shadow: 0 0 20px rgba(0, 240, 255, 0.4), inset 0 0 25px rgba(255, 255, 255, 0.1); }

        .panel-bg { position: absolute; inset: 0; background: url('../assets/panel-frame.png') center/100% 100% no-repeat; z-index: -1; filter: drop-shadow(0 5px 10px rgba(0,0,0,0.6)); }

        .tl { bottom: calc(50% + var(--corner-gap-y)); right: calc(50% + var(--corner-gap-x)); --tx-hover: -2px; --ty-hover: -2px;}
        .tr { bottom: calc(50% + var(--corner-gap-y)); left: calc(50% + var(--corner-gap-x)); --tx-hover: 2px; --ty-hover: -2px;}
        .tr .panel-bg { transform: scaleX(-1); }
        .bl { top: calc(50% + var(--corner-gap-y)); right: calc(50% + var(--corner-gap-x)); --tx-hover: -2px; --ty-hover: 2px;}
        .bl .panel-bg { transform: scaleY(-1); }
        .br { top: calc(50% + var(--corner-gap-y)); left: calc(50% + var(--corner-gap-x)); --tx-hover: 2px; --ty-hover: 2px;}
        .br .panel-bg { transform: scale(-1, -1); }

        .panel-label {
            height: 100%; width: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center;
            font-size: 0.9rem; letter-spacing: 4px; padding-left: 4px; font-weight: 700; color: var(--q-metal);
            text-shadow: 0 2px 5px rgba(0,0,0,0.8), 0 0 5px rgba(255,255,255,0.4);
            position: relative; z-index: 2; box-sizing: border-box; font-family: 'Orbitron';
        }
        
        .tl .panel-label { padding-left: 59px; }
        .tr .panel-label { padding-right: 51px; }
        .bl .panel-label { padding-left: 59px; }
        .br .panel-label { padding-right: 51px; }

        /* --- OS WING PANELS --- */
        .wing-panel { position: absolute; width: 240px; height: 250px; z-index: 15; box-sizing: border-box; top: 50%; transform: translateY(-50%); text-align: center; }
        .wing-frost { position: absolute; inset: 12px; background: rgba(10, 15, 25, 0.55); backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px); border-radius: 8px; z-index: -2; box-shadow: inset 0 0 30px rgba(0, 163, 255, 0.2); }
        .wing-bg { position: absolute; inset: 0; background: url('../assets/wing-panel.png') center/100% 100% no-repeat; z-index: -1; filter: drop-shadow(0 15px 25px rgba(0,0,0,0.6)); }

        .wing-l { right: calc(50% + var(--center-gap-x)); }
        .wing-r { left: calc(50% + var(--center-gap-x)); }
        .wing-r .wing-bg { transform: scaleX(-1); }
        
        .wing-r .wing-header, .wing-r .wing-data-center, .wing-r .wing-footer { padding-left: 15px; }

        .wing-header { position: absolute; top: 25px; left: 0; width: 100%; z-index: 10; display: flex; justify-content: center; }
        .wing-data-center { display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; height: 100%; width: 100%; padding: 40px 0; box-sizing: border-box; position: relative; z-index: 10; }
        .wing-footer { position: absolute; bottom: 20px; left: 0; width: 100%; z-index: 10; display: flex; justify-content: center; }

        .w-head { font-family: 'Orbitron'; font-weight: 600; font-size: 0.75rem; letter-spacing: 3px; padding-left: 3px; color: rgba(255,255,255,0.6); border-bottom: 1px solid var(--theme-dim); padding-bottom: 4px; display: inline-block; z-index: 20; text-align: center; }
        .w-lbl { font-family: 'JetBrains Mono'; font-size: 0.55rem; color: var(--starlight); letter-spacing: 1px; padding-left: 1px; text-transform: uppercase; margin-bottom: 2px; z-index: 20; text-align: center; }
        .val-lg { font-family: 'Orbitron'; font-size: 1.2rem; font-weight: 700; letter-spacing: 1px; padding-left: 1px; white-space: nowrap; color: #fff; text-shadow: 0 4px 10px rgba(0,0,0,0.5); z-index: 20; text-align: center; }
        .val-sm { font-family: 'Orbitron'; font-size: 0.85rem; font-weight: 700; z-index: 20; text-align: center; }
        .fmt-toggle { font-family: 'JetBrains Mono'; font-weight: bold; font-size: 0.5rem; color: #00f0ff; cursor: pointer; border: 1px solid rgba(0,240,255,0.2); padding: 2px 8px; border-radius: 4px; background: rgba(0,0,0,0.6); pointer-events: auto; transition: 0.3s; white-space: nowrap; text-align: center; }
        .fmt-toggle:hover { background: #00f0ff; color: #000; box-shadow: 0 0 10px #00f0ff; }

        .desktop-only { display: flex !important; }

        @media (max-width: 950px) {
            .desktop-only { display: none !important; }
            .wing-panel { display: none !important; }
        }
    `;
    document.head.appendChild(style);

    const uiContainer = document.createElement('div');
    uiContainer.id = 'q-ui-injected-flag';
    
    uiContainer.innerHTML = `
        <div class="space-bg"></div>
        <div class="nebula-left"></div>
        <div class="nebula-right"></div>
        <div class="dust-layer-global"></div>

        <div class="global-header desktop-only">THE QUADRATURE</div>
        <div class="global-footer desktop-only">BASED IN SCIENCE BATHED IN CULTURE AND BUILT FOR THE DIGITAL AGE</div>

        <div class="corner-panel tl desktop-only" onclick="location.href='../personal/index.html'">
            <div class="frost-zone"></div>
            <div class="panel-bg"></div>
            <div class="panel-label">PERSONAL QUAD</div>
        </div>
        <div class="corner-panel tr desktop-only" onclick="location.href='../commercial/index.html'">
            <div class="frost-zone"></div>
            <div class="panel-bg"></div>
            <div class="panel-label">COMMERCIAL QUAD</div>
        </div>
        <div class="corner-panel bl desktop-only" onclick="location.href='../physical/index.html'">
            <div class="frost-zone"></div>
            <div class="panel-bg"></div>
            <div class="panel-label">PHYSICAL ASSETS</div>
        </div>
        <div class="corner-panel br desktop-only" onclick="if(window.Q_IntegrationHub) window.Q_IntegrationHub.openHub()">
            <div class="frost-zone"></div>
            <div class="panel-bg"></div>
            <div class="panel-label">DASHBOARD</div>
        </div>

        <div class="wing-panel wing-l telemetry-node" id="q-wing-left">
            <div class="wing-frost"></div>
            <div class="wing-bg"></div>
            <div class="wing-header">
                <span class="w-head" style="position:static; transform:none;">LEGACY OS</span>
            </div>
            <div class="wing-data-center">
                <div style="margin-bottom: 15px;">
                    <div class="w-lbl">DATE</div>
                    <div class="val-lg" id="leg-date" style="color: #00f0ff; text-shadow: 0 0 10px rgba(0,240,255,0.2);">--</div>
                </div>
                <div>
                    <div style="display:flex; align-items:center; justify-content:center; gap: 5px;">
                        <div class="w-lbl" style="margin:0;">TIME</div>
                        <div class="fmt-toggle" onclick="window.toggleTimeFmt('fmt-btn')" id="fmt-btn" style="border-color:#00f0ff; color:#00f0ff;">UTC</div>
                    </div>
                    <div class="val-lg" id="leg-time" style="color: #00f0ff; text-shadow: 0 0 10px rgba(0,240,255,0.2);">--</div>
                </div>
            </div>
            <div class="wing-footer">
                <div style="font-size:0.5rem; color:var(--starlight); border-top: 1px dashed rgba(0,240,255,0.2); padding-top: 8px; width: 85%; margin: 0 auto;">STATUS: CONTINUITY ACTIVE</div>
            </div>
        </div>

        <div class="wing-panel wing-r telemetry-node" id="q-wing-right">
            <div class="wing-frost"></div>
            <div class="wing-bg"></div>
            <div class="wing-header">
                <span class="w-head" style="position:static; transform:none;">QUAD OS</span>
            </div>
            <div class="wing-data-center">
                <div style="margin-bottom: 15px;">
                    <div class="w-lbl">Q COORDINATE</div>
                    <div class="val-lg" id="q-coord-wing" style="margin-top: 4px; color: #00f0ff; text-shadow: 0 0 10px rgba(0,240,255,0.2);">--</div>
                </div>
                <div style="display:flex; width: 100%; justify-content: space-around;">
                    <div style="display:flex; flex-direction:column; align-items:center;">
                        <div class="w-lbl">MEAN CIRCLE (CIVIL)</div>
                        <div class="val-sm" id="mean-deg" style="color:#00f0ff !important; text-shadow:0 0 10px rgba(0,240,255,0.2); margin-top: 4px;">--</div>
                    </div>
                    <div style="display:flex; flex-direction:column; align-items:center;">
                        <div class="w-lbl">TRUE ELLIPSE (PHYSICS)</div>
                        <div class="val-sm" id="true-deg" style="color:#00f0ff !important; text-shadow:0 0 10px rgba(0,240,255,0.2); margin-top: 4px;">--</div>
                    </div>
                </div>
            </div>
            <div class="wing-footer">
                <div style="font-size:0.5rem; color:var(--starlight); border-top: 1px dashed rgba(0,240,255,0.2); padding-top: 8px; width: 85%; margin: 0 auto;">DUAL-STATE ENGINE</div>
            </div>
        </div>
    `;
    
    const refNode = document.body.firstChild;
    while (uiContainer.firstChild) document.body.insertBefore(uiContainer.firstChild, refNode);
    
    // Local Time Format Toggle Logic
    window.toggleTimeFmt = function(btnId) {
        let fmt = localStorage.getItem('Q_TIME_FMT') || 'UTC_24';
        const cycle = { 'UTC_24': 'LOCAL_24', 'LOCAL_24': 'UTC_12', 'UTC_12': 'LOCAL_12', 'LOCAL_12': 'UTC_24' };
        let newFmt = cycle[fmt] || 'UTC_24';
        
        if (window.Q_UpdateState) window.Q_UpdateState('system_state', 'q_time_fmt', newFmt);
        else localStorage.setItem('Q_TIME_FMT', newFmt);
        
        document.querySelectorAll('.fmt-toggle').forEach(btn => {
            btn.innerText = newFmt.replace('_', ' ');
        });
        
        if (window.Q_MobileBridge) window.Q_MobileBridge.pulse('LIGHT');
    };

    // Telemetry Sync for Dual-State Wings
    window.addEventListener('q-tick', (e) => {
        function formatDualColorWing(str) {
            const letterStyle = "color:var(--starlight); font-family:'Orbitron'; font-size:0.8rem; margin-right:2px;";
            const numStyle = `color:#00f0ff; font-size:1.1rem; font-weight:bold;`;
            let out = "";
            let tokens = str.match(/([0-9]+)|([^0-9]+)/g);
            if (tokens) {
                tokens.forEach(tk => { out += `<span style="${/[0-9]/.test(tk) ? numStyle : letterStyle}">${tk}</span>`; });
            }
            return out;
        }

        const legDateEl = document.getElementById('leg-date');
        if (legDateEl) legDateEl.innerHTML = `<span style="color:#00f0ff; font-weight:bold; text-shadow:0 0 10px rgba(0,240,255,0.2);">${e.detail.legacyDateStr.toUpperCase()}</span>`;

        const legTimeEl = document.getElementById('leg-time');
        if (legTimeEl) legTimeEl.innerHTML = formatDualColorWing(e.detail.legacyTimeStr);
        
        const meanDegEl = document.getElementById('mean-deg');
        if (meanDegEl) meanDegEl.innerText = e.detail.qData.meanArc.toFixed(4) + "°";
        
        const trueDegEl = document.getElementById('true-deg');
        if (trueDegEl) trueDegEl.innerText = e.detail.qData.trueArc.toFixed(4) + "°"; 

        let activeBlock = window.getQBlockByTime ? window.getQBlockByTime(e.detail.t) : null;
        const qCoordWing = document.getElementById('q-coord-wing');
        
        if (qCoordWing) {
            if (activeBlock && activeBlock.type === 'PYLON') {
                qCoordWing.innerHTML = `<span style="font-size:0.9rem; color:#00f0ff; font-family:'Orbitron'; font-weight:bold;">${activeBlock.name}</span>`;
            } else {
                qCoordWing.innerHTML = `<span style="color:var(--starlight); font-family:'Orbitron'; font-size:0.8rem;">QC</span><span style="color:#00f0ff; font-size:1.1rem; font-weight:bold;">${activeBlock ? activeBlock.cycle : 0}</span> ` +
                                       `<span style="color:var(--starlight); font-family:'Orbitron'; font-size:0.8rem; margin-left:6px;">Q</span><span style="color:#00f0ff; font-size:1.1rem; font-weight:bold;">${e.detail.qData.quad}</span> ` +
                                       `<span style="color:var(--starlight); font-family:'Orbitron'; font-size:0.8rem; margin-left:6px;">S</span><span style="color:#00f0ff; font-size:1.1rem; font-weight:bold;">${e.detail.qData.sect}</span> ` +
                                       `<span style="color:var(--starlight); font-family:'Orbitron'; font-size:0.8rem; margin-left:6px;">DAY</span><span style="color:#00f0ff; font-size:1.1rem; font-weight:bold;">${e.detail.qData.day}</span>`;
            }
        }
    });
};

window.generateStars = function(containerId) {
    const container = document.getElementById(containerId);
    if(!container) return;
    
    if (!document.getElementById('q-star-style')) {
        const style = document.createElement('style');
        style.id = 'q-star-style';
        style.innerHTML = `
            .star-kinetic {
                position: absolute; top: 50%; left: 50%; width: 2px;
                height: calc(2px + (60px * var(--warp-factor, 0)));
                background: linear-gradient(to bottom, #fff, var(--warp-color, #fff));
                border-radius: 2px;
                animation: warp-travel linear infinite;
            }
            @keyframes warp-travel {
                0% { transform: translate(-50%, -50%) rotate(var(--angle)) translateX(var(--radius)) translateZ(-500px); opacity: 0; }
                20% { opacity: var(--opacity); }
                80% { opacity: var(--opacity); }
                100% { transform: translate(-50%, -50%) rotate(var(--angle)) translateX(var(--radius)) translateZ(500px); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
    
    container.innerHTML = '';
    for(let i=0; i<300; i++) {
        let star = document.createElement('div');
        star.className = 'star-kinetic';
        star.style.setProperty('--angle', Math.random() * 360 + 'deg');
        star.style.setProperty('--radius', (Math.random() * 800 + 50) + 'px');
        star.style.setProperty('--opacity', Math.random() * 0.8 + 0.2);
        star.style.animationDuration = (Math.random() * 5 + 5) + 's';
        star.style.animationDelay = -(Math.random() * 10) + 's';
        container.appendChild(star);
    }
};

(function initWarpEngine() {
    let warpFactor = 0;
    let targetWarp = 0;
    let lastDays = null;

    window.addEventListener('q-tick', (e) => {
        const currentDays = e.detail.daysElapsed;
        if (lastDays !== null && !e.detail.isLive) {
            const delta = Math.abs(currentDays - lastDays);
            if (delta > 0) {
                targetWarp = Math.min(1.0, targetWarp + (delta * 0.4)); 
            }
        }
        lastDays = currentDays;
    });

    const tick = () => {
        targetWarp *= 0.85; 
        warpFactor += (targetWarp - warpFactor) * 0.15; 
        
        if (document.documentElement) {
            document.documentElement.style.setProperty('--warp-factor', Math.max(0, warpFactor).toFixed(3));
            document.documentElement.style.setProperty('--warp-color', warpFactor > 0.1 ? 'rgba(0, 240, 255, 0.8)' : '#fff');
        }
        requestAnimationFrame(tick);
    };
    
    window.addEventListener('DOMContentLoaded', () => {
        requestAnimationFrame(tick);
    });
})();

window.addEventListener('DOMContentLoaded', () => {
    window.injectUniversalUI();
});