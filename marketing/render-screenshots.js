/**
 * WMK Connect - Marketing Screenshot Renderer
 * Renders all HTML mockups to PNG at iPhone 15 Pro Max resolution (1290x2796)
 *
 * Usage:
 *   node marketing/render-screenshots.js
 *   node marketing/render-screenshots.js --desktop   (renders at 1440x900)
 *   node marketing/render-screenshots.js --file studio-support-chat  (single file)
 */

const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

// ─── Config ────────────────────────────────────────────────────────────────

const SCREENSHOTS_DIR = path.join(__dirname, 'screenshots');
const OUTPUT_DIR = path.join(__dirname, 'png');

const MOBILE_VIEWPORT = { width: 430, height: 932, deviceScaleFactor: 3 };
const DESKTOP_VIEWPORT = { width: 1440, height: 900, deviceScaleFactor: 2 };

// Files that are desktop-first (use desktop viewport)
const DESKTOP_SCREENS = [
    'admin-analytics',
    'studio-support-chat',
    'studio-files-deliverables',
    'candidate-profile',
];

// ─── Screen Manifest ───────────────────────────────────────────────────────

const SCREENS = [
    // App Store marketing screens
    { file: 'app-store-match-success', label: '01_AppStore_MatchSuccess' },
    { file: 'app-store-2', label: '02_AppStore_DualPhone', skipIfMissing: true },

    // Feature screens — mobile
    { file: 'match-success', label: '03_MatchErfolg' },
    { file: 'jobs-search', label: '04_JobSearch' },

    // Feature screens — desktop/tablet
    { file: 'studio-support-chat', label: '05_StudioSupportChat' },
    { file: 'admin-analytics', label: '06_AnalyseInsights' },
    { file: 'candidate-profile', label: '07_KandidatenProfil' },
    { file: 'studio-files-deliverables', label: '08_DateienEntwuerfe' },

    // Additional app-store screenshots (older set)
    { file: 'app-store-1', label: '09_AS_Home', skipIfMissing: true },
    { file: 'app-store-3', label: '10_AS_Screen3', skipIfMissing: true },
    { file: 'app-store-4', label: '11_AS_Screen4', skipIfMissing: true },
    { file: 'app-store-5', label: '12_AS_Screen5', skipIfMissing: true },
];

// ─── Helpers ───────────────────────────────────────────────────────────────

function ensureDir(dir) {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function isDesktop(file) {
    return DESKTOP_SCREENS.some(name => file.includes(name));
}

// ─── Main ──────────────────────────────────────────────────────────────────

async function main() {
    const args = process.argv.slice(2);
    const forceDesktop = args.includes('--desktop');
    const singleFile = args.find(a => !a.startsWith('--'));

    ensureDir(OUTPUT_DIR);

    const browser = await chromium.launch();
    let rendered = 0;
    let skipped = 0;
    let failed = 0;

    const targets = singleFile
        ? SCREENS.filter(s => s.file.includes(singleFile))
        : SCREENS;

    if (targets.length === 0) {
        console.error(`❌ No screens matched: ${singleFile}`);
        await browser.close();
        process.exit(1);
    }

    console.log(`\n🎨 WMK Connect Screenshot Renderer`);
    console.log(`   Rendering ${targets.length} screen(s) → ${OUTPUT_DIR}\n`);

    for (const screen of targets) {
        const htmlPath = path.join(SCREENSHOTS_DIR, `${screen.file}.html`);

        if (!fs.existsSync(htmlPath)) {
            if (screen.skipIfMissing) {
                console.log(`  ⏭  ${screen.label} — skipped (file not found)`);
                skipped++;
                continue;
            }
            console.error(`  ❌ ${screen.label} — HTML file not found: ${htmlPath}`);
            failed++;
            continue;
        }

        const desktop = forceDesktop || isDesktop(screen.file);
        const viewport = desktop ? DESKTOP_VIEWPORT : MOBILE_VIEWPORT;
        const outputPath = path.join(OUTPUT_DIR, `${screen.label}.png`);

        try {
            const page = await browser.newPage();
            await page.setViewportSize({ width: viewport.width, height: viewport.height });

            // Use file:// URL so relative assets load correctly
            await page.goto(`file:///${htmlPath.replace(/\\/g, '/')}`, {
                waitUntil: 'networkidle',
                timeout: 30000,
            });

            // Wait for fonts + images to settle
            await page.waitForTimeout(1500);

            await page.screenshot({
                path: outputPath,
                fullPage: false,
                scale: 'device',
                type: 'png',
            });

            await page.close();

            const size = Math.round(fs.statSync(outputPath).size / 1024);
            const dim = desktop ? `${viewport.width * viewport.deviceScaleFactor}×${viewport.height * viewport.deviceScaleFactor}` : `${viewport.width * viewport.deviceScaleFactor}×${viewport.height * viewport.deviceScaleFactor}`;
            console.log(`  ✅ ${screen.label} (${dim}px, ${size} KB)`);
            rendered++;
        } catch (err) {
            console.error(`  ❌ ${screen.label} — ${err.message}`);
            failed++;
        }
    }

    await browser.close();

    console.log(`\n─────────────────────────────────────`);
    console.log(`  ✅ Rendered : ${rendered}`);
    if (skipped) console.log(`  ⏭  Skipped  : ${skipped}`);
    if (failed) console.log(`  ❌ Failed   : ${failed}`);
    console.log(`  📁 Output   : ${OUTPUT_DIR}`);
    console.log(`─────────────────────────────────────\n`);

    if (failed > 0) process.exit(1);
}

main().catch(err => {
    console.error('Fatal error:', err);
    process.exit(1);
});
