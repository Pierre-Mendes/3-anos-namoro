const https = require('https');
const fs = require('fs');

https.get('https://fonts.googleapis.com/css2?family=Dancing+Script&display=swap', (res) => {
  let cssText = '';
  res.on('data', d => cssText += d);
  res.on('end', () => {
    const urlMatch = cssText.match(/url\((https:\/\/[^)]+\.ttf)\)/) || cssText.match(/url\((https:\/\/[^)]+\.woff2)\)/);
    if (urlMatch && urlMatch[1]) {
      const fontUrl = urlMatch[1];
      https.get(fontUrl, (fontRes) => {
        const file = fs.createWriteStream('font.ttf');
        fontRes.pipe(file);
        file.on('finish', () => {
          file.close();
          const base64 = fs.readFileSync('font.ttf', 'base64');
          fs.writeFileSync('src/utils/dancingScriptBase64.ts', `export const dancingScriptBase64 = "${base64}";\n`);
          console.log('Saved Base64 version to dancingScriptBase64.ts');
        });
      });
    }
  });
});
