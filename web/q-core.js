// THE QUADRATURE: CORE PHYSICS & METROLOGY ENGINE
// Architect: Kelby | Engineer: Kairos
// STATUS: Phase III Physics Engine. True Ellipse/Mean Circle Delta active. Q_GEAR_CONSTANTS Restored.

(function() {
    if (window.Q_CORE_LOADED) return;
    window.Q_CORE_LOADED = true;

    window.Q_LOG = function(level, module, message, data={}) {
        const ts = new Date().toISOString();
        console.log(`[Q-OS] ${ts} | ${level} | ${module} | ${message}`, data);
    };

    document.addEventListener('DOMContentLoaded', () => { window.initQCore(); });

    window.initQCore = function() {
        console.log("[Q-CORE] V24 System Initialized...");
        
        // CRITICAL FIX: Restored correct Winter Solstice Epoch (Dec 21, 2025 15:03 UTC)
        window.ANCHOR_ALPHA_DYNAMIC = Date.UTC(2025, 11, 21, 15, 3, 0); 
        window.MS_DAY = 86400000;
        window.TROPICAL_YEAR_MS = 31556925216;

        // CRITICAL FIX: Restored Q_GEAR_CONSTANTS for Omni-Planner Initialization
        window.Q_GEAR_CONSTANTS = {
            ALPHA: 86400000,
            BETA: 84600000,
            GAMMA: 89662680,
            DELTA: 102599640,
            EPSILON: 89662680
        };

        let lastPulse = 0;
        let scrubSpeed = 0;
        
        window.Q_STATE = {
            isLive: true,
            simTime: Date.now(),
            logic_layer: { active: true, offset_ms: 0 },
            metaphysical_layer: { 
                zodiac_active: true, 
                natal_anchor: localStorage.getItem('Q_NATAL_ANCHOR') || 'NONE' 
            },
            location: {
                lat: localStorage.getItem('Q_LAT') || 34.0522,
                lon: localStorage.getItem('Q_LON') || -118.2437,
                name: localStorage.getItem('Q_LOC_NAME') || 'LOS ANGELES, CA'
            }
        };

        window.getSimState = () => window.Q_STATE;

        window.addEventListener('storage', (e) => {
            if (e.key === 'Q_MASTER_CLOCK' && e.newValue) {
                try {
                    const data = JSON.parse(e.newValue);
                    window.Q_STATE.isLive = data.isLive;
                    window.Q_STATE.simTime = data.simTime;
                    scrubSpeed = data.scrubSpeed || 0;
                    window.Q_LOG('INFO', 'CLOCK', 'Master Sync', data);
                } catch(err) {
                    console.error("Master Clock Sync Failed", err);
                }
            }
        });

        window.formatLegacyDate = function(tMs) {
            let d = tMs instanceof Date ? tMs : new Date(tMs);
            const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
            let fmt = localStorage.getItem('Q_TIME_FMT') || 'UTC_24';
            
            let dateStr = "";
            let timeStr = "";

            if (fmt.includes('UTC')) {
                dateStr = `${months[d.getUTCMonth()]} ${d.getUTCDate().toString().padStart(2, '0')}, ${d.getUTCFullYear()}`;
            } else {
                dateStr = `${months[d.getMonth()]} ${d.getDate().toString().padStart(2, '0')}, ${d.getFullYear()}`;
            }

            if (fmt === 'UTC_24') {
                let hh = d.getUTCHours().toString().padStart(2,'0');
                let min = d.getUTCMinutes().toString().padStart(2,'0');
                let ss = d.getUTCSeconds().toString().padStart(2,'0');
                timeStr = `${hh}:${min}:${ss}Z`;
            } else if (fmt === 'LOCAL_24') {
                let hh = d.getHours().toString().padStart(2,'0');
                let min = d.getMinutes().toString().padStart(2,'0');
                let ss = d.getSeconds().toString().padStart(2,'0');
                timeStr = `${hh}:${min}:${ss} LCL`;
            } else if (fmt === 'UTC_12') {
                let h = d.getUTCHours();
                let ampm = h >= 12 ? 'PM' : 'AM';
                h = h % 12; h = h ? h : 12;
                let min = d.getUTCMinutes().toString().padStart(2,'0');
                let ss = d.getUTCSeconds().toString().padStart(2,'0');
                timeStr = `${h.toString().padStart(2,'0')}:${min}:${ss} ${ampm} UTC`;
            } else if (fmt === 'LOCAL_12') {
                let h = d.getHours();
                let ampm = h >= 12 ? 'PM' : 'AM';
                h = h % 12; h = h ? h : 12;
                let min = d.getMinutes().toString().padStart(2,'0');
                let ss = d.getSeconds().toString().padStart(2,'0');
                timeStr = `${h.toString().padStart(2,'0')}:${min}:${ss} ${ampm} LCL`;
            }

            return {
                dateStr: dateStr,
                timeStr: timeStr,
                date: dateStr, 
                time: timeStr
            };
        };

        window.getOrbitalData = function(daysElapsed) {
            let meanArc = (daysElapsed * (360 / 365.24219)) % 360;
            if (meanArc < 0) meanArc += 360;

            const daysSincePerihelion = daysElapsed - 14; 
            const M = daysSincePerihelion * (360 / 365.24219);
            const Mrad = M * Math.PI / 180;
            const e = 0.0167; 
            
            const equationOfCenter = (2 * e * Math.sin(Mrad) + 1.25 * e * e * Math.sin(2 * Mrad)) * 180 / Math.PI;
            
            let trueArc = (meanArc + equationOfCenter) % 360;
            if (trueArc < 0) trueArc += 360;

            const delta = trueArc - meanArc;

            const cycleDayFloat = daysElapsed % 365.24219;
            const cycleDay = Math.floor(cycleDayFloat < 0 ? cycleDayFloat + 365.24219 : cycleDayFloat);

            const qQuad = Math.floor(meanArc / 90) + 1;
            const qSect = Math.floor((meanArc % 90) / 30) + 1;
            const qDay = Math.floor((meanArc % 30) * (365.24219 / 360)) + 1;

            return {
                meanArc: meanArc,
                trueArc: trueArc,
                delta: delta,
                quad: qQuad,
                sect: qSect,
                day: qDay,
                cycleDay: cycleDay
            };
        };

        function calculateQData(t) {
            const timeDiff = t - window.ANCHOR_ALPHA_DYNAMIC;
            const daysElapsed = timeDiff / window.MS_DAY;
            
            const orbitalData = window.getOrbitalData(daysElapsed);

            const knownNewMoon = Date.UTC(2024, 0, 11, 11, 57);
            const lunarCycle = 29.53058867 * window.MS_DAY;
            const lunarPhase = ((t - knownNewMoon) % lunarCycle) / lunarCycle;
            
            orbitalData.lunarPhase = lunarPhase > 0 ? lunarPhase : lunarPhase + 1;

            return orbitalData;
        }

        window.getGlobalHolidays = function(year) {
            return [
                { type: 'node-sys', coord: 0, name: "Primary Postulate Shift" },
                { type: 'node-sys', coord: 90, name: "Q2 Shift (Solstice)" },
                { type: 'node-sys', coord: 180, name: "Q3 Shift (Equinox)" },
                { type: 'node-sys', coord: 270, name: "Q4 Shift (Solstice)" }
            ];
        };

        function mainLoop(timestamp) {
            if (timestamp - lastPulse >= 50) { 
                let state = window.Q_STATE;
                let now = state.isLive ? Date.now() : state.simTime;
                
                if (!state.isLive && scrubSpeed !== 0) {
                    now += scrubSpeed;
                    state.simTime = now;
                }

                let d = new Date(now);
                let qData = calculateQData(now);
                let daysElapsed = (now - window.ANCHOR_ALPHA_DYNAMIC) / window.MS_DAY;
                
                let legacy = window.formatLegacyDate(d);
                
                window.CURRENT_TRUE_ARC = qData.trueArc;

                const event = new CustomEvent('q-tick', {
                    detail: {
                        t: now,
                        isLive: state.isLive,
                        activeTime: d,
                        daysElapsed: daysElapsed,
                        qData: qData,
                        legacyDateStr: legacy.dateStr,
                        legacyTimeStr: legacy.timeStr,
                        lagDays: (qData.delta / 360) * 365.24219,
                        activePostulate: window.getPostulateByTime ? window.getPostulateByTime(now) : "PENDING"
                    }
                });
                window.dispatchEvent(event);
                lastPulse = timestamp;
            }
            requestAnimationFrame(mainLoop);
        }

        requestAnimationFrame(mainLoop);
    };

})();