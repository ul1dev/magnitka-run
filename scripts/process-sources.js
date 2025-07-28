const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '..', 'sources');
const publicDir = path.join(__dirname, '..', 'public');
const outHtmlDir = path.join(publicDir, 'pages');

if (!fs.existsSync(outHtmlDir)) fs.mkdirSync(outHtmlDir, { recursive: true });

function processHtml(file) {
  const basename = path.basename(file, '.html');
  const htmlPath = path.join(srcDir, file);
  let html = fs.readFileSync(htmlPath, 'utf8');

  // replace resource folder path with /tilda/
  html = html.replace(/\.\/(?:[^"']+)_files\//g, '/tilda/');

  const cssParts = [];
  const jsParts = [];

  html = html.replace(/<style[^>]*>([\s\S]*?)<\/style>/gi, (m, p1) => {
    cssParts.push(p1.trim());
    return '';
  });

  html = html.replace(/<script(?![^>]*src)[^>]*>([\s\S]*?)<\/script>/gi, (m, p1) => {
    jsParts.push(p1.trim());
    return '';
  });

  if (cssParts.length) {
    const cssFile = `${basename}-inline.css`;
    fs.writeFileSync(path.join(publicDir, 'tilda', cssFile), cssParts.join('\n\n'));
    html = html.replace('</head>', `  <link rel="stylesheet" href="/tilda/${cssFile}">\n</head>`);
  }

  if (jsParts.length) {
    const jsFile = `${basename}-inline.js`;
    fs.writeFileSync(path.join(publicDir, 'tilda', jsFile), jsParts.join('\n\n'));
    html = html.replace('</body>', `  <script src="/tilda/${jsFile}"></script>\n</body>`);
  }

  fs.writeFileSync(path.join(outHtmlDir, file), html);
  console.log(`Processed ${file}`);
}

fs.readdirSync(srcDir).forEach(f => {
  if (f.endsWith('.html')) processHtml(f);
});
