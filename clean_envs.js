const fs = require('fs');
const path = require('path');

const files = fs.readdirSync('.').filter(f => f.startsWith('.env'));

files.forEach(file => {
    console.log(`Processing ${file}...`);
    let content = fs.readFileSync(file, 'utf8');
    // Remove BOM if present
    if (content.charCodeAt(0) === 0xFEFF) {
        content = content.slice(1);
        console.log(`BOM removed from ${file}`);
    }
    // Remove other weird characters
    content = content.replace(/[^\x00-\x7F]/g, "");
    fs.writeFileSync(file, content, 'utf8');
});
console.log('Environment files cleaned.');
